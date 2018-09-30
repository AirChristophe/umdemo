var api_key = 'a5d1a068-089b19d1';
var domain = 'sandboxcb52cd7b91d944489764c5df713ef8e2.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
export default mail = () => {
    console.log(111111);
    var data = {
        from: 'Excited User cyrille.duval@gmail.com',
        to: 'cyrille.duval@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
    };
    
    mailgun.messages().send(data, function (error, body) {
        console.log(22222);
        console.log(body);
    });
}