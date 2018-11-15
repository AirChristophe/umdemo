let API_URL = 'http://um.georacing.com';
let var1 = '';
let var2 = '';


switch (process.env.NODE_ENV) {
  case 'development':
    var1 = 'AAAAA';
    var2 = 'BBBBB';
    break;
  default:
  var1 = 'CCCCC';
  var2 = 'DDDDD';
}

export default {
    API_URL: API_URL,
};