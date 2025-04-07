# Quick Start

Getting started with **CTX** is straightforward. Follow these simple steps to create your first context file
for LLMs.

## 1. Install **CTX**

Download and install the tool using our installation script:

```bash
curl -sSL https://raw.githubusercontent.com/context-hub/generator/main/download-latest.sh | sh
```

This installs the `ctx` command to your system (typically in `/usr/local/bin`).

> **Want more options?** See the complete [Installation Guide](/getting-started) for alternative installation methods.

## 2. Initialize a Configuration File

Create a new configuration file in your project directory:

```bash
ctx init
```

This generates a `context.yaml` file with a basic structure to get you started.

> **Pro tip:** Run `ctx init --type=json` if you prefer JSON configuration format.
> Check the [Command Reference](/getting-started/command-reference) for all available commands and options.

## 3. Describe Your Project Structure

Edit the generated `context.yaml` file to specify what code or content you want to include. For example:

```yaml
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

This configuration will gather all PHP files from the `src/Auth` directory and any PHP files containing "User" in their
name from the `src/Models` directory.

#### Need more advanced configuration?

- Learn about [Configuration formats and imports](/configuration) to understand available syntax options (YAML or JSON)
  and how to organize your setup with modular imports.
- Learn about [Document Structure](/documents) and properties
- Explore different source types like [GitHub](/sources/github-source), [Git Diff](/sources/git-diff-source),
  or [URL](/sources/url-source)
- Apply [Modifiers](/modifiers) to transform your content (like extracting PHP signatures)
- Discover how to use [Variables](/variables) in your config
- Use [IDE Integration](/getting-started/ide-integration) for autocompletion and validation

## 4. Build the Context

Generate your context file by running:

```bash
ctx
```

The tool will process your configuration and create the specified output file (`auth-context.md` in our example).

> **Tip**: Configure [Logging](/advanced/logging) with `-v`, `-vv`, or `-vvv` for detailed output

## 5. Share with an LLM

Upload or paste the generated context file to your favorite LLM (like ChatGPT or Claude). Now you can ask specific
questions about your codebase, and the LLM will have the necessary context to provide accurate assistance.

Example prompt:

> I've shared my authentication system code with you. Can you help me identify potential security vulnerabilities in the
> user registration process?

> **Next steps:** Check out [Development with **CTX**](/advanced/development-process) for best practices on
> integrating context generation into your AI-powered development workflow.

That's it! You're now ready to leverage LLMs with proper context about your codebase.

## 6. Connect to Claude AI (Optional)

For a more seamless experience, you can connect **CTX** directly to Claude AI using the MCP server:

There is a built-in MCP server that allows you to connect Claude AI directly to your codebase.

Point the MCP client to the **CTX** server:

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx server -c /path/to/your/project"
    }
  }
}
```

> **Note:** Read more about [MCP Server](/mcp-server) for detailed setup instructions.

Now you can ask Claude questions about your codebase without manually uploading context files!

## 7. Working with Prompts (Optional)

Define prompts that can be used with MCP server to create structured conversations with your LLM.

```yaml
prompts:
  - id: generate-controller
    description: "Generate a controller for an entity"
    schema:
      properties:
        entityName:
          description: "Name of the entity (e.g. User, Product)"
      required:
        - entityName
    messages:
      - role: user
        content: "You are a PHP code generator specializing in Symfony controllers."
      - role: assistant
        content: "I'll help you generate a controller for your entity. Please provide the entity name."
      - role: user
        content: "Generate a controller for the {{entityName}} entity."
```

> **Note:** Read more about [Prompts](/mcp/prompts) for detailed configuration options.

Import sharable prompts from the community or create your own to enhance your workflow.

```yaml
import:
  - type: url
    url: https://gist.githubusercontent.com/butschster/1b7e597691cc1a6476b15dc120ecbddb/raw/a4d706bf0738e440da04b71a32707bb9bb950f86/prompts.yaml
```

## 8. Custom Tools Configuration (Optional)

Define custom tools that can be executed directly by your LLM through the MCP server:

```yaml
tools:
  - id: cs-fixer
    description: 'Fix code style issues'
    schema:
      type: object
      properties:
        dry-run:
          type: boolean
          description: "Don't make changes"
          default: false
    commands:
      - cmd: composer
        args:
          - cs:fix
          - "{{path}}"
          - name: --dry-run
            when: "{{dry-run}}"
```

These tools can be executed directly by the LLM during conversations, enabling the AI to run code quality checks, tests,
or other development tasks.

> **Note:** Read more about [Tools](/mcp/tools) for detailed configuration options and examples.

## JSON Schema

For better editing experience, **CTX** provides a JSON schema for autocompletion and validation in your IDE:

```yaml
$schema: 'https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json'
documents:
  ...
```

> **Learn more:** See [IDE Integration](/getting-started/ide-integration) for detailed setup instructions for VSCode,
> PhpStorm, and other editors.
