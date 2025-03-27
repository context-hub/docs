# Context Generator for AI-Powered Development

## What is Context Generator?

Context Generator is a tool designed to solve a common problem when working with LLMs like ChatGPT, Claude: providing
sufficient context about your codebase.

> There is an article about Context Generator
> on [Medium](https://medium.com/@butschster/context-not-prompts-2-0-the-evolution-9c4a84214784) that explains the
> motivation behind the project and the problem it solves.

It automates the process of building context files from various sources:

- Code files,
- GitHub repositories,
- Git commit changes and diffs
- Web pages (URLs) with CSS selectors,
- and plain text.

It was created to solve a common problem: efficiently providing AI language models like ChatGPT, Claude with necessary
context about your codebase.

## Why You Need This

When working with AI-powered development tools context is everything.

- **Code Refactoring Assistance**: Want AI help refactoring a complex class? Context Generator builds a properly
  formatted document containing all relevant code files.

- **Multiple Iteration Development**: Working through several iterations with an AI helper requires constantly updating
  the context. Context Generator automates this process.

- **Documentation Generation:** Transform your codebase into comprehensive documentation by combining source code with
  custom explanations. Use AI to generate user guides, API references, or developer documentation based on your actual
  code.

- **Seamless AI Integration**: With MCP support, [connect](/mcp-server) Claude AI directly to your codebase, allowing
  for real-time, context-aware assistance without manual context sharing.

## How it works

1. Gathers code from files, directories, GitHub repositories, web pages, or custom text.
2. Targets specific files through pattern matching, content search, size, or date filters
3. Applies optional modifiers (like extracting PHP signatures without implementation details)
4. Organizes content into well-structured markdown documents
5. Saves context files ready to be shared with LLMs
6. Optionally serves context through an MCP server, allowing AI assistants like Claude to directly access project
   information