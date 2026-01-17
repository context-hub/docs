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
| `MCP_FILE_DIRECTORIES_LIST`  | Enable/disable directory listing            | `true`  |
| `MCP_DOCS_TOOLS_ENABLED`     | Enable/disable Context7 documentation tools | `true`  |
| `MCP_PROJECT_OPERATIONS`     | Enable/disable project operations           | `true`  |

## Available Tool Categories

### File Operations

Master switch for all file operation tools. When set to `false`, all below file tools are disabled regardless of their
individual settings.

| Tool Key              | Description                                              | Environment Variable                              | Default |
|-----------------------|----------------------------------------------------------|---------------------------------------------------|---------|
| `file-read`           | Read content from a file                                 | Always available when file operations are enabled | -       |
| `file-search`         | Search for text or regex patterns in files               | Always available when file operations are enabled | -       |
| `file-replace-content`| Replace text in files with exact matching                | Always available when file operations are enabled | -       |
| `directory-list`      | List files and directories in a specified path           | `MCP_FILE_DIRECTORIES_LIST`                       | `true`  |
| `file-write`          | Create new files or modify existing ones                 | `MCP_FILE_WRITE`                                  | `true`  |
| `php-structure`       | Analyze PHP file structure and class relationships       | Always available when file operations are enabled | -       |

### Context Operations

Tools for working with context information.

| Tool Key          | Description                                             | Environment Variable                                 | Default |
|-------------------|---------------------------------------------------------|------------------------------------------------------|---------|
| `context-request` | Request context information using filters and modifiers | Always available when context operations are enabled | -       |
| `context-get`     | Get a specific context document                         | Always available when context operations are enabled | -       |
| `context`         | List all available contexts                             | Always available when context operations are enabled | -       |

### Prompt Operations

Experimental tools for working with prompts.

| Tool Key       | Description                | Environment Variable    | Default                |
|----------------|----------------------------|-------------------------|------------------------|
| `prompt-get`   | Retrieve a specific prompt | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |
| `prompts-list` | List all available prompts | `MCP_PROMPT_OPERATIONS` | `false` (experimental) |

### Docs Tools

Tools for searching and retrieving documentation from the Context7 service.

| Tool Key         | Description                                              | Environment Variable     | Default |
|------------------|----------------------------------------------------------|--------------------------|---------|
| `library-search` | Search for available documentation libraries in Context7 | `MCP_DOCS_TOOLS_ENABLED` | `true`  |
| `find-docs`      | Find and retrieve documentation for a specific library   | `MCP_DOCS_TOOLS_ENABLED` | `true`  |

#### library-search Tool

Search for available documentation libraries in the Context7 service.

**Parameters:**

| Parameter    | Type    | Required | Default | Description                      |
|--------------|---------|----------|---------|----------------------------------|
| `query`      | string  | Yes      | -       | Search query to find libraries   |
| `maxResults` | integer | No       | 5       | Maximum number of results (1-10) |

**Response:** Returns a JSON array of matching libraries with their IDs, names, and descriptions.

#### find-docs Tool

Retrieve documentation content for a specific library from Context7.

**Parameters:**

| Parameter | Type    | Required | Default | Description                                   |
|-----------|---------|----------|---------|-----------------------------------------------|
| `id`      | string  | Yes      | -       | Library ID (obtained from library-search)     |
| `tokens`  | integer | No       | -       | Maximum number of tokens to retrieve          |
| `topic`   | string  | No       | -       | Specific topic within the library to focus on |

**Response:** Returns the documentation content as text, filtered by the specified topic and token limit if provided.

### Project Operations

Tools for managing and switching between different project contexts.

| Tool Key         | Description                                                   | Environment Variable     | Default |
|------------------|---------------------------------------------------------------|--------------------------|---------|
| `projects-list`  | List all registered projects with their configuration details | `MCP_PROJECT_OPERATIONS` | `true`  |
| `project-switch` | Switch to a different project by path or alias                | `MCP_PROJECT_OPERATIONS` | `true`  |

- Projects must be registered using the `project:add` command before they can be switched to
- The tool validates project existence before attempting to switch
- Provides helpful error messages with available options when a project is not found
- Supports both absolute and relative paths, with automatic path normalization

> **Note:** Read more about project management in the [Project Management](./projects.md) section.

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

### RAG Knowledge Store Tools

Tools for storing and retrieving project knowledge. Requires RAG configuration in `context.yaml`.

| Tool Key     | Description                                           | Requires RAG Enabled |
|--------------|-------------------------------------------------------|---------------------|
| `rag-store`  | Store documentation, insights, and explanations       | Yes                 |
| `rag-search` | Search knowledge base using natural language          | Yes                 |
| `rag-manage` | View statistics and manage the knowledge base         | Yes                 |

> **Note:** For detailed RAG configuration and usage, see the [RAG Knowledge Store](./rag.md) documentation.
