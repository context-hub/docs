# MCP Server Integration

The Model Control Protocol (MCP) server is a bridge that enables AI assistants like Claude to directly access and
understand your project's context. It acts as an intermediary that provides real-time, structured information about your
codebase to AI models, enabling more accurate and contextually relevant assistance.

Context Generator now supports the MCP protocol, allowing Claude to seamlessly access your project's contexts, and
documentation without requiring manual context uploads.

## How integration works

When you connect Claude to Context Generator via MCP:

1. Claude can request specific context about your project directly through the MCP protocol
2. Context Generator processes these requests by accessing your codebase based on your `context.yaml`
3. Relevant code, documentation, and structural information is formatted and returned to Claude
4. Claude uses this rich context to provide more accurate, project-aware responses

```mermaid
sequenceDiagram
    participant User
    participant Claude
    participant MCP Server as "Context Generator<br/>MCP Server"
    participant Files as "Project Files"
    participant Config as "context.yaml/<br/>context.json"
    
    User->>Claude: Ask question about project
    Claude->>MCP Server: Request context (MCP protocol)
    MCP Server->>Config: Read configuration
    MCP Server->>Files: Access relevant files
    Note over MCP Server: Filter & process content<br/>based on configuration
    MCP Server-->>Claude: Return formatted context
    Claude->>User: Provide contextually aware response
    
    Note over User,Claude: Subsequent questions
    User->>Claude: Follow-up question
    Claude->>MCP Server: Request additional context
    MCP Server->>Files: Access specific files
    MCP Server-->>Claude: Return targeted information
    Claude->>User: Provide detailed response
```

The diagram shows how Claude communicates with the MCP Server, which accesses your project files
according to your configuration.

## Why?

**Developer-Controlled Context**: As a developer and product owner, YOU know your code best. Context Generator puts you
in control of exactly what context is relevant, rather than relying on AI to guess.

### The Problem with Automatic Context Gathering

Let's imagine IDE tools like Cursor that attempt to gather context automatically:

1. They must guess which files are relevant to your current task, often missing critical components or including
   irrelevant ones
2. They operate with limited context windows, forcing trade-offs between breadth and depth of context
3. Without your guidance, they can prioritize the wrong files, including less important context while omitting what you
   actually need

Context Generator solves these problems by giving you explicit control over which parts of your codebase are included,
ensuring the AI receives precisely the information needed to assist you effectively.

## Setting Up

First of all you need to [install](https://claude.ai/download) Claude app and latest version of Context Generator (**>
1.18.0**).

> **Note**: The MCP server is only available in the desktop version of Claude. The web version does not support it.
>

### Steps

1. Download Claude App for your operating system
2. Open **Settings** → **Developer** → **Edit config** → open config file `claude_desktop_config`
3. Register the Context Generator MCP server using the appropriate configuration

--- 

**Important: You must specify the path to your project using the `-c` flag. The project root should contain a
`context.json` or `context.yaml` configuration file.**

### Linux Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx server -c /path/to/project"
    }
  }
}
```

### Windows with WSL Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "ctx server -c /path/to/project"
      ]
    }
  }
}
```

**Important:** After saving the configuration, restart the app.