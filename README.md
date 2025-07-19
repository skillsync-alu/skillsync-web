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

