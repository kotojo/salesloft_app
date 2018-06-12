import React from 'react';
import { shallow } from 'enzyme';
import Duplicates, { getSimilarEmails } from './Duplicates';

describe('Duplicates', () => {
  it('should render without crashing', () => {
    shallow(<Duplicates email={['bruce@kellerman.com']} />);
  });

  it('shows a difference of 1 correctly', () => {
    expect(getSimilarEmails(['a@a.com', 'a@b.com'])).toEqual([{ emails: 'a@a.com a@b.com', differenceValue: 1 }]);
  });

  it('has a row for each value within 10 of the same email', () => {
    const mockEmails = ['aaaa@aaaa.com', 'bbbb@bbbb.com', 'cccc@cccc.com', 'dddd@dddd.net'];
    expect(getSimilarEmails(mockEmails)).toEqual([
      { emails: 'aaaa@aaaa.com bbbb@bbbb.com', differenceValue: 8 },
      { emails: 'aaaa@aaaa.com cccc@cccc.com', differenceValue: 8 },
      { emails: 'bbbb@bbbb.com cccc@cccc.com', differenceValue: 8 },
    ]);
  });

  it('renders a new line for each similar email', () => {
    const wrapper = shallow(
      <Duplicates emails={['aaaa@aaaa.com', 'bbbb@bbbb.com', 'cccc@cccc.com', 'dddd@dddd.net']} />
    );
    expect(wrapper.find('ul').children()).toHaveLength(3);
  });
});
