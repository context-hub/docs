# JSON Schema

CTX's configuration system is built around JSON Schema, providing a powerful, self-documenting approach to defining
context documents, sources, prompts, and tools. This design choice enables seamless integration with AI assistants and
development tools.

## Why JSON Schema?

JSON Schema provides several critical advantages for CTX:

1. **Self-Documenting Configuration**: The schema describes all available properties, their types, and constraints.
2. **AI-Friendly Structure**: LLMs can understand the schema to generate valid configurations.
3. **IDE Integration**: Provides autocompletion and validation in editors like VSCode and PhpStorm.
4. **Validation**: Ensures configurations are correct before execution.
5. **Discoverability**: Makes it easy to explore available options and features.

## Using the Schema

Add the schema reference to your configuration files:

### In YAML:

```yaml
$schema: 'https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json'
documents:
# Your document configuration
```

### In JSON:

```json
{
  "$schema": "https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json",
  "documents": [
    // Your document configuration
  ]
}
```

## AI-Powered Configuration Generation

One of the most powerful features of CTX's schema-based approach is the ability to delegate configuration creation to AI
assistants.

**Here's how it works:**

### 1. LLMs Can Generate Complete Configurations

When you provide the JSON schema to an AI assistant, it can generate valid, comprehensive configurations for:

- **Context Documents**: Based on your project structure and requirements
- **Source Definitions**: Configured for your specific file patterns and repositories
- **Prompts**: Customized for your development workflows
- **Tools**: Tailored to your project's needs

### 2. Example Use Cases

#### Generate Context Documents

Ask an AI assistant to analyze your project and create appropriate document configurations:

```
"Based on my project structure, generate a CTX configuration that creates context documents for:
1. All API controllers
2. Database models
3. Service classes
4. Recent changes (git diff)"
```

The AI can analyze your codebase and generate a complete, valid configuration.

#### Create Custom Prompts

Request customized prompts for your development workflows:

```
Generate prompts in yaml format for creating new CRUD controllers, including templates for common operations and 
validation. Use json schema 
```

The AI can create structured prompts with appropriate schemas and variable definitions.

**Something like this:**

