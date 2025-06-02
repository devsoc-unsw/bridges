# Bridges API Specification

## Auth & User Management

### POST /api/auth/register

Registers a new user.

### POST /api/auth/login

Authenticates user credentials and starts session.

### GET /api/auth/session

Retrieves current authenticated session.

### POST /api/auth/logout

Ends the current session.

---

## Society Management

### POST /api/societies

Creates a new society request.

### GET /api/societies

List societies (filtered).

### GET /api/societies/:id

Fetches a single society's public profile.

### PUT /api/societies/:id

Updates society info (admins only).

### POST /api/societies/:id/admins

Adds a new society admin (admin only).

### DELETE /api/societies/:id/admins/:userId

Removes a society admin.

---

## Verification & Super Admin

### GET /api/admin/requests

List of unverified societies.

### POST /api/admin/verify/:id

Approves a society request.

### DELETE /api/admin/deny/:id

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

---

## Smart Profile Tools

### POST /api/profile/upload

Upload a PDF for AI-based info extraction.

### POST /api/social/scrape

Paste social links to auto-fill followers.

---
