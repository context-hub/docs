# CTX: Context as Code (CaC) tool with MCP server inside. 
### The missing link between your codebase and your LLM.

![Good morning, LLM](https://github.com/user-attachments/assets/8129f227-dc3f-4671-bc0e-0ecd2f3a1888)

## What is **CTX**?

**CTX** is a tool made to solve a big problem when chatting with LLMs like ChatGPT or Claude: **giving them enough
context about your project**.

> There is an article about **CTX**
> on [Medium](https://medium.com/@butschster/context-not-prompts-2-0-the-evolution-9c4a84214784) that explains the
> motivation behind the project and the problem it solves.

Instead of manually copying or explaining your entire codebase each time, ctx automatically builds neat, organized
context files from:

- Code files,
- GitHub repositories,
- Git commit changes and diffs
- Web pages (URLs) with CSS selectors,
- and plain text.

It was created to solve a common problem: efficiently providing AI language models like ChatGPT, Claude with necessary
context about your codebase.

## Why You Need This

When working with AI-powered development tools context is everything.

- **Code Refactoring Assistance**: Want AI help refactoring a complex class? **CTX** builds a properly
  formatted document containing all relevant code files.

- **Multiple Iteration Development**: Working through several iterations with an AI helper requires constantly updating
  the context. **CTX** automates this process.

- **Documentation Generation:** Transform your codebase into comprehensive documentation by combining source code with
  custom explanations. Use AI to generate user guides, API references, or developer documentation based on your actual
  code.

- **Reusable Prompt Libraries:** Create, share, and import collections of specialized prompts for common development
  tasks. Build once, use everywhere, and leverage the community's expertise without reinventing the wheel.

- **Standardized Team Workflows:** Establish consistent AI interaction patterns across your team by sharing prompt
  libraries that encode best practices and domain expertise for your specific projects.

- **Seamless AI Integration**: With MCP support, [connect](/mcp-server) Claude AI directly to your codebase, allowing
  for real-time, context-aware assistance without manual context sharing.

## How it works

1. Gathers code from files, directories, GitHub repositories, web pages, or custom text.
2. Targets specific files through pattern matching, content search, size, or date filters
3. Applies optional modifiers (like extracting PHP signatures without implementation details)
4. Organizes content into well-structured markdown documents
5. Provides pre-defined prompts for common tasks that can be imported, shared, and reused
6. Saves context files ready to be shared with LLMs
7. Optionally serves context through an MCP server, allowing AI assistants like Claude to directly access project
   information