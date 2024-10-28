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

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Required environment variables:
- VITE_API_BASE_URL: Base URL for API requests (e.g., http://localhost:8000/api).

4. Start the Development Server
```bash
pnpm dev
```

The application will be available at http://localhost:5173 by default.

## Sponsorship Configuration

The sponsorship feature allows articles to be marked as sponsored content with customizable styling. Sponsored content can be configured through the CMS by the author of the sponsored content.

## Key Features

- Sponsored articles are visually distinguished from regular content.
- Custom colors can be applied to sponsored content elements through the CMS.
- Default colors are used when custom colors aren't specified.

### Usage

1. In the CMS, authors can enable sponsored content for their articles
2. Authors can configure the sponsor color and text color directly in the article settings.

## Environment Variables

### Configuration

This project uses variables for configuration. These are loaded through Vite's built-in environment variable handling.

### Configuration Variables

| Variable | Description | Example |
| --------------------- | ------------------------------------ | ----------------------------- |
| VITE_API_BASE_URL | Base URL for API endpoints | http://localhost:8000/api |
| VITE_DEFAULT_SPONSOR_COLOR | Default highlight color for sponsored content (hex) | #FF0420 |
| VITE_DEFAULT_SPONSOR_TEXT_COLOR | Default text color for sponsored content (hex format) | #000000 |

