# MCP Server Tools

The MCP Server provides several tools that can be enabled or disabled through environment variables. Below is a
description of each tool.

## Environment Variables Configuration

The tools system can be configured using environment variables to enable or disable specific features:

### General Configuration

| Variable                    | Description                                | Default |
|-----------------------------|--------------------------------------------|---------|
| `MCP_CUSTOM_TOOLS_ENABLE`   | Enable/disable custom tools                | `true`  |
| `MCP_TOOL_MAX_RUNTIME`      | Maximum runtime for a command in seconds   | `30`    |
| `MCP_FILE_OPERATIONS`       | Master switch for all file operation tools | `true`  |
| `MCP_FILE_WRITE`            | Enable/disable file write operations       | `true`  |
| `MCP_FILE_APPLY_PATCH`      | Enable/disable applying patches to files   | `false` |
| `MCP_FILE_DIRECTORIES_LIST` | Enable/disable directory listing           | `true`  |

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

## Custom Tools

The Custom Tools feature allows you to define project-specific commands that can be executed directly from the
configuration files. This enables easy integration of common development tasks, build processes, code analysis, and
more.

## Configuration Format

Custom tools are defined in the `tools` section of the configuration file.

**Here's the basic structure:**

```yaml
tools:
  - id: tool-id                      # Unique identifier for the tool
    description: 'Tool description'  # Human-readable description
    env: # Optional environment variables for all commands
      KEY1: value1
      KEY2: value2
    commands: # List of commands to execute
      - cmd: executable              # Command to run
        args: # Command arguments (array)
          - arg1
          - arg2
        workingDir: path/to/dir      # Optional working directory (relative to project root)
        env: # Optional environment variables for this command
          KEY1: value1
          KEY2: value2
```

## Example Use Cases

### 1. Code Style Fixing

```yaml
tools:
  - id: cs-fixer
    description: 'Fix code style issues'
    commands:
      - cmd: composer
        args: [
            - cs:fix
```

### 2. Static Analysis

```yaml
tools:
  - id: phpstan
    description: 'Run static analysis'
    commands:
      - cmd: vendor/bin/phpstan
        args: [ 'analyse', 'src', '--level', '8' ]
```

### 3. Multi-Step Processes

```yaml
tools:
  - id: test-suite
    description: 'Run full test suite with coverage'
    commands:
      - cmd: composer
        args: [ 'install', '--no-dev' ]
      - cmd: vendor/bin/phpunit
        args: [ '--coverage-html', 'coverage' ]
      - cmd: vendor/bin/infection
        args: [ '--min-msi=80' ]
```

### 4. Deployment

```yaml
tools:
  - id: deploy-staging
    description: 'Deploy to staging environment'
    commands:
      - cmd: bash
        args: [ 'deploy.sh', 'staging' ]
        env:
          DEPLOY_TOKEN: "${STAGING_TOKEN}"
```

## Security Considerations

The custom tools feature includes several security measures:

1. **Environment Variable Controls**:
    - `MCP_CUSTOM_TOOLS_ENABLE`: Enable/disable the custom tools feature (default: `true`)
    - `MCP_TOOL_MAX_RUNTIME`: Maximum runtime for a command in seconds (default: `30`)

## Best Practices

1. **Keep Commands Simple**: Break complex operations into multiple commands
2. **Use Environment Variables**: Avoid hardcoding secrets in tool configurations
3. **Set Appropriate Timeouts**: Adjust the `max_runtime` for long-running commands
4. **Test Thoroughly**: Test custom tools before implementing them in production
5. **Consider Security**: Be cautious about what commands are allowed and who can execute them