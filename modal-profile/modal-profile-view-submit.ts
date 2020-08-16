import { IObjectAny } from '../utils/types';
import { IProfile } from './profile.interface';
import { validUrl, objNotEmpty, emailIsh } from '../utils/utils';
import { saveData } from './data/data-profile-airtable';
import { slackErr } from '../utils/errors';

/*------------------
  MODAL VIEW SUBMIT
------------------*/

const submitModalProfile = (app: IObjectAny): void => {
  // Modal view submitted
  app.view('add_profile', async ({ ack, body, view }) => {
    const userID: string = body.user.id;
    const metadata: IObjectAny = view.private_metadata ? JSON.parse(view.private_metadata) : {};
    console.log('Metadata received from modal form:', metadata);
    const payload: IObjectAny = view.state.values;
    // Capture data from modal interactions
    // Modal blocks data format: payload.[block_id].[action_id].value
    const data: IProfile = {
      name: payload.b_name.a_name.value,
      image: metadata.userData.image,
      email: payload.b_email.a_email.value,
      url: payload.b_url.a_url.value,
      bio: payload.b_bio.a_bio.value || '',
      slackID: userID
    };
    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    const ackParams: IObjectAny = {
      response_action: 'errors',
      errors: {}
    };
    if (!validUrl(data.url)) {
      ackParams.errors.b_url = 'Please provide a valid URL.';
    }
    if (!emailIsh(data.email)) {
      ackParams.errors.b_email = 'Please provide a valid email address.';
    }
    if (objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();
    // Save data to Airtable
    try {
      const saveToAirtable: IProfile = await saveData(app, data);
    }
    catch (err) {
      slackErr(app, userID, err);
    }
  });
};

export { submitModalProfile };
