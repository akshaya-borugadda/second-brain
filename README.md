# 🧠 Second Brain – Personal Knowledge Management App

Second Brain is a full-stack web application that helps users capture, organize, search, and summarize their knowledge in one place.  
The project is inspired by the “Second Brain” concept of building a personal knowledge system.

This project is built with real-world engineering practices, including database integration, API handling, error fallback logic, and Git version control.

---

## 🚀 Features

- ✍️ Create, edit, and delete notes
- 🔍 Search across titles, content, and summaries
- 🏷️ Filter notes by type (Note, Link, Insight)
- 🤖 AI-powered note summaries
- 🧠 Fallback summary system when AI is unavailable
- ☁️ Supabase (PostgreSQL) backend
- ⚡ Modern UI with Next.js App Router

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend**
- Supabase (PostgreSQL)

**AI**
- OpenAI API (optional)

**Tools**
- Git & GitHub
- Node.js

---

## 🤖 AI Summary – Important Explanation

This project supports AI-generated summaries using the OpenAI API.

However, during development, the OpenAI API returned a **quota exceeded (429 error)** due to plan limitations.  
To handle this professionally, a **fallback summary system** was implemented.

### ✅ Fallback Summary Logic
- If AI summary fails or is unavailable
- The app automatically generates a summary using the first part of the note content
- This ensures the app **never breaks** and remains usable

This approach demonstrates:
- Proper error handling
- Cost-aware AI usage
- Production-ready system design

---

## 📂 Project Structure

```

app/
├─ api/test/route.ts     # AI summary API route
├─ page.tsx              # Main application UI
├─ layout.tsx
├─ globals.css
lib/
└─ supabaseClient.ts     # Supabase configuration
public/

```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key (optional)

````

> The app works even without the OpenAI key due to fallback logic.

---

## 🧪 Local Setup

```bash
git clone https://github.com/akshaya-borugadda/second-brain.git
cd second-brain
npm install
npm run dev
````

Visit:

```
http://localhost:3000
```

---

## 🎯 Learning Outcomes

* Full-stack application development
* Supabase integration with Next.js
* AI API integration with error handling
* Fallback design for external services
* Git & GitHub workflow
* Real-world debugging and deployment readiness

---

## 👤 Author

**Akshaya Borugadda**
Aspiring Full-Stack Developer

GitHub:
[https://github.com/akshaya-borugadda](https://github.com/akshaya-borugadda)

````

---

## ✅ AFTER PASTING — RUN THESE COMMANDS

```bash
git add README.md
git commit -m "Fix README and resolve merge conflict"
git push -u origin main
````

---




