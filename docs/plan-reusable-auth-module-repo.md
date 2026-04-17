# Plan: Reusable Auth0 Next.js module repo

## Problem
We need a separate reusable repo that packages our working Next.js + Auth0 auth stack so it can be applied consistently across future projects.

## Approach
- Create a dedicated repo for a reusable Next.js/Auth0 auth kit.
- Include configurable branding, provider toggles, custom login/signup UI, inline email/password auth, Google auth, logout/session handling, and docs.
- Keep auth/security internals opinionated while exposing a clean config surface.
- Document install/use steps for future projects.

## Expected Files
- README.md
- package.json
- src/ or template auth module files
- config surface/types
- example env docs
- release notes / docs

## Acceptance Criteria
- [ ] Separate repo scaffold exists
- [ ] Reusable auth kit structure exists
- [ ] Config surface is documented
- [ ] Auth0/Vercel env/setup docs exist
- [ ] Build/lint/test (if present) pass
- [ ] Repo is ready for reuse in future projects

## Edge Cases
- Branding overrides
- Google-only vs Google+email/password
- inline auth vs hosted fallback
- safe returnTo/logout/session handling
