import React from 'react';
import leven from 'leven';
import { flatMap } from 'lodash';

export const getSimilarEmails = emails => {
  // get every combo of values in array and compare them using the Levenshtein distance algorithm
  // https://en.wikipedia.org/wiki/Levenshtein_distance
  // just change the value for filtering to make it more or less strict for what it considers duplicates
  return flatMap(emails, (email, index) => {
    return emails.slice(index + 1).map(e => {
      return {
        emails: `${email} ${e}`,
        differenceValue: leven(email, e),
      };
    });
  }).filter(pair => pair.differenceValue < 10);
};

export default ({ emails }) => {
  const similarEmails = getSimilarEmails(emails);
  return (
    <div>
      <h1>Similar Emails</h1>
      {similarEmails.length === 0 && <p>No possible duplicate emails founds.</p>}
      <ul>{similarEmails.map(e => <li key={e.emails}>{e.emails}</li>)}</ul>
    </div>
  );
};
