# MCP Server Integration

The MCP Server can be integrated with AI assistants to provide direct access to your project's context.
This allows AI models to request specific information about your codebase without requiring manual context uploads.

### Table of Contents

- [How Integration Works](#how-integration-works)
- [Key Features](#key-features)
    - [Context Awareness](#context-awareness)
    - [Filesystem Operations](#filesystem-operations)
    - [Routing System](#routing-system)
- [Why Use MCP?](#why)
- [Quick Start](#quick-start)
- [Configuration Guide](#configuration-guide)
- [HTTP Server Mode](#http-server-mode)

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
    participant LLM as "AI Assistant"
    participant MCP Server as "CTX<br/>MCP Server"
    participant Files as "Project Files"
    participant Config as "context.yaml/<br/>context.json"
    User ->> LLM: Ask question about project
    LLM ->> MCP Server: Request context (MCP protocol)
    MCP Server ->> Config: Read configuration
    MCP Server ->> Files: Access relevant files
    Note over MCP Server: Filter & process content<br/>based on configuration
    MCP Server -->> LLM: Return formatted context
    LLM ->> User: Provide contextually aware response
    Note over User, LLM: Subsequent questions
    User ->> LLM: Follow-up question
    LLM ->> MCP Server: Request additional context
    MCP Server ->> Files: Access specific files
    MCP Server -->> LLM: Return targeted information
    LLM ->> User: Provide detailed response
```

The diagram shows how AI assistants communicate with the MCP Server, which accesses your project files
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

## Quick Start

First, you need to install your favorite AI assistant that supports MCP protocol and the latest version of **CTX** (**>
1.18.0**).

> **Popular MCP-compatible clients:**
> - [Claude Desktop](https://claude.ai/download) - Desktop app with built-in MCP support
> - [Cline](https://github.com/cline/cline) - VS Code extension
> - Other MCP-compatible clients

### Generate Configuration

The easiest way to set up MCP integration is using the built-in configuration generator:

```bash
ctx mcp:config
```

This command will auto-detect your operating system and generate the correct configuration for your MCP client.

### Add to Your MCP Client

1. Locate your MCP client's configuration file
2. Add the generated configuration
3. Save and restart your client

### Basic Example

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

> **Important**: The `-c` flag must point to a directory containing a `context.json` or `context.yaml` configuration
> file.

That's it! You're ready to use CTX with your AI assistant.

For detailed configuration options, platform-specific setups, and advanced features, see
the [Configuration Guide](config.md).

## Configuration Guide

For comprehensive configuration details including:

- Platform-specific configurations (Linux, Windows, WSL)
- Configuration modes (Global Registry vs Project-Specific)
- Environment variables and their usage
- Dynamic project switching
- Troubleshooting tips

Please refer to the [Configuration Guide](config.md).

## HTTP Server Mode

For advanced use cases requiring remote access or web-based integrations, CTX supports running as an HTTP server with
SSE (Server-Sent Events). Learn more about [HTTP Server Configuration](http.md).

## Dynamic Projects Switching

The MCP server supports dynamic project switching, allowing you to work with multiple projects. Read more about
dynamic project switching in the [Projects](projects.md) section.
