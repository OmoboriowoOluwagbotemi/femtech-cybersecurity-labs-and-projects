# Lab 04 - Build a Private PKI and Secure a Web Service

## Mission

FEMTECH has an internal HR portal that currently uses HTTP and a self-signed leaf certificate. Build a small training PKI, issue a server certificate with the correct identity, configure Nginx, and prove confidentiality, integrity, and trust behaviour.

**Lessons:** 4-6
**Time:** 4-5 hours
**Systems:** Ubuntu `web01` (`10.10.30.20`) and Kali
**Synthetic DNS name:** `hr.femtech.lab`

## Safety and Key Policy

This CA is for the isolated lab only. Never install its root into a production trust store. Protect the root private key, do not copy it to the web server, and delete the lab CA after assessment if required by the instructor.

## Step 1 - Confirm Time, Identity, and OpenSSL

On Ubuntu:

```bash
date -u
hostname -f
openssl version -a
ip -br address
```

Certificate validation depends on time and name. Record both before diagnosing TLS.

## Step 2 - Create a Protected CA Workspace

```bash
umask 077
mkdir -p ~/femtech-pki/{root,issued,csr,private}
chmod 0700 ~/femtech-pki/private ~/femtech-pki/root
cd ~/femtech-pki
```

`umask 077` removes group and other access from newly created files. Generate an encrypted root key:

```bash
openssl genpkey -algorithm RSA \
  -pkeyopt rsa_keygen_bits:4096 \
  -aes-256-cbc \
  -out root/femtech-root-ca.key.pem
chmod 0400 root/femtech-root-ca.key.pem
```

Create a self-signed root certificate:

```bash
openssl req -x509 -new -sha256 -days 3650 \
  -key root/femtech-root-ca.key.pem \
  -out root/femtech-root-ca.crt.pem \
  -subj '/C=NG/O=FEMTECH Training/CN=FEMTECH Lab Root CA' \
  -addext 'basicConstraints=critical,CA:TRUE,pathlen:0' \
  -addext 'keyUsage=critical,keyCertSign,cRLSign' \
  -addext 'subjectKeyIdentifier=hash'
chmod 0444 root/femtech-root-ca.crt.pem
```

Why: the basic constraints explicitly authorise CA use; key usage limits the key to signing certificates and revocation lists; `pathlen:0` prevents subordinate CAs in this simple design.

Inspect, do not assume:

```bash
openssl x509 -in root/femtech-root-ca.crt.pem -noout -subject -issuer -serial -dates -fingerprint -sha256
openssl x509 -in root/femtech-root-ca.crt.pem -noout -text | less
```

## Step 3 - Generate the Server Key and CSR

The server private key belongs on `web01`, not on the CA. In this single-VM training lab, keep it under the protected workspace until deployment.

```bash
openssl genpkey -algorithm RSA \
  -pkeyopt rsa_keygen_bits:3072 \
  -out private/hr.femtech.lab.key.pem
chmod 0400 private/hr.femtech.lab.key.pem

openssl req -new -sha256 \
  -key private/hr.femtech.lab.key.pem \
  -out csr/hr.femtech.lab.csr.pem \
  -subj '/C=NG/O=FEMTECH Training/CN=hr.femtech.lab' \
  -addext 'subjectAltName=DNS:hr.femtech.lab,IP:10.10.30.20'
```

Modern clients validate Subject Alternative Name (SAN); Common Name alone is not sufficient.

```bash
openssl req -in csr/hr.femtech.lab.csr.pem -noout -verify -subject -text | less
```

## Step 4 - Sign a Proper Leaf Certificate

Create extension file `~/femtech-pki/hr-ext.cnf`:

```ini
basicConstraints=critical,CA:FALSE
keyUsage=critical,digitalSignature,keyEncipherment
extendedKeyUsage=serverAuth
subjectAltName=DNS:hr.femtech.lab,IP:10.10.30.20
authorityKeyIdentifier=keyid,issuer
subjectKeyIdentifier=hash
```

Sign:

