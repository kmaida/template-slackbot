/**
 * @interface IObjectAny An object with any properties
 */
export interface IObjectAny {
  [key: string]: any;
}

/**
 * @interface IATData Airtable data object
 */
export interface IATData {
  id?: string;
  name: string;
  url: string;
  notes: string;
  slackID: string;
  link?: string;
}
