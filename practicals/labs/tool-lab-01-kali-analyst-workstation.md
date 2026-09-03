# Tool Lab 01 - Introduction to VirtualBox, Kali Linux, and Bash

## Purpose

This first lab is intentionally basic. Students learn how to open Kali Linux in VirtualBox, understand the Linux desktop, use the terminal, navigate files and folders, and write simple Bash commands.

Only two tools are used in this lab:

- VirtualBox
- Kali Linux

Students should not use pfSense, Ubuntu Server, Windows Server, Nmap scanning, OpenVAS, Wazuh, packet capture, or any target machine in this lab. The goal is confidence with the lab computer before security testing begins.

## Scenario

You are a new cybersecurity student at FEMTECH. Before you can work with firewalls, servers, vulnerability scanners, or SIEM tools, you must first prove that you can safely use a Kali Linux virtual machine and operate basic Linux commands.

## Systems Used

| System | Purpose |
|---|---|
| VirtualBox | Runs Kali as a virtual machine |
| Kali Linux | Student Linux workstation |

## Beginner Terms

| Term | Simple meaning |
|---|---|
| Host computer | The physical computer you are using |
| Virtual machine | A computer running inside your physical computer |
| VirtualBox | The program used to run virtual machines |
| Kali Linux | A Linux operating system used by cybersecurity learners and professionals |
| Desktop | The graphical screen with menus, icons, and windows |
| Terminal | A window where commands are typed |
| Shell | The program that reads terminal commands |
| Bash | The common Linux shell used in this lab |
| Command | An instruction typed into the terminal |
| File | A saved item such as a note, script, or log |
| Folder or directory | A place where files are stored |
| Path | The location of a file or folder |
| User | The account currently using the system |
| Root | The most powerful administrator account in Linux |
| `sudo` | Runs an approved command with administrator power |

## Safety Rules

- Use only the Kali virtual machine in this lab.
- Do not scan any IP address.
- Do not attack any website, network, computer, or classmate.
- Do not change VirtualBox network settings unless the instructor asks.
- Do not delete system files.
- Do not run commands you do not understand.
- If a command asks for a password, pause and ask why administrator permission is needed.

## Step 1 - Open Kali in VirtualBox

1. Open VirtualBox.
2. Select the Kali Linux virtual machine.
3. Click **Start**.
4. Wait for Kali to boot.
5. Log in with the classroom credentials provided by the instructor.

Record in your notebook:

```text
Kali VM name:
Login username:
Date:
Start time:
```

## Step 2 - Understand the Kali Desktop

Find these items on the Kali desktop:

| Item | What it is used for |
|---|---|
| Applications menu | Opens installed programs |
| Terminal icon | Opens the command line |
| File manager | Opens folders and files visually |
| Web browser | Opens web pages when allowed |
| Power/logout menu | Shuts down or logs out safely |

Do not worry if your Kali screen looks slightly different. Linux desktops can use different themes.

## Step 3 - Open the Terminal

Open the terminal.

You may see something similar to:

```text
kali@kali:~$
```

Simple meaning:

| Part | Meaning |
|---|---|
| `kali` before `@` | Current username |
| `kali` after `@` | Computer name |
| `~` | Your home folder |
| `$` | Normal user prompt |

If the prompt ends with `#`, that usually means root or administrator mode. Beginners should avoid working as root unless instructed.

## Step 4 - Run Your First Commands

Type one command at a time.

```bash
pwd
```

Meaning: shows your current folder.

```bash
whoami
```

Meaning: shows your current username.

```bash
hostname
```

Meaning: shows the computer name.

```bash
date
```

Meaning: shows the current date and time.

```bash
clear
```

Meaning: clears the terminal screen. It does not delete files.

## Step 5 - Learn Files and Folders

Run:

```bash
pwd
ls
ls -l
```

Meaning:

- `pwd` shows where you are.
- `ls` lists files and folders.
- `ls -l` lists files and folders with details.

Move to `/home` and back:

```bash
cd /home
pwd
ls
cd ~
pwd
```

Meaning:

- `cd` changes directory.
- `/home` stores user folders.
- `~` means your own home folder.

## Step 6 - Create a Practice Folder and File

Create a folder:

```bash
mkdir linux-practice
cd linux-practice
pwd
```

Create a file:

```bash
echo "This is my first Linux note" > note.txt
cat note.txt
```

Meaning:

- `echo` prints text.
- `>` saves output into a file.
- `cat` displays a small file.

Add another line:

```bash
echo "I am learning Kali and Bash" >> note.txt
cat note.txt
```

Meaning:

- `>>` adds text to the end of a file.
- `>` replaces file content.
- `>>` appends file content.

## Step 7 - Understand Basic File Permissions

Run:

```bash
ls -l note.txt
```

You may see something like:

```text
-rw-r--r-- 1 kali kali 60 Sep 03 10:00 note.txt
```

Simple meaning:

| Part | Meaning |
|---|---|
| `-` | This is a normal file |
| `rw-` | Owner can read and write |
| `r--` | Group can read |
| `r--` | Others can read |
| `kali kali` | Owner and group |
| `note.txt` | File name |

Run:

```bash
stat note.txt
```

`stat` gives more details about the file, including size, owner, permissions, and timestamps.

## Step 8 - Learn How to Get Help

Use the manual:

```bash
man ls
```

Press `q` to quit.

Use short help:

```bash
ls --help | head
```

Meaning:

- `man` opens the manual page.
- `--help` prints command help.
- `head` shows only the first lines.

## Step 9 - Create an Evidence Folder

