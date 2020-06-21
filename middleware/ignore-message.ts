/*------------------
   IGNORE MESSAGE
  Middleware to
  ignore messages of
  specific subtypes
------------------*/

const ignoreMsg = async function ({ message, next }) {
  const disallowedSubtypes = ['channel_topic', 'message_changed'];
  // !message allows lack of message, such as bot events like reminders
  if (!message || (message && disallowedSubtypes.indexOf(message.subtype) > -1)) {
    await next();
  }
}

export default ignoreMsg;
