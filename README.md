# 2077 Research

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- pnpm package manager

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-directory>
```
2. Install dependencies

```pnpm i```

3. Configure environment variables
    - Create a .env file in the root directory with the following variables:
    ```VITE_API_BASE_URL=your_api_url_here```

    Required environment variables:
    - VITE_API_BASE_URL: Base URL for API requests (e.g., http://localhost:3000/api)

    You can also use the provided template:
    ```cp .env.example .env```

4. Start the development server
```pnpm dev```

The application will be available at http://localhost:5173 by default.

## Environment Variables

### Configuration

This project uses environment variables for configuration. These are loaded through Vite's built-in environment variable handling.
Required Variables

## Required Variables

| Variable      | Description     | Example     |
| ------------- | ------------ | ------------ |
| VITE_API_BASE_URL | Base URL for API endpoints | http://localhost:3000/api |

## Development Setup

- 1. Copy .env.example to .env
- 2. Update the values in .env according to your development environment
- 3. Never commit .env files to version control (they're already in .gitignore)

## Production

For production deployment, ensure these environment variables are properly set in your hosting platform's configuration.