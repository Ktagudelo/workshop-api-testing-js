require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';
const userRepo = 'Ktagudelo';
const userFollow = 'aperdomob';
describe('GitHub Following User aperdomob', () => {
  it('Consume PUT GitHub Following User aperdomob', async () => {
    const response = await axios.put(
      `${urlBase}/user/following/${userFollow}`,
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });

  it('Consume GET Service GitHub List Followers', async () => {
    const response = await axios.get(`${urlBase}/users/${userRepo}/followers`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(response.status).to.equal(StatusCodes.OK);
  });
});
