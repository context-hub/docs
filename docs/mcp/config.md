# MCP Configuration Guide

This guide covers all configuration options for the CTX MCP server integration with Claude Desktop and other MCP
clients.

## Table of Contents

- [Configuration Modes](#configuration-modes)
- [Platform-Specific Configurations](#platform-specific-configurations)
    - [Linux Configuration](#linux-configuration)
    - [macOS Configuration](#macos-configuration)
    - [Windows Configuration](#windows-configuration)
    - [Windows with WSL Configuration](#windows-with-wsl-configuration)
- [Environment Variables](#environment-variables)
    - [Setting Environment Variables](#setting-environment-variables)
    - [Environment Variables with WSL](#environment-variables-with-wsl)
- [Configuration Generator](#configuration-generator)
- [Troubleshooting](#troubleshooting)

## Configuration Modes

The CTX MCP server supports two primary configuration modes:

### Global Registry Mode (Recommended)

Use this mode when working with multiple projects:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server"
      ]
    }
  }
}
```

**Features:**

- Enables dynamic switching between registered projects
- Requires projects to be registered with `ctx project:add`
- No need to specify project path in configuration
- Ideal for developers working on multiple projects

> Learn more about project management and dynamic switching in the [Projects Guide](projects.md).

**Setup:**

```bash
# Register your projects
ctx project:add /path/to/project1 --name "Project One"
ctx project:add /path/to/project2 --name "Project Two"

# Use the configuration above in Claude Desktop
```

### Project-Specific Mode

Use this mode for single-project workflows:

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

**Features:**

- Ties configuration to a specific project path
- No project registration needed
- Good for focused single-project work
- Simpler setup for dedicated environments

## Platform-Specific Configurations

### Linux Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "/usr/local/bin/ctx",
      "args": [
        "server",
        "-c",
        "/home/username/projects/myproject"
      ]
    }
  }
}
```

### macOS Configuration

**Standard installation:**

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server",
        "-c",
        "/Users/username/projects/myproject"
      ]
    }
  }
}
```

### Windows Configuration

**Standard installation:**

```json
{
  "mcpServers": {
    "ctx": {
      "command": "C:\\Program Files\\ctx\\ctx.exe",
      "args": [
        "server",
        "-c",
        "C:\\Users\\Username\\Projects\\MyProject"
      ]
    }
  }
}
```

> **Note**: You can add the path to `ctx.exe` to your environment variables to avoid specifying the full path.

**Windows path formatting:**

- Use double backslashes: `C:\\Path\\To\\Project`
- Or use forward slashes: `C:/Path/To/Project`
- Avoid spaces in paths when possible

### Windows with WSL Configuration

**WSL with bash:**

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "ctx server -c /home/username/projects/myproject"
      ]
    }
  }
}
```

## Environment Variables

Environment variables can be used to customize the MCP server behavior, enable features, or provide authentication
credentials.

### Setting Environment Variables

You can pass environment variables to the MCP server using the `env` property in your configuration:

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
        "GITHUB_PAT": "ghp_your_personal_access_token"
      }
    }
  }
}
```

### Environment Variables with WSL

**Important**: When using `wsl.exe` as the command, the `env` property in the configuration will **not** properly pass
environment variables to the WSL environment.

Instead, you must set environment variables directly in the bash command:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "export GITHUB_PAT=ghp_your_token && export MCP_FILE_OPERATIONS=true && ctx server -c /path/to/project"
      ]
    }
  }
}
```

### Using .env Files

You can use a `.env` file for environment configuration:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server",
        "-c",
        "/path/to/project",
        "-e",
        ".env.local"
      ]
    }
  }
}
```

The `.env` file should be located in your project directory:

```bash
# .env.local
GITHUB_PAT=ghp_your_personal_access_token
MCP_FILE_OPERATIONS=true
MCP_DOCUMENT_NAME_FORMAT={description} ({tags}) - {path}
```

## Configuration Generator

The command provides an interactive way to generate configurations:

```bash
ctx mcp:config
```

### Command Options

```bash
ctx mcp:config -h
```

### What the Generator Does

The generator will:

- 🔍 Auto-detect your operating system
- 🎯 Generate the correct configuration format
- 📋 Provide copy-paste ready JSON
- 🧭 Include setup instructions
- 💡 Suggest environment variables
- ⚠️ Warn about common issues

## Troubleshooting

### Common Issues

**Server doesn't start:**

1. Verify CTX is installed: `ctx --version`
2. Check project path contains `context.json` or `context.yaml`
3. Review Claude Desktop logs (Settings → Developer → View Logs)

**Command not found:**

- Linux/macOS: Add CTX to PATH or use full path
- Windows: Add `ctx.exe` directory to PATH environment variable
- WSL: Ensure CTX is installed in WSL environment

**Environment variables not working:**

- Check syntax in `env` property
- For WSL: Use export statements in bash command
- For .env files: Verify file exists and path is correct

**Project not loading:**

- Verify configuration file exists in project root
- Check file permissions
- Ensure path in `-c` flag is absolute, not relative

**WSL-specific issues:**

- Path conversion: Use Linux paths, not Windows paths
- Distribution: Specify WSL distribution if you have multiple
- Environment: Variables must be set in bash command, not `env` property

### Debug Mode

Enable debug logging to troubleshoot issues:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server",
        "-c",
        "/path/to/project",
        "-vvv"
      ]
    }
  }
}
```