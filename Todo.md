Here are the main reports and guides generated:

Preliminary Audit Report – summarises the key security findings (e.g. exposed Firebase credentials) and provides high‑level recommendations across security, code quality, performance, design, infrastructure and deployment:
CyberPath Pro Code Audit — Preliminary Report (Dec 19, 2025)
Executive Summary

This preliminary audit analysed the cybersec‑career‑tracker project contained within the repository raghv-m/cyberTrack. The project is an AI‑powered cybersecurity career tracker built with React 18, TypeScript, Firebase Auth/Firestore, Vite, Tailwind CSS and supporting Python scrapers. The goal is to help aspiring cybersecurity professionals plan, track and achieve career objectives.

The audit focused primarily on Phase 1 (security) with high‑level reviews of other phases. Because of limited time and incomplete access to every file through the API, the report highlights the most critical issues discovered and proposes next steps for a comprehensive audit. A full review will require cloning the repository locally and conducting static and dynamic analyses.

1 Security Vulnerabilities (Phase 1)
1.1 Exposed Credentials

Firebase configuration leaked — the file src/config/firebase.ts hard‑codes the project’s Firebase apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId and measurementId. These credentials appear directly in the client bundle and are accessible to anyone who can view the source code
github.com
. While Firebase client keys are not considered full secrets, they should still be kept in .env files to allow rotation and to discourage misuse.

Fix: Move the entire firebaseConfig object into environment variables (e.g. VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.) and load them via import.meta.env in the config file. Provide a .env.example template for developers.

No other API keys or secrets were seen in the limited sample, but further scanning (grep) should be performed on the entire repository for patterns such as API_KEY, secret, token, password, AWS_ACCESS_KEY_ID, GCP credentials, etc.

1.2 Frontend Security Issues

Unused dangerouslySetInnerHTML found? A search should be performed for dangerouslySetInnerHTML; improper sanitization of user‑generated HTML can lead to XSS attacks. This was not found in the sampled files, but the audit could not scan every component.

Authentication flows — The app uses Firebase Auth. Check that sensitive routes are wrapped by a PrivateRoute component
github.com
 and that AuthProvider correctly handles onAuthStateChanged. Ensure redirect flows prevent open redirect vulnerabilities.

LocalStorage usage — if tokens or sensitive data are stored in localStorage, they are accessible to XSS. Prefer httpOnly cookies or rely on Firebase’s own token handling.

Content Security Policy (CSP) — Evaluate whether the deployment sets a CSP header to mitigate injection attacks.

Input sanitization & validation — Form handlers should validate user input both client‑side and server‑side. Use type definitions and schema validation (e.g. Zod or Yup) to enforce constraints.

Firebase Security Rules — The repo includes Firestore but no firestore.rules was found. You must define restrictive rules (e.g. using rules_version = '2'; and match /databases/{database}/documents with proper allow read, write: if request.auth != null && <condition>). Without rules, anyone could read or write to the database.

CORS and rate limiting — If Cloud Functions or an API server are used, ensure that CORS is restricted to allowed origins and rate limiting (e.g. using express-rate-limit) is enabled to mitigate abuse.

1.3 Dependency Vulnerabilities

npm packages — Running npm audit is recommended to detect known vulnerabilities. Since remote execution wasn’t possible here, this step remains for future work. Pay special attention to packages like react-markdown, remark-gfm, or any library handling user‑supplied content.

Python packages — For the scrapers, create a requirements.txt and use pip check or safety to identify vulnerabilities.

1.4 Other Observations

The repo includes BAT scripts (e.g. START_SCRAPER.bat) and Python scrapers. Ensure these scripts do not run arbitrary commands. Use environment variables for any credentials used in scraping.

2 Code Quality & Bug Fixes (Phase 2)

Unused code — The project structure is modular, but there may be unused components or duplicated logic (e.g. old dashboard versions). A code linter (ESLint) and TypeScript compiler can help detect unused variables, imports and unreachable code.

Missing cleanup — Components with subscriptions (e.g. Firebase listeners) must unsubscribe in useEffect cleanup functions to avoid memory leaks. Review each custom hook for proper cleanup.

State dependencies — Ensure all useEffect hooks specify complete dependency arrays to prevent stale closures and inconsistent state.

Null checks — Many pages access currentUser from context. Always guard against null or undefined values before dereferencing.

Date/time handling — Use a library like date-fns or luxon for consistent timezone parsing (the user is in America/Edmonton). Avoid off‑by‑one errors when generating daily logs or weekly summaries.

3 Code Consistency & Standards (Phase 4 & 5)

ESLint and Prettier — Set up .eslintrc.json and .prettierrc to enforce code style, import ordering and common rules (including jsx-a11y and React hooks rules). Run prettier --write on all source files.

Naming conventions — Ensure React components are PascalCase and variables camelCase. Organise files logically (e.g. pages vs components vs hooks).

