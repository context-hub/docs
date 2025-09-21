# CTX: The missing link between your codebase and your LLM.

![Good morning, LLM](https://github.com/user-attachments/assets/8129f227-dc3f-4671-bc0e-0ecd2f3a1888)

During development, your codebase constantly evolves. Files are added, modified, and removed. Each time you need to
continue working with an LLM, you need to regenerate context to provide updated information about your current codebase
state.

**CTX** is a context management tool that gives developers full control over what AI sees from their codebase. Instead
of letting AI tools guess what's relevant, you define exactly what context to provide - making your AI-assisted
development more predictable, secure, and efficient.

It helps developers organize contexts and automatically collect information from their codebase into structured
documents that can be easily shared with LLM.

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

### Why CTX?

Current AI coding tools automatically scan your entire codebase, which creates several issues:

- **Security risk**: Your sensitive files (env vars, tokens, private code) get uploaded to cloud services
- **Context dilution**: AI gets overwhelmed with irrelevant code, reducing output quality
- **No control**: You can't influence what the AI considers when generating responses
- **Expensive**: Premium tools charge based on how much they scan, not how much you actually need

### The CTX Approach

You know your code better than any AI. CTX puts you in control:

- ✅ Define exactly what context to share - no more, no less
- ✅ Keep sensitive data local - works with local LLMs or carefully curated cloud contexts
- ✅ Generate reusable, shareable contexts - commit configurations to your repo
- ✅ Improve code architecture - designing for AI context windows naturally leads to better modular code
- ✅ Works with any LLM - Claude, ChatGPT, local models, or future tools

## Real-World Use Cases

### 🚀 Onboarding New Team Member

```yaml
# Quick project overview for new developers
documents:
  - description: "Project Architecture Overview"
    outputPath: "docs/architecture.md"
    sources:
      - type: tree
        sourcePaths: [ "src" ]
        maxDepth: 2
      - type: file
        description: "Core interfaces and main classes"
        sourcePaths: [ "src" ]
        filePattern: "*Interface.php"
```

### 📝 Feature Development

```yaml
# Context for developing a new feature
documents:
  - description: "User Authentication System"
    outputPath: "contexts/auth-context.md"
    sources:
      - type: file
        sourcePaths: [ "src/Auth", "src/Models" ]
        filePattern: "*.php"
      - type: git_diff
        description: "Recent auth changes"
        commit: "last-week"
```

### 📚 Documentation Generation

```yaml
# Generate API documentation
documents:
  - description: "API Documentation"
    outputPath: "docs/api.md"
    sources:
      - type: file
        sourcePaths: [ "src/Controllers" ]
        modifiers: [ "php-signature" ]
        contains: [ "@Route", "@Api" ]
```

## Join Our Community

Join hundreds of developers using CTX for professional AI-assisted coding:

[![Join Discord](https://img.shields.io/discord/1419284404315881633?color=5865F2&label=Join%20Discord&logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/YmFckwVkQM)

**What you'll find in our Discord:**

- 💡 Share and discover context configurations
- 🛠️ Get help with setup and advanced usage
- 🚀 Showcase your AI development workflows
- 🤝 Connect with like-minded developers
- 📢 First to know about new releases and features
