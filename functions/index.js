const functions = require('firebase-functions');
const twilio = require('twilio');
const xray = require('x-ray');
const makeDriver = require('request-x-ray');

const councils = require('./councils');

const day = 24*60*60*1000;

const firebaseConfig = functions.config();
const client = new twilio(
  firebaseConfig.twilio.sid,
  firebaseConfig.twilio.token
);

const our_number = firebaseConfig.twilio.number;

/* Change this if you want to use a company other than twilio for SMS */
const sendMessage = (to, date, times, type) => {
  client.messages.create({
    body: `Your next bin collection date is ${new Date(date).toDateString()} between ${times}\nPlease put out your ${type} bin out.`,
    to,
    from: our_number
  });
}


exports.httpBinDates = functions.https.onRequest((req, res) => {
  const { council, period, number } = req.body;
  let resp = {}
  councils[council](req.body).then((result) => {
    /* Check if the period is right. */
    resp = result;
    if (resp == {}) {
      res.send({});
    }
    if (result['date'] <= (Date.now()+(period || 1)*day)) {
      sendMessage(number, result['date'], result['times'], result['type'])
      resp['sms'] = true;
    }
    res.send(resp);
  });
});

/* IMPLEMENT LATER
 * 
exports.scheduled = functions.pubsub
  .scheduled('')
  .timezone('Europe/London')
  .onRun((context) => {

})
*/
