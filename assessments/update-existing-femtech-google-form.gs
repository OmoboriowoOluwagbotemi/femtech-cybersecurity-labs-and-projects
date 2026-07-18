function updateExistingFemtechQuiz() {
  const form = FormApp.openById('YOUR_GOOGLE_FORM_ID');
  form.setTitle('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setIsQuiz(true);

  const updates = [
    {
      q: '25. What is SSH mainly used for?',
      options: ['Securely connecting to a remote server', 'Creating a spreadsheet', 'Printing documents', 'Charging a laptop'],
      answer: 'Securely connecting to a remote server'
    },
    {
      q: '26. Which SSH setting should usually be disabled for better security?',
      options: ['Direct root login', 'Strong passwords', 'Logging', 'Encryption'],
      answer: 'Direct root login'
    },
    {
      q: '27. Before changing SSH settings, what should an administrator do?',
      options: ['Test that another safe login method works', 'Delete all users', 'Turn off the firewall', 'Remove all logs'],
      answer: 'Test that another safe login method works'
    },
    {
      q: '28. What is UFW used for on Linux?',
      options: ['Managing host firewall rules', 'Editing pictures', 'Creating user passwords only', 'Reading email'],
      answer: 'Managing host firewall rules'
    },
    {
      q: '29. In Linux file permissions, what does read permission allow on a file?',
      options: ['Viewing the file contents', 'Deleting the operating system', 'Changing the file owner automatically', 'Blocking all network traffic'],
      answer: 'Viewing the file contents'
    },
    {
      q: '30. Why is chmod 777 usually unsafe?',
      options: ['It encrypts the file', 'It grants broad read, write, and execute permissions to owner, group, and others', 'It disables the Linux kernel', 'It validates SSH configuration'],
      answer: 'It grants broad read, write, and execute permissions to owner, group, and others'
    }
  ];

  const items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  updates.forEach((question, offset) => {
    const item = items[24 + offset].asMultipleChoiceItem();
    item.setTitle(question.q);
    item.setRequired(true);
    item.setPoints(1);
    item.setChoices(question.options.map(option => item.createChoice(option, option === question.answer)));
  });

  Logger.log('Updated quiz title and questions 25-30.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}
