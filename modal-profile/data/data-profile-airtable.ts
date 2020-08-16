const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_TABLE_VIEW_ID;
import { IObjectAny } from '../../utils/types';
import { IProfile } from '../profile.interface';
import { storeErr } from '../../utils/errors';
import { dmConfirmSave } from '../dm-confirm-save-profile';
import { channelPublishSave } from '../channel-publish-save-profile';

/*------------------
  AIRTABLE: TABLE
------------------*/

/**
 * Save a new Airtable data record
 * @param {IObjectAny} App Slack app
 * @param {IProfile} data to save to Airtable
 * @return {Promise<IProfile>} promise resolving with saved object
 */
const saveData = async (app: IObjectAny, data: IProfile): Promise<IProfile> => {
  return base(table).create([
    {
      "fields": {
        "Name": data.name,
        "Image": data.image,
        "Email": data.email,
        "URL": data.url,
        "Bio": data.bio || '',
        "Slack ID": data.slackID
      }
    }
  ], (err: string, records: IObjectAny) => {
    if (err) {
      storeErr(err);
    }
    const savedRecord: IObjectAny = records[0];
    const savedID: string = savedRecord.getId();
    const savedObj: IProfile = {
      id: savedID,
      name: savedRecord.fields["Name"],
      image: savedRecord.fields["Image"],
      email: savedRecord.fields["Email"],
      url: savedRecord.fields["URL"],
      bio: savedRecord.fields["Bio"] || '',
      slackID: savedRecord.fields["Slack ID"],
      link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
    };
    console.log('AIRTABLE: Saved new record', savedObj);
    // Send Slack DM to submitter confirming successful save
    dmConfirmSave(app, savedObj);
    // Send Slack channel message
    channelPublishSave(app, savedObj);
    // @NOTE: If you want to update home view: need to have passed user's app home view ID
    return savedObj;
  });
}

export { saveData };
