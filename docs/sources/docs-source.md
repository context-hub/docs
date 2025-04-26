# Docs Source

Retrieve documentation from [Context7](https://context7.com/) service based on library, topic, and token limit.

```yaml
documents:
  - description: Laravel Controller Documentation
    outputPath: docs/laravel-controllers.md
    sources:
      - type: docs
        library: "laravel/docs"
        topic: controller
        tokens: 600
        description: "Laravel controller documentation"
        tags: [ "laravel", "docs" ]
```

## Parameters

| Parameter     | Type    | Default  | Description                               |
|---------------|---------|----------|-------------------------------------------|
| `type`        | string  | required | Must be `"docs"`                          |
| `library`     | string  | required | Library identifier (e.g., "laravel/docs") |
| `topic`       | string  | required | Topic to search for within the library    |
| `tokens`      | integer | 500      | Maximum token count to retrieve           |
| `description` | string  | `""`     | Human-readable description of the source  |
| `tags`        | array   | []       | List of tags for this source              |

## How It Works

The Docs source connects to Context7's documentation service to retrieve targeted content based on:

1. **Library**: The repository identifier (like "laravel/docs" or "symfony/docs")
2. **Topic**: A specific topic or keyword to search for within the library
3. **Tokens**: The maximum number of tokens to retrieve (helpful for controlling context size)

This allows you to include highly relevant documentation in your context without including entire files or repositories.

## Example Use Cases

### API Documentation Reference

```yaml
documents:
  - description: Laravel API Documentation
    outputPath: docs/laravel-api.md
    sources:
      - type: docs
        library: "laravel/docs"
        topic: "api"
        tokens: 1000
```

### Multiple Documentation Sources

```yaml
documents:
  - description: PHP Framework Comparison
    outputPath: docs/framework-comparison.md
    sources:
      - type: docs
        library: "laravel/docs"
        topic: "controller"
        tokens: 400
        description: "Laravel Controllers"
      - type: docs
        library: "symfony/docs"
        topic: "controller"
        tokens: 400
        description: "Symfony Controllers"
```

## Using Environment Variables

Like other source types, you can use environment variables in your configuration:

```yaml
documents:
  - description: Dynamic Documentation
    outputPath: docs/dynamic-docs.md
    sources:
      - type: docs
        library: "${DOC_LIBRARY}"
        topic: "${DOC_TOPIC}"
        tokens: ${DOC_TOKENS}
```