Documentation — A top‑level README exists, but each major folder (e.g. src/components, src/hooks, scrapers) should include a README explaining its purpose. Add JSDoc/TSDoc comments to exported functions for clarity.

Testing — Set up Jest and React Testing Library. Create unit tests for utility functions (e.g. AI curriculum generation), integration tests for key flows (e.g. onboarding, daily log) and e2e tests with Cypress or Playwright.

4 Performance Optimisation (Phase 3)

React rendering — Many pages import large numbers of components in the top‑level router. Implement lazy loading (React.lazy + Suspense) for routes and expensive components. Use React.memo, useMemo and useCallback to prevent unnecessary re‑renders.

Bundle size — Vite supports code splitting; verify that each page is a separate chunk. Analyse bundle size with npm run build -- --report and ensure the main bundle is <200 KB compressed.

List virtualisation — For lists of jobs or resources, consider react-window or react-virtualized to render only visible items.

Images — Convert static assets to WebP and lazy load them. Use the <img loading="lazy"> attribute for hero images.

5 Firebase Optimisation & Scrapers (Phase 3 & 7)

Firestore queries — Use indices for compound queries and limit reads. Implement pagination with limit() and startAfter(). Unsubscribe listeners when components unmount.

Batch writes — Use writeBatch for multiple updates/creates to reduce billing costs and maintain consistency.

Python scrapers — The run_scraper.py script should:

Respect robots.txt and throttle requests.

Implement retries with exponential backoff.

Use connection pooling (aiohttp with asyncio or requests.Session).

Log actions with rotating file handlers.

Centralise configuration in a scraper_config.json.

Pin dependency versions in requirements.txt to ensure reproducibility.

6 Design & Accessibility (Phase 4 & 10)

Design system — Consolidate Tailwind classes into reusable components (e.g. Button, Card, Input). Define a colour palette and spacing scale in tailwind.config.js.

Responsive layout — Test on mobile and adjust grid/flex layouts to avoid overflow. Use responsive font sizes (e.g. text-sm, md:text-base).

Accessibility — Use semantic HTML elements (e.g. <main>, <nav>, <section>). Ensure all inputs have labels and ARIA attributes where necessary. Provide keyboard navigation and visible focus states. Check colour contrast meets WCAG 2.1 AA. Add a “skip to main content” link at the top.

7 Infrastructure & Deployment (Phase 6)

Environment separation — Create .env.development and .env.production with environment‑specific variables. Provide a .env.example as a template. Add .env* to .gitignore.

CI/CD — Set up GitHub Actions for linting, testing, and deployment to Firebase hosting or another platform. Use secrets for Firebase credentials. Include a step to run npm audit and fail the build on high‑severity vulnerabilities.

Monitoring — Integrate Sentry for error tracking on both frontend and backend. Use Firebase/Google Analytics for usage metrics.

8 Deliverables & Next Steps

Security fixes — Immediately move the Firebase configuration into environment variables and add firebase.rules and firestore.indexes.json. Search for other secrets and fix them.

Security audit file — Create SECURITY_AUDIT.md summarising all identified vulnerabilities, fixes applied, and recommendations for medium/low issues.

Dead code removal — Run ESLint/TypeScript checks to find unused imports/functions and remove them. Document removals in CHANGELOG.md.

Bug fixes — Review each module (curriculum generation, progress tracking, onboarding) for logical errors. Document each bug and fix in BUG_FIXES.md.

Standards & docs — Add .eslintrc.json, .prettierrc, and CODING_STANDARDS.md. Write comprehensive documentation files as outlined in the Phase 5 section.

Testing — Configure Jest and React Testing Library; aim for >70 % coverage on core logic. Add tests for Python scrapers with pytest.

Performance — Implement lazy loading and measure performance improvements with React DevTools profiler and Lighthouse.

Conclusion

The CyberPath Pro application is an ambitious platform that combines AI‑driven curriculum planning with user progress tracking. The initial audit highlighted an exposed Firebase configuration and emphasised the need for robust security, consistent coding standards, comprehensive documentation, and thorough testing. Addressing these issues will lay a solid foundation for subsequent performance improvements, design refinements and new feature development.

Security Audit – lists identified vulnerabilities with severity, file/line locations and suggested fixes or mitigations:
Security Audit — CyberPath Pro

Repository: raghv-m/cyberTrack (cybersec‑career‑tracker)
Date: 19 Dec 2025

This file lists the security vulnerabilities discovered during the preliminary audit, the severity of each, the fixes applied and recommendations for remaining issues.

Summary of Vulnerabilities
#	File	Line	Severity	Issue	Fix/Recommendation
1	src/config/firebase.ts	6‑14
github.com
	HIGH	Firebase API key and other credentials hard‑coded in the client code.	FIX: Move all values from firebaseConfig into environment variables (VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.). Create .env.example with these variables and import them via import.meta.env.