```yaml
# Collection of prompts for CRUD controller generation
prompts:
  - id: "crud-controller-base"
    description: "Template for generating a basic CRUD controller"
    type: "template"
    messages:
      - role: "user"
        content: |
          Create a CRUD controller for the ${entity} entity with the following properties:

          ${properties}

          Use the ${framework} framework and implement standard CRUD operations.

      - role: "assistant"
        content: |
          I'll create a CRUD controller for the ${entity} entity using ${framework}. Here's the implementation with standard operations:

  - id: "crud-controller-full"
    description: "Generate a complete CRUD controller with validation and error handling"
    type: "prompt"
    extend:
      - id: "crud-controller-base"
        arguments:
          framework: "${framework}"
          entity: "${entity}"
          properties: "${properties}"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        framework:
          type: "string"
          description: "Framework to use (e.g., Laravel, Express, Spring)"
        properties:
          type: "string"
          description: "List of entity properties with their types"
      required:
        - "entity"
        - "framework"
        - "properties"
    messages:
      - role: "user"
        content: |
          In addition to the basic CRUD operations, please include:

          1. Data validation for all inputs
          2. Proper error handling with appropriate status codes
          3. Documentation comments for each method
          4. Pagination for list operations
          5. Filtering capabilities
          6. Sorting options
          7. Comprehensive response formatting

      - role: "assistant"
        content: |
          Here's a complete CRUD controller for the ${entity} entity with all the requested features:

  - id: "crud-controller-laravel"
    description: "Generate a Laravel-specific CRUD controller"
    type: "prompt"
    extend:
      - id: "crud-controller-base"
        arguments:
          framework: "Laravel"
          entity: "${entity}"
          properties: "${properties}"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        properties:
          type: "string"
          description: "List of entity properties with their types"
        resource_transformer:
          type: "boolean"
          description: "Whether to include a resource transformer"
      required:
        - "entity"
        - "properties"
    messages:
      - role: "user"
        content: |
          For this Laravel controller, also implement:

          1. Form requests for validation
          2. Resource classes for response transformation
          3. Policy-based authorization
          4. Route model binding
          5. Laravel-specific best practices

          {{#if resource_transformer}}
          Include a detailed API Resource transformer for the responses.
          {{/if}}

      - role: "assistant"
        content: |
          Here's a Laravel-specific CRUD controller for the ${entity} entity following best practices:

  - id: "crud-controller-express"
    description: "Generate an Express.js CRUD controller"
    type: "prompt"
    extend:
      - id: "crud-controller-base"
        arguments:
          framework: "Express.js"
          entity: "${entity}"
          properties: "${properties}"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        properties:
          type: "string"
          description: "List of entity properties with their types"
        mongoose:
          type: "boolean"
          description: "Whether to use Mongoose for MongoDB integration"
        jwt_auth:
          type: "boolean"
          description: "Whether to include JWT authentication"
      required:
        - "entity"
        - "properties"
    messages:
      - role: "user"
        content: |
          For this Express.js controller, also implement:

          1. Express Router configuration
          2. Middleware for input validation
          3. Async/await pattern for database operations
          4. Error handling middleware

          {{#if mongoose}}
          Include Mongoose schema and model definitions.
          {{/if}}

          {{#if jwt_auth}}
          Add JWT authentication middleware to protect appropriate routes.
          {{/if}}

      - role: "assistant"
        content: |
          Here's an Express.js CRUD controller for the ${entity} entity with the requested features:

  - id: "crud-controller-spring"
    description: "Generate a Spring Boot CRUD controller"
    type: "prompt"
    extend:
      - id: "crud-controller-base"
        arguments:
          framework: "Spring Boot"
          entity: "${entity}"
          properties: "${properties}"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        properties:
          type: "string"
          description: "List of entity properties with their types"
        jpa:
          type: "boolean"
          description: "Whether to include JPA/Hibernate integration"
        swagger:
          type: "boolean"
          description: "Whether to include Swagger documentation"
      required:
        - "entity"
        - "properties"
    messages:
      - role: "user"
        content: |
          For this Spring Boot controller, also implement:

          1. Spring MVC annotations
          2. Bean Validation
          3. ResponseEntity return types
          4. Exception handling with @ControllerAdvice
          5. RESTful best practices

          {{#if jpa}}
          Include JPA entity and repository classes.
          {{/if}}

          {{#if swagger}}
          Add OpenAPI/Swagger annotations for API documentation.
          {{/if}}

      - role: "assistant"
        content: |
          Here's a Spring Boot CRUD controller for the ${entity} entity with the requested features:

  - id: "crud-validation-patterns"
    description: "Common validation patterns for CRUD operations"
    type: "template"
    messages:
      - role: "user"
        content: |
          Provide validation patterns for a ${entity} with these properties:

          ${properties}

          Using the ${framework} framework.

      - role: "assistant"
        content: |
          Here are validation patterns for the ${entity} entity using ${framework}:

  - id: "crud-repository-pattern"
    description: "Implementation of repository pattern for CRUD operations"
    type: "prompt"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        framework:
          type: "string"
          description: "Framework to use (e.g., Laravel, Express, Spring)"
        database:
          type: "string"
          description: "Database type (e.g., MySQL, PostgreSQL, MongoDB)"
      required:
        - "entity"
        - "framework"
        - "database"
    messages:
      - role: "user"
        content: |
          Create a repository pattern implementation for ${entity} entity using ${framework} with ${database} database. Include:

          1. Interface definition
          2. Concrete implementation
          3. Dependency injection setup
          4. Common query methods
          5. Transaction support

      - role: "assistant"
        content: |
          Here's a repository pattern implementation for the ${entity} entity:

  - id: "crud-service-layer"
    description: "Service layer for CRUD operations"
    type: "prompt"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        framework:
          type: "string"
          description: "Framework to use (e.g., Laravel, Express, Spring)"
        features:
          type: "string"
          description: "Additional features to implement (e.g., caching, events, logging)"
      required:
        - "entity"
        - "framework"
    messages:
      - role: "user"
        content: |
          Create a service layer for ${entity} entity using ${framework}. Include:

          1. Service interface
          2. Service implementation
          3. Business logic separation from controllers
          4. Error handling strategies

          {{#if features}}
          Also implement these additional features: ${features}
          {{/if}}

      - role: "assistant"
        content: |
          Here's a service layer implementation for the ${entity} entity:

  - id: "crud-test-suite"
    description: "Test suite for CRUD operations"
    type: "prompt"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        framework:
          type: "string"
          description: "Framework to use (e.g., Laravel, Express, Spring)"
        test_framework:
          type: "string"
          description: "Testing framework to use (e.g., PHPUnit, Jest, JUnit)"
      required:
        - "entity"
        - "framework"
        - "test_framework"
    messages:
      - role: "user"
        content: |
          Create a test suite for ${entity} CRUD operations using ${test_framework} with ${framework}. Include:

          1. Unit tests for each CRUD operation
          2. Integration tests for API endpoints
          3. Mock implementations for dependencies
          4. Test fixtures and factories
          5. Edge case testing

      - role: "assistant"
        content: |
          Here's a comprehensive test suite for the ${entity} CRUD operations:

  - id: "crud-api-documentation"
    description: "API documentation for CRUD endpoints"
    type: "prompt"
    schema:
      properties:
        entity:
          type: "string"
          description: "Name of the entity (e.g., User, Product, Order)"
        base_url:
          type: "string"
          description: "Base URL for the API (e.g., /api/v1)"
        format:
          type: "string"
          description: "Documentation format (e.g., OpenAPI, Markdown, Postman)"
      required:
        - "entity"
        - "base_url"
        - "format"
    messages:
      - role: "user"
        content: |
          Create ${format} documentation for ${entity} CRUD API endpoints with base URL ${base_url}. Include:

          1. Endpoint specifications
          2. Request parameters
          3. Request body schemas
          4. Response formats
          5. Status codes
          6. Authentication requirements
          7. Example requests and responses

      - role: "assistant"
        content: |
          Here's the API documentation for the ${entity} CRUD endpoints:
```

