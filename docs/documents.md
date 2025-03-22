# Document

A document is the primary output unit produced by the Context Generator. It represents a complete, formatted context
file that's designed to be shared with Large Language Models (LLMs) like ChatGPT or Claude.

Each document produces a single output file (typically Markdown) that contains all the compiled
content from various sources.

## Purpose

Documents solve a common problem when working with LLMs: providing sufficient context about your codebase. They help
you:

- Organize related code and context in a single file
- Structure information in a way that's optimal for LLM understanding
- Maintain consistency across multiple interactions with AI tools

### Document properties

| Property      | Type    | Default  | Description                                |
|---------------|---------|----------|--------------------------------------------|
| `description` | string  | required | Human-readable description of the document |
| `outputPath`  | string  | required | Path where the document will be saved      |
| `overwrite`   | boolean | `true`   | Whether to overwrite existing files        |
| `sources`     | array   | required | List of content sources for this document  |
| `tags`        | array   | []       | List of tags for this document             |

## Example

In a typical workflow, you might create documents like:

- An API documentation document containing controller definitions
- A recent changes document showing code modified in the last week
- A project overview document with architectural diagrams and core component explanations

Here's a YAML example of a document configuration with explanations for each part:

```yaml
documents:
  - description: "API Documentation for User Management"
    outputPath: "docs/user-api.md"
    overwrite: true
    tags:
      - api
      - users
      - documentation
    sources:
      - type: text
        description: "Documentation Header"
        content: |
          # User Management API

          This document provides comprehensive documentation for the User Management API.
          It includes controllers, models, and related components.

      - type: file
        description: "User Controllers"
        sourcePaths:
          - src/Controller/User
        filePattern: "*.php"
        showTreeView: true
        modifiers:
          - php-signature

      - type: github
        description: "Authentication Library"
        repository: "acme/auth-library"
        sourcePaths:
          - src/Auth
        branch: "main"
        filePattern: "*.php"
        githubToken: "${GITHUB_TOKEN}"

      - type: git_diff
        description: "Recent User API Changes"
        commit: "last-week"
        path: "src/User"
        filePattern: "*.php"
        showStats: true
```

### Explanation

#### Document Properties

1. **`description`**: Human-readable description of the document's purpose
    - Example: "API Documentation for User Management"
    - This helps identify the document's purpose and contents

2. **`outputPath`**: Where the generated document will be saved
    - Example: `docs/user-api.md`
    - The output directory will be created if it doesn't exist

3. **`overwrite`**: Whether to replace an existing file (default: `true`)
    - When set to `false`, generation will be skipped if the file already exists
    - It's useful for Github sources where might be a lot og files that you need to fetch from remote server.

4. **`tags`**: Optional labels for categorization
    - Example: ["api", "users", "documentation"]
    - Useful for organizing multiple documents

## Sources (Content Providers)

Each document contains an array of sources that contribute content to the final output:

### Text Source

```yaml
- type: text
  description: "Documentation Header"
  content: |
    # User Management API
    ...
```

- Adds custom text directly to the document
- Useful for headers, introductions, and custom notes
- The pipe (`|`) allows for multi-line text with preserved formatting

### File Source

```yaml
- type: file
  description: "User Controllers"
  sourcePaths:
    - src/Controller/User
  filePattern: "*.php"
  showTreeView: true
  modifiers:
    - php-signature
```

### GitHub Source

```yaml
- type: github
  description: "Authentication Library"
  repository: "acme/auth-library"
  sourcePaths:
    - src/Auth
  ...
```

- Pulls code directly from a GitHub repository
- Useful for including external dependencies or open-source components

### Git Diff Source

```yaml
- type: git_diff
  description: "Recent User API Changes"
  commit: "last-week"
  ...
```

- Shows recent changes in the codebase
- Great for providing context about what's been modified recently