```bash
openssl x509 -req -sha256 -days 365 \
  -in csr/hr.femtech.lab.csr.pem \
  -CA root/femtech-root-ca.crt.pem \
  -CAkey root/femtech-root-ca.key.pem \
  -CAcreateserial \
  -extfile hr-ext.cnf \
  -out issued/hr.femtech.lab.crt.pem
chmod 0444 issued/hr.femtech.lab.crt.pem
```

Validate chain and identity:

```bash
openssl verify -CAfile root/femtech-root-ca.crt.pem issued/hr.femtech.lab.crt.pem
openssl x509 -in issued/hr.femtech.lab.crt.pem -noout -subject -issuer -serial -dates -ext subjectAltName,extendedKeyUsage
```

## Step 5 - Configure Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo install -d -o root -g root -m 0755 /etc/nginx/tls
sudo install -o root -g root -m 0600 private/hr.femtech.lab.key.pem /etc/nginx/tls/
sudo install -o root -g root -m 0644 issued/hr.femtech.lab.crt.pem /etc/nginx/tls/
sudo tee /var/www/html/index.html >/dev/null <<'EOF'
<!doctype html><title>FEMTECH HR</title><h1>FEMTECH HR Lab</h1><p>Synthetic data only.</p>
EOF
```

Create `/etc/nginx/sites-available/hr.femtech.lab`:

```nginx
server {
    listen 80;
    server_name hr.femtech.lab;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name hr.femtech.lab;
    root /var/www/html;

    ssl_certificate     /etc/nginx/tls/hr.femtech.lab.crt.pem;
    ssl_certificate_key /etc/nginx/tls/hr.femtech.lab.key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy no-referrer always;
}
```

Enable and test:

```bash
sudo ln -sfn /etc/nginx/sites-available/hr.femtech.lab /etc/nginx/sites-enabled/hr.femtech.lab
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
sudo ss -lntp | grep -E ':80|:443'
```

## Step 6 - Test Trust Correctly from Kali

Add lab-only name resolution:

```bash
echo '10.10.30.20 hr.femtech.lab' | sudo tee -a /etc/hosts
```

First prove that an untrusted root fails:

```bash
curl -v https://hr.femtech.lab/
```

Then copy only the public root certificate to Kali through an approved method and test explicitly:

```bash
curl --cacert ~/femtech-root-ca.crt.pem -v https://hr.femtech.lab/
openssl s_client -connect 10.10.30.20:443 \
  -servername hr.femtech.lab \
  -CAfile ~/femtech-root-ca.crt.pem \
  -verify_return_error </dev/null
```

`-servername` sends SNI. `-CAfile` supplies the trusted root. `-verify_return_error` fails on chain errors instead of merely printing them.

Run a negative hostname test:

```bash
curl --cacert ~/femtech-root-ca.crt.pem --resolve wrong.femtech.lab:443:10.10.30.20 https://wrong.femtech.lab/
```

Trusting the issuer does not make the wrong identity valid.

## Step 7 - Prove Key/Certificate Matching and File Protection

```bash
openssl pkey -in /etc/nginx/tls/hr.femtech.lab.key.pem -pubout -outform DER | sha256sum
openssl x509 -in /etc/nginx/tls/hr.femtech.lab.crt.pem -pubkey -noout \
  | openssl pkey -pubin -outform DER | sha256sum
sudo namei -l /etc/nginx/tls/hr.femtech.lab.key.pem
```

The public-key hashes must match. `namei -l` checks permission on every directory in the path.

## Certificate Operations Scenario

The private key may have been copied to a public share. Write and execute the lab response:

1. Preserve evidence and record exposure window.
2. Generate a new private key and CSR.
3. Issue a replacement certificate with a new serial.
4. Deploy and validate the replacement.
5. Record the old serial for revocation.
6. Remove the exposed key from all locations and rotate dependent secrets.

Do not simply renew with the compromised key.

## Deliverables

- Root and leaf certificate inspection output.
- CSR, SAN, and chain validation.
- Nginx configuration with secrets excluded.
- Failed untrusted-root test, successful trusted-root test, and failed wrong-name test.
- Key/certificate match proof and permissions.
- Certificate inventory row: owner, purpose, names, serial, issuer, issue/expiry, key location, renewal threshold, revocation path.
- 300-word explanation of encryption, authentication, integrity, and what TLS does not protect.
