# MCP Server Tools

The MCP Server provides several tools that can be enabled or disabled through environment variables. Below is a
description of each tool, how to configure them, and how to use advanced features like JSON Schema, conditional
arguments, and template processing.

## Environment Variables Configuration

The tools system can be configured using environment variables to enable or disable specific features:

### General Configuration

| Variable                     | Description                                | Default |
|------------------------------|--------------------------------------------|---------|
| `MCP_CUSTOM_TOOLS_ENABLE`    | Enable/disable custom tools                | `true`  |
| `MCP_TOOL_MAX_RUNTIME`       | Maximum runtime for a command in seconds   | `30`    |
| `MCP_TOOL_COMMAND_EXECUTION` | Enable/disable command execution           | `true`  |
| `MCP_FILE_OPERATIONS`        | Master switch for all file operation tools | `true`  |
| `MCP_FILE_WRITE`             | Enable/disable file write operations       | `true`  |
| `MCP_FILE_APPLY_PATCH`       | Enable/disable applying patches to files   | `false` |
| `MCP_FILE_DIRECTORIES_LIST`  | Enable/disable directory listing           | `true`  |

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

### Configuration Format

Custom tools are defined in the `tools` section of the configuration file.

**Here's the basic structure:**

```yaml
tools:
  - id: tool-id                      # Unique identifier for the tool
    description: 'Tool description'  # Human-readable description
    schema: # Optional JSON schema for arguments
      type: object
      properties:
        arg1:
          type: string
          description: "Argument description"
          default: "default value"   # Optional default value
      required: [ arg1 ]               # List of required arguments
    env: # Optional environment variables for all commands
      KEY1: value1
      KEY2: "{{variable}}"           # Variables can be used in env values
    commands: # List of commands to execute
      - cmd: executable              # Command to run
        args: # Command arguments (array)
          - arg1
          - "{{variable}}"           # Template variable
          - name: "conditional-arg"  # Conditional argument
            when: "{{condition}}"    # Only included when condition evaluates to true
        workingDir: path/to/dir      # Optional working directory (relative to project root)
        env: # Optional environment variables for this command
          KEY1: value1
          KEY2: "{{variable}}"       # Variables can be used in env values
```

### Advanced Features

#### JSON Schema Support

You can define the expected arguments for a tool using JSON Schema, which enables:

- Type validation for arguments (string, number, integer, boolean, array, object)
- Documentation through descriptions
- Required argument enforcement
- Default values for optional arguments

**Example:**

```yaml
tools:
  - id: generate-component
    description: "Generate a new component"
    schema:
      type: object
      properties:
        name:
          type: string
          description: "Component name"
        type:
          type: string
          description: "Component type"
          default: "functional"
      required: [ name ]
    commands:
      - cmd: node
        args: [ scripts/generate.js, --name={{name}}, --type={{type}}]
```

#### Template Processing

You can use template variables in command arguments, working directories, and environment variables. Template variables
are enclosed in double curly braces (`{{variable}}`).

**Example:**

```yaml
tools:
  - id: db-migrate
    description: "Run database migrations"
    schema:
      type: object
      properties:
        env:
          type: string
          description: "Environment"
          default: "development"
    commands:
      - cmd: php
        args: [ artisan, migrate, --env={{env}} ]
        env:
          DB_CONNECTION: "{{env}}"
```

#### Conditional Arguments

Tool commands can include or exclude arguments conditionally based on provided variables:

**Example:**

```yaml
tools:
  - id: code-quality
    description: Run code quality checks
    schema:
      type: object
      properties:
        fix:
          type: boolean
          description: "Fix issues automatically"
          default: false
        verbose:
          type: boolean
          description: "Verbose output"
          default: false
    commands:
      - cmd: composer
        args:
          - cs-check
          - name: --fix
            when: "{{fix}}"
          - name: --verbose
            when: "{{verbose}}"
```

When executed with `fix=true`, the `--fix` argument will be included. When `fix` is false, empty, or not provided, the
argument will be skipped.

#### Default Values

Tool schemas can specify default values for properties, which will be used when specific arguments aren't provided
explicitly:

**Example:**

```yaml
tools:
  - id: db-migrate
    description: "Run database migrations"
    schema:
      type: object
      properties:
        env:
          type: string
          description: "Environment (local, dev, staging, prod)"
          default: "local"
        fresh:
          type: boolean
          description: "Reset the database before migration"
          default: false
        seed:
          type: boolean
          description: "Run seeders after migration"
          default: false
      required: [ ]
    commands:
      - cmd: php
        args:
          - artisan
          - migrate
          - name: --env={{env}}
          - name: --fresh
            when: "{{fresh}}"
          - name: --seed
            when: "{{seed}}"
```

### Example Use Cases

#### 1. Code Style Fixing

```yaml
tools:
  - id: cs-fixer
    description: 'Fix code style issues'
    schema:
      type: object
      properties:
        path:
          type: string
          description: "Path to check"
          default: "src"
        dry-run:
          type: boolean
          description: "Don't make changes"
          default: false
    commands:
      - cmd: composer
        args:
          - cs:fix
          - "{{path}}"
          - name: --dry-run
            when: "{{dry-run}}"
```

#### 2. Static Analysis

```yaml
tools:
  - id: phpstan
    description: 'Run static analysis'
    schema:
      type: object
      properties:
        level:
          type: integer
          description: "Analysis level (0-8)"
          default: 8
        path:
          type: string
          description: "Path to analyze"
          default: "src"
    commands:
      - cmd: vendor/bin/phpstan
        args:
          - analyse
          - "{{path}}"
          - --level
          - "{{level}}"
```

#### 3. Multi-Step Processes

```yaml
tools:
  - id: test-suite
    description: 'Run full test suite with coverage'
    schema:
      type: object
      properties:
        coverage:
          type: boolean
          description: "Generate coverage report"
          default: true
    commands:
      - cmd: composer
        args: [ 'install', '--no-dev' ]
      - cmd: vendor/bin/phpunit
        args:
          - name: --coverage-html
            when: "{{coverage}}"
          - name: coverage
            when: "{{coverage}}"
```

#### 4. Deployment

```yaml
tools:
  - id: deploy-staging
    description: 'Deploy to staging environment'
    schema:
      type: object
      properties:
        branch:
          type: string
          description: "Branch to deploy"
          default: "develop"
    commands:
      - cmd: bash
        args: [ 'deploy.sh', 'staging', '{{branch}}' ]
        env:
          DEPLOY_TOKEN: "${STAGING_TOKEN}"
          DEPLOY_BRANCH: "{{branch}}"
```

### Security Considerations

The custom tools feature includes several security measures:

1. **Environment Variable Controls**:
    - `MCP_CUSTOM_TOOLS_ENABLE`: Enable/disable the custom tools feature (default: `true`)
    - `MCP_TOOL_MAX_RUNTIME`: Maximum runtime for a command in seconds (default: `30`)
    - `MCP_TOOL_COMMAND_EXECUTION`: Enable/disable command execution (default: `true`)

2. **Schema Validation**:
    - Tool arguments are validated against the defined schema before execution
    - Type checking ensures proper data types for each argument