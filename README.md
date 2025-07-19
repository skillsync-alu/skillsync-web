# Skillsync Web App

**Connecting African talent one match at a time**

---

## Overview

Skillsync Web is the frontend for the Skillsync platform, designed to connect learners and tutors across Africa for hands-on vocational training and mentorship. Built with TypeScript and React (Vite), it empowers users to discover, learn, and teach high-demand skills, fostering community development and sustainable career growth.

- **Learners**: Sign up, select skills you want to learn, and get matched with qualified tutors.
- **Tutors**: Apply to become a mentor, offer your expertise, and help shape the next generation.
- **Messaging**: Secure, monitored chat system for communication between matched learners and tutors.

---

## Features


### User Registration & Authentication
- Sign up as a learner or tutor
- Google authentication supported
- Secure login and account management


### Skill Selection
- Choose from a curated set of vocational and creative skills (e.g., Plumbing, Solar Installation, Carpentry, Tailoring, Graphic Design, Agribusiness, etc.)
- Tutors select skills they can teach; learners select skills they want to learn
- Maximum 6 skills per user


### Matching & Mentorship
- Intelligent matching system connects learners with tutors based on selected skills
- Direct chat and mentorship portal for 1:1 guidance
- Tutors and learners have profiles showcasing skills, bios, and contact info


### Messaging & Chat
- Real-time, monitored chat powered by Firebase Firestore
- Only matched users can message each other
- All communication is subject to platform moderation


### User Profiles
- Display user information, skills, bio, and avatar
- Potential for showcasing progress, reviews, and achievements (future roadmap)


### Landing Page & FAQ
- Public landing with platform information, FAQs, and call-to-action for sign-up
- Focus on value proposition and impact


---

## Tech Stack


- **Frontend**: [React](https://react.dev/) (Vite), [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Recoil](https://recoiljs.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **API Integration**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Backend**: [Skillsync API](https://github.com/skillsync-alu/skillsync-api)
- **Authentication & Messaging**: [Firebase](https://firebase.google.com/)
- **Styling**: Custom CSS & Tailwind classes


---

## Getting Started


### Prerequisites


- Node.js (v18 or higher recommended)
- Yarn or npm


### Installation


```bash
git clone https://github.com/skillsync-alu/skillsync-web.git
cd skillsync-web
yarn install # or npm install
```


### Environment Setup


Create a `.env` file based on `.env.example` and set your Firebase credentials and API endpoint:


```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://api.skillsync.africa/graphql
```


### Running Locally


```bash
yarn dev # or npm run dev
```


The app runs at [http://localhost:5173](http://localhost:5173) by default.


---

## Project Structure


```
src/
├── components/ # Shared UI components (Navbar, FAQ, Spinner, etc.)
├── pages/ # Route pages (Login, Register, SetSkills, MyMatches, etc.)
├── api/ # GraphQL queries & mutations
├── config/ # Firebase configuration
├── resources/ # Recoil atoms and user state
├── routes/ # TanStack Router route definitions
├── utilities/ # Error handling and helpers
└── main.tsx # App entry point
public/
└── logo.png # Brand assets
```


---


## Core Workflows


### Registration


- Users choose role (Learner or Tutor) during sign-up.
- Role determines subsequent onboarding and skill selection.


### Skill Selection


- Learners: Choose skills to learn.
- Tutors: Choose skills to offer.
- Both limited to 6 skills for focused matching.


### Matching & Chat


- Platform matches learners and tutors based on skills.
- Matched users may chat securely via the app.
- All messages are monitored for safety.


---

