/*------------------
GENERAL TYPE INTERFACES
------------------*/

/**
 * @interface IObjectAny An object with any properties
 */
interface IObjectAny {
  [key: string]: any;
}

/**
 * @interface ISlackUserData User profile data
 */
interface ISlackUserData {
  name: string;
  email: string;
  image: string;
};

/**
 * Exports
 */
export { IObjectAny, ISlackUserData };
