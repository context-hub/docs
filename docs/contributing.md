# Contributing to Context Generator

We're excited to welcome you as a contributor to the Context Generator project! This guide will help you get started
with contributing to our project.

## How to Contribute

There are many ways to contribute to Context Generator:

1. **Report Issues**: If you find a bug or have a
   suggestion, [create an issue](https://github.com/butschster/context-generator/issues) on our GitHub repository.
2. **Submit Pull Requests**: Have a fix or a new feature? Submit a pull request!
3. **Improve Documentation**: Help us make our documentation more clear, comprehensive, and accessible.
4. **Share Your Use Cases**: Let us know how you're using Context Generator in your projects.

We label issues that are suitable for community contribution with the `help wanted` tag. Additionally, we use labels
such as `good first issue` for newcomer-friendly tasks, and complexity indicators to help you choose tasks that match
your experience level.

I'd be happy to write a better instruction for the Getting Started section that highlights the use of the context.yaml
file for context generation. This will help new contributors understand how they can use Context Generator itself to
explore and work with the codebase.

## Getting Started with Contributing

Follow this guide to set up your environment and effectively contribute to the Context Generator project. We've designed
a workflow that leverages the tool's own capabilities to help you understand and improve the codebase.

### 1. Set Up Your Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/context-generator.git
cd context-generator

# Install dependencies
composer install

# Make the CLI tool available locally
chmod +x context-generator

# Test the command
./context-generator --help
```

> **Note:** Use the local `./context-generator` command during development to test your changes. The globally installed
`ctx` command won't reflect your local modifications.

### 2. Understand the Project Structure

Before diving into specific components, familiarize yourself with the project structure:

```
└── src/
    ├── ConfigLoader/ - Configuration loading and processing
    ├── Console/ - CLI commands and interfaces
    ├── Document/ - Document generation and formatting
    ├── Fetcher/ - Content fetching mechanisms
    ├── Lib/ - Utility libraries and helpers
    ├── Modifier/ - Content modification systems
    └── Source/ - Different source type implementations
```

To get a more detailed view of the project structure, use the `tree` source type:

```yaml
documents:
  - description: Project File Structure
    outputPath: docs/file-structure.md
    sources:
      - type: tree
        description: Project File Structure
        sourcePaths:
          - src
```

Run this configuration to generate a visual representation of the codebase structure:

```bash
./context-generator
```

This will create a `docs/file-structure.md` file that outlines the project's organization. Just put this file in the
Claude project context to help it understand the codebase.

### 3. Explore the Codebase Using Context Generator

The project includes a pre-configured `context.yaml` file to help you explore the codebase:

```bash
# Generate context files using the provided configuration
./context-generator

# This will create documentation in the .context/ directory
```

The generated context files provide a comprehensive overview of the most important parts of the system. Upload documents
connected to your task to an LLM like Claude to get a better understanding of the codebase.

### 4. Request Specific Context Using YAML

When working on a specific feature or bug fix, create targeted context requests to get exactly the information you need.

You can also describe your task to an LLM and ask it to suggest which files might be relevant to your problem.

> **Tip:** If you provide a json-schema file, the LLM will be able to generate a valid context.yaml file for you.

```yaml
# Example: Create focused context for exploring source types
documents:
  - description: "Source Type Implementation"
    outputPath: "my-feature-context.md"
    sources:
      - type: file
        sourcePaths: [ "src/Source/FileType" ]
        filePattern: "*.php"
      - type: file
        sourcePaths: [ "src/Source" ]
        filePattern: "*Interface.php"
```

Generate your custom context:

```bash
./context-generator
```

This structured approach offers several advantages:

- **Precision**: Request only what you need without excess information
- **Structure**: Use the application's own configuration format for clarity
- **Progressive Discovery**: Build your understanding incrementally
- **Efficiency**: Focus on relevant parts of the codebase

Let me enhance the section on collaborating with AI assistants to include this important recommendation:

### 5. Collaborate with AI Assistants

Share the generated context files with AI assistants like Claude to get help with:

- Understanding complex parts of the codebase
- Designing new features
- Debugging issues
- Reviewing your implementation approach

Before diving into implementation, ask the LLM to help you generate:

- **Feature Request documents** for new functionality
- **RFC (Request for Comments)** for architectural changes
- **Bug reports** with comprehensive details
- **Implementation plans** outlining the approach

These documents serve multiple purposes:

1. They help clarify your own understanding of the task
2. They can be used to create GitHub issues with well-structured information
3. They provide a reference document you can share in new chat sessions
4. They ensure all aspects of the problem are considered before coding begins

For example, you might ask:

```yaml
documents:
  - description: "Current Composer Source Implementation"
    outputPath: "composer-source-current.md"
    sources:
      - type: file
        sourcePaths: [ "src/Source/Composer/" ]
        filePattern: [ "ComposerSource.php", "ComposerSourceFetcher.php" ]
```

**Then ask Claude:**
"Based on this implementation, please generate an RFC for adding remote repository support to the Composer source.
Include the problem statement, proposed solution, implementation details, and potential challenges."

This gives the AI assistant exactly the context needed to provide meaningful assistance with your specific task, and the
resulting document becomes a valuable asset throughout your development process.

### 6. Implement Your Changes

> **Tip**: When you provide all required context to Claude, it will be able to solve your task efficiently. With proper
> context, the solution will be fast, precise, and aligned with the project's patterns and standards.

With a solid understanding of the codebase:

- Create a new branch for your changes
- Implement your feature or fix following these steps:
    1. Provide the generated context to Claude or another AI assistant
    2. Clearly describe what you're trying to implement
    3. With proper context, Claude can help generate precise, working solutions quickly
    4. Review the suggested implementation and adapt as needed
- Add tests to verify your changes
- Update or add documentation as needed:
    1. Provide the existing documentation section to Claude
    2. Ask Claude to update or rewrite the section with your changes
    3. Review and refine the suggested documentation
    4. Include the updated documentation in your pull request

### 7. Document Your Changes

If you worked with an LLM to implement your changes, ask it to help draft commit messages and pull request descriptions.

You can also generate a diff for your changes and ask an LLM to analyze it:

```yaml
# Generate context for your changes
documents:
  - description: "My Feature Implementation"
    outputPath: "my-changes.md"
    sources:
      - type: git_diff
        description: "My Changes"
        commit: "unstaged"  # or "staged" if you've already staged your changes
```

### 8. Submit Your Pull Request

- Push your changes to your fork
- Open a pull request with a clear description
- Include relevant context files or excerpts
- Reference any related issues

By using Context Generator in your contribution workflow, you'll not only improve the project but also gain firsthand
experience with the tool while developing more effective collaboration patterns with AI assistants.

## Areas Where Help Is Needed

We're particularly looking for help with:

- Adding support for additional source types
- Enhancing documentation with more examples
- Creating specialized content modifiers for different languages
- Building integrations with popular IDEs and tools

Your contributions, big or small, help make Context Generator a better tool for everyone. We look forward to
collaborating with you!

## Questions?

If you have any questions about contributing, feel free to open an issue labeled "question" or reach out through the
[discussions](https://github.com/butschster/context-generator/discussions) section on GitHub.

Thank you for considering contributing to Context Generator!