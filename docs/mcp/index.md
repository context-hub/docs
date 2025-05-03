# MCP Server Integration

The MCP Server can also be integrated with AI assistants like Claude to provide direct access to your project's context.
This allows AI models to request specific information about your codebase without requiring manual context uploads.

### Table of Contents

- [How Integration Works](#how-integration-works)
- [Key Features](#key-features)
    - [Context Awareness](#context-awareness)
    - [Filesystem Operations](#filesystem-operations)
    - [Routing System](#routing-system)
- [Why Use MCP?](#why)
- [Setting Up](#setting-up)
    - [Installation Prerequisites](#setting-up)
    - [Basic Configuration](#steps)
    - [Platform-Specific Configurations](#platform-specific-configurations)
        - [Linux Configuration](#linux-configuration)
        - [Windows Configuration](#windows-configuration)
        - [Windows with WSL Configuration](#windows-with-wsl-configuration)
    - [Environment Variable Configuration](#environment-variable-configuration)
        - [Setting Environment Variables in Config](#setting-environment-variables-in-config)
        - [Environment Variables with WSL](#environment-variables-with-wsl)

## How Integration Works

When you connect an AI assistant to your application via **MCP**:

1. The assistant can request specific context about your project directly through the MCP protocol
2. Your application processes these requests by accessing your codebase based on your configuration
3. Relevant code, documentation, and structural information is formatted and returned to the assistant
4. The assistant uses this rich context to provide more accurate, project-aware responses

This integration enhances both Tools and Prompts components by:

- Allowing AI assistants to trigger tool execution directly
- Enabling assistants to access and utilize your prompt library
- Providing real-time context awareness for more accurate assistance

```mermaid
sequenceDiagram
    participant User
    participant Claude
    participant MCP Server as "CTX<br/>MCP Server"
    participant Files as "Project Files"
    participant Config as "context.yaml/<br/>context.json"
    User ->> Claude: Ask question about project
    Claude ->> MCP Server: Request context (MCP protocol)
    MCP Server ->> Config: Read configuration
    MCP Server ->> Files: Access relevant files
    Note over MCP Server: Filter & process content<br/>based on configuration
    MCP Server -->> Claude: Return formatted context
    Claude ->> User: Provide contextually aware response
    Note over User, Claude: Subsequent questions
    User ->> Claude: Follow-up question
    Claude ->> MCP Server: Request additional context
    MCP Server ->> Files: Access specific files
    MCP Server -->> Claude: Return targeted information
    Claude ->> User: Provide detailed response
```

The diagram shows how Claude communicates with the MCP Server, which accesses your project files
according to your configuration.

## Key Features

### Context Awareness

- Access to structured documentation and code from your project
- Contextual understanding of project architecture and dependencies
- Support for multiple context files organized by functionality or domain

### Filesystem Operations

- **Read files**
- **Write and create files**
- **Move and rename files** for project restructuring
- **Get file information**

### Routing System

The MCP Server uses a flexible HTTP-style routing system that makes handling requests more maintainable and extensible.
Each operation is handled by a dedicated controller, using appropriate HTTP semantics:

- `GET` requests for reading data
- `POST` requests for actions that modify state

## Why?

**Developer-Controlled Context**: As a developer and product owner, YOU know your code best. **CTX** puts you
in control of exactly what context is relevant, rather than relying on AI to guess.

### The Problem with Automatic Context Gathering

Let's imagine IDE tools like Cursor that attempt to gather context automatically:

1. They must guess which files are relevant to your current task, often missing critical components or including
   irrelevant ones
2. They operate with limited context windows, forcing trade-offs between breadth and depth of context
3. Without your guidance, they can prioritize the wrong files, including less important context while omitting what you
   actually need

**CTX** solves these problems by giving you explicit control over which parts of your codebase are included,
ensuring the AI receives precisely the information needed to assist you effectively.

## Setting Up

First of all you need to [install](https://claude.ai/download) Claude app and latest version of **CTX** (**>
1.18.0**).

> **Note**: The MCP server is only available in the desktop version of Claude. The web version does not support it.
>

### Steps

1. Download Claude App for your operating system
2. Open **Settings** → **Developer** → **Edit config** → open config file `claude_desktop_config`
3. Register the **CTX** MCP server using the appropriate configuration

--- 

**Important: You must specify the path to your project using the `-c` flag. The project root should contain a
`context.json` or `context.yaml` configuration file.**

### Platform-Specific Configurations

#### Linux Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server",
        "-c",
        "/path/to/project"
      ]
    }
  }
}
```

#### Windows Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "C:\\ctx.exe",
      "args": [
        "server",
        "-cC:\\Path\\To\\Project"
      ]
    }
  }
}
```

> **Note**: You can add path to `ctx.exe` to your environment variables to avoid specifying the full path.

#### Windows with WSL Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "ctx server -c /path/to/project"
      ]
    }
  }
}
```

### Environment Variable Configuration

#### Setting Environment Variables in Config

You can pass environment variables to the MCP server by using the `env` property in your configuration. This is useful
for providing authentication tokens, API keys, or other configuration values:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server",
        "-c",
        "/path/to/project"
      ],
      "env": {
        "GITHUB_PAT": "ghp_your_personal_access_token",
        "MCP_DOCUMENT_NAME_FORMAT": "{description} ({tags}) - {path}",
        "MCP_FILE_OPERATIONS": "true"
      }
    }
  }
}
```

#### Environment Variables with WSL

**Important note for WSL users**: When using `wsl.exe` as the command, the `env` property in the configuration will not
properly pass environment variables to the WSL environment. Instead, you should set environment variables directly in
the bash command:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "export GITHUB_PAT=ghp_your_personal_access_token && export MCP_FILE_OPERATIONS=true && ctx server -c /path/to/project"
      ]
    }
  }
}
```

**Important:** After saving the configuration, restart the app.

## Dynamic Projects Switching

The MCP server supports dynamic project switching, allowing you to work with multiple projects. Read more about
dynamic project switching in the [Projects](projects.md) section.