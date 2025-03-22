# File Source

The file source allows you to include files from your local filesystem. It's the most commonly used source type for
analyzing your codebase.

## Basic Usage

```yaml
documents:
  - description: "Basic Source Code Example"
    outputPath: "docs/source-code.md"
    sources:
      - type: file
        description: "Source Code"
        sourcePaths: src
        filePattern: "*.php"
        notPath: [ "tests", "vendor" ]
        showTreeView: true
        modifiers: [ "php-signature" ]
```

## Parameters

| Parameter                        | Type          | Default  | Description                                                              |
|----------------------------------|---------------|----------|--------------------------------------------------------------------------|
| `type`                           | string        | required | Must be `"file"`                                                         |
| `description`                    | string        | `""`     | Human-readable description of the source                                 |
| `sourcePaths`                    | string\|array | required | Path(s) to directory or files to include                                 |
| `filePattern`                    | string\|array | `"*.*"`  | File pattern(s) to match                                                 |
| `notPath` (or `excludePatterns`) | array         | `[]`     | Patterns to exclude files                                                |
| `path`                           | string\|array | `[]`     | Patterns to include only files in specific paths                         |
| `contains`                       | string\|array | `[]`     | Patterns to include only files containing specific content               |
| `notContains`                    | string\|array | `[]`     | Patterns to exclude files containing specific content                    |
| `size`                           | string\|array | `[]`     | Size constraints for files (e.g., `"> 10K"`, `"< 1M"`)                   |
| `date`                           | string\|array | `[]`     | Date constraints for files (e.g., `"since yesterday"`, `"> 2023-01-01"`) |
| `ignoreUnreadableDirs`           | boolean       | `false`  | Whether to ignore unreadable directories                                 |
| `showTreeView`                   | boolean       | `true`   | Whether to display a directory tree visualization                        |
| `modifiers`                      | array         | `[]`     | Content modifiers to apply                                               |
| `tags`                           | array         | []       | List of tags for this source                                             |

## Multiple Source Paths

You can include files from multiple directories:

```yaml
documents:
  - description: "Multiple Source Directories Example"
    outputPath: "docs/multiple-dirs.md"
    sources:
      - type: file
        description: "Multiple Source Directories"
        sourcePaths: [ "src/Controllers", "src/Models", "config" ]
        filePattern: "*.php"
        showTreeView: true
```

## Multiple File Patterns

Include different file types:

```yaml
documents:
  - description: "Multiple File Types Example"
    outputPath: "docs/multiple-types.md"
    sources:
      - type: file
        description: "Multiple File Types"
        sourcePaths: src
        filePattern: [ "*.php", "*.json", "*.md" ]
        showTreeView: true
```

## Path-Based Filtering

Target specific subdirectories or files:

```yaml
documents:
  - description: "Controller Files Only"
    outputPath: "docs/controllers.md"
    sources:
      - type: file
        description: "Only Controller Files"
        sourcePaths: src
        path: "Controller"
        filePattern: "*.php"
```

This will only include files with "Controller" in their path. You can also use an array:

```yaml

documents:
  - description: "Controller Files Only"
    outputPath: "docs/controllers.md"
    sources:
      - type: file
        description: "Only Controller Files"
        sourcePaths: src
        path:
          - Controller
          - Service
        filePattern: "*.php"
```

## Content-Based Filtering

Include or exclude files based on their content:

```yaml
documents:
  - description: "Repository Classes"
    outputPath: "docs/repositories.md"
    sources:
      - type: file
        description: "Repository Classes"
        sourcePaths: src
        contains: "class Repository"
        filePattern: "*.php"
```

You can also exclude files containing specific content:

```yaml
documents:
  - description: "Repository Classes"
    outputPath: "docs/repositories.md"
    sources:
      - type: file
        description: "Repository Classes"
        sourcePaths: src
        notContains: "@deprecated"
        filePattern: "*.php"
```

Use arrays for multiple patterns:

```yaml
documents:
  - description: "Repository Classes"
    outputPath: "docs/repositories.md"
    sources:
      - type: file
        description: "Repository Classes"
        sourcePaths: src
        contains:
          - "class Service"
          - "implements ServiceInterface"
        notContains:
          - @deprecated
          - @internal
        filePattern: "*.php"
```

## Size-Based Filtering

Filter files by their size:

```yaml
documents:
  - description: "Medium-Sized Files"
    outputPath: "docs/medium-files.md"
    sources:
      - type: file
        description: "Medium-Sized Files"
        sourcePaths: src
        size: [ "> 1K", "< 50K" ]
        filePattern: "*.php"
        showTreeView: true
```

Size modifiers support these formats:

- `k`, `ki` for kilobytes (e.g., `10k`, `5ki`)
- `m`, `mi` for megabytes (e.g., `1m`, `2mi`)
- `g`, `gi` for gigabytes (e.g., `1g`, `1gi`)

Operators include:

- `>`, `>=`, `<`, `<=` for comparisons

## Date-Based Filtering

Include files based on their modification date:

```yaml
documents:
  - description: "Recent Files"
    outputPath: "docs/recent-files.md"
    sources:
      - type: file
        description: "Recently Modified Files"
        sourcePaths: src
        date: "since 2 weeks ago"
        filePattern: "*.php"
        showTreeView: true
```

Date modifiers support:

- Relative dates: `yesterday`, `last week`, `2 days ago`, etc.
- Absolute dates: `2023-01-01`, `2023/01/01`, etc.
- Operators: `>` (after), `<` (before), `>=`, `<=`, `==`
- Alternative syntax: `since` (for `>`), `until` or `before` (for `<`)

Examples:

```yaml
date: "since yesterday"
```

```yaml
date:
  - "> 2023-05-01"
  - "< 2023-06-01"
```

## Combined Filtering (Advanced Example)

You can combine multiple filters for precise targeting:

```yaml
documents:
  - description: "Recently Modified Controllers"
    outputPath: "docs/recent-controllers.md"
    sources:
      - type: file
        description: "Recently Modified Controller Classes"
        sourcePaths: src
        filePattern: "*.php"
        path: "Controller"
        contains: "namespace App\\Controller"
        notContains: "@deprecated"
        size: "< 100K"
        date: "since 1 month ago"
        ignoreUnreadableDirs: true
        showTreeView: true
        modifiers: [ "php-signature" ]
```

This will:

1. Scan the `src` directory for PHP files
2. Only include files with "Controller" in their path
3. Only include files containing "namespace App\Controller"
4. Exclude files containing "@deprecated"
5. Only include files smaller than 100KB
6. Only include files modified in the last month
7. Skip directories that can't be read due to permissions
8. Show a directory tree in the output
9. Apply the PHP signature modifier to simplify method implementations