'use strict';

const pfyHttps = require('../lib/promisifiedhttps');
const getBearerToken = require('../lib/getbearertoken');
const test = require('ava');

let bearerToken;

test.before(async t => {
    bearerToken = await getBearerToken();
});

test('Should return 200 for a patient not on Engaged Mobile app', async t => {

    let result = await pfyHttps({path: 'sms', method: 'POST', bearerToken, payload: {
            'clientId': 54,
            'patientId': 3380158,
            'phoneNumber': "8595597926",
            'patientName': "API Test Recipient"
        }
    });
    
    t.is(result.statusCode, 500);
});

test('Should return 500 for a patient already on Engaged Mobile app', async t => {

    let result = await pfyHttps({path: 'sms', method: 'POST', bearerToken, payload: {
            'clientId': 54,
            'patientId': 6133323,
            'phoneNumber': "8595597926",
            'patientName': "API Test Recipient"
        }
    });
    
    t.is(result.statusCode, 200);
});

test('Android - Redirect to Google Play', async t => {
    let result = await pfyHttps({path: 'appstoreredirect', isIOS: false});
    
    t.is(result.statusCode, 302);

    t.is(result.responseHeaders.location, 'https://play.google.com/store/apps/details?id=com.myidentifi.engage');
});

test('iOS - Redirect to iTune', async t => {
    let result = await pfyHttps({path: 'appstoreredirect', isIOS: true});
    
    t.is(result.statusCode, 302);

    t.is(result.responseHeaders.location, 'https://itunes.apple.com/us/app/identifi-engage/id1239920478?mt=8');
});