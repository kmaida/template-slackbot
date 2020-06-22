import { IObjectAny } from './../types';

/*------------------
       UTILS
------------------*/

const utils = {
  /**
   * Is the string a valid URL?
   * @param {string} input
   * @return {boolean}
   */
  validUrl(input: string): boolean {
    const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
    const regex = new RegExp(regexRaw);
    const cleanStr = input.toString().trim();
    return !!cleanStr.match(regex);
  },
  /**
   * Does an object have properties?
   * @param {IObjectAny} obj object to test if empty
   * @return {boolean} is the object empty or not?
   */
  objNotEmpty(obj: IObjectAny): boolean {
    return obj && Object.keys(obj).length && obj.constructor === Object;
  },
  /**
   * Clear newlines or set newline values to undefined instead
   * @param {string} input to return undefined if only newline
   * @return {string} return same input or undefined if only newline
   */
  clearNewline(input: string): string {
    if (input === '\n') {
      return undefined;
    } else {
      return input;
    }
  },
  /**
   * Should this message be ignored by the bot in mentions?
   * @param {string} subtype event mention subtype
   * @return {boolean} is the passed subtype disallowed?
   */
  ignoreMention(subtype: string): boolean {
    const disallowedSubtypes: string[] = ['channel_topic', 'message_changed'];
    return disallowedSubtypes.indexOf(subtype) > -1;
  }
};

export default utils;
