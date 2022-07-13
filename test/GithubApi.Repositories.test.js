require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
const repositories = 'repos';
const repoAperdomob = 'jasmine-json-report';

describe('GitHub User aperdomob', () => {
  it('Consume GET GitHub User aperdomob', async () => {
    const response = await axios.get(`${urlBase}/users/${githubUserName}`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.name).to.equal('Alejandro Perdomo');
    expect(response.data.company).to.equal('Perficient Latam');
    expect(response.data.location).to.equal('Colombia');
  });

  it('Consume GET GitHub User apperdomob Repositories List', async () => {
    const response = await axios.get(
      `${urlBase}/users/${githubUserName}/${repositories}`
    );

    const repoJasmine = response.data.find(
      (element) => element.name === 'jasmine-json-report'
    );

    expect(response.status).to.equal(StatusCodes.OK);
    expect(repoJasmine.name).to.equal('jasmine-json-report');
    expect(repoJasmine.private).to.equal(false);
    expect(repoJasmine.description).to.equal('A Simple Jasmine JSON Report');
  });

  it('Consume GET GitHub Download Repo jasmine-json-report', async () => {
    const response = await axios.get(
      `${urlBase}/${repositories}/${githubUserName}/${repoAperdomob}/zipball/master`
    );
    expect(response.status).to.equal(StatusCodes.OK);
  });

  it('Consume GET GitHub Repositoy aperdomob Find README', async () => {
    const response = await axios.get(
      `${urlBase}/${repositories}/${githubUserName}/${repoAperdomob}/readme`
    );

    expect(response.status).to.containSubset(StatusCodes.OK);
    expect(response.data.name).to.containSubset('README.md');
    expect(response.data.path).to.containSubset('README.md');
    expect(response.data.sha).to.containSubset(
      '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
    );
  });
});
