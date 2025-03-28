# GitHub Source

Pull files directly from a GitHub repository:

```yaml
documents:
  - description: Repository Source Files
    outputPath: docs/repo-files.md
    sources:
      - type: github
        description: Repository Source Files
        repository: owner/repo
        sourcePaths:
          - src
        branch: main
        filePattern: "*.php"
        excludePatterns:
          - tests
          - vendor
        showTreeView: true
        githubToken: ${GITHUB_TOKEN}
        modifiers:
          - php-signature
```

## Parameters

| Parameter                        | Type          | Default  | Description                                                                         |
|----------------------------------|---------------|----------|-------------------------------------------------------------------------------------|
| `type`                           | string        | required | Must be `"github"`                                                                  |
| `description`                    | string        | `""`     | Human-readable description of the source                                            |
| `repository`                     | string        | required | GitHub repository in format `"owner/repo"`                                          |
| `sourcePaths`                    | string\|array | required | Path(s) within the repository to include                                            |
| `branch`                         | string        | `"main"` | Branch or tag to fetch from                                                         |
| `filePattern`                    | string\|array | `"*.*"`  | File pattern(s) to match                                                            |
| `excludePatterns`                | array         | `[]`     | Patterns to exclude files                                                           |
| `notPath` (or `excludePatterns`) | array         | `[]`     | Patterns to exclude files                                                           |
| `path`                           | string\|array | `[]`     | Patterns to include only files in specific paths                                    |
| `contains`                       | string\|array | `[]`     | Patterns to include only files containing specific content                          |
| `notContains`                    | string\|array | `[]`     | Patterns to exclude files containing specific content                               |
| `showTreeView`                   | boolean       | `true`   | Whether to display a directory tree visualization                                   |
| `githubToken`                    | string        | `null`   | GitHub API token for private repositories (can use env var pattern `${TOKEN_NAME}`) |
| `modifiers`                      | array         | `[]`     | Content modifiers to apply                                                          |
| `tags`                           | array         | []       | List of tags for this source                                                        |

## Multiple Source Paths

You can include files from multiple directories:

```yaml
documents:
  - description: Multiple Source Directories
    outputPath: docs/multiple-dirs.md
    sources:
      - type: github
        description: Multiple Source Directories
        repository: owner/repo
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
documents:
  - description: Multiple File Types
    outputPath: docs/multiple-types.md
    sources:
      - type: github
        description: Multiple File Types
        repository: owner/repo
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
documents:
  - description: Only Controller Files
    outputPath: docs/controllers.md
    sources:
      - type: github
        description: Only Controller Files
        repository: owner/repo
        sourcePaths:
          - src
        path: Controller
        filePattern: "*.php"
        showTreeView: true
```

This will only include files with "Controller" in their path. You can also use an array:

```yaml
documents:
  - description: Controllers and Services
    outputPath: docs/controllers-services.md
    sources:
      - type: github
        description: Controllers and Services
        repository: owner/repo
        sourcePaths:
          - src
        path:
          - Controller
          - Service
        filePattern: "*.php"
        showTreeView: true
```

## Content-Based Filtering

Include or exclude files based on their content:

```yaml
documents:
  - description: Repository Classes
    outputPath: docs/repositories.md
    sources:
      - type: github
        description: Repository Classes
        repository: owner/repo
        sourcePaths:
          - src
        contains: class Repository
        filePattern: "*.php"
        showTreeView: true
```

You can also exclude files containing specific content:

```yaml
documents:
  - description: Non-Deprecated Classes
    outputPath: docs/non-deprecated.md
    sources:
      - type: github
        description: Non-Deprecated Classes
        repository: owner/repo
        sourcePaths:
          - src
        notContains: @deprecated
        filePattern: "*.php"
        showTreeView: true
```

Use arrays for multiple patterns:

```yaml
documents:
  - description: Service Classes
    outputPath: docs/services.md
    sources:
      - type: github
        description: Service Classes
        repository: owner/repo
        sourcePaths:
          - src
        contains:
          - class Service
          - implements ServiceInterface
        notContains:
          - @deprecated
          - @internal
        filePattern: "*.php"
        showTreeView: true
```