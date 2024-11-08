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
