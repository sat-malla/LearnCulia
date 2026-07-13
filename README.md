# LearnCulia

A mobile app designed to help people with **dyscalculia** build mathematical confidence through structured games, AI-powered tutoring, and progress tracking.

---

## What is Dyscalculia?

Dyscalculia is a learning difference that affects a person's ability to understand numbers and perform mathematical operations. LearnCulia provides a supportive, gamified environment to help users overcome these challenges at their own pace.

---

## Features

- **6 Math Games** — Counting, Addition & Subtraction, Multiplication, Reversing Math Equations, Comparisons, and Arranging Numbers. Each game has a normal mode and a challenge mode (unlocked after completing normal mode).
- **CuliaBot** — An AI chatbot (RAG-powered) that answers questions about dyscalculia, explains game concepts, and gives personalized tips. Backed by Groq's llama-3.3-70b-versatile and HuggingFace embeddings stored in Supabase pgvector.
- **Badge System** — Users earn badges as they complete games and challenges.
- **Profile** — Tracks games completed, badges earned, and personal info with a customizable avatar.
- **Dark Mode** — Full dark/light mode support with customizable app accent colors.
- **Contact / Suggest** — Users can send messages directly to the developer. Confirmation emails sent via Brevo.
- **Forgot Password** — Custom reset flow using Brevo email templates and Firestore token storage.
- **Authentication** — Email/password auth via Firebase. Persistent login with AsyncStorage.

---

## Tech Stack

### Mobile App
| Technology | Purpose |
|---|---|
| React Native + Expo SDK 53 | Mobile framework |
| Firebase Auth | User authentication |
| Cloud Firestore | User data, badges, contact messages |
| AsyncStorage | Chat history persistence, draft saving |
| Expo Linear Gradient | UI theming |
| React Navigation | Screen navigation |
| Brevo (formerly Sendinblue) | Transactional emails |
| Formspree | Contact form backup |
| EAS Build | Cloud builds via Expo |

### RAG Backend (`rag-backend/`)
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Groq (llama-3.3-70b-versatile) | Chat completions |
| HuggingFace Inference API | Text embeddings (`all-MiniLM-L6-v2`, 384 dims) |
| Supabase (pgvector) | Vector similarity search |
| Render | Backend hosting |

---

## Project Structure

```
LearnCulia/
├── App.js                  # Root navigator, settings panel, theme
├── firebase.js             # Firebase app, auth, and firestore setup
├── SettingsContext.js      # Global settings context
├── DarkTheme/              # Theme provider and color definitions
├── screens/
│   ├── Home.js             # Home screen
│   ├── SinglePlayer.js     # Game selection screen
│   ├── Chat.js             # CuliaBot AI chat screen
│   ├── Profile.js          # User profile and badges
│   ├── Login.js            # Login screen
│   ├── Register.js         # Registration screen
│   ├── ForgotPass.js       # Password reset screen
│   ├── Suggest.js          # Contact / feedback screen
│   ├── Info.js             # App info screen
│   ├── TermsAndCo.js       # Terms and conditions
│   ├── Game1Screens/       # Counting game
│   ├── Game2Screens/       # Addition & Subtraction game
│   ├── Game3Screens/       # Multiplication game
│   ├── Game4Screens/       # Reversing Math Equations game
│   ├── Game5Screens/       # Comparisons game
│   └── Game6Screens/       # Arranging Numbers game
└── rag-backend/
    ├── index.js            # Express server entry point
    └── src/
        ├── llama.js        # Groq chat client
        ├── hf-client.js    # HuggingFace embeddings client
        ├── supabase.js     # Supabase client
        └── routes/
            ├── chat.js     # POST /chat — RAG query + response
            └── ingest.js   # POST /ingest — document ingestion
```

---

## License

Private — all rights reserved.
