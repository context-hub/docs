# Text Source

Include custom text content like headers, notes, or instructions.

```yaml
documents:
  - description: Project Documentation
    outputPath: docs/project.md
    sources:
      - type: text
        description: Custom Notes
        content: |
          # Project Notes

          This is additional context for the AI.
        tag: PROJECT_NOTES
```

## Parameters

| Parameter     | Type   | Default         | Description                                                        |
|---------------|--------|-----------------|--------------------------------------------------------------------|
| `type`        | string | required        | Must be `"text"`                                                   |
| `description` | string | `""`            | Human-readable description of the source                           |
| `content`     | string | required        | Text content to include (support env variables)                    |
| `tag`         | string | `"INSTRUCTION"` | Custom tag to identify the type of content (support env variables) |
| `tags`        | array  | []              | List of tags for this source                                       |

## Custom Tags Example

You can use custom tags to better identify the purpose of different text blocks:

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: text
        description: Introduction
        content: |
          # API Documentation

          This document provides an overview of the API.
        tag: INTRO
      - type: text
        description: Usage Notes
        content: |
          ## Usage Notes

          - Always include API key in headers
          - Rate limits apply
        tag: USAGE_NOTES
```

The generated output will include the specified tags:

```
<INTRO>
# API Documentation

This document provides an overview of the API.
</INTRO>
----------------------------------------------------------

<USAGE_NOTES>
## Usage Notes

- Always include API key in headers
- Rate limits apply
</USAGE_NOTES>
----------------------------------------------------------
```

## Using variables in configuration

Context Generator supports various types of variables throughout your configuration files, including environment
variables, predefined system variables, and custom configuration variables.

Read more about [variables](./variables.md) in the documentation.

```yaml
documents:
  - description: Environment-Specific Documentation
    outputPath: docs/env-docs.md
    sources:
      - type: text
        description: API Configuration
        content: |
          # ${ENV_NAME} Environment

          Base URL: https://api.${ENV_NAME}.example.com

          API Key: Please use the ${ENV_NAME}_API_KEY environment variable
        tag: CONFIG
```

## Tags for categorization

```yaml
documents:
  - description: Feature Documentation
    outputPath: docs/features.md
    sources:
      - type: text
        description: Feature Overview
        content: |
          # Feature Overview

          This document describes the core features.
        tag: OVERVIEW
        tags:
          - documentation
          - features
          - v1
```