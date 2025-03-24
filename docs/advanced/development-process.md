# How to Use Context Generator to Explore and Work with Any Codebase

Context Generator is a powerful tool that can help you understand and navigate any codebase, making it easier to
implement features, fix bugs, and contribute to projects. This guide shows you how to leverage Context Generator's
capabilities throughout your development workflow.

## Understanding a New Codebase

### Step 1: Generate a Structure Overview

Start by creating a high-level map of the project structure:

```yaml
documents:
  - description: "Project Structure Overview"
    outputPath: "project-structure.md"
    sources:
      - type: tree
        description: "Source Code Structure"
        sourcePaths: [ "src" ]
        maxDepth: 3
        showSize: true
```

This gives you a hierarchical view of the codebase's organization, helping you quickly identify the main components.

### Step 2: Identify Core Interfaces and Classes

To understand the fundamental architecture:

```yaml
documents:
  - description: "Core Interfaces and Base Classes"
    outputPath: "core-architecture.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        filePattern: "*Interface.php"
      - type: file
        sourcePaths: [ "src" ]
        filePattern: "Abstract*.php"
```

Interfaces and abstract classes define the contracts and relationships between components, revealing the system design.

#### Instruction for AI to Generate Context

Use the following instruction to create a context file with detailed descriptions of the codebase using Claude:

> Note: Provide the following instruction to Claude and
> also [Json Schema](https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json) to
> help it understand the document structure.

```
Your goal is to create a `context.yaml` file, using provided JSON schema for context generator. 
Always use YAML syntax.

Provide multiple configs. Split documents into small logical config files. Small configs is better that one big config.

**Rules**
1. **Organizes Code**
    - Split your source code into clear, logical documents based on its functions or modules.
    - Group related files together based on what they do, not just their folder structure.
2. **Detailed Descriptions**
    - Write a title and a short, clear description for each document.
    - Explain the purpose of each component and how they connect to the rest of the project.
3. **Relevant Sources and Filtering**
    - Use the right source types (file, text, tree, etc.) to capture the needed code.
    - Apply filters (by path, pattern, or content) to only include the important files.
    - Do not try to use `contains` filter. Only by file path.
4. **Output Paths**
    - Make sure output paths start with the content/context type, like `project/` or `feature/`.
5. **Content Limit**
    - Ensure that each document does not exceed 50,000 characters.

**Extra Tips:**
- **Meaningful Groupings:** Focus on functionality. Group files that work together.
- More small documents is better than one big document. 
- **Use Visuals:** For bigger projects, include tree views or mermaid diagrams with extra notes.
- Do not provide default values for properties
- Do not use quotes if it unnecessary
- Do not use arrays in format `[...]`
- Advanced Features:
    - Mix different source types for richer details.
    - Consider nested documents or tag-based views for more complex projects.
    - Use GitDiff sources if you need to show recent changes.
```

### Step 3: Explore Configuration and Entry Points

Understanding how a system initializes and configures itself:

```yaml
documents:
  - description: "Configuration and Entry Points"
    outputPath: "configuration.md"
    sources:
      - type: file
        sourcePaths: [ "." ]
        filePattern: [ "*.json", "*.yaml", "*.yml" ]
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "main", "bootstrap", "initialize" ]
        filePattern: "*.php"
```

## Implementing Features in an Unfamiliar Codebase

### Step 1: Find Similar Features

Locate existing implementations similar to what you want to build:

```yaml
documents:
  - description: "Similar Feature Implementation"
    outputPath: "similar-features.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "featureName", "similarFunction" ]
        filePattern: "*.php"
```

### Step 2: Trace Feature Workflow

Understand how data flows through related components:

```yaml
documents:
  - description: "Feature Workflow"
    outputPath: "feature-workflow.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "processData", "handleRequest" ]
        filePattern: "*.php"
      - type: file
        sourcePaths: [ "src" ]
        path: [ "Controller", "Service" ]
        filePattern: "*.php"
```

### Step 3: Identify Integration Points

Find where your new feature needs to connect with existing code:

```yaml
documents:
  - description: "Integration Points"
    outputPath: "integration-points.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "registerHandler", "addProvider", "loadExtension" ]
        filePattern: "*.php"
```

## Debugging Complex Issues

### Step 1: Generate Error Context

When facing an error, gather the relevant code context:

```yaml
documents:
  - description: "Error Context"
    outputPath: "error-context.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "errorMessage", "exceptionName", "problematicFunction" ]
        filePattern: "*.php"
```

### Step 2: Trace Method Calls

