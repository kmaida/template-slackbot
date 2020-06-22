/*------------------
   IGNORE MESSAGE
  Middleware to
  ignore messages of
  specific subtypes
------------------*/

const ignoreMsg = async function ({ message, next }) {
  const disallowedSubtypes: string[] = ['channel_topic', 'message_changed'];
  // !message allows lack of message, such as bot events like reminders
  // @TODO: there is currently a bug where ALL app mentions return undefined as message in listener middleware
  // https://github.com/kmaida/gatsby-speakerbot/issues/7
  // There is a workaround for this in place using utils
  console.log('ignoreMsg middleware:', message);
  if (!message || (message && disallowedSubtypes.indexOf(message.subtype) > -1)) {
    await next();
  }
}

export default ignoreMsg;
