# PHP-Docs Modifier

The `php-docs` modifier transforms PHP code into structured markdown documentation. It parses classes, methods,
properties, and constants to generate API documentation that cannot be converted into code. It helps
you to generate a code for team members, LLMs, or other documentation purposes without
exposing sensitive information or implementation details.

## Basic Usage

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: file
        description: API Classes
        sourcePaths:
          - src/Api
        filePattern: "*.php"
        modifiers:
          - php-docs
```

## Advanced Configuration

For more control, you can provide configuration options:

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: file
        description: API Classes
        sourcePaths:
          - src/Api
        filePattern: "*.php"
        modifiers:
          - name: php-docs
            options:
              include_private_methods: false
              include_protected_methods: true
              include_implementations: false
              class_heading_level: 2
              extract_routes: true
```

## Options

| Option                         | Type    | Default | Description                                                      |
|--------------------------------|---------|---------|------------------------------------------------------------------|
| `include_private_methods`      | boolean | `false` | Whether to include private methods in the documentation          |
| `include_protected_methods`    | boolean | `true`  | Whether to include protected methods in the documentation        |
| `include_private_properties`   | boolean | `false` | Whether to include private properties in the documentation       |
| `include_protected_properties` | boolean | `true`  | Whether to include protected properties in the documentation     |
| `include_implementations`      | boolean | `true`  | Whether to include method implementations in code blocks         |
| `include_property_defaults`    | boolean | `true`  | Whether to include property default values                       |
| `include_constants`            | boolean | `true`  | Whether to include class constants                               |
| `code_block_format`            | string  | `"php"` | Language identifier for code blocks                              |
| `class_heading_level`          | integer | `1`     | Heading level for class names (1-6)                              |
| `extract_routes`               | boolean | `true`  | Whether to extract route information from annotations/attributes |
| `keep_doc_comments`            | boolean | `true`  | Whether to preserve PHPDoc comments in the output                |