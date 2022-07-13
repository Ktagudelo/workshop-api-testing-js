require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';
const githubUserName = 'Ktagudelo';
const repositories = 'repos';
const repositoryName = 'Proyecto-marvel';

describe('GitHub User Create And Modify Issue With A Title', () => {
  it('Consume GET GitHub User Logged', async () => {
    const response = await axios.get(`${urlBase}/user`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });

    if (response.data.public_repos > 1) {
      expect(response.status).to.equal(StatusCodes.OK);
    }
  });

  it('Consume GET GitHub User Repositories list', async () => {
    const response = await axios.get(
      `${urlBase}/users/${githubUserName}/${repositories}`
    );
    const reposUser = response.data.find(
      (element) => element.name === 'Proyecto-marvel'
    );

    expect(response.status).to.equal(StatusCodes.OK);
    expect(reposUser.owner.login).to.equal(githubUserName);
    expect(reposUser.name).to.equal('Proyecto-marvel');
  });

  it('Consume POST GitHub User Create Issue', async () => {
    const responseIssue = await axios.post(
      `${urlBase}/${repositories}/${githubUserName}/${repositoryName}/issues`,
      {
        title: 'Found a Super Hero'
      },
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(responseIssue.status).to.equal(StatusCodes.CREATED);
  });

  it('Consume PATCH GitHub User Modify Issue', async () => {
    const responseGetAllIssue = await axios.get(
      `${urlBase}/${repositories}/${githubUserName}/${repositoryName}/issues`,
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(responseGetAllIssue.status).to.equal(StatusCodes.OK);

    const issueNumber = 1;
    const responseGetIssue = await axios.patch(
      `${urlBase}/${repositories}/${githubUserName}/${repositoryName}/issues/${issueNumber}`,
      {
        body: 'I am having a problem with my super heroe'
      },
      {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    expect(responseGetIssue.status).to.equal(StatusCodes.OK);
  });
});
