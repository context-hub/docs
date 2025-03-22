# Document-Level Modifiers

In addition to source-specific modifiers, you can apply modifiers at the document level. Document-level modifiers
are applied to all supported sources within a document.

## Usage

Add modifiers to your document configuration:

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    modifiers:
      - php-signature
      - name: sanitizer
        options:
          rules:
            - type: keyword
              keywords:
                - password
                - secret
              replacement: "[REDACTED]"
    sources:
      - type: file
        description: API Source Files
        sourcePaths:
          - src/Api
        filePattern: *.php
        modifiers:
          - php-docs
```