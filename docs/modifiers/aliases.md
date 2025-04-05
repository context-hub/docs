# Modifier Aliases

**CTX** supports defining reusable modifier configurations through aliases. This allows you to define common
modifier configurations once and reference them by name throughout your configuration, reducing duplication and
improving maintainability.
``
## Basic Usage

Define your modifier aliases in the `settings.modifiers` section of your configuration:

```yaml
settings:
  modifiers:
    api-docs:
      name: php-content-filter
      options:
        keep_doc_comments: false
        keep_method_bodies: false
    docs-markdown:
      name: php-docs
      options:
        include_implementations: false
        class_heading_level: 2

documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: file
        description: API Controllers
        sourcePaths:
          - src/Controller
        modifiers:
          - api-docs
```

### Another example with multiple aliased modifiers

```yaml
settings:
  modifiers:
    clean-code:
      name: php-signature
    sanitize-api:
      name: sanitizer
      options:
        rules:
          - type: keyword
            keywords:
              - password
              - secret
            replacement: "[REDACTED]"

documents:
  - description: Cleaned API Documentation
    outputPath: docs/clean-api.md
    sources:
      - type: file
        description: Source Files
        sourcePaths:
          - src
        modifiers:
          - clean-code
          - sanitize-api
```