# Visa Pathway Hub 🇺🇸

A comprehensive web platform designed to help international students navigate the F-1 visa process for studying in the United States. This platform provides free resources, community experiences, and expert guidance to maximize your chances of visa approval.

## 🌟 Features

### 📚 **Educational Resources**
- **F-1 Visa Information Hub**: Comprehensive guides covering all aspects of the F-1 visa process
- **Interview Preparation Tools**: Practice questions, tips, and strategies for visa interviews
- **Study in USA Guide**: Information about universities, application processes, and student life
- **Blog & Articles**: Regular updates on visa policies, tips, and success stories

### 👥 **Community Features**
- **Visa Experiences Sharing**: Real stories from students who have gone through the visa process
- **Testimonials**: Success stories and feedback from community members
- **Community Links**: Connect with other prospective and current international students

### 🛠️ **Interactive Tools**
- **Share Your Experience**: Platform for users to contribute their visa journey stories
- **Resource Library**: Curated collection of helpful documents, templates, and guides
- **FAQ Section**: Answers to frequently asked questions about the F-1 visa process

### 🔧 **Administrative Features**
- **Admin Dashboard**: Content management and user oversight
- **Notice System**: Important announcements and emergency notices
- **Logo Competition**: Community engagement features
- **Donation System**: Support platform maintenance and growth

## 🏗️ Technical Architecture

### **Frontend Technology Stack**
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: 
  - TailwindCSS 3.4.11 for utility-first styling
  - Custom CSS modules for specific components
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Query (TanStack Query) 5.56.2
- **Form Handling**: React Hook Form 7.53.0 with Zod validation
- **Icons**: Lucide React 0.462.0

### **Backend & Database**
- **Backend-as-a-Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth with custom admin system
- **Real-time Features**: Supabase Realtime subscriptions
- **File Storage**: Supabase Storage for images and documents

### **Development Tools**
- **Language**: TypeScript 5.5.3
- **Linting**: ESLint 9.9.0 with React-specific rules
- **Code Formatting**: TypeScript ESLint
- **Package Manager**: npm (with bun.lockb suggesting Bun compatibility)

## 📊 Database Schema

The application uses the following main database tables:

### **Tables**
1. **`notices`** - System announcements and emergency notices
   - Title, content, slug, active status, emergency flag
   - Created by admin users with timestamps

2. **`visa_experiences`** - User-submitted visa application experiences
   - Personal details (name, email, university, major)
   - Interview details (date, consulate, approval status)
   - Experience narrative and approval workflow

3. **`testimonials`** - User testimonials and success stories
   - Personal information, quotes, university details
   - Photo uploads and role information

4. **`admin_users`** - Administrative user management
   - User roles and permissions
   - Session management for admin access

### **Key Features**
- **Row Level Security (RLS)**: Implemented for data privacy and security
- **Soft Deletes**: Non-destructive data removal with audit trails
- **Admin Functions**: Custom PostgreSQL functions for admin verification
- **Audit Trails**: Created/updated timestamps and user tracking

## 🚀 Getting Started

### **Prerequisites**
- Node.js (16.0 or higher)
- npm or bun package manager
- Supabase account and project

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/PROX-GOD/visa-pathway-hub.git
   cd visa-pathway-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_PUBLIC_SUPABASE_URL="your-project.supabase.co"
   VITE_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_KEY="your-service-key"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-secure-password"
   JWT_SECRET="your-jwt-secret"
   RATE_LIMIT_MAX_REQUESTS=100
   RATE_LIMIT_WINDOW_MS=60000
   ```

4. **Database Setup**
   ```bash
   # Initialize Supabase (if using local development)
   npx supabase init
   npx supabase start
   npx supabase db reset
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common utilities
│   ├── home/           # Homepage sections
│   ├── layout/         # Layout components (Header, Footer)
│   ├── notice/         # Notice and announcement components
│   └── ui/             # shadcn/ui components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── server/             # Server-side utilities
```

### **Key Directories Explained**
- **`/components`**: Modular React components organized by feature
- **`/pages`**: Top-level route components corresponding to application pages
- **`/integrations/supabase`**: Database types, client configuration, and API functions
- **`/hooks`**: Custom React hooks for data fetching and state management
- **`/server`**: Server-side utilities and API helpers

## 🎯 Core Features Explained

### **F-1 Visa Information System**
The platform provides comprehensive information about the F-1 visa process, including:
- Step-by-step application guidance
- Required documentation checklists
- Interview preparation materials
- Timeline and process explanations

### **Community Experience Sharing**
Users can share their visa application experiences, including:
- Interview questions and experiences
- Approval/rejection stories
- University and consulate-specific information
- Tips and advice for future applicants

### **Administrative System**
Robust admin panel featuring:
- Content management for all user-generated content
- Notice and announcement system
- User management and moderation tools
- Analytics and reporting capabilities

### **Responsive Design**
- Mobile-first responsive design
- Progressive Web App (PWA) capabilities
- Optimized for all device sizes
- Desktop mode checking for optimal user experience

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Authentication**: Secure user authentication via Supabase Auth
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive form validation using Zod schemas
- **XSS Protection**: Sanitized content rendering
- **HTTPS Only**: Secure data transmission

## 🌐 SEO & Performance

- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance**: Optimized images, lazy loading, and code splitting
- **Accessibility**: WCAG compliance and screen reader support
- **Analytics**: Built-in tracking for user engagement

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is part of the Spring/Fall USA initiative to support international students. Please contact the maintainers for licensing information.

## 📞 Support & Contact

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Community**: Join our community links for discussions
- **Contact**: Use the contact form on the website for direct communication

## 🙏 Acknowledgments

- **Contributors**: All community members who have shared their experiences
- **Supabase**: For providing the backend infrastructure
- **Radix UI**: For accessible UI components
- **Tailwind CSS**: For the utility-first CSS framework
- **React Community**: For the amazing ecosystem and tools

---

**Built with ❤️ for international students pursuing their American dream**