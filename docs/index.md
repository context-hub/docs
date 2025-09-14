# CTX: The missing link between your codebase and your LLM.

![Good morning, LLM](https://github.com/user-attachments/assets/8129f227-dc3f-4671-bc0e-0ecd2f3a1888)

**CTX** is a tool that solves the context management gap when working with LLMs like ChatGPT or Claude. It helps
developers organize and automatically collect information from their codebase into structured documents that can be
easily shared with AI assistants.

**The tool doesn't work instead of developer - it's a tool where developers can describe their contexts and use them
to provide information to LLMs.**

For example, a developer describes what context they need:

```yaml
# context.yaml
documents:
  - description: "User Authentication System"
    outputPath: "auth-context.md"
    sources:
      - type: file
        description: "Authentication Controllers"
        sourcePaths:
          - src/Auth
        filePattern: "*.php"

      - type: file
        description: "Authentication Models"
        sourcePaths:
          - src/Models
        filePattern: "*User*.php"
```

This configuration will gather all PHP files from the `src/Auth` directory and any PHP files containing "**User**" in
their name from the `src/Models` directory into a single context file `.context/auth.md`. This file can then be pasted
into a chat session or provided via the built-in [MCP server](./mcp/index.md).

### How it works

**CTX automatically builds structured context documents from:**

- [Code files and directories](./sources/file-source.md)
- [GitHub repositories](./sources/github-source.md)
- [Git commit changes and diffs](./sources/git-diff-source.md)
- W[eb pages (URLs) with CSS selectors](./sources/url-source.md)
- Plain text
- and more!

**Process:**

- Collects code from specified sources
- Filters files through pattern matching, content search, size, or date criteria
- Applies modifiers (e.g., extracting function signatures without implementation)
- Organizes content into structured markdown documents
- Saves context files ready for LLM consumption
- Optionally serves context through MCP server for direct AI assistant access

> Here is a [Quickstart guide](./quick-start.md) to get you started with CTX.

### The Problem CTX Solves

**Without such a tool, you would need to:**

- Manually search for all files that were changed
- Copy their contents each time
- Explain the codebase structure repeatedly
- Spend significant time maintaining context consistency

This repetitive process becomes frustrating and can discourage continued development, as you end up doing the same
context-gathering work over and over instead of writing code.

Since CTX describes contexts, this process becomes automated.

## Use Cases

When working with AI-powered development tools context is everything.

- **Code Development**: Maintain up-to-date context for iterative development sessions with AI assistants. When your
  codebase changes, regenerate context documents to continue working with current code state.
- **Code Refactoring**: Provide AI with complete context about classes, functions, and their dependencies for
  refactoring assistance.
- **Documentation**: Generate documentation by combining source code with explanations, using AI to create guides and
  references based on actual code.
- **Team Workflows**: Share context configurations across team members to maintain consistent AI interaction patterns.
- **MCP Integration**: Connect Claude AI directly to your codebase for real-time, context-aware assistance without
  manual context sharing.