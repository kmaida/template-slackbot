/*------------------
       UTILS
------------------*/

const utils = {
  /*--
  Is the string a valid URL?
  @Param: input value (string)
  @Return: valid URL (boolean)
  --*/
  validUrl(input) {
    const regexRaw = /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g;
    const regex = new RegExp(regexRaw);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /*--
  Does an object have properties?
  @Param: object to test if empty (object)
  @Return: is the object empty or not? (boolean)
  --*/
  objNotEmpty(obj) {
    return obj && Object.keys(obj).length && obj.constructor === Object;
  },
  /*--
  Clear newlines
  Set newline values to undefined instead
  @Param: text to test for newline (string)
  @Return: same input OR undefined if only newline
  --*/
  clearNewline(input) {
    if (input === '\n') {
      return undefined;
    } else {
      return input;
    }
  }
};

module.exports = utils;
