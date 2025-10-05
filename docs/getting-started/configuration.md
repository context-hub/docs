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
  - type: local
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
| `format`     | Format type (`config`, `md`, or `markdown`)       | No       | config  |

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

### Markdown Imports

The markdown import type allows importing directories containing markdown files with YAML frontmatter metadata,
automatically converting them into CTX prompts and documents.

This is particularly useful for integrating with AI coding tools like Claude Code and Cursor, and for converting
documentation directories into structured, discoverable resources.

| Parameter    | Description                                       | Required | Default |
|--------------|---------------------------------------------------|----------|---------|
| `type`       | Import type (must be "local")                     | Yes      | -       |
| `path`       | Path to directory containing markdown files       | Yes      | -       |
| `format`     | Format type (must be "md" or "markdown")          | Yes      | -       |
| `pathPrefix` | Prefix to apply to all paths in the configuration | No       | -       |

#### How Markdown Import Works

When you specify `format: md`, the system will:

1. **Recursively scan** the specified directory and all subdirectories for `.md` and `.markdown` files
2. **Parse YAML frontmatter** from each file to extract metadata
3. **Auto-detect resource types** based on metadata:

- Files with `type: prompt` become **prompts**
- Files with `type: document` or explicit document metadata become **documents**
- All other files become **documents** by default (not resources)

4. **Extract titles** from first `#` header if no title/description is provided in frontmatter
5. **Convert content** appropriately based on detected type

> **Important**: Unlike regular resources, markdown files are converted into **prompts** or **documents** that are
> included in your configuration, not registered as separate MCP resources.

#### Primary Use Cases

**1. AI Coding Tools Integration**

Import your existing prompt libraries as structured prompts accessible to AI assistants like Claude Code and Cursor.

```yaml
import:
  - path: ./prompts
    format: md
```

**2. Documentation Directory Import**

Convert documentation folders into CTX documents with proper structure and metadata.

```yaml
import:
  - path: ./docs
    format: md
  - path: ./wiki
    format: md
```

**3. Team Knowledge Base**

Share prompts and documentation across team members while maintaining version control in familiar markdown format.

```yaml
import:
  - path: ./team-knowledge
    format: md
```

#### Markdown File Formats

**Prompt with YAML Frontmatter:**

```markdown
---
type: prompt
description: "Code Review Helper"
tags: ["code-review", "development"]
role: user
schema:
  properties:
    language:
      type: string
      description: "Programming language"
---

# Code Review Assistant

I'll help you review {{language}} code effectively.
```

**Document with Frontmatter:**

```markdown
---
type: document
title: "Database Best Practices"
outputPath: "docs/database.md"
tags: ["database", "guidelines"]
---

# Database Best Practices

This document outlines database design guidelines...
```

**Without Frontmatter (Auto Title Extraction):**

```markdown
# API Documentation

This document describes the API endpoints...
```

The system automatically extracts the title from the first `#` header and creates a document.

#### Title/Description Priority

The system uses this hierarchy for determining titles and descriptions:

1. `description` field in frontmatter (highest priority)
2. `title` field in frontmatter
3. First `#` header in content (auto-extracted)
4. Generated from filename/path (lowest priority)

#### Supported Frontmatter Fields

**For Prompts (`type: prompt`):**

- `type`: Must be "prompt" to create a prompt resource
- `description`: Human readable description (recommended)
- `title`: Alternative to description
- `tags`: Array or comma-separated string of tags
- `role`: Message role (user/assistant), defaults to "user"
- `promptType`: Type of prompt, defaults to "prompt"
- `schema`: JSON schema for prompt arguments

**For Documents (default or `type: document`):**

- `type`: Set to "document" or omit for default behavior
- `description`: Human readable description (recommended)
- `title`: Alternative to description
- `outputPath`: Where to save the generated document
- `overwrite`: Boolean to control file overwriting
- `tags`: Array or comma-separated string of tags
- `sources`: Custom source definitions (optional)

**Type Detection Rules:**

The system determines the resource type in this order:

1. Explicit `type: prompt` in metadata → **Prompt**
2. Has `model` field in metadata → **Prompt** (Claude-style)
3. Has `role`, `messages`, or `schema` fields → **Prompt**
4. Everything else → **Document**

#### Example Directory Structure

```
prompts/
├── python-helper.md          # type: prompt in frontmatter
├── code-review.md            # role field makes it a prompt
└── debugging/
    └── error-analysis.md     # No type field, becomes document
docs/
├── api.md                    # No frontmatter, becomes document
└── guides/
    └── setup.md              # type: document in frontmatter
```

#### Complete Example

```yaml
import:
  # Import team prompts as prompt resources
  - type: local
    path: ./prompts
    format: md
    pathPrefix: /prompts

  # Import documentation as documents
  - type: local
    path: ./docs
    format: md

  # Import knowledge base with custom prefix
  - type: local
    path: ./wiki
    format: md
    pathPrefix: /wiki

documents:
  - description: Project Overview
    outputPath: docs/overview.md
    sources:
      - type: text
        content: |
          # Project Documentation

          This project uses imported markdown resources.
```

#### What Gets Created

Based on the frontmatter and content, the markdown import creates:

**Prompts**:

- Registered in the `prompts` section of configuration
- Accessible via MCP as prompt resources
- Content becomes message content with specified role

**Documents**:

- Registered in the `documents` section of configuration
- Content converted to text sources
- Output paths determined by frontmatter or generated from filename

#### Benefits

- **Version Control Friendly**: Changes to `.md` files automatically update configuration
- **Familiar Format**: Team members work with standard markdown files
- **Flexible Metadata**: Rich frontmatter support for detailed configuration
- **Auto-Discovery**: No manual registration needed - just add `.md` files to the directory
- **Type Flexibility**: Same directory can contain both prompts and documents

#### Important Notes

- Markdown imports create **prompts** and **documents**, not generic "resources"
- The `type` field in frontmatter determines whether a file becomes a prompt or document
- Default behavior (no `type` specified) creates documents
- Directory structure is preserved but all files are processed recursively
- Path prefix affects output paths for generated documents

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
