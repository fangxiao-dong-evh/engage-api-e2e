'use strict';

const pfyHttps = require('../lib/promisifiedhttps');

async function getBearerToken() {
    const responseBody = (await pfyHttps(
        {
            method: 'POST',
            path: 'token',
            payload: {
                'email': 'asmith@email.com',
                'password': 'Qwer1234'
            }
        }
    )).content;
    const token = JSON.parse(responseBody).data.token;
    return token;
}

// test generating bearer token
// (async () => {
//     console.log(await getBearerToken());
// })();

module.exports = getBearerToken;