Cybersecurity work must be documented. Create an evidence folder:

```bash
mkdir -p ~/femtech-evidence/kali-intro-lab
cd ~/femtech-evidence/kali-intro-lab
pwd
```

Save basic system evidence:

```bash
whoami > current-user.txt
hostname > hostname.txt
date > date.txt
pwd > current-folder.txt
```

Check the files:

```bash
ls -l
cat current-user.txt
cat hostname.txt
cat date.txt
cat current-folder.txt
```

## Step 10 - Use `tee` to See and Save Output

Run:

```bash
echo "FEMTECH Kali introduction lab" | tee lab-title.txt
```

Meaning:

- `echo` prints text.
- `|` sends output into the next command.
- `tee` displays the output and saves it into a file.

Run:

```bash
date | tee lab-time.txt
```

## Step 11 - Start Simple Bash Variables

A variable stores a value.

Run:

```bash
STUDENT_NAME="Student One"
LAB_NAME="Kali Introduction"
echo "$STUDENT_NAME"
echo "$LAB_NAME"
```

Now save them:

```bash
echo "Student: $STUDENT_NAME" | tee student-name.txt
echo "Lab: $LAB_NAME" | tee lab-name.txt
```

Important:

- No spaces around `=` when creating a variable.
- Use quotes around text values.
- Use `$VARIABLE_NAME` to read the variable.

## Step 12 - Use Command Substitution

Command substitution puts command output inside a variable.

Run:

```bash
TODAY="$(date)"
echo "$TODAY"
echo "Lab completed at: $TODAY" | tee completed-time.txt
```

Meaning:

- `$(date)` runs the `date` command.
- The result is saved inside `TODAY`.

## Step 13 - Use a Simple Loop

A loop repeats commands.

Run:

```bash
for ITEM in user hostname date; do
  echo "Checking $ITEM"
done
```

Now save repeated output:

```bash
for FILE in current-user.txt hostname.txt date.txt; do
  echo "----- $FILE -----" >> evidence-review.txt
  cat "$FILE" >> evidence-review.txt
done
cat evidence-review.txt
```

Meaning:

- `for FILE in ...` repeats once for each file.
- `>>` appends output.
- `cat "$FILE"` reads the current file in the loop.

## Step 14 - Create a Very Simple Bash Script

Create a script:

```bash
nano my-first-script.sh
```

Type:

```bash
#!/usr/bin/env bash
echo "FEMTECH Kali Linux Lab"
echo "Current user: $(whoami)"
echo "Computer name: $(hostname)"
echo "Current folder: $(pwd)"
echo "Current date: $(date)"
```

Save and exit:

1. Press `Ctrl + O`.
2. Press `Enter`.
3. Press `Ctrl + X`.

Make the script executable:

```bash
chmod 750 my-first-script.sh
```

Run it:

```bash
./my-first-script.sh | tee script-output.txt
```

Meaning:

- `nano` edits a file.
- `chmod 750` allows the owner to run the script.
- `./my-first-script.sh` runs the script from the current folder.

## Step 15 - Check Basic Linux System Information

Run and save:

```bash
cat /etc/os-release | tee os-release.txt
uname -a | tee kernel-info.txt
id | tee user-id.txt
groups | tee groups.txt
```

Meaning:

- `/etc/os-release` identifies the Linux distribution.
- `uname -a` shows kernel information.
- `id` shows user and group IDs.
- `groups` shows group membership.

## Step 16 - Package the Evidence

List the evidence:

```bash
ls -l ~/femtech-evidence/kali-intro-lab
```

Create hashes:

```bash
cd ~/femtech-evidence/kali-intro-lab
sha256sum * > hashes.sha256
cat hashes.sha256
```

Hashing helps prove that files were not changed after submission.

## Student Questions

Answer in your own words:

1. What is VirtualBox used for?
2. What is Kali Linux?
3. What is the terminal?
4. What does `pwd` show?
5. What does `ls` do?
6. What is the difference between `>` and `>>`?
7. What does `cat` do?
8. What is a Linux path?
9. What does `sudo` mean?
10. Why should beginners avoid running unknown commands with `sudo`?
11. What is a Bash variable?
12. What does a loop help you do?
13. What does `chmod` change?
14. Why do cybersecurity students need to save evidence?
15. Why are file hashes useful?

## Troubleshooting

| Problem | Simple fix |
|---|---|
| Kali does not start | Ask the instructor to check VirtualBox settings |
| Keyboard not typing correctly | Check keyboard layout in Kali settings |
| Command not found | Check spelling and spaces |
| Permission denied running script | Run `chmod 750 my-first-script.sh` |
| `nano` feels confusing | Use `Ctrl + O`, `Enter`, then `Ctrl + X` |
| File is empty | Check whether `>` overwrote it |
| Cannot find folder | Run `pwd`, then `ls` |

## Deliverables

Submit the `~/femtech-evidence/kali-intro-lab` folder containing:

- `current-user.txt`
- `hostname.txt`
- `date.txt`
- `current-folder.txt`
- `lab-title.txt`
- `student-name.txt`
- `lab-name.txt`
- `completed-time.txt`
- `evidence-review.txt`
- `my-first-script.sh`
- `script-output.txt`
- `os-release.txt`
- `kernel-info.txt`
- `user-id.txt`
- `groups.txt`
- `hashes.sha256`
- Written answers to the student questions.

## Pass Condition

The student passes when they can open Kali in VirtualBox, use the Linux terminal, create folders and files, read file contents, explain simple permissions, use beginner Bash variables and loops, run a simple script, and save evidence.
