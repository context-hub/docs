# Configuration

Configuration is built around three core concepts:

- **Document**: The primary output unit produced by the generator - a complete, formatted context file to share with
  LLMs
- **Source**: Where content is collected from Files, GitHub, Gitlab, URLs, Text, Tree, Composer package MCP or Git diffs
- **Modifiers**: Transform source content before inclusion - clean up, simplify, or enhance raw content
- **Imports**: Include and merge configuration from external files to enable modular configuration management

## YAML Configuration Format

If you prefer YAML syntax, you can use the following format.

Create a `context.yaml` file in your project root:

```yaml
$schema: https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json

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
  "$schema": "https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json",
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

### Key Features

* Import paths are resolved relative to the importing file
* You can apply path prefixes to source paths in imported configurations
* Imports can be nested (configurations can import other configurations)
* Circular imports are automatically detected and prevented

### Import Formats

The `import` section supports several formats:

#### String Format (Simplest)

```yaml
import:
  - "services/api/context.yaml"
```

#### Object Format with Path

```yaml
import:
  - path: services/api/context.yaml
```

#### Object Format with Path and Prefix

```yaml
import:
  - path: services/api/context.yaml
    pathPrefix: /api
```

#### Explicit Type Format

```yaml
import:
  - type: file
    path: services/api/context.yaml
    pathPrefix: /api
  - type: url
    url: https://example.com/shared-config.json
```

### Local File Imports

The local import type allows importing configuration from files on the local filesystem.

| Parameter    | Description                                       | Required | Default |
|--------------|---------------------------------------------------|----------|---------|
| `path`       | Path to the local configuration file              | Yes      | -       |
| `pathPrefix` | Prefix to apply to all paths in the configuration | No       | -       |
| `docs`       | List of document paths to selectively import      | No       | -       |

#### Selective Imports

You can selectively import specific documents by specifying their output paths:

```yaml
import:
  - path: services/common/context.yaml
    docs:
      - "api/*.md"      # Import all API docs
      - "docs/core.md"  # Import a specific document
```

#### Wildcard Imports

You can use wildcards to import multiple configuration files at once:

```yaml
import:
  - path: "services/*/context.yaml"  # Import from all service directories
  - path: "modules/**/*.yaml"        # Import all YAML files in modules and subdirectories
```

Wildcard patterns support:

- `*` - Match any characters except directory separators
- `**` - Match any characters including directory separators
- `?` - Match a single character
- `[abc]` - Match any character in the set
- `{a,b,c}` - Match any of the comma-separated patterns

### URL Imports

The URL import type allows importing configuration from remote URLs.

| Parameter | Description                            | Required | Default |
|-----------|----------------------------------------|----------|---------|
| `url`     | URL to fetch the configuration from    | Yes      | -       |
| `ttl`     | Cache time-to-live in seconds          | No       | 300     |
| `headers` | HTTP headers to include in the request | No       | {}      |

URL imports support both JSON and YAML formats, automatically detected from the Content-Type header or file extension.

#### URL Import Example

```yaml
import:
  - type: url
    url: https://example.com/shared-config.json
    ttl: 600  # Cache time-to-live in seconds (default: 300)
    headers: # Optional HTTP headers for the request
      Authorization: "Bearer {{TOKEN}}"
      Accept: "application/json"
```

### Example in YAML

This example imports configurations from both local files and a URL:

```yaml
import:
  - path: services/api/context.yaml
    pathPrefix: /api
  - type: url
    url: https://example.com/shared-configs.json

documents:
  - description: Project Overview
    outputPath: docs/overview.md
    sources:
      - type: text
        content: |
          # Project Documentation

          This is the main project documentation.
      - type: file
        description: Project README
        sourcePaths:
          - README.md
```

### Example in JSON

The same configuration in JSON format:

```json
{
  "import": [
    {
      "path": "services/api/context.json"
    }
  ],
  "documents": [
    {
      "description": "Common Components",
      "outputPath": "docs/components.md",
      "sources": [
        {
          "type": "file",
          "sourcePaths": [
            "src/Components"
          ]
        }
      ]
    },
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

### Markdown Imports

The markdown import type allows importing directories containing markdown files with YAML frontmatter metadata,
automatically converting them into CTX prompts, documents, and resources.

| Parameter | Description                                 | Required | Default |
|-----------|---------------------------------------------|----------|---------|
| `type`    | Import type (must be "local")               | No       | -       |
| `path`    | Path to directory containing markdown files | Yes      | -       |
| `format`  | Format type ("md")                          | Yes      | -       |

When you specify `format: md`, the system will:

1. **Recursively scan** the specified directory and all subdirectories for `.md` and `.markdown` files
2. **Parse YAML frontmatter** from each file to extract metadata
3. **Auto-detect resource types** based on metadata (`type: prompt` or default to resource)
4. **Register each file** as an individual CTX resource accessible via MCP
5. **Extract titles** from first `#` header if no title is provided in frontmatter

#### Basic Markdown Import

```yaml
import:
  - path: ./docs
    format: md
```

#### Markdown Import with Path Prefix

```yaml
import:
  - path: ./prompts
    format: md
    pathPrefix: /team-prompts
```

#### Markdown File Formats

**With YAML Frontmatter:**

```markdown
---
type: prompt
title: "Code Review Helper"
description: "Assists with code review tasks"
tags: ["code-review", "development"]
schema:
  properties:
    language:
      type: string
      description: "Programming language"
---

# Code Review Assistant

I'll help you review {{language}} code effectively.
```

**Without Frontmatter (Auto Title Extraction):**

```markdown
# Database Best Practices

This document outlines database design guidelines...
```

#### Title/Description Priority

The system uses this hierarchy for determining titles and descriptions:

1. `description` field in frontmatter (highest priority)
2. `title` field in frontmatter
3. First `#` header in content (auto-extracted)
4. Generated from filename (lowest priority)

#### Supported Frontmatter Fields

**For Prompts (`type: prompt`):**

- `id`: Unique identifier (auto-generated from filename if not provided)
- `title`/`description`: Human readable description
- `tags`: Array or comma-separated string of tags
- `role`: Message role (user/assistant)
- `schema`: JSON schema for prompt arguments
- `messages`: Array of message objects
- `extend`: Template inheritance configuration

#### Example Directory Structure

```
prompts/
├── python-helper.md          # With full frontmatter
├── code-review-checklist.md  # No frontmatter, auto title
└── debugging/
    └── error-analysis.md     # Nested directory
```

This import type is particularly useful for:

- **AI Coding Tools Integration**: Making documentation discoverable to Claude Code, Cursor, and other AI assistants
- **Team Knowledge Bases**: Converting documentation directories into structured resources
- **Prompt Libraries**: Managing collections of prompts in familiar markdown format

### Circular Import Detection

The system automatically detects and prevents circular imports. If a circular import is detected, an error will be
thrown with information about the import chain that created the circular dependency.

### Import Resolution Process

When a configuration file is processed:

1. All imports are processed before the main configuration
2. Nested imports are resolved recursively
3. Path prefixes are applied to document output paths and source paths
4. The resolved configuration is merged with the original configuration
5. Document sections are combined (not replaced)

## Using variables in configuration

**CTX** supports various types of variables throughout your configuration files, including environment
variables, predefined system variables, and custom configuration variables.

Read more about [variables](./variables.md) in the documentation.