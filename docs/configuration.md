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