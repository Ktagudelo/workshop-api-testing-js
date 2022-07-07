const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

const url = 'https://httpbin.org/ip';

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get(url);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/headers');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property('server');
  });

  it('Consume PUT Service with query parameters', async () => {
    const payload = {
      id: 1,
      name: 'Maria',
      age: '31',
      city: 'Medellin'
    };

    const response = await axios.put('https://httpbin.org/put?id=1', payload);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property('name');
    expect(response.data.json).to.have.property('age');
    expect(response.data.json).to.have.property('city');
    expect(response.data.json.id).equal(1);
  });

  it('Consume PATCH Service with query parameters', async () => {
    const payload = {
      id: 2,
      city: 'Londres'
    };

    const response = await axios.patch('https://httpbin.org/patch?id=2', payload);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.have.property('city');
    expect(response.data.json.id).equal(2);
  });

  it('Consume DELETE Service an existing data', async () => {
    const payload = {
      id: 3
    };

    const response = await axios.delete('https://httpbin.org/delete', payload);
    expect(response.status).to.equal(StatusCodes.OK);
  });
});
