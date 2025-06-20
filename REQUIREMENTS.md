# 📋 Bridges MVP Requirements

This document outlines the core feature requirements for the MVP release of the **Bridges** platform, designed to connect UNSW societies with potential sponsors.

---

## 📐 View the Wireframes

👉 [Figma – Bridges Wireframes](https://www.figma.com/design/WdcNLk34jY6GyhW54GLtTD/Wireframes?node-id=0-1&t=RjHSEahkGgskzj2i-1)

---

## 🌐 Public Site (No Login Required)

### 1. Homepage

- Overview of what Bridges is and who it's for
- Key CTAs:
  - Browse Societies
  - Browse Events
  - Create Your Society Profile
- Preview sections:
  - Featured societies
  - Upcoming events
- Social proof (testimonials, endorsement blurbs)
- These are just examples we're pretty flexible about how the homepage should look

---

### 2. Browse Directory

- Users can explore:
  - Society listings
  - Event listings
- Filter options:
  - Industry
  - Relevant degrees/interests
  - "Open for Sponsors" toggle
  - Event-specific: event type, upcoming/past
- **All listings are public** – no visibility toggles
- **No sponsor login required**
- Any limited-access content (e.g., private decks) will be shared manually via email by the society (contact buttons will be accessible through the website that lead viewers to an email thread)
- Societies will be preloaded by scraping **ARC** so that listings are not empty at launch

---

### 3. Society Profiles

- Main entity in the system is the **Society**, not individual users
- Profile creation options:
  - Manual form entry (name, mission, socials, etc.)
  - PDF upload → AI-assisted auto-fill
- Admins can edit all fields regardless of creation method
- Sections include:
  - Logo, name, mission, contact info
  - Social links (LinkedIn, Instagram)
  - Sponsorship history
  - Events associated with society
  - Optional upload of sponsorship deck
- Visibility:
  - 🌐 Public only
- No sponsor accounts or login flows needed

---

### 4. Event Pages

- Each event belongs to a society
- Displays:
  - Title, description, tags, date
  - Cover image (optional)
  - Contact CTA (e.g., "Sponsor This Event")
  - Parent society link
- Visibility is **always public** in MVP

---

### 5. Resources & Templates

- Open-access content for societies
- Examples:
  - Sponsorship proposal templates
  - Media kits
  - Cold email samples
  - Outreach tips
- Optional: submission form to allow societies to contribute resources
  - Admin moderation before publishing

---

## 🔐 Society Dashboard (Login Required)

### Authentication

- Login via **society email**
- After login:
  - New users go to society onboarding
  - Returning users redirected to Browse

---

### Dashboard Features

#### Overview

- Summary of society profile and events

#### Profile Editor

- Edit all fields
- Upload or re-upload PDF to re-parse with AI
- Preview public profile

#### Event Manager

- Add or edit events
- Mark “Looking for Sponsors”
- Events always public for MVP
