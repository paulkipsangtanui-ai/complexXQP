# Chepseon School ERP

A Refine + React + TypeScript + Firebase school-management prototype for Chepseon Complex Boarding Primary and Junior School.

## Features

- Role-aware dashboard and navigation
- Learners, admissions, academics, results, attendance and finance modules
- Firebase ready Firestore data provider and auth provider
- Demo-data seeding for development only
- Empty-state and not-configured messaging when Firestore or services are absent

## Quick start

```bash
npm install
cp .env.example .env
# fill in Firebase config values
npm run dev
```

## Production notes

- Do not enable demo data in production.
- Maintain strict Firestore security rules and role permissions.
- Keep data collections aligned with the Chepseon ERP specification.
