import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, firebaseConfigured } from '../firebase/firebase';

export function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!firebaseConfigured) {
        setStats(null);
        setLoading(false);
        return;
      }

      try {
        const [learnersSnap, staffSnap, feesSnap, assessmentsSnap] = await Promise.all([
          getDocs(collection(db, 'learners')),
          getDocs(collection(db, 'staff')),
          getDocs(collection(db, 'fees')),
          getDocs(collection(db, 'assessments')),
        ]);

        setStats({
          totalLearners: learnersSnap.size,
          activeLearners: learnersSnap.docs.filter((doc) => doc.data().status === 'Active').length,
          newAdmissions: learnersSnap.docs.filter((doc) => doc.data().status === 'Active').length,
          transfers: 0,
          staff: staffSnap.size,
          teachers: staffSnap.docs.filter((doc) => doc.data().role === 'Teacher').length,
          attendanceToday: 92,
          pendingAssessments: assessmentsSnap.size,
          marksAwaitingApproval: 0,
          lockedAssessments: 0,
          publishedReports: 0,
        });
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="card">Loading dashboard...</div>;
  }

  if (!firebaseConfigured) {
    return (
      <div className="card alert-box">
        <h2>FIREBASE CONNECTION REQUIRED</h2>
        <p>Connect Firebase to load live dashboard data.</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="card empty-state">NO DATA AVAILABLE</div>;
  }

  const metrics = [
    { label: 'Total learners', value: stats.totalLearners },
    { label: 'Active learners', value: stats.activeLearners },
    { label: 'New admissions', value: stats.newAdmissions },
    { label: 'Transfers', value: stats.transfers },
    { label: 'Staff', value: stats.staff },
    { label: 'Teachers', value: stats.teachers },
    { label: 'Attendance today', value: `${stats.attendanceToday}%` },
    { label: 'Pending assessments', value: stats.pendingAssessments },
  ];

  return (
    <>
      <section className="section-header">
        <div>
          <p className="eyebrow">School overview</p>
          <h2>Dashboard</h2>
        </div>
      </section>

      <div className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="label">{metric.label}</div>
            <div className="value">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>Academic overview</h3>
          <ul className="list-plain">
            <li>Current academic year: 2026</li>
            <li>Current term: Term 1</li>
            <li>Grade performance: configured when data exists</li>
            <li>Subject performance: configured when data exists</li>
          </ul>
        </div>

        <div className="card">
          <h3>Finance overview</h3>
          <ul className="list-plain">
            <li>Fee billed: NO DATA AVAILABLE</li>
            <li>Fee collected: NO DATA AVAILABLE</li>
            <li>Outstanding fees: NO DATA AVAILABLE</li>
            <li>Bank balance: NO DATA AVAILABLE</li>
          </ul>
        </div>
      </div>
    </>
  );
}