Follow the execution path to understand how the code reached the error state:

```yaml
documents:
  - description: "Method Call Trace"
    outputPath: "method-trace.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "methodA", "methodB", "methodC" ]
        filePattern: "*.php"
```

### Step 3: Examine Related Tests

Understanding how the component is supposed to work:

```yaml
documents:
  - description: "Related Tests"
    outputPath: "related-tests.md"
    sources:
      - type: file
        sourcePaths: [ "tests" ]
        contains: [ "ComponentName", "testScenario" ]
        filePattern: "*Test.php"
```

## Analyzing Code Changes

### Step 1: View Recent Changes

See what has changed recently in the area you're working on:

```yaml
documents:
  - description: "Recent Changes"
    outputPath: "recent-changes.md"
    sources:
      - type: git_diff
        path: "src/ComponentName"
        commit: "last-month"
```

### Step 2: Compare Implementation Across Branches

When working on long-lived branches or evaluating pull requests:

```yaml
documents:
  - description: "Feature Branch Comparison"
    outputPath: "branch-comparison.md"
    sources:
      - type: git_diff
        commit: "main-diff"  # Compares current branch with main
```

## Working with External Dependencies

### Step 1: Extract Dependency Code

Examine how external packages are structured:

```yaml
documents:
  - description: "Package Structure"
    outputPath: "package-structure.md"
    sources:
      - type: composer
        packages: [ "vendor/package-name" ]
        filePattern: "*.php"
```

### Step 2: Study Integration Points

Understand how the project interacts with dependencies:

```yaml
documents:
  - description: "Dependency Integration"
    outputPath: "dependency-integration.md"
    sources:
      - type: file
        sourcePaths: [ "src" ]
        contains: [ "use Vendor\\Package", "new Vendor\\Package" ]
        filePattern: "*.php"
```

## Enhancing Collaboration with AI Assistants

### Generating Comprehensive Context

Create rich context documents for AI assistants:

```yaml
documents:
  - description: "Feature Implementation Context"
    outputPath: "feature-context.md"
    sources:
      - type: text
        content: |
          # Feature Implementation Request

          I need to implement a new feature that does X, Y, and Z.
          Here's the relevant code context for understanding the current system.
      - type: file
        sourcePaths: [ "src/RelatedComponent" ]
        filePattern: "*.php"
      - type: file
        sourcePaths: [ "tests/RelatedComponent" ]
        filePattern: "*Test.php"
```

Then upload this context file to an AI assistant and ask specific questions about implementation approaches.

### Code Review Assistance

After making changes, generate a diff for review:

```yaml
documents:
  - description: "Implementation Review"
    outputPath: "implementation-review.md"
    sources:
      - type: git_diff
        commit: "unstaged"  # or "staged"
```

Share this with team members or AI assistants to get feedback on your implementation.

## Practical Usage Patterns

### Pattern 1: Feature Research Phase

1. Generate a tree view of the project structure
2. Explore core interfaces and abstractions
3. Find similar implementations
4. Study integration points
5. Review related tests
6. Combine this context into a single document

### Pattern 2: Bug Investigation Workflow

1. Generate context around the error message or symptoms
2. Examine the affected component's structure and responsibilities
3. Look at recent changes to the component
4. Study test cases for expected behavior
5. Create a context document with your findings

### Pattern 3: Documentation Generation

Use Context Generator to create comprehensive documentation:

```yaml
documents:
  - description: "Component Documentation"
    outputPath: "component-docs.md"
    sources:
      - type: file
        sourcePaths: [ "src/Component" ]
        filePattern: "*.php"
        modifiers:
          - name: "php-docs"
            options:
              include_implementations: false
              class_heading_level: 2
```

## Best Practices

1. **Start Broad, Then Narrow**: Begin with a high-level overview before diving into specifics
2. **Use Multiple Context Files**: Create separate context documents for different aspects of your investigation
3. **Leverage Content Filtering**: Use `contains`, `path`, and other filters to pinpoint relevant code
4. **Combine With Git History**: Integrate code exploration with historical context using git_diff sources
5. **Include Test Cases**: Always examine tests to understand expected behavior
6. **Create Implementation Plans**: Use gathered context to formulate clear implementation strategies
7. **Share Context Efficiently**: Generate focused context documents to share with team members or AI assistants

By effectively using Context Generator to explore unfamiliar codebases, you can significantly reduce the time needed to
understand complex systems, implement features more confidently, and solve bugs more efficiently. The tool transforms
overwhelming code exploration into a structured, methodical process that builds comprehensive understanding.