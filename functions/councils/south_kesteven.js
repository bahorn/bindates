const xray = require('x-ray');
const makeDriver = require('request-x-ray');

/* xray driver to access */
const xrayDriver = (address) => { 
  const options = {
    method: 'POST',
    headers: {
      'User-Agent': "github.com/bahorn/bindates - submit an issue if you have any concerns" 
    },
    form: {
      address: address
    }
  }
  return makeDriver(options);
}


module.exports = async (params) => {
  const address = params.address;
  const number = params.number;

  const x = xray();
  x.driver(xrayDriver(address));

  return new Promise(resolve => {
    x('http://www.southkesteven.gov.uk/index.aspx?articleid=9248', '.icon--bin', ['p'])(
      (err, info) => {
        const date_str = info[0].split('Your next bin collection date is ')[1];
        let date = null;
        if (["Tomorrow"].includes(date_str)) {
          date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        } else {
          date = Date.Parse(date_str);
        }
        const type = info[1].split(' - ')[1];
        const times = info[2];
        /* Return an object in the standard format. */
        resolve({
          date,
          type,
          times,
        });
      }
    );
  });

};
