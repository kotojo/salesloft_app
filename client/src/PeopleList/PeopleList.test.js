import React from 'react';
import { shallow } from 'enzyme';
import PeopleList from './PeopleList';

const mockPeople = [
  {
    first_name: 'Bruce',
    last_name: 'Kellerman',
    email_address: 'bruce@kellerman.com',
    title: 'Archduke of Computering',
  },
  {
    first_name: 'Linus',
    last_name: 'Torvalds',
    email_address: 'linus@torvalds.com',
    title: 'The Hulk Hogan of Kernal Development',
  },
];

describe('PeopleList', () => {
  it('renders without crashing', () => {
    shallow(<PeopleList people={[]} />);
  });

  it('renders one row per person', () => {
    const wrapper = shallow(<PeopleList people={mockPeople} />);
    expect(wrapper.find('tbody').children()).toHaveLength(2);
  });

  it('combines first and last names for the name column', () => {
    const wrapper = shallow(<PeopleList people={mockPeople} />);
    expect(
      wrapper
        .find('tbody')
        .childAt(0)
        .childAt(0)
        .text()
    ).toBe('Bruce Kellerman');
  });

  it('renders email as second column', () => {
    const wrapper = shallow(<PeopleList people={mockPeople} />);
    expect(
      wrapper
        .find('tbody')
        .childAt(0)
        .childAt(1)
        .text()
    ).toBe('bruce@kellerman.com');
  });

  it('renders title as third column', () => {
    const wrapper = shallow(<PeopleList people={mockPeople} />);
    expect(
      wrapper
        .find('tbody')
        .childAt(0)
        .childAt(2)
        .text()
    ).toBe('Archduke of Computering');
  });
});
