import React from 'react';

export default ({ people }) => (
  <table>
    <thead>
      <tr>
        <th>
          <h3>My People</h3>
        </th>
      </tr>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => {
        const fullName = `${person.first_name} ${person.last_name}`;
        return (
          <tr key={fullName}>
            <td>{fullName}</td>
            <td>{person.email_address}</td>
            <td>{person.title}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
