# Prompts

CTX includes support for pre-defined prompts that provide structured conversation templates. These
prompts can serve as starting points for common tasks, code generation, or project-specific workflows.

### Table of Contents

- [How Prompts Work](#how-prompts-work)
- [Defining Prompts](#defining-prompts)
- [Variable Substitution](#variable-substitution)
- [Template Inheritance](#template-inheritance)
    - [Template Types](#template-types)
    - [Extending Templates](#extending-templates)
    - [Multiple Inheritance](#multiple-inheritance)
    - [Nested Extensions](#nested-extensions)
- [Prompt Message Structure](#prompt-message-structure)
- [Example Usage](#example-usage)
- [Practical Example: Creating Issue Templates](#practical-example-creating-issue-templates)
- [Import](#import)
    - [Import Capabilities](#import-capabilities)
    - [Example Import Configuration](#example-import-configuration)

## How Prompts Work

Prompts are defined in your configuration files and can include:

- Template messages with variable placeholders
- Input schemas for required and optional parameters
- Descriptions for better discoverability
- Template inheritance for creating reusable prompt components

When LLM requests a prompt, the CTX returns the structured conversation template with any variable
placeholders filled in based on the provided arguments.

## Defining Prompts

Prompts can be defined in your configuration files using the `prompts` key:

```yaml
prompts:
  - id: generate-controller
    description: "Generate a controller for a specific entity"
    type: prompt # Optional, defaults to 'prompt' if not specified
    schema:
      properties:
        entityName:
          description: "Name of the entity (e.g. User, Product)"
      required:
        - entityName
    messages:
      - role: assistant
        content: "I'll help you generate a controller for your entity. Please provide the entity name."
      - role: user
        content: "Generate a controller for the {{entityName}} entity."
```

Each prompt contains:

- **id**: Unique identifier for the prompt
- **description**: Human-readable description
- **type**: Can be either `prompt` (default) or `template` (used for inheritance)
- **schema** (optional): Defines input parameters with descriptions and required fields
- **messages**: The sequence of conversation messages that make up the prompt template
- **extend** (optional): Define templates to extend (for template inheritance)

## Variable Substitution

Prompts support variable substitution in message content using the format `{{variableName}}`. When LLM requests a
prompt with arguments, the CTX replaces these placeholders with the provided values.

Variables can come from:

- Arguments provided when requesting the prompt
- Arguments inherited from template extensions

## Template Inheritance

CTX supports a powerful template inheritance system that allows you to create reusable prompt templates and
extend them to create more specialized prompts.

### Template Types

There are two types of prompts in the system:

- **Prompt** (`type: prompt`, default): Regular prompts that can be directly used
- **Template** (`type: template`): Base templates that are meant to be extended by other prompts

### Extending Templates

Prompts can extend one or more templates using the `extend` keyword:

```yaml
prompts:
  # Define a base template
  - id: base-template
    type: template
    messages:
      - role: user
        content: "This is a base template with {{variable}}."

  # Extend the base template
  - id: extended-prompt
    type: prompt
    extend:
      - id: base-template
        arguments:
          variable: "specialized value"
    schema:
      properties:
        additionalVar:
          description: "Additional parameter"
      required:
        - additionalVar
    messages:
      - role: user
        content: "Additional message with {{additionalVar}}."
```

When extending a template:

1. The extending prompt inherits all messages from the template
2. Variable placeholders in the template are filled with values defined in the `arguments` section
3. The extending prompt can add its own messages in addition to inherited messages

### Multiple Inheritance

Prompts can extend multiple templates:

```yaml
prompts:
  - id: complex-prompt
    type: prompt
    extend:
      - id: template1
        arguments:
          var1: "value1"
      - id: template2
        arguments:
          var2: "value2"
```

The templates are processed in order, with each template's messages being added to the final prompt.

### Nested Extensions

Templates can also extend other templates, creating a chain of inheritance:

```yaml
prompts:
  - id: base-template
    type: template
    messages:
      - role: user
        content: "Base content with {{baseVar}}."

  - id: intermediate-template
    type: template
    extend:
      - id: base-template
        arguments:
          baseVar: "{{intermediateVar}}"
    messages:
      - role: user
        content: "Intermediate content with {{intermediateVar}}."

  - id: final-prompt
    type: prompt
    extend:
      - id: intermediate-template
        arguments:
          intermediateVar: "final value"
    messages:
      - role: user
        content: "Final content."
```

## Prompt Message Structure

Each message in the `messages` array must include:

- **role**: The role of the message sender (`user` or `assistant`)
- **content**: The content of the message (can include variable placeholders)

## Example Usage

Here's how LLM might use prompts during a conversation:

1. **Listing available prompts**:
   LLM can request a list of all available prompts to discover what templates are available.

2. **Using a prompt with arguments**:
   LLM can request a specific prompt with arguments, which will return the prompt messages with variables
   substituted.

3. **Custom workflows**:
   Prompts can be designed for specific workflows like code generation, documentation creation, or project analysis.

## Practical Example: Creating Issue Templates

Here's a practical example showing how to create a hierarchical system of issue templates:

```yaml
prompts:
  # Base issue template
  - id: template-issue
    description: Template for creating issues
    type: template
    messages:
      - role: user
        content: "Create a new issue with the following title and description: {{title}} {{description}}"

  # Bug issue template extending the base template
  - id: bug-issue
    description: Create a new bug issue
    type: prompt
    extend:
      - id: template-issue
        arguments:
          title: 'Bug: {{title}}'
          description: '{{description}}'
    schema:
      properties:
        title:
          description: The title of the bug
        description:
          description: The description of the bug
      required:
        - title
        - description

  # Feature issue template extending the base template
  - id: feature-issue
    description: Create a new feature issue
    type: prompt
    extend:
      - id: template-issue
        arguments:
          title: 'Feature: {{title}}'
          description: '{{description}}'
    schema:
      properties:
        title:
          description: The title of the feature
        description:
          description: The description of the feature
      required:
        - title
        - description

  # More complex template with priority
  - id: template-complex-issue
    type: template
    description: Template for complex issues with priority
    extend:
      - id: template-issue
        arguments:
          title: '{{type}}: {{title}}'
          description: '{{description}} \n\n**Priority**: {{priority}}'

  # Priority bug issue using the complex template
  - id: priority-bug-issue
    description: Create a new priority bug issue
    type: prompt
    extend:
      - id: template-complex-issue
        arguments:
          type: 'Bug'
          priority: 'High'
    schema:
      properties:
        title:
          description: The title of the bug
        description:
          description: The description of the bug
      required:
        - title
        - description
```

This example shows:

1. A base template defining the structure of an issue
2. Bug and feature issue templates extending the base template
3. A more complex template that adds priority information
4. A specialized priority bug issue that combines multiple levels of templates

## Import

Prompts in CTX aren't just static templates - they're designed to be shared, imported, and reused across
projects and teams. This creates an ecosystem where:

- Teams can maintain consistent approaches to common development tasks
- Best practices can be encoded once and shared widely
- Specialized domain knowledge can be packaged into reusable templates
- The community can collaborate on high-quality prompt libraries

CTX supports configuration imports from multiple sources to enable modular configuration management:

### Import Capabilities

- **Local Files**: Import prompts from local filesystem files
- **URL Sources**: Import prompts directly from remote URLs

This transforms how teams work with AI by enabling:

- **Reusability**: Create prompt repositories once, use them across multiple projects
- **Community Sharing**: Participate in an ecosystem of community-maintained prompt libraries
- **Standardization**: Promote best practices through shared prompt configurations
- **Version Control**: Reference specific versions of remote prompt repositories

### Example Import Configuration

```yaml
import:
  # Local import
  - path: services/api/context.yaml
    type: local # default, can be omitted

  # URL import
  - url: https://example.com/context-configs/api-prompts.yaml
    type: url
    headers: # optional HTTP headers
      Authorization: "Bearer ${API_TOKEN}"

  # GitHub Gist import (using URL)
  - url: https://gist.githubusercontent.com/butschster/1b7e597691cc1a6476b15dc120ecbddb/raw/9cda0186689e5c819e1f60b486a9d960fcf412c2/prompts.yaml
    type: url
```

> **Note**: There is an example of shared prompts
> on [Gist](https://gist.github.com/butschster/1b7e597691cc1a6476b15dc120ecbddb) that can be used as a starting point.