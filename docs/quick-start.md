# Quick Start

Getting started with Context Generator is straightforward. Follow these simple steps to create your first context file
for LLMs.

## 1. Install Context Generator

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

 - Learn about [Document Structure](/documents) and properties
 - Explore different source types like [GitHub](/sources/github-source), [Git Diff](/sources/git-diff-source),
    or [URL](/sources/url-source)
 - Apply [Modifiers](/modifiers) to transform your content (like extracting PHP signatures)
 - Discover how to use [Environment Variables](/environment-variables) in your config
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

> **Next steps:** Check out [Development with Context Generator](/advanced/development-process) for best practices on
> integrating context generation into your AI-powered development workflow.

That's it! You're now ready to leverage LLMs with proper context about your codebase.

## JSON Schema

For better editing experience, Context Generator provides a JSON schema for autocompletion and validation in your IDE:

```bash
# Show schema URL
ctx schema

# Download schema to current directory
ctx schema --download
```

> **Learn more:** See [IDE Integration](/getting-started/ide-integration) for detailed setup instructions for VSCode,
> PhpStorm, and other editors.
