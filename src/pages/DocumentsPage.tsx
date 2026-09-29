export function FinancePage() {
  return (
    <div className="card">
      <p className="eyebrow">Finance module</p>
      <h2>Fees, payments and financial reports</h2>
      <div className="stats-grid small-grid">
        <div className="stat-card"><div className="label">Collected</div><div className="value">KES 2.4M</div></div>
        <div className="stat-card"><div className="label">Outstanding</div><div className="value">KES 0.9M</div></div>
        <div className="stat-card"><div className="label">Bank</div><div className="value">NO DATA AVAILABLE</div></div>
        <div className="stat-card"><div className="label">M-Pesa</div><div className="value">NOT CONFIGURED</div></div>
      </div>
      <p className="notice">Finance is kept separate from academics and can only show numbers when the underlying data exists.</p>
    </div>
  );
}
