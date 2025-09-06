# Technical Documentation

## Architecture Overview

The Visa Pathway Hub is built using a modern, scalable architecture that prioritizes performance, security, and user experience.

### Frontend Architecture

#### Component Structure
```
components/
├── auth/                    # Authentication & authorization
│   ├── AdminAuthProvider    # Context provider for admin authentication
│   └── ProtectedRoute       # Route protection wrapper
├── common/                  # Shared utility components
│   ├── DesktopModeCheck     # Device compatibility checker
│   └── LoadingSpinner       # Loading states
├── home/                    # Homepage feature sections
│   ├── HeroSection          # Main landing section with CTAs
│   ├── F1VisaGuideSection   # Visa guide overview
│   ├── AboutUsSection       # Organization information
│   ├── TestimonialsSection  # User testimonials display
│   ├── ExperienceSection    # Community experiences
│   ├── FAQSection           # Frequently asked questions
│   └── CTASection           # Call-to-action elements
├── layout/                  # Page layout components
│   ├── Header               # Navigation and branding
│   └── Footer               # Site footer with links
├── notice/                  # Notification system
│   ├── NoticeBanner         # Site-wide announcements
│   └── EmergencyNoticeSection # Critical alerts
└── ui/                      # Base UI components (shadcn/ui)
    ├── button, card, dialog # Radix UI primitives
    ├── form, input, select  # Form components
    └── toast, tooltip       # Feedback components
```

#### State Management Strategy
- **React Query**: Server state management and caching
- **React Context**: Authentication state and global UI state
- **React Hook Form**: Form state management with validation
- **URL State**: Route-based state for navigation and deep linking

#### Routing Structure
```
/                           # Homepage with all sections
├── /about                  # About page and mission
├── /f1-visa-info          # Detailed F-1 visa information
├── /interview-prep        # Interview preparation resources
├── /visa-experiences      # Community experience hub
│   ├── /share             # Share experience form
│   └── /:id               # Individual experience view
├── /testimonials          # Success stories
│   └── /share             # Testimonial submission
├── /resources             # Document and resource library
├── /contact               # Contact information and form
├── /blog                  # Blog and articles
│   └── /:slug             # Individual blog posts
├── /dashboard             # User dashboard (future)
├── /community             # Community links and forums
├── /logo-competition      # Logo design competition
├── /admin-login           # Admin authentication
└── /admin-dashboard       # Administrative interface
```

### Backend Architecture (Supabase)

#### Database Design
The database follows a normalized structure with clear separation of concerns:

**Core Tables:**
- `admin_users`: Administrative user management
- `notices`: System announcements and emergency notifications
- `visa_experiences`: User-submitted visa application experiences
- `testimonials`: User success stories and feedback

**Security Model:**
- Row Level Security (RLS) enabled on all tables
- JWT-based authentication with role-based access control
- Soft delete functionality with audit trails
- Rate limiting and input validation

#### API Design
The application uses Supabase's auto-generated APIs with custom policies:

**Authentication Flow:**
1. User authentication via Supabase Auth
2. JWT token validation on protected routes
3. Role-based access control for admin functions
4. Session management with automatic refresh

**Data Access Patterns:**
- Real-time subscriptions for live updates
- Optimistic updates for better UX
- Cursor-based pagination for large datasets
- Intelligent caching with React Query

### Security Implementation

#### Frontend Security
- **Input Validation**: Zod schemas for all form inputs
- **XSS Prevention**: Sanitized content rendering
- **CSRF Protection**: SameSite cookie configuration
- **Content Security Policy**: Restrictive CSP headers

#### Backend Security
- **Authentication**: JWT-based with refresh tokens
- **Authorization**: Row-level security policies
- **Rate Limiting**: API endpoint protection
- **Data Encryption**: Encrypted sensitive data storage

### Performance Optimization

#### Frontend Performance
- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Intersection Observer for below-the-fold content
- **Bundle Optimization**: Tree shaking and minification

#### Backend Performance
- **Database Indexing**: Optimized queries with proper indexes
- **Caching Strategy**: Multi-layer caching with React Query
- **CDN Integration**: Static asset delivery optimization
- **Connection Pooling**: Efficient database connection management

