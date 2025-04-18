# Custom Tools Documentation

CTX allows you to define project-specific commands that can be executed directly from the configuration files. This
comprehensive documentation outlines all tool types, configuration options, and advanced features.

Custom tools in CTX provide a powerful way to integrate development workflows, build processes, and project-specific
commands directly into your configuration files. Each tool can be configured with specific properties, arguments, and
behaviors depending on the tool type.

### Table of Contents

- [Run Tools](#run-tools)
    - [Configuration Properties](#run-tool-configuration-properties)
    - [Command Configuration](#command-configuration)
    - [Run Tool Examples](#run-tool-examples)
- [HTTP Tools](#http-tools)
    - [Configuration Properties](#http-tool-configuration-properties)
    - [Request Configuration](#request-configuration)
    - [HTTP Tool Examples](#http-tool-examples)
- [Schema Definition](#schema-definition)
- [Advanced Features](#advanced-features)
    - [Template Variables](#template-variables)
    - [Conditional Arguments](#conditional-arguments)
    - [Environment Variables](#environment-variables-in-tools)
- [Tool Imports](#tool-imports)
    - [Import Configuration](#import-configuration)
    - [Working Directory Resolution](#working-directory-resolution)
    - [Tool Import Examples](#tool-import-examples)
- [Environment Variables](#environment-variables)

## Run Tools

Run tools execute one or more shell commands sequentially. They are ideal for build processes, code analysis, testing,
and other development tasks.

### Run Tool Configuration Properties

| Property      | Type   | Required | Description                                                             |
|---------------|--------|----------|-------------------------------------------------------------------------|
| `id`          | string | Yes      | Unique identifier for the tool                                          |
| `description` | string | Yes      | Human-readable description of the tool                                  |
| `type`        | string | No       | Tool type (default: `run`)                                              |
| `schema`      | object | No       | JSON schema for arguments (see [Schema Definition](#schema-definition)) |
| `env`         | object | No       | Global environment variables for all commands                           |
| `commands`    | array  | Yes      | List of commands to execute                                             |

### Command Configuration

Each command in a Run tool can have the following properties:

| Property     | Type   | Required | Description                                                  |
|--------------|--------|----------|--------------------------------------------------------------|
| `cmd`        | string | Yes      | Executable to run                                            |
| `args`       | array  | No       | Command arguments                                            |
| `workingDir` | string | No       | Working directory for the command (relative to project root) |
| `env`        | object | No       | Environment variables specific to this command               |
| `when`       | string | No       | Conditional expression for executing the command             |

Command arguments can be:

- Simple strings: `args: ['install']`
- Objects with conditions:

| Property | Type   | Required | Description                                       |
|----------|--------|----------|---------------------------------------------------|
| `name`   | string | Yes      | Argument name/value                               |
| `when`   | string | Yes      | Conditional expression for including the argument |

### Run Tool Examples

#### 1. Basic Build Tool

```yaml
tools:
  - id: build-assets
    description: 'Build frontend assets'
    type: run
    commands:
      - cmd: npm
        args: [ 'install' ]
        workingDir: frontend
      - cmd: npm
        args: [ 'run', 'build' ]
        workingDir: frontend
```

#### 2. Code Style Fixing

```yaml
tools:
  - id: cs-fixer
    description: 'Fix code style issues'
    type: run
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

#### 3. Multi-Step Database Operations

```yaml
tools:
  - id: db-migrate
    description: "Run database migrations"
    type: run
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
          - name: "--env={{env}}"
          - name: "--fresh"
            when: "{{fresh}}"
          - name: "--seed"
            when: "{{seed}}"
        env:
          APP_ENV: "{{env}}"
```

#### 4. Advanced Build Process

```yaml
tools:
  - id: build-project
    description: 'Build project and deploy assets'
    type: run
    schema:
      type: object
      properties:
        env:
          type: string
          description: "Target environment"
          default: "development"
        optimize:
          type: boolean
          description: "Optimize for production"
          default: false
      required: [ ]
    commands:
      - cmd: composer
        args: [ 'install' ]
        workingDir: project/root
      - cmd: npm
        args: [ 'install' ]
        workingDir: project/assets
      - cmd: npm
        args:
          - 'run'
          - 'build'
          - name: "--production"
            when: "{{optimize}}"
        env:
          NODE_ENV: "{{env}}"
        workingDir: project/assets
```

#### 5. Testing with Code Coverage

```yaml
tools:
  - id: test-with-coverage
    description: 'Run tests with code coverage'
    type: run
    commands:
      - cmd: vendor/bin/phpunit
        args: [ '--colors=always', '--coverage-html', 'logs/coverage' ]
        workingDir: ${ROOT_DIR}
        env:
          XDEBUG_MODE: coverage
```

## HTTP Tools

HTTP tools make HTTP requests to external services. They are useful for interacting with APIs, webhooks, or other web
services.

### HTTP Tool Configuration Properties

| Property      | Type   | Required | Description                                                             |
|---------------|--------|----------|-------------------------------------------------------------------------|
| `id`          | string | Yes      | Unique identifier for the tool                                          |
| `description` | string | Yes      | Human-readable description of the tool                                  |
| `type`        | string | Yes      | Tool type (must be `http`)                                              |
| `schema`      | object | No       | JSON schema for arguments (see [Schema Definition](#schema-definition)) |
| `requests`    | array  | Yes      | List of HTTP requests to execute                                        |

### Request Configuration

Each request in an HTTP tool can have the following properties:

| Property  | Type   | Required | Description                                   |
|-----------|--------|----------|-----------------------------------------------|
| `url`     | string | Yes      | URL to send the request to                    |
| `method`  | string | No       | HTTP method (`GET` or `POST`, default: `GET`) |
| `headers` | object | No       | HTTP headers for the request                  |
| `query`   | object | No       | Query parameters (for GET requests)           |
| `body`    | object | No       | Request body (for POST requests)              |

### HTTP Tool Examples

#### 1. Basic API Request

```yaml
tools:
  - id: weather-api
    description: 'Get current weather data for a location'
    type: http
    schema:
      type: object
      properties:
        city:
          type: string
          description: "City name"
          default: "New York"
        apiKey:
          type: string
          description: "API key for weather service"
          default: ""
      required: [ "apiKey" ]
    requests:
      - url: "https://api.weatherservice.com/current"
        method: "GET"
        headers:
          Accept: "application/json"
        query:
          location: "{{city}}"
          key: "{{apiKey}}"
          units: "metric"
```

#### 2. Authentication and Request Flow

```yaml
tools:
  - id: auth-and-fetch
    description: 'Authenticate and fetch user data'
    type: http
    schema:
      type: object
      properties:
        username:
          type: string
          description: "Username"
        password:
          type: string
          description: "Password"
      required: [ "username", "password" ]
    requests:
      # First request - login and get token
      - url: "https://api.example.com/auth"
        method: "POST"
        headers:
          Content-Type: "application/json"
        body:
          username: "{{username}}"
          password: "{{password}}"

      # Second request - use token from previous response
      - url: "https://api.example.com/user/profile"
        method: "GET"
        headers:
          Authorization: "Bearer {{token}}"  # Token from previous response
```

#### 3. Webhook Integration

```yaml
tools:
  - id: deploy-webhook
    description: 'Trigger deployment webhook'
    type: http
    schema:
      type: object
      properties:
        environment:
          type: string
          description: "Target environment"
          default: "staging"
        branch:
          type: string
          description: "Git branch to deploy"
          default: "main"
      required: [ ]
    requests:
      - url: "https://deploy.example.com/webhook"
        method: "POST"
        headers:
          Content-Type: "application/json"
          Authorization: "Bearer ${DEPLOY_TOKEN}"
        body:
          environment: "{{environment}}"
          branch: "{{branch}}"
          timestamp: "{{timestamp}}"
```

#### 4. API Integration with Format Options

```yaml
tools:
  - id: fetch-api-data
    description: 'Fetch data from external API'
    type: http
    schema:
      type: object
      properties:
        endpoint:
          type: string
          description: "API endpoint"
          default: "users"
        format:
          type: string
          description: "Response format (json or xml)"
          default: "json"
      required: [ "endpoint" ]
    requests:
      - url: "https://api.example.com/{{endpoint}}"
        method: "GET"
        headers:
          Accept: "application/{{format}}"
          Authorization: "Bearer ${API_TOKEN}"
```

## Schema Definition

The `schema` property allows you to define the expected arguments for a tool using JSON Schema. It enables:

- Argument validation
- Type checking
- Documentation
- Default values
- Required argument specification

### Schema Configuration Properties

| Property     | Type   | Required | Description                      |
|--------------|--------|----------|----------------------------------|
| `type`       | string | Yes      | Schema type (typically `object`) |
| `properties` | object | No       | Properties definition            |
| `required`   | array  | No       | List of required properties      |

### Property Configuration

Each property in the schema can have:

| Property      | Type   | Required | Description                                                             |
|---------------|--------|----------|-------------------------------------------------------------------------|
| `type`        | string | Yes      | Data type (`string`, `number`, `integer`, `boolean`, `array`, `object`) |
| `description` | string | No       | Human-readable description of the property                              |
| `default`     | *      | No       | Default value if not provided                                           |

Example schema:

```yaml
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
```

## Advanced Features

### Template Variables

Template variables allow dynamic values to be inserted into command arguments, URLs, and other properties. Variables are
enclosed in double curly braces: `{{variable}}`.

Variables can be used in:

- Command arguments
- Working directories
- Environment variables
- HTTP request URLs
- HTTP headers
- Query parameters
- Request bodies

Example:

```yaml
args: [ 'artisan', 'migrate', '--env={{env}}' ]
```

### Conditional Arguments

Conditional arguments allow arguments to be included only when a specified condition is met. This is useful for optional
flags or environment-specific arguments.

Example:

```yaml
args:
  - name: "--production"
    when: "{{optimize}}"
```

### Environment Variables in Tools

Environment variables can be defined:

- Globally for all commands in a tool
- Specifically for individual commands

Environment variables can reference:

- System environment variables using `${VAR_NAME}`
- Tool arguments using `{{var_name}}`

Example:

```yaml
env:
  DB_CONNECTION: "{{env}}"
  API_TOKEN: "${API_SECRET}"
```

## Tool Imports

CTX allows you to import tools from external YAML files, enabling better organization and reuse of tool definitions
across projects.

### Key Features

* Import paths can be absolute or relative to the importing configuration file
* Tools from multiple files can be imported and merged with local tools
* Working directory paths in imported tools are automatically adjusted based on import location

### Import Formats

The `import` section supports several formats:

#### String Format (Simplest)

```yaml
import:
  - "/path/to/service/context.yaml"
```

#### Object Format with Path

```yaml
import:
  - path: /path/to/service/context.yaml
```

### Working Directory Resolution

When importing tools, working directories are resolved according to these rules:

1. **Explicit working directory preserved**: If an imported tool specifies an absolute path for `workingDir`, this value
   is preserved as-is.

2. **Relative working directory updated**: If an imported tool has a relative `workingDir` (`.` or empty string) or
   doesn't define one, it will be automatically updated to the directory from which the tool was imported.

This resolution ensures that relative paths in imported tools work correctly regardless of where they are imported from.

### Tool Import Examples

#### Basic Import Example

```yaml
# Main configuration file
import:
  - path: /path/to/service/context.yaml

tools:
  # Local tools defined here
  - id: local-tool
    # ...
```

#### Multiple Imports

```yaml
# Main configuration file
import:
  - path: /path/to/build-tools.yaml
  - path: ./deploy-tools.yaml
  - path: ../shared/database-tools.yaml

tools:
  # Local tools defined here
  - id: project-specific-tool
    # ...
```

#### Working Directory Resolution Example

Consider a tool defined in an imported file:

```yaml
# /path/to/service/context.yaml
tools:
  - id: reset
    description: Reset RoadRunner
    commands:
      - cmd: rr
        args:
          - reset
```

When imported, the working directory is automatically updated:

```yaml
# After import (resolved in main config)
tools:
  - id: reset
    description: Reset RoadRunner
    commands:
      - cmd: rr
        workingDir: /path/to/service  # Updated to directory where context.yaml resides
        args:
          - reset
```

#### Preserving Explicit Working Directories

If an imported tool has an explicit absolute path for its working directory, it will be preserved:

```yaml
# Imported tool with explicit working directory
tools:
  - id: reset
    description: Reset RoadRunner
    commands:
      - cmd: rr
        workingDir: /path/to/specific/location
        args:
          - reset
```

The explicit working directory will remain unchanged after import.

## Environment Variables

The following environment variables control the custom tools functionality:

| Variable                     | Description                                | Default |
|------------------------------|--------------------------------------------|---------|
| `MCP_CUSTOM_TOOLS_ENABLE`    | Enable/disable custom tools                | `true`  |
| `MCP_TOOL_MAX_RUNTIME`       | Maximum runtime for a command in seconds   | `30`    |
| `MCP_TOOL_COMMAND_EXECUTION` | Enable/disable command execution           | `true`  |
| `MCP_FILE_OPERATIONS`        | Master switch for all file operation tools | `true`  |
| `MCP_FILE_WRITE`             | Enable/disable file write operations       | `true`  |
| `MCP_FILE_APPLY_PATCH`       | Enable/disable applying patches to files   | `false` |
| `MCP_FILE_DIRECTORIES_LIST`  | Enable/disable directory listing           | `true`  |