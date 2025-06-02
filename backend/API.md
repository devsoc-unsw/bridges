# Bridges API Specification

## Auth & Session Management

### POST /api/auth/register

Registers a new society.

### POST /api/auth/login

Authenticates society credentials and starts session.

### GET /api/auth/session

Retrieves current authenticated session.

### POST /api/auth/logout

Ends the current session.

---

## Society Management

### GET /api/societies

List societies (filtered).

### GET /api/societies/:id

Fetches a single society's public profile.

### PUT /api/societies/:id

Updates society info (admins only).

---

## Verification & Super Admin

### GET /api/admin/requests

List of unverified societies.

### PUT /api/admin/verify/:id

Approves a society request.

### PUT /api/admin/deny/:id

Rejects a society.

---

## Dashboard & Discovery

### GET /api/discover

Returns feed of societies, and events.
Supports filtering by:

- industry
- degrees
- interests
- status

---

## Events

### POST /api/events

Creates a one-off event (admin only).

### GET /api/events

List all events.

### GET /api/events/:id

Single event details.

### PUT /api/events/:id

Update event details (admin only).

### POST /api/events/:id/admins

Adds a society as an event admin (admin only).

### DELETE /api/events/:id/admins/:societyId

Removes a society as an event admin.

---

## Smart Profile Tools

### POST /api/profile/upload

Upload a PDF for AI-based info extraction.

### POST /api/social/scrape

Paste social links to auto-fill followers.

---
