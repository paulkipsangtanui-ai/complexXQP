import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { label: 'Dashboard', to: '/' },
  { label: 'Learners', to: '/learners' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Academics', to: '/academics' },
  { label: 'Assessments', to: '/assessments' },
  { label: 'Results', to: '/results' },
  { label: 'Attendance', to: '/attendance' },
  { label: 'Staff & HR', to: '/staff' },
  { label: 'Parents', to: '/parents' },
  { label: 'Communication', to: '/communications' },
  { label: 'Finance', to: '/finance' },
  { label: 'Documents', to: '/documents' },
  { label: 'Settings', to: '/settings' },
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <div className="brand-mark">CC</div>
          <div>
            <strong>Chepseon</strong>
            <small>School ERP</small>
          </div>
        </div>

        <nav className="side-nav">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">Better Your Best</div>
            <h1>CHEPSEON COMPLEX BOARDING PRIMARY AND JUNIOR SCHOOL</h1>
          </div>
          <div className="topbar-actions">
            <span className="status-pill">Live School System</span>
          </div>
        </header>

        <div className="page-shell">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
