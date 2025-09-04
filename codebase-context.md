# SonicJS Project Analysis 2025

## Overview
SonicJS is a full-stack web framework built on top of Astro, designed for rapid development of web applications with a focus on Cloudflare ecosystem integration. The project is hosted on GitHub (hugons/cloudsonic) and deployed on Cloudflare Pages.

## Technology Stack
- **Framework**: Astro 4.15.9 with server-side rendering
- **Frontend**: React 18.3.1 with Tailwind CSS for styling
- **Backend**: Cloudflare Workers with D1 database and KV storage
- **Database**: Drizzle ORM for type-safe database operations
- **Authentication**: Custom auth system with sessions and email verification
- **Email**: Resend for email services
- **Testing**: Vitest for unit tests, Playwright for E2E tests
- **Deployment**: Cloudflare Pages with Wrangler CLI

## Project Structure

### Core Directories
- `src/`: Main application code
  - `pages/`: Astro pages including API routes and admin UI
  - `components/`: Reusable React components
  - `services/`: Business logic and utilities
  - `db/`: Database schemas and configuration
  - `auth/`: Authentication helpers
  - `emails/`: Email templates and services
  - `middleware/`: Astro middleware
- `public/`: Static assets
- `migrations/`: Database migration files
- `e2e/`: End-to-end tests
- `src/custom/`: Extensible custom schemas and configurations

### Key Features

#### Admin Interface
- Built-in admin UI for data management
- Table statistics and CRUD operations
- User authentication and session management
- Email management and templates

#### API Layer
- RESTful API endpoints for all database tables
- Access control and field-level permissions
- Caching with KV store for performance
- Hooks system for custom logic before/after operations

#### Database
- D1 database with Drizzle ORM
- Custom schema definitions
- Migration system for schema updates
- Support for custom tables via `src/custom/db/schema/`

#### Authentication & Security
- User registration and login
- Session management with tokens
- Email confirmation and password reset
- Role-based access control

#### Caching & Performance
- KV store integration for caching
- Cache statistics and monitoring
- Request caching for API responses

#### Email System
- Email templates with React Email
- Confirmation, welcome, and reset emails
- Admin email management

## Configuration
- `astro.config.mjs`: Astro configuration with Cloudflare adapter
- `package.json`: Dependencies and scripts
- `drizzle.config.ts`: Database configuration
- `tailwind.config.mjs`: Tailwind CSS configuration

## Development Workflow
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run unit tests
- `npm run e2e`: Run E2E tests
- Database migrations with `npm run generate` and `npm run up`

## Extensibility
The framework is designed to be extensible through:
- Custom database schemas in `src/custom/db/schema/`
- Custom API routes
- Hooks for extending API operations
- Custom components and services

This analysis provides a comprehensive overview of the SonicJS codebase, highlighting its architecture, key features, and development practices.
