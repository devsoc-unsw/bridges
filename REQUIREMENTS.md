# 📋 Bridges MVP Requirements

This document outlines the core feature requirements for the MVP release of the Bridges platform, designed to connect UNSW societies with potential sponsors.

---

## 📐 View the wireframes here
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
- Only **publicly visible** listings are shown
- No sponsor login is required to access or browse

---

### 3. Society Profiles

- Profile creation options:
  - Manual form entry (name, mission, socials, etc.)
  - PDF upload → AI-assisted auto-fill
- Admin can edit all fields regardless of creation method
- Sections include:
  - Logo, name, mission, contact info
  - Social links (LinkedIn, Instagram)
  - Sponsorship history
  - Events associated with society
  - Optional upload of sponsorship deck
- Visibility settings:
  - 🌐 **Public** – listed in Browse
  - 🔗 **Link-only** – unlisted, shareable via URL
  - ✉️ **Invite-only** (optional/future) – email-restricted access
- Link-based visibility mimics Google Docs-style access:
  - No need for sponsors to create accounts
  - Society controls access granularity

---

### 4. Event Pages

- Each event is tied to a society profile
- Displays:
  - Title, description, tags, date
  - Cover image (optional)
  - Contact CTA (e.g., "Sponsor This Event")
  - Parent society reference
- Visibility:
  - Public or link-only (inherits from parent society)

---

### 5. Resources & Templates

- Open-access content to help societies get sponsored
- Examples:
  - Sponsorship proposal templates
  - Media kits
  - Cold email samples
  - Outreach tips
- Optional: submission form to let societies contribute their own resources
  - Submissions reviewed by platform admin before publishing

---

## 🔐 Society Dashboard (Login Required)

### Authentication

- Google login via NextAuth
- Entry points:
  - "Create Profile" → onboarding flow
  - "Edit My Profile" → dashboard

---

### Dashboard Features

#### Overview
- Summary of current profile and event listings
- Visibility setting overview

#### Profile Editor
- Edit all profile fields manually
- Re-upload PDF to update AI-generated content
- Preview public-facing profile

#### Event Manager
- Add/edit events
- Toggle "Looking for Sponsors"
- Set event visibility (public / link-only)

#### Visibility Controls
- For both profile and events:
  - 🌐 Public
  - 🔗 Link-only
  - ✉️ Invite-only (future)

---

## 🧠 Optional: Community-Contributed Resources (Future)

- Logged-in societies can upload helpful templates and examples
- Admins review content before publishing
- Future “Community Picks” section highlights real success stories


## 🔐 Link-Based Permissions System

To avoid creating sponsor accounts:

- Each society profile and event has visibility modes:
  - 🌐 Public – browsable by anyone
  - 🔗 Link-only – accessible via direct link only
  - ✉️ Invite-only (optional future) – email-restricted
- Sponsors can view content directly without logging in
- Society admins manage visibility in their dashboard

