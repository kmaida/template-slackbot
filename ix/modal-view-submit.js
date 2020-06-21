const utils = require('./../utils/utils');
const errors = require('./../utils/errors');

/*------------------
  MODAL VIEW SUBMIT
------------------*/

const submitModal = (app, at) => {
  // Modal view submitted
  app.view('add_airtable_data', async ({ ack, body, view }) => {
    const userID = body.user.id;
    const metadata = view.private_metadata ? JSON.parse(view.private_metadata) : {};
    const payload = view.state.values;
    // Capture data from modal interactions
    // Modal blocks data format: payload.[block_id].[action_id].value
    const data = {
      name: payload.b_name.a_name.value,
      url: payload.b_url.a_url.value,
      notes: payload.b_notes.a_notes.value || '',
      slackID: userID
    };
    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    let ackParams = { 
      response_action: 'errors',
      errors: {}
    };
    if (!utils.validUrl(data.url.toString())) {
      ackParams.errors.b_url = 'Please provide a valid URL.';
    }
    if (utils.objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();
    // Save data to Airtable
    try {
      const saveData = await at.saveData(app, data);
    }
    catch (err) {
      errors.slackErr(app, userID, err);
    }
  });
};

module.exports = submitModal;
