* {
  box-sizing: border-box;
}

:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  line-height: 1.5;
  color: #1d2d3d;
  background: #edf2f6;
  font-weight: 400;
  color-scheme: light;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  height: 100%;
}

body {
  background: #edf2f6;
}

button, input, textarea, select {
  font: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
  background: #edf3f8;
}

.sidebar {
  width: 260px;
  background: #102a4d;
  color: #f7fbff;
  padding: 18px 12px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 16px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #7a1d2f;
  display: grid;
  place-items: center;
  font-weight: 700;
}

.brand-box strong {
  display: block;
  font-size: 1rem;
}

.brand-box small {
  color: #b2c2d7;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  color: #eef5ff;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 9px;
  font-size: 0.96rem;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
}

.main-panel {
  flex: 1;
  padding: 22px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #dfe9f2;
  border-radius: 14px;
  padding: 18px 20px;
  margin-bottom: 22px;
}

.topbar h1 {
  margin: 4px 0 0;
  font-size: clamp(1.1rem, 2vw, 1.75rem);
  letter-spacing: 0.02em;
  color: #102b52;
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7a1d2f;
  font-weight: 700;
}

.status-pill {
  background: #e9f7ee;
  color: #1d885f;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.page-shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card {
  background: #ffffff;
  border: 1px solid #dde7f0;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(15, 42, 77, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2 {
  margin: 6px 0 0;
  color: #122d52;
}

.primary-button {
  border: none;
  background: #7a1d2f;
  color: white;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.small-grid {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.stat-card {
  background: linear-gradient(180deg, #ffffff, #f5f8fc);
  border: 1px solid #dde7f0;
  border-radius: 12px;
  padding: 14px 16px;
}

.stat-card .label {
  font-size: 0.76rem;
  color: #597089;
  margin-bottom: 8px;
}

.stat-card .value {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 700;
  color: #102d52;
}

.two-col-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}

.notice,
.list-plain {
  color: #2b425d;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: #6f7e90;
  font-weight: 600;
}

.alert-box {
  border-left: 5px solid #d85f5f;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th, td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #edf1f5;
}

th {
  color: #6d7e90;
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin: 18px 0;
}

.step-box {
  padding: 14px;
  border: 1px solid #dde7f0;
  border-radius: 10px;
  background: #f7fafc;
  color: #173054;
  font-weight: 600;
}

@media (max-width: 900px) {
  .app-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .side-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

