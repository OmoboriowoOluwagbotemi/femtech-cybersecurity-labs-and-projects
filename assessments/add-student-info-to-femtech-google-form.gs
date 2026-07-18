function addStudentInfoToFemtechQuiz() {
  const form = FormApp.openById('YOUR_GOOGLE_FORM_ID');
  form.setTitle('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setDescription('30-question basic cybersecurity exam based on FEMTECH course notes.');
  form.setCollectEmail(false);

  const textItems = form.getItems(FormApp.ItemType.TEXT);
  const dateItems = form.getItems(FormApp.ItemType.DATE);

  let nameItem = textItems.find(item => item.getTitle() === 'Name');
  nameItem = nameItem ? nameItem.asTextItem() : form.addTextItem().setTitle('Name');
  nameItem.setRequired(true);

  let emailItem = textItems.find(item => item.getTitle() === 'Email');
  emailItem = emailItem ? emailItem.asTextItem() : form.addTextItem().setTitle('Email');
  emailItem.setRequired(true);

  let examDateItem = dateItems.find(item => item.getTitle() === 'Date Exam Is Written');
  examDateItem = examDateItem ? examDateItem.asDateItem() : form.addDateItem().setTitle('Date Exam Is Written');
  examDateItem.setRequired(true);

  moveQuestionToIndex_(form, 'Name', 0);
  moveQuestionToIndex_(form, 'Email', 1);
  moveQuestionToIndex_(form, 'Date Exam Is Written', 2);

  Logger.log('Student information fields added or updated.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}

function moveQuestionToIndex_(form, title, targetIndex) {
  const item = form.getItems().find(formItem => formItem.getTitle() === title);
  if (item) {
    form.moveItem(item.getIndex(), targetIndex);
  }
}
