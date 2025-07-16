# Bridges API Specification

## Auth & Session Management

### POST /api/auth/register

Registers a new society account.

### POST /api/auth/login

Authenticates society credentials and starts session.

### GET /api/auth/session

Retrieves current authenticated session.

### POST /api/auth/logout

Ends the current session.

---

## Society Page Management

### GET /api/societies

List societies (filtered).

### GET /api/societies/:societyId

Fetches a single society's public profile (incl. events).

---

## Society Profile Management

### GET /api/profile/:societyId

Fetches a single society's private profile details.

### PUT /api/profile/:societyId

Updates society's private info (admins only).

---

## Verification & Super Admin

### GET /api/admin/requests

List of unverified societies (pending and denied) (super-admin only).

### PUT /api/admin/verify/:societyId

Approves a society request (super-admin only).

### PUT /api/admin/deny/:societyId

Rejects a society (super-admin only).

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

Creates a one-off event.

### GET /api/events

List all events.

### GET /api/events/:eventId

Single event details.

### PUT /api/events/:eventId

Update event details (admin only).

### POST /api/events/:eventId/admins

Adds a society as an event admin (admin only).

### DELETE /api/events/:eventId/admins/:societyId

Removes a society as an event admin (admin only).

---

## Resources

### GET /api/resources

List all resources.

### GET /api/resources/:resourceId

Get single resource details.

---

## Smart Profile Tools

### POST /api/profile/upload

Upload a PDF for AI-based info extraction.

### POST /api/social/scrapeDetails

Paste social links to auto-fill followers and other information.

### POST /api/social/scrapeEvents

Paste social links to auto-fill events.

---
