const config = require('../../config');
const request = require('request-promise-native');

class PeopleService {
  async index() {
    const options = {
      uri: 'https://api.salesloft.com/v2/people.json',
      json: true,
      headers: {
        Authorization: `Bearer ${config.salesLoftKey}`,
      },
    };
    try {
      const response = await request(options);
      return response.data;
    } catch (e) {
      // real logging would go here
      console.error(e);
      throw new Error(`Error accessing SalesLoft api.`);
    }
  }
}

module.exports = PeopleService;
