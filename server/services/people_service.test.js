const request = require('request-promise-native');
const PeopleService = require('./people_service');
let peopleService;

jest.mock('request-promise-native');

describe('people service', () => {
  beforeEach(() => {
    peopleService = new PeopleService();
  });
  it('should return all people', async () => {
    const response = {
      firstName: 'Bruce',
      lastName: 'Kellerman',
    };

    request.mockImplementation(() => {
      return response;
    });

    const people = await peopleService.index();
    expect(people).toEqual(response);
  });

  it('should give user friendly error when api fails', async () => {
    request.mockImplementation(() => {
      throw new Error('KABOOM');
    });

    try {
      await peopleService.index();
    } catch (e) {
      expect(e.message).toEqual('Error accessing SalesLoft api.');
    }
  });
});
