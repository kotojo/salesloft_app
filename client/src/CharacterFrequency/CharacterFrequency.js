import React from 'react';
import { mergeWith, orderBy } from 'lodash';

export const getCharacterFrequency = emails => {
  const character_map = emails.reduce((acc, email) => {
    // get count of all characters in individual email
    const emailCharCounts = email.split('').reduce((emailAcc, char) => {
      return {
        ...emailAcc,
        [char]: (emailAcc[char] || 0) + 1,
      };
    }, {});

    // combine that with the rest of the character counts
    return mergeWith(acc, emailCharCounts, (valOne, valTwo) => {
      return (valOne || 0) + (valTwo || 0);
    });
  }, {});

  return orderBy(
    Object.keys(character_map).map(char => {
      return { char, count: character_map[char] };
    }),
    'count',
    'desc'
  );
};

export default ({ emails }) => {
  const sortedCharacters = getCharacterFrequency(emails);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h3>Characters by frequency of occurance</h3>
          </th>
        </tr>
        <tr>
          <th>Character</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sortedCharacters.map(char => {
          return (
            <tr key={char.char}>
              <td>{char.char}</td>
              <td>{char.count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
