# Prompts

MCP server includes support for pre-defined prompts that provide structured conversation templates. These
prompts can serve as starting points for common tasks, code generation, or project-specific workflows.

## How Prompts Work

Prompts are defined in your configuration files and can include:

- Template messages with variable placeholders
- Input schemas for required and optional parameters
- Descriptions for better discoverability

When LLM requests a prompt, the MCP server returns the structured conversation template with any variable
placeholders filled in based on the provided arguments.

## Defining Prompts

```yaml
prompts:
  - id: generate-controller
    description: "Generate a controller for a specific entity"
    schema:
      properties:
        entityName:
          description: "Name of the entity (e.g. User, Product)"
      required:
        - entityName
    messages:
      - role: system
        content: "You are a PHP code generator specializing in Symfony controllers."
      - role: assistant
        content: "I'll help you generate a controller for your entity. Please provide the entity name."
      - role: user
        content: "Generate a controller for the {{entityName}} entity."
```

Each prompt contains:

- **id**: Unique identifier for the prompt
- **description**: Human-readable description
- **schema** (optional): Defines input parameters with descriptions and required fields
- **messages**: The sequence of conversation messages that make up the prompt

## Variable Substitution

Prompts support variable substitution in message content using the format `{{variableName}}`. When LLM requests a
prompt with arguments, the MCP server replaces these placeholders with the provided values.

## Available Prompt Tools

When connected via MCP, LLM has access to the following prompt-related tools:

### Prompts Tools

- `prompts.list`: List all available prompts defined in the configuration
- `prompts.get`: Get a specific prompt by ID

## Example Usage

Here's how LLM might use prompts during a conversation:

1. **Listing available prompts**:
   Claude can request a list of all available prompts to discover what templates are available.

2. **Using a prompt with arguments**:
   Claude can request a specific prompt with arguments, which will return the prompt messages with variables
   substituted.

3. **Custom workflows**:
   Prompts can be designed for specific workflows like code generation, documentation creation, or project analysis.

## Shareable Prompts

Prompts in Context Generator aren't just static templates - they're designed to be shared, imported, and reused across
projects and teams. This creates an ecosystem where:

- Teams can maintain consistent approaches to common development tasks
- Best practices can be encoded once and shared widely
- Specialized domain knowledge can be packaged into reusable templates
- The community can collaborate on high-quality prompt libraries

Context Generator supports configuration imports from multiple sources to enable modular configuration management:

### Import Capabilities

- **Local Files**: Import prompts from local filesystem files
- **URL Sources**: Import prompts directly from remote URLs
- **Selective Imports**: Import only specific prompts from any source

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
  - url: https://gist.githubusercontent.com/butschster/1b7e597691cc1a6476b15dc120ecbddb/raw/8c0f9d0145dcd260b814f866ec130ec630c80ee8/prompts.yaml
    type: url
```