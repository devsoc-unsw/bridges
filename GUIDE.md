# 🛠️ Contributing Guide

Welcome to the **Bridges** project! This document outlines how we work collaboratively and consistently across the codebase.

---

## 📂 Branch Naming Convention

Use the format: `<type>/<short-description>`

| Prefix       | Purpose                                | Example                           |
|--------------|----------------------------------------|------------------------------------|
| `feat/`      | New features                           | `feat/auth-google`                |
| `fix/`       | Bug fixes                              | `fix/feed-pagination`             |
| `chore/`     | Infrastructure, config, tooling        | `chore/update-eslint-config`      |
| `docs/`      | Documentation changes                  | `docs/update-readme`              |
| `refactor/`  | Code restructuring (no feature change) | `refactor/feed-logic`             |
| `setup/`     | Initial project setup or structure     | `setup/initial-docker-structure`  |
| `test/`      | Adding or updating tests               | `test/unit-user-routes`           |

---

## ✅ Commit Message Convention (Conventional Commits)

Use the format:

< type >(optional scope): short description


### Common types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code formatting only (no logic changes)
- `refactor`: Code refactor (no functional changes)
- `chore`: Infra/config/tooling
- `test`: Adding or updating tests

### Examples:
- feat(api): add initial Express server
- chore: add Dockerfile and Compose config
- docs: write deployment guide


---

## ✅ Pull Request Workflow

1. Create a branch from `main`
2. Use a descriptive name (see branch naming convention)
3. Push your branch to GitHub
4. Open a **Pull Request** with:
   - Clear PR title (e.g. `feat: add Google OAuth`)
   - Short summary of what the PR does
5. Assign a reviewer (or yourself for record)
6. Squash and merge after review approval

---

Thanks for contributing! 🚀
