# URL Source

Fetch content from websites with

- optional CSS selector support
- custom headers
- environment variable support
- multiple URLs

```yaml
documents:
  - description: Documentation Website
    outputPath: docs/website-content.md
    sources:
      - type: url
        description: Documentation Website
        urls:
          - https://example.com/docs
          - https://api.${ENV_NAME}.example.com/data
        selector: .main-content
        headers:
          Authorization: Bearer ${API_TOKEN}
          Accept-Language: en-US
```

## Parameters

| Parameter     | Type   | Default  | Description                                                      |
|---------------|--------|----------|------------------------------------------------------------------|
| `type`        | string | required | Must be `"url"`                                                  |
| `description` | string | `""`     | Human-readable description of the source                         |
| `urls`        | array  | required | URLs to fetch content from (support env variables)               |
| `selector`    | string | `null`   | CSS selector to extract specific content (null for full page)    |
| `headers`     | object | `{}`     | Custom headers to include in the request (support env variables) |
| `tags`        | array  | []       | List of tags for this source                                     |

## Using variables in configuration

Context Generator supports various types of variables throughout your configuration files, including environment
variables, predefined system variables, and custom configuration variables.

Read more about [variables](./variables.md) in the documentation.