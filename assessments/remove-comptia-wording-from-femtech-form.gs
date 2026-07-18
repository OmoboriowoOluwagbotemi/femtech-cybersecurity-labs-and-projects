function removeComptiaWordingFromFemtechForm() {
  const form = FormApp.openById('YOUR_GOOGLE_FORM_ID');
  form.setTitle('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setDescription('30-question basic cybersecurity exam based on FEMTECH course notes.');

  const items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  items[6].asMultipleChoiceItem().setTitle('7. Which item is a security control category by nature?');
  items[7].asMultipleChoiceItem().setTitle('8. Which item is a security control function?');

  Logger.log('Removed CompTIA wording from FEMTECH form questions.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}