### SEO & Accessibility

#### SEO Features
- **Meta Tags**: Dynamic meta tag generation
- **Structured Data**: JSON-LD schema markup
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **XML Sitemap**: Auto-generated sitemap for search engines

#### Accessibility Features
- **WCAG Compliance**: Level AA accessibility standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: High contrast color schemes

### Development Workflow

#### Code Quality
- **TypeScript**: Strict type checking for error prevention
- **ESLint**: Code linting with React-specific rules
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit validation and testing

#### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API and database interaction testing
- **E2E Tests**: Critical user journey validation
- **Accessibility Tests**: Automated accessibility checking

### Deployment & DevOps

#### Build Process
- **Vite**: Fast build tool with HMR for development
- **TypeScript Compilation**: Type-safe production builds
- **Asset Optimization**: Minification and compression
- **Environment Configuration**: Multi-environment support

#### Monitoring & Analytics
- **Error Tracking**: Real-time error monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Privacy-conscious usage analytics
- **Database Monitoring**: Query performance and optimization

### Scalability Considerations

#### Frontend Scalability
- **Component Reusability**: Modular component architecture
- **State Management**: Scalable state patterns
- **Code Organization**: Feature-based folder structure
- **Performance Budgets**: Bundle size monitoring

#### Backend Scalability
- **Database Optimization**: Query optimization and indexing
- **Caching Strategy**: Multi-level caching implementation
- **API Rate Limiting**: Protection against abuse
- **Horizontal Scaling**: Supabase's built-in scaling

## API Reference

### Authentication Endpoints
```typescript
// Login
POST /auth/sign-in
Body: { email: string, password: string }

// Logout
POST /auth/sign-out

// Session refresh
POST /auth/refresh
```

### Data Endpoints
```typescript
// Get visa experiences
GET /api/visa-experiences
Query: { page?, limit?, university?, major? }

// Create visa experience
POST /api/visa-experiences
Body: VisaExperienceInsert

// Get testimonials
GET /api/testimonials
Query: { page?, limit? }

// Create testimonial
POST /api/testimonials
Body: TestimonialInsert
```

### Admin Endpoints
```typescript
// Get admin dashboard data
GET /api/admin/dashboard
Requires: Admin authentication

// Manage notices
POST /api/admin/notices
PUT /api/admin/notices/:id
DELETE /api/admin/notices/:id
```

## Environment Variables

### Required Variables
```env
# Supabase Configuration
VITE_PUBLIC_SUPABASE_URL=          # Your Supabase project URL
VITE_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anonymous key
SUPABASE_SERVICE_KEY=              # Supabase service role key

# Admin Configuration
ADMIN_EMAIL=                       # Default admin email
ADMIN_PASSWORD=                    # Default admin password
JWT_SECRET=                        # JWT signing secret

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window
RATE_LIMIT_WINDOW_MS=60000         # Rate limit window (ms)
```

### Optional Variables
```env
# Analytics
GOOGLE_ANALYTICS_ID=               # Google Analytics tracking ID
HOTJAR_ID=                         # Hotjar tracking ID

# External Services
SENTRY_DSN=                        # Sentry error tracking
CLOUDINARY_CLOUD_NAME=             # Image optimization service
```

## Database Schema Details

### Relationships
```sql
-- Admin user sessions
admin_users (1) -> (many) admin_sessions

-- Content creation
admin_users (1) -> (many) notices
admin_users (1) -> (many) visa_experiences (soft delete)
admin_users (1) -> (many) testimonials (soft delete)
```

### Indexes
```sql
-- Performance indexes
CREATE INDEX idx_notices_active ON notices(is_active, created_at);
CREATE INDEX idx_visa_experiences_university ON visa_experiences(university);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);
```

### Functions
```sql
-- Admin verification
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = user_uuid
  );
$$ LANGUAGE SQL SECURITY DEFINER;
```

This technical documentation provides a comprehensive overview of the system architecture, implementation details, and operational considerations for the Visa Pathway Hub platform.