export function AdmissionsPage() {
  return (
    <div className="card">
      <p className="eyebrow">Admissions flow</p>
      <h2>Application → Verification → Approval → Admission Number → Class Assignment → Active Learner</h2>
      <div className="steps-grid">
        <div className="step-box">Application</div>
        <div className="step-box">Verification</div>
        <div className="step-box">Approval</div>
        <div className="step-box">Admission Number</div>
        <div className="step-box">Class Assignment</div>
        <div className="step-box">Active Learner</div>
      </div>
      <p className="notice">Define the workflow in Firestore collections such as admissions and learner status records. If no data exists, display the configured phase progression.</p>
    </div>
  );
}
