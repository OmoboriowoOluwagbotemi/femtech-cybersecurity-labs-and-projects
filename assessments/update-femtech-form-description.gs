function updateFemtechFormDescription() {
  const form = FormApp.openById('YOUR_GOOGLE_FORM_ID');
  form.setTitle('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setDescription('30-question basic cybersecurity exam based on FEMTECH course notes.');
  Logger.log('Updated FEMTECH exam title and description.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}
