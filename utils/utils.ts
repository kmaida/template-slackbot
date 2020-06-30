import { IObjectAny } from './../types';

/*------------------
       UTILS
------------------*/

/**
 * Is the string a valid URL?
 * @param {string} input
 * @return {boolean}
 */
const validUrl = (input: string): boolean => {
  const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
  const regex = new RegExp(regexRaw);
  const cleanStr = input.toString().trim();
  return !!cleanStr.match(regex);
}

/**
 * Does an object have properties?
 * @param {IObjectAny} obj object to test if empty
 * @return {boolean} is the object empty or not?
 */
const objNotEmpty = (obj: IObjectAny): boolean => {
  return obj && Object.keys(obj).length && obj.constructor === Object;
}

/**
 * Clear newlines or set newline values to undefined instead
 * @param {string} input to return undefined if only newline
 * @return {string} return same input or undefined if only newline
 */
const clearNewline = (input: string): string => {
  if (input === '\n') {
    return undefined;
  } else {
    return input;
  }
}

/**
 * Message middleware: ignore some kinds of messages
 * Ignore channel topic and edited message events
 * (e.g., link unfurling is an edit / message_changed subtype)
 * This has catches for inconsistencies in Slack API
 * @param {IObjectAny} event event object
 * @return {Promise<void>} continue if not ignored message type
 */
const ignoreMention = async ({ message, event, next }: IObjectAny): Promise<void> => {
  const disallowedSubtypes = ['channel_topic', 'message_changed'];
  const ignoreSubtypeEvent = disallowedSubtypes.indexOf(event.subtype) > -1;
  const ignoreSubtypeMessage = message && message.subtype && disallowedSubtypes.indexOf(message.subtype) > -1;
  const ignoreEdited = !!event.edited;
  // If mention should be ignored, return
  if (ignoreSubtypeEvent || ignoreSubtypeMessage || ignoreEdited) {
    return;
  }
  // If mention should be processed, continue
  await next();
}

export { validUrl, objNotEmpty, clearNewline, ignoreMention };
