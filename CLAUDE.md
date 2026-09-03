@AGENTS.md
# Project Guidelines

## Project Overview

This is a **Next.js application** built with JavaScript and JSX, intended for deployment on **Vercel**.

## Tech Stack

* Next.js
* React
* JavaScript
* JSX
* Tailwind CSS
* ESLint
* Vercel

## Project Structure

```text
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
├── hooks/
├── lib/
└── utils/

public/
```

## JavaScript / JSX Rules

* Use **JavaScript and JSX only**.
* Do not create `.ts` or `.tsx` files.
* Use `.js` for JavaScript files and `.jsx` for React components.
* Do not introduce TypeScript unless explicitly requested.
* Prefer functional React components.
* Use modern ES6+ JavaScript syntax and es 6 arrow functions.
- Do not use the native function.

## Next.js Guidelines

* Use the **App Router**.
* Keep pages inside `src/app`.
* Use Server Components by default.
* Add `"use client"` only when client-side functionality is required.
* Use Next.js features such as:

  * `next/link`
  * `next/image`
  * `next/navigation`
  * Server Actions where appropriate
* Avoid unnecessary client components.

## Components

Create reusable components inside:

```text
src/components/
```

Use clear and descriptive component names.

Example:

```jsx
export default function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}
```

## Styling

* Use Tailwind CSS for styling.
* Prefer utility classes over large custom CSS files.
* Keep reusable styles/components consistent.
* Avoid inline styles unless there is a specific reason.

## State Management

* Prefer local React state when state is component-specific.
* Use React Context when state needs to be shared across a limited part of the application.
* Avoid introducing Redux or other state-management libraries unless required.

## API / Backend

* Keep API-related utilities in:

```text
src/lib/
```

* Use environment variables for API URLs and secrets.
* Never hard-code credentials, API keys, tokens, or secrets.

Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Access it with:

```jsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Environment Variables

* `.env.local` is for local development.
* Never commit `.env.local`.
* Only expose variables to the browser using the `NEXT_PUBLIC_` prefix.
* Server-only secrets must not use `NEXT_PUBLIC_`.

## Error Handling

* Handle API and asynchronous operations properly.
* Provide meaningful user-facing error states.
* Avoid silently swallowing errors.
* Use appropriate loading and error UI.

## Performance

* Prefer Server Components when possible.
* Use `next/image` for images.
* Avoid unnecessary re-renders.
* Avoid unnecessary client-side JavaScript.
* Lazy-load expensive components when appropriate.

## Accessibility

* Use semantic HTML.
* Provide `alt` text for meaningful images.
* Ensure interactive elements are keyboard accessible.
* Use proper labels for form controls.
* Maintain reasonable color contrast.

## Code Quality

Before completing a feature:

```bash
npm run lint
npm run build
```

The application should build successfully before deployment.

## Git

Use clear commit messages.

Examples:

```text
feat: add authentication
fix: resolve login validation issue
refactor: simplify API utility
chore: update dependencies
```

Do not commit:

```text
.env
.env.local
node_modules/
.next/
```

## Vercel Deployment

The application is intended to be deployed on Vercel.

The production build should work with:

```bash
npm run build
```

Do not add unnecessary Vercel-specific configuration unless required.

When adding environment variables for production, configure them in the Vercel project settings.

## Important Rules

1. **Do not use TypeScript.**
2. **Use JSX for React components.**
3. **Use Next.js App Router.**
4. **Prefer Server Components.**
5. **Use Tailwind CSS for styling.**
6. **Keep components reusable and modular.**
7. **Never expose secrets to the client.**
8. **Run lint and build before considering a feature complete.**
9. **Do not introduce new dependencies without a good reason.**
10. **Keep the implementation simple and maintainable.**
