export function AssessmentsPage() {
  return (
    <div className="card">
      <p className="eyebrow">Examinations</p>
      <h2>Assessments and mark entry</h2>
      <div className="stats-grid small-grid">
        <div className="stat-card"><div className="label">CAT</div><div className="value">Configured</div></div>
        <div className="stat-card"><div className="label">SBA</div><div className="value">Configured</div></div>
        <div className="stat-card"><div className="label">Mid Term</div><div className="value">Configured</div></div>
        <div className="stat-card"><div className="label">End Term</div><div className="value">Configured</div></div>
      </div>
      <p className="notice">Marks entry supports validation, save drafts, submission and approval with Firestore-backed records.</p>
    </div>
  );
}
