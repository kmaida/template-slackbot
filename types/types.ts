/**
 * An object with any properties
 */
export interface ObjectAny {
  [key: string]: any;
}

/**
 * Airtable data object
 */
export interface ATData {
  id?: string;
  name: string;
  url: string;
  notes: string;
  slackID: string;
  link?: string;
}
