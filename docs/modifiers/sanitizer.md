# Sanitizer Modifier

It helps you clean up or obfuscate sensitive information in your code before sharing it. It applies configurable
sanitization rules to protect private details.

## Basic Usage

```yaml
documents:
  - description: Sanitized API Documentation
    outputPath: docs/sanitized-api.md
    sources:
      - type: file
        description: API Classes
        sourcePaths:
          - src/Auth
        filePattern: "*.php"
        modifiers:
          - name: sanitizer
            options:
              rules:
                - type: keyword
                  keywords:
                    - password
                    - secret
                    - api_key
                  replacement: '[REDACTED]'
                - type: regex
                  usePatterns:
                    - email
                    - api-key
                    - jwt
```

## Keyword Removal Rule

Removes or replaces text containing specific keywords.

```yaml
documents:
  - description: Sanitized Configuration
    outputPath: docs/sanitized-config.md
    sources:
      - type: file
        sourcePaths:
          - config
        modifiers:
          - name: sanitizer
            options:
              rules:
                - type: keyword
                  name: remove-sensitive
                  keywords:
                    - password
                    - secret
                    - private_key
                  replacement: '[REDACTED]'
                  caseSensitive: false
                  removeLines: true
```

| Parameter       | Type    | Default        | Description                                        |
|-----------------|---------|----------------|----------------------------------------------------|
| `name`          | string  | auto-generated | Unique rule identifier                             |
| `keywords`      | array   | required       | List of keywords to search for                     |
| `replacement`   | string  | `"[REMOVED]"`  | Replacement text                                   |
| `caseSensitive` | boolean | `false`        | Whether matching should be case-sensitive          |
| `removeLines`   | boolean | `true`         | Whether to remove entire lines containing keywords |

## Regex Replacement Rule

Applies regular expression patterns to find and replace content.

```yaml
documents:
  - description: Sanitized Authentication
    outputPath: docs/sanitized-auth.md
    sources:
      - type: file
        sourcePaths:
          - src/Auth
        modifiers:
          - name: sanitizer
            options:
              rules:
                - type: regex
                  patterns:
                    "/access_token\\s*=\\s*['\"]([^'\"]+)['\"]/": "access_token='[REDACTED]'"
                    "/password\\s*=\\s*['\"]([^'\"]+)['\"]/": "password='[REDACTED]'"
                  usePatterns:
                    - credit-card
                    - email
                    - api-key
```

| Parameter     | Type   | Default        | Description                                   |
|---------------|--------|----------------|-----------------------------------------------|
| `name`        | string | auto-generated | Unique rule identifier                        |
| `patterns`    | object | {}             | Object mapping regex patterns to replacements |
| `usePatterns` | array  | []             | Predefined pattern aliases (see below)        |

## Comment Insertion Rule

Inserts comments into the code to mark it as sanitized or add disclaimers.

```yaml
documents:
  - description: Commented Sanitized Code
    outputPath: docs/commented-code.md
    sources:
      - type: file
        sourcePaths:
          - src
        modifiers:
          - name: sanitizer
            options:
              rules:
                - type: comment
                  fileHeaderComment: This file has been sanitized for security purposes.
                  classComment: Sanitized class - sensitive information removed.
                  methodComment: Sanitized method - implementation details omitted.
                  frequency: 10
                  randomComments:
                    - Sanitized for security
                    - Internal details removed
                    - Sensitive data redacted
```

| Parameter           | Type    | Default        | Description                                        |
|---------------------|---------|----------------|----------------------------------------------------|
| `name`              | string  | auto-generated | Unique rule identifier                             |
| `fileHeaderComment` | string  | `""`           | Comment to insert at the top of file               |
| `classComment`      | string  | `""`           | Comment to insert before class definitions         |
| `methodComment`     | string  | `""`           | Comment to insert before method definitions        |
| `frequency`         | integer | `0`            | How often to insert random comments (0 = disabled) |
| `randomComments`    | array   | `[]`           | Array of random comments to insert                 |

## Predefined Pattern Aliases

The regex rule type supports these built-in pattern aliases:

| Alias             | Description                 |
|-------------------|-----------------------------|
| `credit-card`     | Credit card numbers         |
| `email`           | Email addresses             |
| `api-key`         | API keys and tokens         |
| `ip-address`      | IP addresses                |
| `jwt`             | JWT tokens                  |
| `phone-number`    | Phone numbers               |
| `password-field`  | Password fields in code     |
| `url`             | URLs                        |
| `social-security` | Social security numbers     |
| `aws-key`         | AWS access keys             |
| `private-key`     | Private key headers         |
| `database-conn`   | Database connection strings |

These modifiers give you powerful tools to both transform your code into well-structured documentation and ensure
sensitive information is properly sanitized before sharing.

# Combined rules example

You can combine multiple rules in a single sanitizer modifier to achieve more complex sanitization tasks.

```yaml
documents:
  - description: Fully Sanitized API
    outputPath: docs/full-sanitized-api.md
    sources:
      - type: file
        sourcePaths:
          - src
        modifiers:
          - name: sanitizer
            options:
            rules:
              - type: keyword
            keywords:
              - apiKey
              - password
              - type: regex
            usePatterns:
              - credit-card
              - email
              - jwt
              - type: comment
            fileHeaderComment: Security-sanitized file.
```

## Document-level sanitizer example

At the document level, you can apply the sanitizer modifier to all sources within a document. This is useful for
sanitizing sensitive information across multiple sources in a single document.

```yaml
documents:
  - description: Security Sanitized Project
    outputPath: docs/secure-project.md
    modifiers:
      - name: sanitizer
        options:
          rules:
            - type: keyword
              keywords:
                - SECRET
                - API_KEY
              replacement: '[SECURITY REMOVED]'
            - type: regex
              usePatterns:
                - password-field
                - database-conn
    sources:
      - type: file
        sourcePaths:
          - src
        filePattern: "*.php"
      - type: file
        sourcePaths:
          - config
        filePattern: "*.json"
```