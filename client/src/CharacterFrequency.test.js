import React from 'react';
import { shallow } from 'enzyme';
import CharacterFrequency, { getCharacterFrequency } from './CharacterFrequency';

const mockEmails = ['bruce@kellerman.com', 'spock@enterprise.com'];

describe('CharacterFrequency', () => {
  it('renders without crashing', () => {
    shallow(<CharacterFrequency emails={mockEmails} />);
  });

  it('gets sorted unique characters in a single email', () => {
    const characterFrequency = getCharacterFrequency(['neil@young.com']);
    expect(characterFrequency).toEqual([
      { char: 'n', count: 2 },
      { char: 'o', count: 2 },
      { char: 'e', count: 1 },
      { char: 'i', count: 1 },
      { char: 'l', count: 1 },
      { char: '@', count: 1 },
      { char: 'y', count: 1 },
      { char: 'u', count: 1 },
      { char: 'g', count: 1 },
      { char: '.', count: 1 },
      { char: 'c', count: 1 },
      { char: 'm', count: 1 },
    ]);
  });

  it('gets sorted unique characters in multiple emails', () => {
    const characterFrequency = getCharacterFrequency(['bruce@wayne.com', 'alfred@pennyworth.com']);
    expect(characterFrequency).toEqual([
      { char: 'e', count: 4 },
      { char: 'r', count: 3 },
      { char: 'c', count: 3 },
      { char: 'n', count: 3 },
      { char: 'o', count: 3 },
      { char: '@', count: 2 },
      { char: 'w', count: 2 },
      { char: 'a', count: 2 },
      { char: 'y', count: 2 },
      { char: '.', count: 2 },
      { char: 'm', count: 2 },
      { char: 'b', count: 1 },
      { char: 'u', count: 1 },
      { char: 'l', count: 1 },
      { char: 'f', count: 1 },
      { char: 'd', count: 1 },
      { char: 'p', count: 1 },
      { char: 't', count: 1 },
      { char: 'h', count: 1 },
    ]);
  });

  it('displays all characters in given emails in table', () => {
    const wrapper = shallow(<CharacterFrequency emails={mockEmails} />);
    expect(wrapper.find('tbody').children()).toHaveLength(17);
  });
});
