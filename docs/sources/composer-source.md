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
        filePattern: *.php
        notPath:
          - tests
```

## Parameters

| Parameter      | Type          | Default               | Description                                                |
|----------------|---------------|-----------------------|------------------------------------------------------------|
| `type`         | string        | required              | Must be `"composer"`                                       |
| `description`  | string        | `"Composer Packages"` | Human-readable description of the source                   |
| `composerPath` | string        | `"."`                 | Path to composer.json file or directory containing it      |
| `packages`     | string\|array | `[]`                  | Package name pattern(s) to match                           |
| `filePattern`  | string\|array | `"*.php"`             | File pattern(s) to match                                   |
| `notPath`      | array         | `["tests", "vendor"]` | Patterns to exclude files                                  |
| `path`         | string\|array | `[]`                  | Patterns to include only files in specific paths           |
| `contains`     | string\|array | `[]`                  | Patterns to include only files containing specific content |
| `notContains`  | string\|array | `[]`                  | Patterns to exclude files containing specific content      |
| `showTreeView` | boolean       | `true`                | Whether to display a package tree visualization            |
| `modifiers`    | array         | `[]`                  | Content modifiers to apply                                 |

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
        filePattern: *.php
        path: Component
        notPath:
          - tests
          - vendor
        contains: class
        notContains: @deprecated
        showTreeView: true
        modifiers:
          - php-signature
```