/*------------------
       UTILS
------------------*/

const utils = {
  /*--
  Is the string a valid URL?
  @param: {string} input value
  @return: {boolean} valid URL
  --*/
  validUrl(input: string) {
    const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
    const regex = new RegExp(regexRaw);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /*--
  Does an object have properties?
  @param: {object} object to test if empty
  @return: {boolean} is the object empty or not?
  --*/
  objNotEmpty(obj: {[key: string]: any}) {
    return obj && Object.keys(obj).length && obj.constructor === Object;
  },
  /*--
  Clear newlines
  Set newline values to undefined instead
  @param: {string} text to test for newline
  @return: {string} same input OR undefined if only newline
  --*/
  clearNewline(input: string) {
    if (input === '\n') {
      return undefined;
    } else {
      return input;
    }
  }
};

export default utils;
