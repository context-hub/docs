# Composer Source

The Composer source allows you to include source code from your project's Composer dependencies:

```yaml
documents:
  - description: Core Dependencies
    outputPath: docs/core-dependencies.md
    sources:
      - type: composer
        description: Core Dependencies
        composerPath: .
        packages:
          - symfony/finder
          - psr/log
        filePattern: "*.php"
        notPath:
          - tests
```

## Parameters

| Parameter      | Type            | Default               | Description                                                                            |
|----------------|-----------------|-----------------------|----------------------------------------------------------------------------------------|
| `type`         | string          | required              | Must be `"composer"`                                                                   |
| `description`  | string          | `"Composer Packages"` | Human-readable description of the source                                               |
| `composerPath` | string          | `"."`                 | Path to composer.json file or directory containing it                                  |
| `packages`     | string\|array   | `[]`                  | Package name pattern(s) to match                                                       |
| `filePattern`  | string\|array   | `"*.php"`             | File pattern(s) to match                                                               |
| `notPath`      | array           | `["tests", "vendor"]` | Patterns to exclude files                                                              |
| `path`         | string\|array   | `[]`                  | Patterns to include only files in specific paths                                       |
| `contains`     | string\|array   | `[]`                  | Patterns to include only files containing specific content                             |
| `notContains`  | string\|array   | `[]`                  | Patterns to exclude files containing specific content                                  |
| `showTreeView` | boolean         | `true`                | Whether to display a directory tree visualization (deprecated, use `treeView` instead) |
| `treeView`     | boolean\|object | `true`                | Tree view configuration, can be a boolean or detailed configuration object             |
| `modifiers`    | array           | `[]`                  | Content modifiers to apply                                                             |

## Basic Usage

First you need to specify packages you want to include:

```yaml
documents:
  - description: Symfony Components
    outputPath: docs/symfony-components.md
    sources:
      - type: composer
        description: Symfony Components
        packages:
          - cycle/orm
          - cycle/annotated
```

## Additional filtering

You can also filter files by path, content, and other criteria:

```yaml
documents:
  - description: Filtered Composer Dependencies
    outputPath: docs/filtered-deps.md
    sources:
      - type: composer
        description: Filtered Dependencies
        composerPath: .
        packages:
          - symfony/console
          - symfony/http-foundation
        filePattern: "*.php"
        path: Component
        notPath:
          - tests
          - vendor
        contains: class
        notContains: @deprecated
        modifiers:
          - php-signature
```

## Tree View Configuration

You can customize the tree view with detailed configuration options:

```yaml
documents:
  - description: Filtered Composer Dependencies
    outputPath: docs/filtered-deps.md
    sources:
      - type: composer
        description: Filtered Dependencies
        composerPath: .
        packages:
          - symfony/console
          - symfony/http-foundation
        treeView:
          enabled: true
          showSize: true
          showLastModified: true
          showCharCount: true
          includeFiles: true
          maxDepth: 3
          dirContext:
            "src/Controller": "Application controllers"
            "src/Models": "Domain models and entities"
```

### Tree View Options

| Option             | Type    | Default | Description                                                      |
|--------------------|---------|---------|------------------------------------------------------------------|
| `enabled`          | boolean | `true`  | Whether to show the tree view                                    |
| `showSize`         | boolean | `false` | Include file/directory sizes in the tree                         |
| `showLastModified` | boolean | `false` | Include last modified dates in the tree                          |
| `showCharCount`    | boolean | `false` | Include character counts in the tree                             |
| `includeFiles`     | boolean | `true`  | Whether to include files (true) or only show directories (false) |
| `maxDepth`         | integer | `0`     | Maximum depth of the tree to display (0 for unlimited)           |
| `dirContext`       | object  | `{}`    | Optional descriptions for specific directories                   |

Example output with enhanced tree view:

```
Project
├── src/ [4.2 MB, 2024-03-12, 25,483 chars]
│   ├── Controller/ [756 KB, 2024-03-10, 7,521 chars] # Application controllers
│   │   ├── ApiController.php [328 KB, 2024-03-10, 3,845 chars]
│   │   └── WebController.php [428 KB, 2024-03-05, 3,676 chars]
│   ├── Models/ [1.2 MB, 2024-03-12, 12,345 chars] # Domain models and entities
│   │   ├── User.php [128 KB, 2024-03-05, 1,234 chars]
│   │   └── Product.php [96 KB, 2024-03-12, 987 chars]
```

### Simple Boolean Usage

For backward compatibility, you can still use a boolean value:

```yaml
documents:
  - description: Filtered Composer Dependencies
    outputPath: docs/filtered-deps.md
    sources:
      - type: composer
        description: Filtered Dependencies
        composerPath: .
        packages:
          - symfony/console
          - symfony/http-foundation
        treeView: false  # Disable tree view
```