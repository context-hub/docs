# MCP Source

The MCP (Model Context Protocol) source enables CTX to connect to MCP servers and retrieve content for documentation
generation. This integration allows you to leverage the power of compatible servers to extend CTX's capabilities.

## Configuration

### Basic Usage

```yaml
documents:
  - description: "MCP Source Example"
    outputPath: "docs/mcp-example.md"
    sources:
      - type: mcp
        description: "GitHub Issue"
        server: github
        operation:
          type: tool.call
          name: get_issue
          arguments:
            owner: context-hub
            repo: generator
            issue_number: 158
```

### Parameters

| Parameter     | Type           | Default  | Description                                             |
|---------------|----------------|----------|---------------------------------------------------------|
| `type`        | string         | required | Must be `"mcp"`                                         |
| `description` | string         | `""`     | Human-readable description of the source                |
| `server`      | string\|object | required | Server configuration or reference to pre-defined server |
| `operation`   | object         | required | Operation to execute on the server                      |
| `modifiers`   | array          | `[]`     | Content modifiers to apply                              |
| `tags`        | array          | `[]`     | List of tags for this source                            |

## Server Configuration

MCP sources require a server configuration, which can be specified in two ways:

### 1. Reference a Pre-Defined Server

Define servers in the global settings section, then reference them by name:

```yaml
# Define server configurations in settings
settings:
  mcp:
    servers:
      github:
        command: docker
        args:
          - run
          - "-i"
          - "--rm"
          - "-e"
          - "GITHUB_PERSONAL_ACCESS_TOKEN"
          - "ghcr.io/github/github-mcp-server"
        env:
          GITHUB_PERSONAL_ACCESS_TOKEN: '{{GITHUB_PAT}}'

# Reference the server by name in sources
documents:
  - description: "GitHub Integration"
    outputPath: "docs/github-content.md"
    sources:
      - type: mcp
        server: github
        operation:
        # Operation details here
```

### 2. Define Server Inline

Specify the server configuration directly in the source:

```yaml
documents:
  - description: "Custom MCP Server"
    outputPath: "docs/custom-mcp.md"
    sources:
      - type: mcp
        description: "Custom MCP Tool Results"
        server:
          command: "custom-mcp-server"
          args: [ "--port", "8080" ]
        operation:
        # Operation details here
```

### Server Configuration Options

#### Command-Based Server

```yaml
server:
  command: "docker"  # Command to execute
  args: # Command arguments
    - "run"
    - "-i"
    - "--rm"
  env: # Environment variables
    API_TOKEN: "{{API_TOKEN}}"
```

#### URL-Based Server

```yaml
server:
  url: "https://mcp-server.example.com/mcp"  # Server URL
  headers: # HTTP headers
    Authorization: "Bearer {{API_TOKEN}}"
```

## Operations

MCP sources support two main operation types:

### 1. Read Resource Operation

Reads one or more resources from an MCP server:

```yaml
operation:
  type: resource.read
  resources:
    - "repo://context-hub/generator/contents"
    - "file://path/to/resource.md"
```

| Parameter   | Type   | Default  | Description                   |
|-------------|--------|----------|-------------------------------|
| `type`      | string | required | Must be `"resource.read"`     |
| `resources` | array  | required | List of resource URIs to read |

### 2. Call Tool Operation

Calls a tool on an MCP server with optional arguments:

```yaml
operation:
  type: tool.call
  name: get_issue
  arguments:
    owner: context-hub
    repo: generator
    issue_number: 158
```

| Parameter   | Type   | Default  | Description                   |
|-------------|--------|----------|-------------------------------|
| `type`      | string | required | Must be `"tool.call"`         |
| `name`      | string | required | Name of the tool to call      |
| `arguments` | object | `{}`     | Arguments to pass to the tool |

## Advanced Configuration

### Using Variables in Server Configurations

You can use environment variables throughout server configurations:

```yaml
settings:
  mcp:
    servers:
      github:
        command: docker
        args:
          - run
          - "-i"
          - "--rm"
          - "-e"
          - "GITHUB_TOKEN"
          - "ghcr.io/github/github-mcp-server:${VERSION}"
        env:
          GITHUB_TOKEN: '{{GITHUB_TOKEN}}'
```

### Multiple Resource Reads

Read multiple resources in a single operation:

```yaml
documents:
  - description: "Repository Resources"
    outputPath: "docs/repo-resources.md"
    sources:
      - type: mcp
        server: github
        operation:
          type: resource.read
          resources:
            - "repo://owner/repo/readme.md"
            - "repo://owner/repo/docs/architecture.md"
            - "repo://owner/repo/src/main.php"
```

### Complete Example

This example shows how to configure multiple MCP sources with different operations:

```yaml
settings:
  mcp:
    servers:
      github:
        command: docker
        args:
          - run
          - "-i"
          - "--rm"
          - "-e"
          - "GITHUB_TOKEN"
          - "ghcr.io/github/github-mcp-server"
        env:
          GITHUB_TOKEN: '{{GITHUB_TOKEN}}'

      local-mcp:
        url: "http://localhost:8080/mcp"
        headers:
          Authorization: "Bearer {{LOCAL_TOKEN}}"

documents:
  - description: "Project Documentation"
    outputPath: "docs/project.md"
    sources:
      # Fetch issue information
      - type: mcp
        description: "GitHub Issue"
        server: github
        operation:
          type: tool.call
          name: get_issue
          arguments:
            owner: context-hub
            repo: generator
            issue_number: 158

      # Read repository contents
      - type: mcp
        description: "Repository Contents"
        server: github
        operation:
          type: resource.read
          resources:
            - "repo://context-hub/generator/README.md"
            - "repo://context-hub/generator/docs/architecture.md"

      # Use a local MCP server
      - type: mcp
        description: "Code Analysis"
        server: local-mcp
        operation:
          type: tool.call
          name: analyze_code
          arguments:
            path: "./src"
            language: "php"
```

## Output Formatting

The MCP source automatically formats output based on the operation type and response content:

- For `tool.call` operations:
    - JSON responses are pretty-printed in a JSON code block
    - Text responses are displayed as plain text

- For `resource.read` operations:
    - Content is displayed in a code block with appropriate language detection

## Integration with Other Sources

MCP sources can be combined with other source types to create comprehensive documentation:

```yaml
documents:
  - description: "Full Project Documentation"
    outputPath: "docs/project.md"
    sources:
      # Standard file source
      - type: file
        sourcePaths: src
        filePattern: "*.php"

      # MCP source for GitHub content
      - type: mcp
        server: github
        operation:
          type: resource.read
          resources:
            - "repo://context-hub/generator/README.md"

      # Text source for additional context
      - type: text
        content: |
          # Implementation Notes

          The following sections contain implementation details gathered from various sources.
```