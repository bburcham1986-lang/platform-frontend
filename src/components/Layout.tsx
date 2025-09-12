import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const link = "block rounded px-3 py-2 text-sm font-medium hover:bg-gray-100";
  const active = "bg-gray-200";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 border-r bg-white">
        <div className="p-4 font-semibold">FieldCraft Cloud</div>
        <nav className="p-2 space-y-1">
          <NavLink to="/" end className={({isActive}) => `${link} ${isActive?active:""}`}>Fleet</NavLink>
          <NavLink to="/alarms" className={({isActive}) => `${link} ${isActive?active:""}`}>Alarms</NavLink>
          <NavLink to="/admin" className={({isActive}) => `${link} ${isActive?active:""}`}>Admin</NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="h-14 border-b bg-white px-4 flex items-center justify-between">
          <div className="font-medium">Remote Monitoring</div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
