'use strict';

const pfyHttps = require('../lib/promisifiedhttps');
const test = require('ava');

test.skip('iOS - Redirect to iTune', async t => {
    let result = await pfyHttps({path: 'appstoreredirect', isIOS: false});
    
    t.is(result.statusCode, 302);

    t.is(result.responseHeaders.Location, 'https://play.google.com/store/apps/details?id=com.myidentifi.engage');
});

test('Android - Redirect to Google Play', async t => {
    let result = await pfyHttps({path: 'appstoreredirect', isIOS: true});
    
    t.is(result.statusCode, 302);

    t.is(result.responseHeaders.location, 'https://itunes.apple.com/us/app/identifi-engage/id1239920478?mt=8');
});