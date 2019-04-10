'use strict'

const https = require('https');
const {promisify} = require('util');

https.request[promisify.custom] = ({method = 'GET', path, type = 'json', payload = ''} = {}) => {
    let options;

    options.hostname = 'https://qa-mobile.myidentifi.com';
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

    options.headers['Content-Type'] = (type === 'form') ? 'application/x-www-form-urlencoded' : 'application/json';

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

        if (options.method === 'POST') {
            const postData = JSON.stringify(payload);
            options.headers['Content-Length'] = Buffer.byteLength(postData);
            req.write(postData);
        }

        req.end();
    })
};

const pfyHttps = promisify(https.request);

module.exports = pfyHttps;