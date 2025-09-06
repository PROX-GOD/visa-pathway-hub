# Contributing Guidelines

## 🤝 How to Contribute

We welcome contributions from the community! Whether you're a student who has gone through the visa process, a developer who wants to improve the platform, or someone who wants to help with documentation, there are many ways to contribute.

### 🎯 Types of Contributions

#### 📝 Content Contributions
- **Share Your Experience**: Submit your F-1 visa application experience
- **Write Testimonials**: Share your success story to inspire others
- **Improve Documentation**: Help us make our guides clearer and more comprehensive
- **Submit Blog Posts**: Write articles about visa processes, student life, or study tips

#### 💻 Code Contributions
- **Bug Fixes**: Report and fix issues you encounter
- **Feature Development**: Implement new features to help students
- **Performance Improvements**: Optimize the platform for better user experience
- **Testing**: Add tests to improve code reliability

#### 🎨 Design Contributions
- **UI/UX Improvements**: Enhance the user interface and experience
- **Accessibility**: Make the platform more accessible to all users
- **Mobile Optimization**: Improve the mobile experience
- **Visual Design**: Create graphics, icons, or illustrations

### 🛠️ Development Setup

#### Prerequisites
- Node.js 16.0 or higher
- npm or bun package manager
- Git for version control
- Code editor (VS Code recommended)

#### Local Development Setup

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub first
   git clone https://github.com/your-username/visa-pathway-hub.git
   cd visa-pathway-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Run Tests and Linting**
   ```bash
   npm run lint
   npm run build  # Test production build
   ```

### 📋 Development Workflow

#### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/feature-name`: Individual feature development
- `fix/issue-description`: Bug fixes
- `docs/topic`: Documentation updates

#### Commit Messages
Use conventional commit format:
```
type(scope): description

feat(auth): add admin authentication system
fix(ui): resolve mobile navigation issues
docs(readme): update installation instructions
style(components): improve button styling
refactor(api): optimize database queries
test(auth): add user authentication tests
```

#### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run lint      # Check code quality
   npm run build     # Test production build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): your descriptive message"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

### 🔍 Code Review Guidelines

#### For Contributors
- Write clear, descriptive commit messages
- Keep pull requests focused and small
- Include tests for new features
- Update documentation for user-facing changes
- Respond to review feedback promptly

#### For Reviewers
- Be constructive and helpful in feedback
- Focus on code quality, security, and maintainability
- Test the changes locally when possible
- Approve only when confident in the changes

### 📊 Content Guidelines

#### Experience Sharing
- **Be Honest**: Share both positive and negative experiences
- **Be Detailed**: Include specific information that helps others
- **Protect Privacy**: Don't share personal identifying information
- **Stay Relevant**: Focus on visa-related experiences

#### Blog Posts
- **Original Content**: Write original, helpful content
- **Proper Attribution**: Credit sources and references
- **SEO Friendly**: Use clear titles and structure
- **Regular Updates**: Keep information current

### 🎨 Design Guidelines

#### Visual Design
- **Brand Consistency**: Follow the established visual identity
- **Accessibility**: Ensure designs work for all users
- **Mobile First**: Design for mobile devices first
- **Performance**: Optimize images and assets

#### User Experience
- **User-Centered**: Design with users' needs in mind
- **Intuitive Navigation**: Make features easy to find and use
- **Clear Information**: Present information clearly and concisely
- **Feedback**: Provide clear feedback for user actions

### 🐛 Issue Reporting

#### Bug Reports
Include the following information:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, device, operating system
- **Screenshots**: Visual evidence if applicable

#### Feature Requests
Include the following information:
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other ways to solve the problem
- **User Impact**: Who benefits and how?

### 🏆 Recognition

We recognize contributors in several ways:
- **Contributors List**: Featured in repository documentation
- **Community Spotlight**: Highlighted in blog posts and social media
- **Beta Access**: Early access to new features
- **Special Recognition**: For significant contributions

### 📞 Getting Help

If you need help with contributing:
- **Documentation**: Check this guide and the README
- **Issues**: Look for issues labeled "good first issue" or "help wanted"
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out through the contact form on the website

### 🎯 Community Guidelines

#### Be Respectful
- Treat all community members with respect
- Be patient with newcomers
- Provide constructive feedback
- Celebrate others' contributions

#### Be Inclusive
- Welcome contributors from all backgrounds
- Use inclusive language
- Make space for different perspectives
- Help create a safe environment for everyone

#### Be Collaborative
- Share knowledge and help others learn
- Work together to solve problems
- Give credit where credit is due
- Build on each other's work

Thank you for contributing to the Visa Pathway Hub! Together, we can help make the F-1 visa process easier for international students. 🎓✈️