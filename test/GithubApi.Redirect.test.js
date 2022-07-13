require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://github.com';
const userName = 'aperdomob';
const repoBase = 'redirect-test';

describe('GitHub User apperdomob Redirect Url', () => {
  it('Consume HEAD GitHub Redirect User aperdomob', async () => {
    const response = await axios.head(`${urlBase}/${userName}/${repoBase}`);
    // const redirect = response.redirect('/{userName}/{repoBase}');
    expect(response.status).to.equal(StatusCodes.OK);
  });

  it('Consume GET Service GitHub Redirect Url OK', async () => {
    const response = await axios.get(`${urlBase}/${userName}/${repoBase}`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(response.status).to.equal(StatusCodes.OK);
  });
});
