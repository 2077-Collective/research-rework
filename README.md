# 2077 Research

A research platform for the 2077 Collective.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- pnpm package manager

If you're seeing this, you've probably already done this step. Congrats!

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/2077-Collective/research-rework.git
   cd research-rework
   ```

2. Install dependencies
```bash
pnpm install
```

3. Configure Environment Variables
    - Copy the example environment file:

```bash
cp .env.example .env
```

Then update the .env file with your configuration:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Required environment variables:
- VITE_API_BASE_URL: Base URL for API requests (e.g., http://localhost:8000/api).

4. Start the Development Server
```bash
pnpm dev
```

The application will be available at http://localhost:5173 by default.

## Environment Variables

### Configuration

This project uses environment variables for configuration. These are loaded through Vite's built-in environment variable handling.

## Required Variables

| Variable              | Description                          | Example                       |
| --------------------- | ------------------------------------ | ----------------------------- |
| VITE_API_BASE_URL     | Base URL for API endpoints          | http://localhost:8000/api    |


## Development Setup
1. Copy .env.example to .env
2. Update the values in .env according to your development environment.
3. Never commit .env files to version control (they're already in .gitignore)