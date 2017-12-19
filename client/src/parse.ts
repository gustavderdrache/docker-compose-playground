import Parse from 'parse';

Parse.serverURL = process.env.PARSE_SERVER_URL;

Parse.initialize(process.env.PARSE_APP_ID);

export default Parse;