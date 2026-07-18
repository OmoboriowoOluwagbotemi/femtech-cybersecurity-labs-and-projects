function createSecurityBasicsQuiz() {
  const form = FormApp.create('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setIsQuiz(true);
  form.setDescription('30-question basic cybersecurity exam based on FEMTECH course notes.');
  form.setCollectEmail(false);
  form.setShuffleQuestions(false);

  form.addTextItem()
    .setTitle('Name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Email')
    .setRequired(true);

  form.addDateItem()
    .setTitle('Date Exam Is Written')
    .setRequired(true);

  const questions = [
    {
      q: 'Which part of the CIA Triad protects information from unauthorized access or disclosure?',
      options: ['Availability', 'Confidentiality', 'Integrity', 'Recovery'],
      answer: 'Confidentiality'
    },
    {
      q: 'A hospital cannot access its electronic health record system during patient care. Which CIA principle is most affected?',
      options: ['Availability', 'Confidentiality', 'Integrity', 'Non-repudiation'],
      answer: 'Availability'
    },
    {
      q: 'A bank transaction record is changed without approval. Which CIA principle is most affected?',
      options: ['Availability', 'Confidentiality', 'Integrity', 'Deterrence'],
      answer: 'Integrity'
    },
    {
      q: 'What is a threat?',
      options: ['A safeguard that reduces risk', 'Anything that can cause harm to an asset, system, user, or organization', 'A confirmed security incident only', 'A patch installed on a server'],
      answer: 'Anything that can cause harm to an asset, system, user, or organization'
    },
    {
      q: 'What is a vulnerability?',
      options: ['A weakness that can be exploited by a threat', 'A backup copy of important data', 'A security policy approved by management', 'A successful recovery test'],
      answer: 'A weakness that can be exploited by a threat'
    },
    {
      q: 'Which example best represents risk?',
      options: ['A firewall rule', 'The possibility that phishing exploits lack of MFA and causes account takeover', 'A security awareness poster', 'A locked server-room door'],
      answer: 'The possibility that phishing exploits lack of MFA and causes account takeover'
    },
    {
      q: 'Which item is a security control category by nature?',
      options: ['Directive', 'Detective', 'Technical', 'Corrective'],
      answer: 'Technical'
    },
    {
      q: 'Which item is a security control function?',
      options: ['Operational', 'Managerial', 'Physical', 'Directive'],
      answer: 'Directive'
    },
    {
      q: 'Which control category is implemented through hardware, software, or automated technology?',
      options: ['Technical', 'Managerial', 'Physical', 'Operational'],
      answer: 'Technical'
    },
    {
      q: 'Which control category is mainly based on day-to-day people-driven procedures?',
      options: ['Technical', 'Operational', 'Physical', 'Cryptographic'],
      answer: 'Operational'
    },
    {
      q: 'Which control function identifies events that may have occurred?',
      options: ['Preventive', 'Detective', 'Compensating', 'Directive'],
      answer: 'Detective'
    },
    {
      q: 'Which is the best example of a directive control?',
      options: ['SIEM alert', 'Firewall rule', 'Acceptable use policy', 'Disk encryption'],
      answer: 'Acceptable use policy'
    },
    {
      q: 'What is defense in depth?',
      options: ['Using only one strong security product', 'Using multiple layers of controls so one failure does not expose the whole environment', 'Removing all monitoring tools', 'Allowing administrators to bypass security controls'],
      answer: 'Using multiple layers of controls so one failure does not expose the whole environment'
    },
    {
      q: 'What is attack surface?',
      options: ['Only systems already infected with malware', 'The total set of points where an attacker could enter, interact with, or exploit an environment', 'Only the firewall rule list', 'Only physical doors and windows'],
      answer: 'The total set of points where an attacker could enter, interact with, or exploit an environment'
    },
    {
      q: 'Which is the best example of reducing attack surface?',
      options: ['Exposing SSH to the whole internet', 'Disabling unused services and closing unnecessary ports', 'Giving all users administrator access', 'Removing log collection'],
      answer: 'Disabling unused services and closing unnecessary ports'
    },
    {
      q: 'What is malware?',
      options: ['Software designed to protect passwords', 'Malicious software designed to harm systems, steal data, disrupt operations, or support unauthorized access', 'A normal operating system update', 'A written security policy'],
      answer: 'Malicious software designed to harm systems, steal data, disrupt operations, or support unauthorized access'
    },
    {
      q: 'Which malware type encrypts or denies access to data and usually demands payment?',
      options: ['Ransomware', 'Spyware', 'Keylogger', 'Cryptominer'],
      answer: 'Ransomware'
    },
    {
      q: 'Which malware type disguises itself as legitimate or useful software?',
      options: ['Worm', 'Trojan', 'Rootkit', 'Wiper'],
      answer: 'Trojan'
    },
    {
      q: 'Which malware type can self-replicate across networks without direct user action?',
      options: ['Worm', 'Logic bomb', 'Trojan', 'Spyware'],
      answer: 'Worm'
    },
    {
      q: 'What is social engineering?',
      options: ['Manipulation intended to make a person reveal information or perform an unsafe action', 'Encrypting a hard drive', 'Installing a Linux package', 'Running a vulnerability scan'],
      answer: 'Manipulation intended to make a person reveal information or perform an unsafe action'
    },
    {
      q: 'What best describes phishing?',
      options: ['A deceptive message that tries to trick users into clicking, opening, paying, or sharing credentials', 'A firewall configuration standard', 'A backup validation process', 'A Linux permission mode'],
      answer: 'A deceptive message that tries to trick users into clicking, opening, paying, or sharing credentials'
    },
    {
      q: 'What best distinguishes spear phishing from general phishing?',
      options: ['Spear phishing is always sent by SMS', 'Spear phishing is tailored to a selected person, role, or organization', 'Spear phishing never uses links', 'Spear phishing cannot bypass email authentication'],
      answer: 'Spear phishing is tailored to a selected person, role, or organization'
    },
    {
      q: 'What is business email compromise commonly used to do?',
      options: ['Improve patch management', 'Divert payments, change payroll details, or request sensitive business data', 'Encrypt all network traffic', 'Validate SSH syntax'],
      answer: 'Divert payments, change payroll details, or request sensitive business data'
    },
    {
      q: 'After credential phishing and suspected session theft, what should defenders do?',
      options: ['Reset the password only', 'Revoke sessions and investigate account, mailbox, and endpoint activity', 'Ignore the report if MFA was enabled', 'Delete all logs'],
      answer: 'Revoke sessions and investigate account, mailbox, and endpoint activity'
    },
    {
      q: 'What is SSH mainly used for?',
      options: ['Securely connecting to a remote server', 'Creating a spreadsheet', 'Printing documents', 'Charging a laptop'],
      answer: 'Securely connecting to a remote server'
    },
    {
      q: 'Which SSH setting should usually be disabled for better security?',
      options: ['Direct root login', 'Strong passwords', 'Logging', 'Encryption'],
      answer: 'Direct root login'
    },
    {
      q: 'Before changing SSH settings, what should an administrator do?',
      options: ['Test that another safe login method works', 'Delete all users', 'Turn off the firewall', 'Remove all logs'],
      answer: 'Test that another safe login method works'
    },
    {
      q: 'What is UFW used for on Linux?',
      options: ['Managing host firewall rules', 'Editing pictures', 'Creating user passwords only', 'Reading email'],
      answer: 'Managing host firewall rules'
    },
    {
      q: 'In Linux file permissions, what does read permission allow on a file?',
      options: ['Viewing the file contents', 'Deleting the operating system', 'Changing the file owner automatically', 'Blocking all network traffic'],
      answer: 'Viewing the file contents'
    },
    {
      q: 'Why is chmod 777 usually unsafe?',
      options: ['It encrypts the file', 'It grants broad read, write, and execute permissions to owner, group, and others', 'It disables the Linux kernel', 'It validates SSH configuration'],
      answer: 'It grants broad read, write, and execute permissions to owner, group, and others'
    }
  ];

  questions.forEach((question, index) => {
    const item = form.addMultipleChoiceItem();
    item.setTitle((index + 1) + '. ' + question.q);
    item.setRequired(true);
    item.setPoints(1);
    item.setChoices(question.options.map(option => item.createChoice(option, option === question.answer)));
  });

  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}
