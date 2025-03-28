# PHP Content Filter Modifier

The modifier allows you to selectively include or exclude PHP class elements such as methods, properties, constants, and
annotations based on configurable criteria.

> Please note that this modifier is specifically designed for PHP files and will not work with other file types.

## Features

- Filter methods, properties, and constants by name or pattern
- Include or exclude elements based on visibility (`public`, `protected`, `private`)
- Control whether method bodies are kept or replaced with placeholders
- Optionally keep or remove documentation comments
- Optionally keep or remove PHP 8 attributes
- Filter elements using regular expression patterns

## Example

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: file
        description: API Source Files
        sourcePaths:
          - src/Api
        filePattern: "*.php"
        modifiers:
          - name: php-content-filter
            options:
              method_visibility:
                - public
              exclude_methods:
                - __construct
              keep_method_bodies: false
```

## Options

| Option                       | Type    | Default                              | Description                                                                     |
|------------------------------|---------|--------------------------------------|---------------------------------------------------------------------------------|
| `include_methods`            | array   | `[]`                                 | Method names to include (empty means include all unless exclude_methods is set) |
| `exclude_methods`            | array   | `[]`                                 | Method names to exclude                                                         |
| `include_properties`         | array   | `[]`                                 | Property names to include                                                       |
| `exclude_properties`         | array   | `[]`                                 | Property names to exclude                                                       |
| `include_constants`          | array   | `[]`                                 | Constant names to include                                                       |
| `exclude_constants`          | array   | `[]`                                 | Constant names to exclude                                                       |
| `method_visibility`          | array   | `["public", "protected", "private"]` | Method visibilities to include                                                  |
| `property_visibility`        | array   | `["public", "protected", "private"]` | Property visibilities to include                                                |
| `constant_visibility`        | array   | `["public", "protected", "private"]` | Constant visibilities to include                                                |
| `keep_method_bodies`         | boolean | `false`                              | Whether to keep method bodies or replace with placeholders                      |
| `method_body_placeholder`    | string  | `"/* ... */"`                        | Placeholder for method bodies when keep_method_bodies is false                  |
| `keep_doc_comments`          | boolean | `true`                               | Whether to keep doc comments                                                    |
| `keep_attributes`            | boolean | `true`                               | Whether to keep PHP 8+ attributes                                               |
| `include_methods_pattern`    | string  | `null`                               | Regular expression pattern for methods to include                               |
| `exclude_methods_pattern`    | string  | `null`                               | Regular expression pattern for methods to exclude                               |
| `include_properties_pattern` | string  | `null`                               | Regular expression pattern for properties to include                            |
| `exclude_properties_pattern` | string  | `null`                               | Regular expression pattern for properties to exclude                            |
