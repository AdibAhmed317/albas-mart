import React from 'react';

const LatestUsers = ({ users }) => (
  <div className='bg-white p-4 md:p-6 rounded-lg shadow-md'>
    <h2 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
      Latest Users
    </h2>
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='p-2 border text-left'>Name</th>
            <th className='p-2 border text-left'>Email</th>
            <th className='p-2 border text-left'>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className='p-2 border'>{user.name}</td>
              <td className='p-2 border'>{user.email}</td>
              <td className='p-2 border'>{user.joinedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LatestUsers;
