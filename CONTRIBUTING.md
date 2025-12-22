# Contributing to nt-portfolio

Thank you for your interest in contributing to my personal portfolio! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git
- Basic understanding of React, Vite, and modern web development

### Local Development Setup

1. **Fork the repository**
   ```bash
   # Fork this repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/nt-portfolio.git
   cd nt-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Project Structure

```
nt-portfolio/
├── public/                 # Static assets
│   ├── images/            # Image assets
│   ├── models/            # 3D models (.glb files)
│   └── CV/               # Resume/CV files
├── src/
│   ├── components/       # Reusable React components
│   ├── sections/         # Page section components
│   ├── constants/        # Constants and configuration
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── .github/             # GitHub workflows and templates
├── package.json          # Project dependencies
└── vite.config.js       # Vite configuration
```

## How to Contribute

### Reporting Issues

1. **Check existing issues** to avoid duplicates
2. **Use clear and descriptive titles**
3. **Provide detailed information** including:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and environment details
   - Screenshots if applicable
4. **Add appropriate labels** (bug, enhancement, question, etc.)

### Making Changes

1. **Create a branch** for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

2. **Make your changes** following the code style guidelines below

3. **Test your changes** thoroughly:
   - Run the development server
   - Test on different screen sizes
   - Check browser console for errors
   - Verify 3D models load correctly

4. **Commit your changes** using semantic commit messages:
   ```bash
   git add .
   git commit -m "feat: add new contact form animation"
   # or
   git commit -m "fix: resolve mobile navigation issue"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Testing instructions

## Code Style Guidelines

### React Components

- Use functional components with hooks
- Follow JSX best practices
- Use descriptive component and prop names
- Implement proper error boundaries

```jsx
// Good
const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
```

### CSS/Styling

- Use Tailwind CSS classes when possible
- Keep custom CSS in appropriate section files
- Ensure responsive design
- Follow mobile-first approach

### File Naming

- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- Assets: `kebab-case`
- Folders: `kebab-case`

### 3D Models

- Use optimized .glb format
- Keep file sizes reasonable (< 5MB)
- Test loading performance
- Include fallbacks for unsupported browsers

## Development Guidelines

### Performance

- Optimize images and 3D models
- Use React.memo for expensive components
- Implement lazy loading where appropriate
- Monitor bundle size

### Accessibility

- Include alt text for images
- Use semantic HTML elements
- Ensure keyboard navigation
- Test with screen readers

### Browser Compatibility

- Test on modern browsers (Chrome, Firefox, Safari, Edge)
- Provide graceful degradation for older browsers
- Use appropriate vendor prefixes when needed

## Testing

### Manual Testing Checklist

- [ ] Navigation works correctly
- [ ] All sections load properly
- [ ] 3D models rotate and display
- [ ] Contact form functions (if applicable)
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Links open correctly
- [ ] No console errors
- [ ] Performance is acceptable

### Linting and Formatting

Run the following commands before submitting:

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## Types of Contributions

### 🐛 Bug Reports
Help improve the portfolio by reporting bugs in:
- Navigation and layout issues
- 3D model loading problems
- Performance bottlenecks
- Mobile responsiveness
- Browser compatibility

### 💡 Feature Suggestions
Suggest improvements for:
- New sections or content
- Enhanced animations
- Better UX/UI
- Performance optimizations
- Accessibility improvements

### 📝 Documentation
Help improve:
- README documentation
- Code comments
- Component documentation
- Setup instructions

### 🎨 Design Contributions
- UI/UX improvements
- New animations
- Better responsive design
- Visual enhancements

### 🔧 Technical Contributions
- Performance optimizations
- Code refactoring
- Build improvements
- New integrations

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Update CHANGELOG** for significant changes
4. **Rebase** your branch if necessary

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile responsiveness checked
- [ ] Performance impact assessed

## Screenshots
If applicable, include screenshots

## Additional Notes
Any additional context
```

## Getting Help

If you need help contributing:

1. **Check existing documentation** and issues
2. **Create an issue** with the "question" label
3. **Contact me directly**: nithin.thadem@gmail.com

## Recognition

Contributors are recognized in:
- README contributor section
- Git commit history
- Special mentions in project updates

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for everyone.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to my portfolio! Your efforts help make this project better and showcase modern web development practices.