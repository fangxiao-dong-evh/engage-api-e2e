'use strict'

const https = require('https');
const {promisify} = require('util');

https.request[promisify.custom] = ({method = 'GET', path, isIOS = false, type = 'json', payload = ''}) => {
    let options = {};

    options.hostname = 'qa-mobile.myidentifi.com';
    options.path = `/Identifiengage/${path}`;
    
    if (method === 'POST') {
        options.method = 'POST';
    }
    else if (method === 'PUT') {
        options.method = 'PUT';
    }
    else if (method === 'DELETE') {
        options.metnod = 'DELETE';
    }
    else {
        options.method = method;
    }

    const contentType = (type === 'form') ? 'application/x-www-form-urlencoded' : 'application/json';

    return new Promise((resolve, reject) => {
        let req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let content = '';

            res.on('data', (d) => {
                content += d;
            });

            res.on('end', () => {
                resolve({statusCode: res.statusCode, content, responseHeaders: res.headers});
            });           
        });

        req.on('error', (e) => {
            reject(`Promise is rejected due to ${e}`);
        });

        if (isIOS) {
            req.setHeader('User-Agent', 'Engage/1 iPhone8,2 iOS/11_1 CFNetwork/808.3 Darwin/16.3.0');
        } else {
            req.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36');
        }

        if ((options.method === 'POST') || (options.method === 'PUT')) {
            req.setHeader('Content-Type', contentType);
            const postData = JSON.stringify(payload);
            req.setHeader('Content-Length', Buffer.byteLength(postData));
            req.write(postData);
        }

        req.end();
    })
};

const pfyHttps = promisify(https.request);

module.exports = pfyHttps;