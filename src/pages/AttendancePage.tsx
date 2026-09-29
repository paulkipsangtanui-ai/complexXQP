export function ResultsPage() {
  return (
    <div className="card">
      <p className="eyebrow">Results centre</p>
      <h2>Subject totals, merit lists and report cards</h2>
      <div className="stats-grid small-grid">
        <div className="stat-card"><div className="label">Subject totals</div><div className="value">Live</div></div>
        <div className="stat-card"><div className="label">Merit list</div><div className="value">Live</div></div>
        <div className="stat-card"><div className="label">Subject means</div><div className="value">Live</div></div>
        <div className="stat-card"><div className="label">Report cards</div><div className="value">Live</div></div>
      </div>
      <p className="notice">The results engine calculates totals and merit lists from real marks in Firestore. If data is missing, the page remains empty and explicit.</p>
    </div>
  );
}
