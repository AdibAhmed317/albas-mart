// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/navbar/navbar';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import { Link } from 'react-router-dom';
// import { publicRequest, userRequest } from '../../network/request-method';

// const AdminDashboard = () => {
//   const [data, setData] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const res = await userRequest.get('user/');
//       setData(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const res = await publicRequest.get(`user/find/${searchId}`);
//       setSearchResult(res.data);
//     } catch (error) {
//       console.log(error);
//       setSearchResult(null);
//     }
//   };

//   function formatDateString(timestamp) {
//     const date = new Date(timestamp);

//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');

//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;

//     return `${day}-${month}-${year} (${formattedHours}:${minutes} ${ampm})`;
//   }

//   return (
//     <>
//       <Navbar />
//       <AdminSidebar />

//       <div className='bg-green-50 overflow-x-auto text-center px-10 py-2 md:min-h-[80vh]'>
//         <h1 className='text-2xl font-normal text-green-900 mb-4'>
//           Search user
//         </h1>
//         <div className='mb-4'>
//           <input
//             type='text'
//             placeholder='Search by ID'
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className='border border-gray-300 rounded px-4 py-2'
//           />
//           <button
//             onClick={handleSearch}
//             className='bg-green-300 text-green-800 font-medium px-4 py-2 rounded ml-2'
//           >
//             Search
//           </button>
//         </div>
//         {searchResult ? (
//           <div className='bg-white p-4 rounded shadow-md mb-10 text-green-900'>
//             <h2 className='text-xl font-bold mb-2'>{searchResult.Name}</h2>
//             <p>
//               <b>Email:</b> {searchResult.Email}
//             </p>
//             <p>
//               <b>Phone:</b> {searchResult.Phone}
//             </p>
//           </div>
//         ) : (
//           <p></p>
//         )}
//         <h1 className='text-2xl text-green-900 mb-4'>All Users</h1>
//         <table className='overflow-hidden w-full rounded-t-md'>
//           <thead className='bg-green-200 text-green-900'>
//             <tr>
//               <th className='py-3 px-4 font-semibold text-sm'>User ID</th>
//               <th className='py-3 px-4 font-semibold text-sm'>Name</th>
//               <th className='py-3 px-4 font-semibold text-sm'>Joining Date</th>
//               <th className='py-3 px-4 font-semibold text-sm'>Email</th>
//               <th className='py-3 px-4 font-semibold text-sm'>Phone</th>
//               <th className='py-3 px-4 font-semibold text-sm'>Details</th>
//             </tr>
//           </thead>
//           <tbody className='text-gray-600'>
//             {data.map((user) => (
//               <tr
//                 key={user._id}
//                 className='hover:bg-green-100 transition duration-300 ease-in-out'
//               >
//                 <td className='py-3 px-4 text-center'>{user._id}</td>
//                 <td className='py-3 px-4 text-center'>{user.Name}</td>
//                 <td className='py-3 px-4 text-center'>
//                   {formatDateString(user.createdAt)}
//                 </td>
//                 <td className='py-3 px-4 text-center'>{user.Email}</td>
//                 <td className='py-3 px-4 text-center'>{user.Phone}</td>
//                 <td className='py-3 px-4 text-center'>
//                   <Link
//                     to={`/admin/user-details/${user._id}`}
//                     className='text-blue-500 hover:underline'
//                   >
//                     Details
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

import AdminSidebar from '@/components/admin/sidebar/admin-sidebar.jsx';
import React from 'react';

const AdminDashboard = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col md:flex-row'>
        {/* Sidebar on the left */}
        <AdminSidebar />

        {/* Profile content on the right */}
        <div className='flex-1 bg-primaryGreen p-6'>
          <h1 className='text-center'>Admin Dashboard Content</h1>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
