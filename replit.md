# Overview

LASTPULSE is a modern web application designed to help medical students track and manage their learning progress across multiple educational platforms (Marrow, DAMS, Prepladder). The application provides features for searching through lectures, tracking completion status, and monitoring study progress with an intuitive user interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build System**: Vite with hot module replacement for development

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot reload with Vite middleware integration

## Data Storage
- **Database**: PostgreSQL with Neon serverless provider
- **Schema Management**: Drizzle Kit for migrations and schema definition
- **Local Storage**: Browser localStorage for client-side completion tracking
- **In-Memory Fallback**: MemStorage class for development/testing without database

## Authentication & Authorization
- **User Management**: Basic user schema with username/password authentication
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **Validation**: Zod schema validation for type safety and input validation

## Development Environment
- **Monorepo Structure**: Shared schema and types between client/server
- **Hot Reload**: Vite development server with Express middleware integration
- **Type Safety**: Shared TypeScript configuration across all packages
- **Code Quality**: ESLint and TypeScript strict mode enabled

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting via @neondatabase/serverless
- **Drizzle ORM**: Type-safe database operations with drizzle-orm and drizzle-zod

## UI Framework & Components
- **Radix UI**: Comprehensive set of accessible UI primitives for React
- **Shadcn/ui**: Pre-built component library with consistent design system
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Font Awesome**: Icon library for consistent iconography

## Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## Client-Side Libraries
- **React Query**: Server state management, caching, and synchronization
- **Wouter**: Minimalist routing library for React applications
- **Date-fns**: Modern date utility library for JavaScript
- **Embla Carousel**: Touch-friendly carousel component for React

## Development Platform
- **Replit**: Cloud development environment with specialized Vite plugins
- **Runtime Error Overlay**: Enhanced error reporting for development
- **Cartographer**: Replit-specific tooling for project navigation