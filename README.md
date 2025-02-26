# FluidText

FluidText is a real-time online editor built on the MERN stack, using [NestJS](https://nestjs.com/) for the backend and [Next.js](https://nextjs.org/) for the frontend. The project is organized as a monorepo using [pnpm](https://pnpm.io/) and [TurboRepo](https://turbo.build/).

## Features

- **Real-time Collaboration:** Edit documents collaboratively using WebSockets.
- **Code Quality Enforcement:** Automatically run ESLint and Prettier via Husky hooks.
- **Modular Architecture:** Separate frontend and backend for easier development and scalability.
- **Fast Builds:** Leverage TurboRepo for efficient builds and development.

## Requirements

- Node.js (v18 or later)
- pnpm
- Git

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:yourusername/fluid_text.git
   cd fluid_text
   Install dependencies:
   ```

bash
Copy
Edit
pnpm install
Set up Husky (if needed):

bash
Copy
Edit
pnpm run prepare
Running in Development
To run both the frontend and backend concurrently, use:

bash
Copy
Edit
pnpm dev
Building the Project
To build all packages (both frontend and backend) in the monorepo, run:

bash
Copy
Edit
pnpm -r run build
Linting and Formatting
Before committing, Husky automatically runs ESLint and Prettier to enforce code quality.

To run these manually:

bash
Copy
Edit
pnpm eslint . --fix
pnpm prettier --write .
Clearing Commit History
If you need to clear the commit history and start fresh, refer to this guide.

Git Large File Storage (Git LFS)
Make sure that node_modules is excluded from the repository. In your root .gitignore, include:

bash
Copy
Edit
\*\*/node_modules/
If large files have already been committed, consider using BFG Repo-Cleaner or git filter-repo to remove them from the history.

Deployment
(Provide deployment instructions here — for example, using Vercel, Heroku, or another hosting platform.)

License
(Include your chosen license, e.g., MIT License.)

yaml
Copy
Edit

---

Feel free to adjust this template to better match your project details and requirements.
