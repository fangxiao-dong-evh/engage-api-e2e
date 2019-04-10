'use strict';

const {pfyHttps} = require('../lib/promisifiedhttps');
const test = require('ava');

test('foo bar is foo bar', async t => {
    t.is(1,1);
    await pfyHttps({});
});