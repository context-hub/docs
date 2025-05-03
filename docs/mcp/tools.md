# Built-in MCP Server Tools

CTX provides several tools that can be enabled or disabled through environment variables. Below is a
description of each tool, how to configure them, and how to use advanced features like JSON Schema, conditional
arguments, and template processing.

## Environment Variables Configuration

The tools system can be configured using environment variables to enable or disable specific features:

### General Configuration

| Variable                     | Description                                 | Default |
|------------------------------|---------------------------------------------|---------|
| `MCP_CUSTOM_TOOLS_ENABLE`    | Enable/disable custom tools                 | `true`  |
| `MCP_TOOL_MAX_RUNTIME`       | Maximum runtime for a command in seconds    | `30`    |
| `MCP_TOOL_COMMAND_EXECUTION` | Enable/disable command execution            | `true`  |
| `MCP_FILE_OPERATIONS`        | Master switch for all file operation tools  | `true`  |
| `MCP_FILE_WRITE`             | Enable/disable file write operations        | `true`  |
| `MCP_FILE_APPLY_PATCH`       | Enable/disable applying patches to files    | `false` |
| `MCP_FILE_DIRECTORIES_LIST`  | Enable/disable directory listing            | `true`  |
| `MCP_DOCS_TOOLS_ENABLED`     | Enable/disable Context7 documentation tools | `true`  |

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
| `prompt-get`   | Retrieve a specific prompt | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |
| `prompts-list` | List all available prompts | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |

### Docs Tools (`MCP_DOCS_TOOLS_ENABLED`)

Search for documentation libraries available on the Context7 service.

#### Parameters

| Parameter | Type    | Required | Default | Description                                  |
|-----------|---------|----------|---------|----------------------------------------------|
| `query`   | string  | Yes      | -       | Search query to find documentation libraries |
| `limit`   | integer | No       | 5       | Maximum number of results to return          |

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
