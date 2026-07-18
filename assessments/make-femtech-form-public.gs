function makeFemtechFormPublic() {
  const form = FormApp.openById('YOUR_GOOGLE_FORM_ID');

  form.setTitle('FEMTECH INFORMATION TECHNOLOGY INSTITUTE\nCYBERSECURITY EXAM MCQ');
  form.setDescription('30-question basic cybersecurity exam based on FEMTECH course notes.');
  form.setAcceptingResponses(true);
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  try {
    form.setRequireLogin(false);
  } catch (error) {
    Logger.log('Require-login setting could not be changed in this account: ' + error);
  }

  Logger.log('FEMTECH form public response settings updated.');
  Logger.log('Accepting responses: ' + form.isAcceptingResponses());
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Student URL: ' + form.getPublishedUrl());
}
