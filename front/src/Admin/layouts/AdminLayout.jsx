import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}