# Configuration

Configuration is built around three core concepts:

- **Document**: The primary output unit produced by the generator - a complete, formatted context file to share with
  LLMs
- **Source**: Where content is collected from
    - Files,
    - GitHub,
    - URLs,
    - Text,
    - Tree,
    - Composer package
    - or Git diffs
- **Modifiers**: Transform source content before inclusion - clean up, simplify, or enhance raw content
- **Imports**: Include and merge configuration from external files to enable modular configuration management

## YAML Configuration Format

If you prefer YAML syntax, you can use the following format.

Create a `context.yaml` file in your project root:

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    overwrite: true
    tags:
      - api
      - documentation
      - v1
    sources:
      - type: text
        description: API Documentation Header
        content: |
          # API Documentation

          This document contains the API source code.
      - type: file
        description: API Controllers
        sourcePaths:
          - src/Controller
        filePattern: "*.php"
        tags:
          - controllers
          - php
      - type: url
        description: API Reference
        urls:
          - https://api.example.com/docs
        tags:
          - reference
          - external
```

## JSON Configuration Format

If you prefer JSON syntax, you can use the following format.

Create a `context.json` file in your project root:

```json
{
  "documents": [
    {
      "description": "API Documentation",
      "outputPath": "docs/api.md",
      "overwrite": true,
      "tags": [
        "api",
        "documentation",
        "v1"
      ],
      "sources": [
        {
          "type": "text",
          "description": "API Documentation Header",
          "content": "# API Documentation\n\nThis document contains the API source code."
        },
        {
          "type": "file",
          "description": "API Controllers",
          "sourcePaths": [
            "src/Controller"
          ],
          "filePattern": "*.php",
          "tags": [
            "controllers",
            "php"
          ]
        },
        {
          "type": "url",
          "description": "API Reference",
          "urls": [
            "https://api.example.com/docs"
          ],
          "tags": [
            "reference",
            "external"
          ]
        }
      ]
    }
  ]
}
```

As you can see it's pretty simple.

## Configuration Imports

For large projects with multiple components or services, you can split your configuration across multiple files using
the import functionality.

- Import paths are resolved relative to the importing file
- You can apply path prefixes to source paths in imported configurations
- Imports can be nested (configurations can import other configurations)
- Circular imports are automatically detected and prevented

### Import Example in YAML

```yaml
import:
  - path: services/api/context.yaml

documents:
  - description: Project Overview
    outputPath: docs/overview.md
    sources:
      - type: text
        content: |
          # Project Documentation

          This is the main project documentation.
```

### Import Example in JSON

```json
{
  "import": [
    {
      "path": "services/api/context.json"
    }
  ],
  "documents": [
    {
      "description": "Project Overview",
      "outputPath": "docs/overview.md",
      "sources": [
        {
          "type": "text",
          "content": "# Project Documentation\n\nThis is the main project documentation."
        }
      ]
    }
  ]
}
```

## Using Environment Variables

Context Generator supports configuration via environment variables, which provides a flexible way to override settings
without modifying your main configuration files.

### Setting Up

1. Create a `.env` file in your project root directory
2. Add configuration variables using `KEY=VALUE` format