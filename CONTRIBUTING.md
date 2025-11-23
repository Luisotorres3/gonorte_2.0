# Contributing to Gonorte 2.0

Thank you for considering contributing to Gonorte 2.0! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Detailed explanation** of the proposed feature
- **Use cases** for the feature
- **Possible implementation** if you have ideas

### Pull Requests

1. **Fork the repository** and create your branch from `develop`
2. **Follow the code style** of the project
3. **Write clear commit messages** following conventional commits
4. **Test your changes** thoroughly
5. **Update documentation** as needed
6. **Submit your pull request**

## Development Setup

1. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/gonorte_2.0.git
cd gonorte_2.0
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your Firebase credentials
```

4. Start development server:

```bash
npm run dev
```

## Code Style Guide

### TypeScript

- Use TypeScript for all new files
- Prefer `type` over `interface` for object types
- Use explicit return types for functions
- Avoid `any` type - use `unknown` if needed

### React

- Use functional components with hooks
- Don't import React unless using features from React namespace
- Prefer named exports over default exports
- Use destructuring for props

### File Organization

- One component per file
- Co-locate related files (component, styles, tests)
- Use index files for cleaner imports
- Keep components focused and single-purpose

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)
- **Files**: Match the main export name

### Component Structure

```tsx
// 1. Imports (grouped and ordered)
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { formatDate } from "@/utils";
import type { UserProfile } from "@/types/user";

// 2. Types/Interfaces
interface Props {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

// 3. Component
const UserCard = ({ user, onUpdate }: Props) => {
  // 3a. Hooks
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // 3b. Event handlers
  const handleEdit = () => setIsEditing(true);

  // 3c. Render
  return <div>{/* Component JSX */}</div>;
};

// 4. Export
export default UserCard;
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic color tokens from theme
- Maintain consistent spacing using Tailwind's scale

### Testing

- Write tests for utility functions
- Test component behavior, not implementation
- Use meaningful test descriptions
- Mock external dependencies

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**

```
feat(auth): add Google authentication
fix(profile): correct image upload issue
docs: update README with deployment instructions
style: format code with Prettier
refactor(api): simplify error handling
```

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

## Review Process

1. **Self-review** your code before submitting
2. **Address** all review comments
3. **Keep** PRs focused and small
4. **Update** branch with latest develop changes
5. **Squash** commits if requested

## Questions?

Feel free to open an issue with the `question` label for any clarifications.

Thank you for contributing! 🎉
