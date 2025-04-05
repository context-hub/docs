# MCP Server Tools

The MCP Server provides several tools that can be enabled or disabled through environment variables. Below is a
description of each tool.

## Environment Variables Configuration

### General Configuration

- `MCP_DOCUMENT_NAME_FORMAT`: Controls how documents are named in the system.
    - Default: `[{path}] {description}`
    - Example: A document might appear as `[src/file.php] Main controller file`

## Available Tool Categories

### File Operations (`MCP_FILE_OPERATIONS=true`)

Master switch for all file operation tools. When set to `false`, all below file tools are disabled regardless of their
individual settings.

| Tool Key           | Description                                                  | Environment Variable                              | Default                |
|--------------------|--------------------------------------------------------------|---------------------------------------------------|------------------------|
| `file-info`        | Get information about a file (size, type, modification date) | Always available when file operations are enabled | -                      |
| `file-read`        | Read content from a file                                     | Always available when file operations are enabled | -                      |
| `file-rename`      | Rename a file                                                | Always available when file operations are enabled | -                      |
| `file-move`        | Move a file from one location to another                     | Always available when file operations are enabled | -                      |
| `directory-list`   | List files and directories in a specified path               | `MCP_FILE_DIRECTORIES_LIST`                       | `true`                 |
| `file-write`       | Create new files or modify existing ones                     | `MCP_FILE_WRITE`                                  | `true`                 |
| `file-apply-patch` | Apply git-style patches to files                             | `MCP_FILE_APPLY_PATCH`                            | `false` (experimental) |

### Context Operations (`MCP_CONTEXT_OPERATIONS=true`)

Tools for working with context information.

| Tool Key          | Description                                             | Environment Variable                                 | Default |
|-------------------|---------------------------------------------------------|------------------------------------------------------|---------|
| `context-request` | Request context information using filters and modifiers | Always available when context operations are enabled | -       |
| `context-get`     | Get a specific context document                         | Always available when context operations are enabled | -       |
| `context`         | List all available contexts                             | Always available when context operations are enabled | -       |

### Prompt Operations (`MCP_PROMPT_OPERATIONS=false`)

Experimental tools for working with prompts.

| Tool Key       | Description                | Environment Variable    | Default                |
|----------------|----------------------------|-------------------------|------------------------|
| `get-prompt`   | Retrieve a specific prompt | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |
| `list-prompts` | List all available prompts | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |

### Always Available Tools

These tools are always available regardless of environment configuration:

| Tool Key                | Description                                      |
|-------------------------|--------------------------------------------------|
| `project-structure`     | Get information about the project structure      |
| `filesystem-operations` | Perform basic filesystem queries                 |
| `list-resources`        | List all available resources                     |
| `json-schema`           | Get JSON schema for various entities             |
| `document-content`      | Get document content by ID                       |
| `list-tools`            | List all available tools (what you're using now) |

## Configuration Examples

### Developer Mode (All Features)

```
MCP_FILE_OPERATIONS=true
MCP_FILE_WRITE=true
MCP_FILE_APPLY_PATCH=true
MCP_FILE_DIRECTORIES_LIST=true
MCP_CONTEXT_OPERATIONS=true
MCP_PROMPT_OPERATIONS=true
```

### Read-Only Mode (Safe for Production)

```
MCP_FILE_OPERATIONS=true
MCP_FILE_WRITE=false
MCP_FILE_APPLY_PATCH=false
MCP_FILE_DIRECTORIES_LIST=true
MCP_CONTEXT_OPERATIONS=true
MCP_PROMPT_OPERATIONS=false
```

### Minimal Mode

```
MCP_FILE_OPERATIONS=true
MCP_FILE_WRITE=false
MCP_FILE_APPLY_PATCH=false
MCP_FILE_DIRECTORIES_LIST=true
MCP_CONTEXT_OPERATIONS=false
MCP_PROMPT_OPERATIONS=false
```

This documentation provides users with a clear understanding of available tools, their purpose, and how to enable or
disable them without requiring knowledge of the underlying class implementation.