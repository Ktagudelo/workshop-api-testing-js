require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const urlBase = 'https://api.github.com';
const githubUserName = 'Ktagudelo';

const searchGist = async () => {
  const response = await axios.get(`${urlBase}/users/${githubUserName}/gists`, {
    headers: {
      Authorization: `token ${process.env.ACCESS_TOKEN}`
    }
  });

  const search = response.data.find(
    (element) => element.description === 'Example of a gist'
  );
  return search.id;
};

describe('GitHub User Create And Delete Gist', () => {
  it('Consume POST GitHub User Create Gist', async () => {
    const responseGist = await axios.post(
      `${urlBase}/gists`,
      {
        description: 'Example of a gist',
        public: false,
        files: {
          'README.md': {
            content: 'First Gist'
          }
        }
      },
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(responseGist.status).to.containSubset(StatusCodes.CREATED);
  });

  it('Consume GET GitHub User List Gist', async () => {
    const responseGetGist = await axios.get(
      `${urlBase}/users/${githubUserName}/gists`,
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(responseGetGist.status).to.containSubset(StatusCodes.OK);
  });

  it('Consume DELETE GitHub User Gist', async () => {
    const GIST_ID = await searchGist();

    const responseDelGist = await axios.delete(`${urlBase}/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(responseDelGist.status).to.containSubset(StatusCodes.NO_CONTENT);
  });
});