2	global	—	MEDIUM	Potential misuse of dangerouslySetInnerHTML for rendering HTML (risk of XSS).	Recommendation: Search the codebase for dangerouslySetInnerHTML and ensure any HTML is sanitized using a library like DOMPurify before rendering.
3	global	—	MEDIUM	Missing Firebase security rules. Without proper rules, any authenticated user (or even unauthenticated if misconfigured) could read/write to Firestore.	Recommendation: Define firestore.rules to restrict read/write operations based on request.auth and document roles. Use the Firebase rules simulator to test.
4	global	—	MEDIUM	CORS configuration not visible; backend endpoints (if any) may allow any origin.	Recommendation: Specify allowed origins (e.g. https://yourdomain.com) and methods in the server configuration. If using Cloud Functions, set CORS appropriately.
5	global	—	MEDIUM	Potential storage of tokens or sensitive data in localStorage.	Recommendation: Use Firebase Auth tokens or httpOnly cookies instead of storing credentials in localStorage.
6	global	—	LOW	npm and pip dependencies have not been audited for known vulnerabilities.	Recommendation: Run npm audit and pip check regularly. Upgrade or replace vulnerable packages.
7	scripts	—	LOW	Batch scripts and Python scrapers could execute commands without sanitizing user input.	Recommendation: Ensure no user‑supplied input is executed by the shell. Escape or validate any dynamic commands.
Future Work

Complete scan — Clone the repository locally and run automated tools (e.g. git-secrets, truffleHog, npm audit, safety for Python) to detect secret leaks and vulnerable dependencies.

Penetration testing — Once the app is deployed, perform black‑box testing to verify there are no open admin endpoints, CSRF vulnerabilities, or authentication bypasses.

Continuous monitoring — Integrate Snyk or Dependabot to automatically discover new vulnerabilities in dependencies and create pull requests to update them.

Security rules — Develop comprehensive Firebase and Firestore security rules and test them thoroughly.

This SECURITY_AUDIT.md should be updated after each development cycle to include new vulnerabilities and document the fixes applied.

Improvements Log – a template for documenting each code modification, with examples showing how to record future changes:
Improvements Log — CyberPath Pro

This log records modifications and enhancements made during the audit process. It complements the AUDIT_REPORT.md by listing files changed, lines added/removed, and the reasoning behind each change. Each entry should be appended chronologically.

Note: No actual modifications were committed in this preliminary audit. The following entries demonstrate how to format future changes.

Proposed Change Examples
Change 1 — Move Firebase configuration to .env

Files modified:

src/config/firebase.ts

.env.example (new file)

Lines added: 5 lines (importing import.meta.env variables and constructing config)

Lines removed: 9 lines (hard‑coded Firebase config values)

Rationale: Remove sensitive API keys and project identifiers from source code. Improves security and facilitates environment‑specific configuration.

Impact: No functional change; application continues to initialise Firebase using environment variables.

Change 2 — Add firestore.rules and firestore.indexes.json

Files added:

firestore.rules

firestore.indexes.json

Rationale: Enforce granular access control on Firestore documents and define indexes for query performance. Without rules, the database could be compromised.

Impact: Improved security; queries that lack necessary indexes will prompt a helpful error message instructing developers to update the index configuration.

Change 3 — Add .eslintrc.json and .prettierrc for code consistency

Files added:

.eslintrc.json

.prettierrc

Rationale: Establish linting and formatting rules to maintain code quality and style consistency across the team. Reduces merge conflicts and readability issues.

Impact: Developers will need to run npm run lint -- --fix and prettier --write as part of the CI pipeline. Warnings and errors will guide refactoring.

Subsequent entries should follow this pattern, clearly describing the modifications, rationale and expected impact.

To‑Do List – organised by audit phase, outlines remaining tasks such as moving credentials to .env, writing Firestore security rules, running ESLint/prettier, adding tests, setting up CI/CD, and improving design/accessibility:
TODO — Next Steps for CyberPath Pro

This document lists outstanding tasks that were identified during the audit but not yet completed. They are organised by phase for easier tracking.

Phase 1: Security

 Replace all hard‑coded credentials with environment variables and create .env.example.

 Audit the entire repository for secrets using tools like truffleHog or git-secrets.

 Write comprehensive Firebase and Firestore security rules (firestore.rules and storage.rules).

 Implement rate limiting and strict CORS policies for any backend endpoints or Cloud Functions.

 Verify that authentication flows prevent open redirect and session fixation attacks.

 Add CSP headers and sanitise any untrusted HTML.

Phase 2: Code Quality & Bug Fixes

 Run ESLint and TypeScript to identify unused variables, imports, and unreachable code, then remove them.

 Review all React components for proper useEffect dependency arrays and cleanup functions to prevent memory leaks.

 Inspect curriculum generator logic for off‑by‑one errors and date/time bugs.

 Add error boundaries around page components and handle promise rejections globally.

 Refactor any duplicated functions or components into shared utilities.

Phase 3: Performance Optimisation

 Implement lazy loading for page routes using React.lazy and Suspense.

 Use React.memo, useCallback, and useMemo where appropriate to prevent unnecessary re‑renders.

 Optimise lists using react-window for virtualisation.

 Compress and convert images to WebP; ensure they are lazy‑loaded.

 Perform a Lighthouse audit and set performance budgets.

Phase 4: Design & Accessibility

 Create a design system (buttons, inputs, cards) using Tailwind utility classes or a component library.

 Standardise colours, fonts, spacing and border radii.

 Enhance the landing page with modern UX (animations, hero section, social proof, etc.).

 Ensure WCAG 2.1 AA compliance via automated audits (axe, Lighthouse) and manual checks.

Phase 5: Documentation & Testing

 Write or update the following documentation: API_DOCUMENTATION.md, COMPONENT_DOCUMENTATION.md, SCRAPER_DOCUMENTATION.md, DATABASE_SCHEMA.md, DEPLOYMENT.md, TROUBLESHOOTING.md.

 Add JSDoc/TSDoc comments to all exported functions and components.

 Configure Jest and React Testing Library; aim for at least 70 % coverage on core logic.

 Create pytest tests for Python scrapers.

 Write E2E tests with Cypress or Playwright for critical user journeys (onboarding, logging progress, viewing dashboard).

Phase 6: Infrastructure & Deployment

 Separate environment files for development and production; never commit actual secrets.

 Set up GitHub Actions for CI (linting, testing, build) and CD (deploy to Firebase or chosen platform).

 Add Sentry (or a similar service) for error monitoring and integrate Google Analytics/Firebase Analytics.

 Create an ENVIRONMENT_SETUP.md to document environment configuration and deployment steps.

Phase 7: Final Polish & Metrics

 Remove unused console logs, TODOs and FIXMEs; replace magic numbers with named constants.

 Ensure no functions exceed 50 lines and no files exceed 300 lines; refactor as needed.

 Validate commit history and remove leftover branches or merge conflicts.

 Document performance metrics (TTI, FCP, LCP, CLS) in PERFORMANCE.md after optimisations.

Keep this list updated as tasks are completed or new issues are discovered.

Migration Guide – placeholder guide describing how to update your local setup when breaking changes (e.g. environment variables, ESLint integration) are introduced:
Migration Guide — CyberPath Pro

As of this preliminary audit (Dec 2025), no breaking changes have been introduced. However, when the proposed changes (e.g. moving Firebase configuration to environment variables, adding security rules, refactoring components) are implemented, developers may need to follow migration steps to keep their local environments and deployments functional.

Potential Future Breaking Changes

Environment variables for Firebase configuration

What changes: The Firebase config values currently hard‑coded in src/config/firebase.ts will be removed. Instead, the app will read values from import.meta.env (Vite). A .env.example file will provide the required variables.

How to migrate:

Copy .env.example to .env in your local project root.

Fill in the Firebase values from your Firebase console (API key, Auth domain, Project ID, etc.).

Restart the development server (npm run dev). The app should initialise Firebase using the new variables.

For production, set these variables in your deployment environment (e.g. GitHub Secrets, Vercel environment variables, or Firebase Hosting config).

Firestore security rules and indexes

What changes: New firestore.rules and firestore.indexes.json files will be added. Without deploying these, some queries may fail.

How to migrate:

Install the Firebase CLI (npm install -g firebase-tools) if not already installed.

Authenticate (firebase login) and select your project (firebase use --add).

Deploy the rules and indexes:

firebase deploy --only firestore:rules,firestore:indexes


Test queries in the app; if you encounter a missing index error, update firestore.indexes.json accordingly and redeploy.

Introduction of ESLint and Prettier

What changes: The project will adopt consistent linting and formatting rules. Files that do not comply may cause lint errors.

How to migrate:

Run npm install to install any new dependencies (ESLint plugins, Prettier).

Execute npm run lint -- --fix and prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}" to automatically fix most issues.

Manually adjust any remaining lint errors, following the guidelines in CODING_STANDARDS.md.

Refactoring of components and utilities

What changes: Duplicate or unused components/functions may be removed or consolidated. File paths could change to align with a new folder structure.

How to migrate:

Verify imports after pulling the latest code. If a component moved from pages/OldDashboard.tsx to pages/DashboardNew.tsx, update your imports accordingly.

Review the changelog (IMPROVEMENTS_LOG.md) for details on moved/renamed files.

Run the tests to ensure nothing is broken.

When future breaking changes occur, update this guide with specific steps and document any required manual actions.