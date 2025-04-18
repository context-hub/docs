# GitLab Source Documentation

The GitLab source allows you to pull files directly from GitLab repositories (both gitlab.com and self-hosted instances)
for inclusion in your generated context documents. This is particularly useful for code analysis, documentation
generation, and sharing repository content.

## Basic Configuration

Here's a simple example of a GitLab source configuration:

```yaml
settings:
  gitlab:
    servers:
      default:
        url: https://gitlab.com
        token: ${GITLAB_TOKEN}

documents:
  - description: GitLab Source Example
    outputPath: docs/gitlab-files.md
    sources:
      - type: gitlab
        description: GitLab Repository Files
        repository: namespace/project
        sourcePaths:
          - src
        branch: main
        filePattern: "*.php"
        showTreeView: true
        server: default  # References a pre-configured server
```

## Parameters

| Parameter                        | Type           | Default  | Description                                                |
|----------------------------------|----------------|----------|------------------------------------------------------------|
| `type`                           | string         | required | Must be `"gitlab"`                                         |
| `description`                    | string         | `""`     | Human-readable description of the source                   |
| `repository`                     | string         | required | GitLab repository in format `"namespace/project"`          |
| `sourcePaths`                    | string\|array  | required | Path(s) within the repository to include                   |
| `branch`                         | string         | `"main"` | Branch or tag to fetch from                                |
| `filePattern`                    | string\|array  | `"*.*"`  | File pattern(s) to match                                   |
| `notPath` (or `excludePatterns`) | array          | `[]`     | Patterns to exclude files by path                          |
| `path`                           | string\|array  | `null`   | Patterns to include only files in specific paths           |
| `contains`                       | string\|array  | `null`   | Patterns to include only files containing specific content |
| `notContains`                    | string\|array  | `null`   | Patterns to exclude files containing specific content      |
| `showTreeView`                   | boolean        | `true`   | Whether to display a directory tree visualization          |
| `server`                         | string\|object | `null`   | Server configuration reference or inline server config     |
| `modifiers`                      | array          | `[]`     | Content modifiers to apply                                 |
| `tags`                           | array          | `[]`     | List of tags for this source                               |

## Setting up GitLab Server Configurations

You can configure multiple GitLab servers in the global settings:

```yaml
settings:
  gitlab:
    servers:
      # Default configuration for gitlab.com
      default:
        url: https://gitlab.com
        token: ${GITLAB_TOKEN}

      # Self-hosted instance
      company:
        url: https://gitlab.example.com
        token: ${COMPANY_GITLAB_TOKEN}
        headers:
          X-Custom-Header: "custom-value"
```

Then reference these servers in your source configurations:

```yaml
sources:
  - type: gitlab
    description: Internal Repository
    server: company  # References the 'company' server configuration
    repository: group/project
    # other parameters...
```

Alternatively, you can specify server configuration directly in the source:

```yaml
sources:
  - type: gitlab
    description: Direct Server Configuration
    repository: group/project
    server:
      url: https://gitlab.example.com
      token: ${GITLAB_TOKEN}
      headers:
        X-Custom-Header: "value"
    # other parameters...
```

## Multiple Source Paths

You can include files from multiple directories:

```yaml
sources:
  - type: gitlab
    description: Multiple Directories
    repository: namespace/project
    sourcePaths:
      - src/Controllers
      - src/Models
      - config
    filePattern: "*.php"
    showTreeView: true
```

## Multiple File Patterns

Include different file types:

```yaml
sources:
  - type: gitlab
    description: Multiple File Types
    repository: namespace/project
    sourcePaths:
      - src
    filePattern:
      - "*.php"
      - "*.json"
      - "*.md"
    showTreeView: true
```

## Path-Based Filtering

Target specific subdirectories or files:

```yaml
sources:
  - type: gitlab
    description: Only Controller Files
    repository: namespace/project
    sourcePaths:
      - src
    path: Controller
    filePattern: "*.php"
```

You can also use an array for multiple path patterns:

```yaml
sources:
  - type: gitlab
    description: Controllers and Services
    repository: namespace/project
    sourcePaths:
      - src
    path:
      - "Controller"
      - "Service"
    filePattern: "*.php"
```

## Content-Based Filtering

Include or exclude files based on their content:

```yaml
sources:
  - type: gitlab
    description: Service Classes
    repository: namespace/project
    sourcePaths:
      - src
    contains:
      - "implements ServiceInterface"
      - "@Service"
    notContains:
      - "@deprecated"
    filePattern: "*.php"
```

## Environment Variables

GitLab tokens and other sensitive values can be provided via environment variables:

```yaml
server:
  url: https://gitlab.example.com
  token: ${GITLAB_TOKEN}  # Will be replaced with the GITLAB_TOKEN environment variable
```

## Authentication

For private repositories, authentication is handled via the GitLab API token. Set the token in your server
configuration:

```yaml
settings:
  gitlab:
    servers:
      default:
        url: https://gitlab.com
        token: ${GITLAB_TOKEN}
```

Make sure to set the environment variable with your GitLab personal access token.

## Examples

Here are some complete examples to help you get started:

### Basic Public Repository

```yaml
documents:
  - description: Basic GitLab Example
    outputPath: docs/gitlab-basic.md
    sources:
      - type: gitlab
        description: Public GitLab Repository
        repository: namespace/project
        branch: main
        sourcePaths:
          - src
        server: default
        showTreeView: true
```

### Advanced Filtering

```yaml
documents:
  - description: Advanced GitLab Example
    outputPath: docs/gitlab-advanced.md
    sources:
      - type: gitlab
        description: Filtered GitLab Repository
        repository: namespace/project
        branch: develop
        sourcePaths:
          - src
        path:
          - "src/Services"
        filePattern: "*.php"
        notPath:
          - "*Test.php"
        contains: "class"
        notContains: "@deprecated"
        server: company
        modifiers:
          - trim-php-comments
        showTreeView: true
```

### Multiple Sources

```yaml
documents:
  - description: Multiple GitLab Sources
    outputPath: docs/gitlab-multiple.md
    sources:
      - type: gitlab
        description: Controllers
        repository: app/backend
        branch: main
        sourcePaths:
          - src/Controllers
        filePattern: "*Controller.php"
        server: default

      - type: gitlab
        description: Models
        repository: app/backend
        branch: main
        sourcePaths:
          - src/Models
        filePattern: "*.php"
        server: default
```