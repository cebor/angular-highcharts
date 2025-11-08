# Contributing to Angular Highcharts

Thank you for your interest in contributing to Angular Highcharts! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js >= 18.19.0
- npm
- Git

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/angular-highcharts.git
   cd angular-highcharts
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/cebor/angular-highcharts.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Set up the git commit message template (optional but recommended):
   ```bash
   git config commit.template .gitmessage
   ```

## Development Workflow

### Project Structure

This is an **Angular library wrapper** for Highcharts:
- **Library code**: `projects/angular-highcharts/src/lib/` - the actual npm package
- **Demo app**: `src/` - example application for testing the library

### Building the Library

```bash
npm run build_lib
```

This builds the library to `dist/angular-highcharts` using Angular's `ng-packagr`.

### Running the Demo App

```bash
npm start
```

The demo app serves as a testing ground for library changes. Access it at `http://localhost:4200`.

### Running Tests

```bash
npm test
```

### Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feat/my-new-feature
   # or
   git checkout -b fix/issue-description
   ```

2. Make your changes in the `projects/angular-highcharts/src/lib/` directory for library code

3. Test your changes:
   - Build the library: `npm run build_lib`
   - Run the demo app: `npm start`
   - Run tests: `npm test`

4. Commit your changes following our [commit guidelines](#commit-guidelines)

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

#### Scope

The scope should be the library component being changed:

- `chart` - Chart class
- `stockchart` - StockChart class
- `mapchart` - MapChart class
- `gantt` - HighchartsGantt class
- `directive` - ChartDirective
- `service` - ChartService
- `module` - Module-related changes
- `core` - Core library functionality
- `demo` - Demo app changes

#### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Maximum 50 characters

#### Body

The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and reference **GitHub issues** that this commit closes.

### Examples

```
feat(chart): add support for custom callback on chart initialization

Allow users to provide a custom callback function that will be executed
when the chart is fully initialized. This provides more flexibility for
advanced chart configurations.

Closes #123
```

```
fix(directive): prevent duplicate chart initialization on export

Add guard to prevent doubled callback execution that occurs during
chart export operations.

Fixes #238
```

```
docs(readme): update installation instructions

Update npm installation command and add Angular version compatibility
table.
```

## Pull Request Process

1. **Update your fork** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin feat/my-new-feature
   ```

3. **Create a Pull Request** on GitHub with:
   - A clear title following commit message conventions
   - A detailed description of the changes
   - Reference to any related issues
   - Screenshots/GIFs if applicable (for UI changes)

4. **Ensure all checks pass**:
   - Build succeeds
   - All tests pass
   - Code follows project conventions

5. **Address review feedback** promptly and professionally

6. Once approved, a maintainer will merge your PR

## Coding Standards

### TypeScript

- Follow the existing code style
- Use TypeScript strict mode features
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names

### Angular Conventions

- Follow Angular style guide
- Use AOT-compatible code
- Maintain backward compatibility when possible

### Observable Pattern

Always use the `ref$` observable pattern for chart references:

```typescript
this.chart.ref$.subscribe(chart => {
  // chart is fully initialized
});
```

Avoid using the deprecated `ref` property.

### Highcharts Module Imports

Highcharts modules must be imported with `.src.` extension and default imports (Highcharts 12.x+):

```typescript
import exporting from 'highcharts/modules/exporting.src';  // ✓ (Highcharts 12.x+)
import * as exporting from 'highcharts/modules/exporting.src';  // ✓ (Highcharts 11.x, still supported)
import exporting from 'highcharts/modules/exporting';       // ✗
```

### Documentation

- Add JSDoc comments for public APIs
- Update README.md if adding new features
- Include code examples for new functionality

## Testing

- Write unit tests for new features
- Ensure existing tests pass
- Test with the demo app
- Consider edge cases and error scenarios

### Running Specific Tests

```bash
npm test -- --include='**/chart.spec.ts'
```

## Questions?

If you have questions:
- Check existing issues on GitHub
- Create a new issue with the `question` label
- Reach out to maintainers

## Recognition

Contributors will be recognized in the project's release notes and GitHub contributors list.

Thank you for contributing to Angular Highcharts! 🎉