#### Define Custom Tools

Ask for tools tailored to your project's technologies:

```
Create tool configurations for running tests, linting, and deploying my Node.js application in yaml format. 
Analyze my package.json file. Use json-schema
```

The AI can generate tool configurations that integrate with your development process.

**It will generate something like this:**

```yaml
# Tool configuration for VitePress documentation project
tools:
  - id: test
    description: Run tests for the application
    type: run
    schema:
      properties:
        coverage:
          type: boolean
          description: Whether to collect test coverage
        watch:
          type: boolean
          description: Whether to run tests in watch mode
      required: [ ]
    commands:
      - cmd: npm
        args:
          - "test"
          - name: "--coverage"
            when: "{{coverage}}"
          - name: "--watch"
            when: "{{watch}}"

  - id: lint
    description: Lint the project for code quality issues
    type: run
    schema:
      properties:
        fix:
          type: boolean
          description: Whether to automatically fix lint issues
        path:
          type: string
          description: Specific path or file to lint (defaults to entire project)
      required: [ ]
    commands:
      - cmd: npm
        args:
          - "run"
          - "lint"
          - name: "--fix"
            when: "{{fix}}"
          - name: "{{path}}"
            when: "{{path}}"

  - id: docs
    description: Build and preview VitePress documentation
    type: run
    schema:
      properties:
        action:
          type: string
          description: Action to perform (dev, build, preview)
          enum: [ "dev", "build", "preview" ]
      required: [ "action" ]
    commands:
      - cmd: npm
        args:
          - "run"
          - "docs:{{action}}"

  - id: deploy
    description: Deploy the documentation to production
    type: run
    schema:
      properties:
        environment:
          type: string
          description: Deployment environment (staging or production)
          enum: [ "staging", "production" ]
          default: "production"
      required: [ ]
    commands:
      - cmd: npm
        args:
          - "run"
          - "docs:build"
      - cmd: echo
        args:
          - "Deploying to {{environment}}..."
      # Add your actual deployment command here, such as:
      # - cmd: scp
      #   args:
      #     - "-r"
      #     - "docs/.vitepress/dist/"
      #     - "user@server:/path/to/{{environment}}/docs"
```

### 3. Working with Existing Configurations

AI assistants can also help you modify and extend existing configurations:

- **Add new documents** to capture additional parts of your codebase
- **Enhance prompts** with more sophisticated templates
- **Optimize tools** for better integration with your workflow

## Schema-Driven Tool Access

The JSON schema not only guides configuration creation but also enables AI assistants to effectively use CTX's features:

### 1. Tool Discovery and Usage

Using the `prompts-list` and `prompt-get` tools, AI assistants can:

- Discover available prompts in your configuration
- Understand their structure and required parameters
- Use them appropriately for content generation

### 2. Context-Aware Operations

The schema helps AI assistants understand:

- What context documents are available
- How to request specific context information
- How to filter and modify context content

### 3. File Operations

With schema-defined operations, AI assistants can:

- Navigate your project structure
- Read and write files with proper parameters
- Apply modifications in a structured way

## Schema Structure

The CTX JSON schema defines the structure for:

### 1. Documents

Configurations for the primary output units:

- Output paths and descriptions
- Source collections
- Overwrite behavior and tags

### 2. Sources

Different types of content providers:

- File sources with patterns and paths
- GitHub and GitLab repository integration
- URL and text content
- Git diff information

### 3. Modifiers

Content transformations:

- PHP signature extraction
- Content filtering
- Sanitization
- Custom transformations

### 4. Prompts

Structured conversation templates:

- Template inheritance
- Variable substitution
- Input schemas
- Message sequences

### 5. Tools

Custom command execution:

- Parameter schemas
- Command definitions
- Conditional execution
- Environment configuration

## Conclusion

CTX's JSON schema-based approach creates a powerful ecosystem where:

1. **Developers** benefit from validation and autocompletion
2. **AI assistants** can understand, generate, and work with configurations
3. **Teams** can establish standardized approaches to context generation
4. **The system** remains extensible and self-documenting