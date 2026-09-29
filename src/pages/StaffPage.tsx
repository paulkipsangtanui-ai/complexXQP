export function AttendancePage() {
  return (
    <div className="card">
      <p className="eyebrow">Operations</p>
      <h2>Daily, weekly and term attendance</h2>
      <div className="stats-grid small-grid">
        <div className="stat-card"><div className="label">Present</div><div className="value">92%</div></div>
        <div className="stat-card"><div className="label">Absent</div><div className="value">3%</div></div>
        <div className="stat-card"><div className="label">Late</div><div className="value">5%</div></div>
        <div className="stat-card"><div className="label">Alerts</div><div className="value">2</div></div>
      </div>
      <p className="notice">Attendance is stored in the attendance and attendanceSummaries collections with alerts for repeated absence.</p>
    </div>
  );
}
