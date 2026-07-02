# AGENTS.md

## Project overview
- This workspace contains a Spring Boot backend in the backend folder and a Vite + React frontend in the frontend folder.
- Use the backend commands from the backend directory and the frontend commands from the frontend directory.

## Working conventions
- Prefer existing project patterns over introducing new frameworks or build tooling.
- Keep frontend changes aligned with the current Vite/React/Tailwind setup in the frontend folder.
- When editing CSS, preserve the Tailwind-based structure already used in frontend/src/index.css.

## CSS and Tailwind guidance
- The frontend uses Tailwind CSS via the existing @tailwind directives in frontend/src/index.css.
- If a linter reports css.lint.unknownAtRules for @tailwind, @layer, or similar Tailwind-specific at-rules, treat that as a configuration issue rather than a reason to rewrite the stylesheet.
- Keep Tailwind directives intact and verify the Tailwind/PostCSS/Vite integration instead of suppressing the warning blindly.
- Prefer small, local CSS changes that match the current design tokens and existing stylesheet structure.

## Common commands
- Backend: ./mvnw spring-boot:run
- Frontend dev server: npm run dev
- Frontend build: npm run build
- Frontend lint: npm run lint
