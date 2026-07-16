# CBC Learning Management System (LMS)

**A NestJS-powered LMS for Kenyan Competency-Based Curriculum**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+, PostgreSQL 12+
- OpenAI API Key
- M-Pesa Sandbox credentials

### Installation

```bash
git clone https://github.com/paulkipsangtanui-ai/complexXQP.git
cd complexXQP
npm install
```

### Setup Environment

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL, OPENAI_API_KEY, etc.
```

### Database Setup

```bash
npm run prisma:migrate
npm run prisma:generate
```

### Run Development Server

```bash
npm run start:dev
```

API running on `http://localhost:3000`

## 📡 API Endpoints

### CBC (Assessment)
- `POST /api/cbc/assessment` - Record assessment
- `GET /api/cbc/report-card/:studentId?grade=GRADE1` - Get progress report

### Finance (M-Pesa)
- `POST /api/finance/stk-push` - Initiate payment
- `POST /api/finance/mpesa-callback` - Payment callback

### AI Assistant
- `POST /api/ai/generate-lesson` - Generate lesson plan
- `GET /api/ai/report-comments` - Generate report remarks

## 📁 Project Structure

```
src/
├── cbc/           # Assessment & Curriculum
├── finance/       # M-Pesa Integration
├── ai-assistant/  # OpenAI Lesson Plans
├── prisma/        # Database Service
└── app.module.ts  # Main Module
```

## 🔧 Commands

```bash
npm run build           # Build project
npm test                # Run tests
npm run lint            # Lint code
npm run prisma:studio   # GUI database manager
```

## 📚 Features

✅ Student assessment tracking (FORMATIVE/SUMMATIVE/SBA)  
✅ Parent & student management  
✅ M-Pesa payment integration with callbacks  
✅ AI-powered lesson plan generation  
✅ Personalized report card generation  
✅ Digital portfolio uploads  
✅ Fee balance tracking  

## 📄 License

MIT
