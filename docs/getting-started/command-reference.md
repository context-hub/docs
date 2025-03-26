# Command Reference

## Generate Context Files

Generates context files according to your configuration. This is the default command that runs when no command is
specified.

```bash
ctx
```

You can also explicitly call:

```bash
ctx generate
# or 
ctx build
```

### Options

| Option                 | Description                                                                                                                |
|------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `--github-token`, `-t` | GitHub token for authentication (default: reads from `GITHUB_TOKEN` environment variable)                                  |
| `--env`, `-e`          | Load environment variables from a file. If used without specifying a file, defaults to `.env`.                             |
| `--inline`, `-i`       | Inline JSON configuration string. If provided, file-based configuration will be ignored.                                   |
| `--config-file`, `-c`  | Path to a specific configuration file or directory. If not provided, will look for standard config files in the root path. |

**Examples of using the `--env` option:**

```bash
# Load variables from a specific file
ctx --env=.env.local

# Do not load any environment variables (default behavior)
ctx
```

**Examples of specifying configuration:**

```bash
# Use a specific configuration file
ctx -c src/custom-config.yaml

# Look for standard config files (context.json, context.yaml, etc.) in a specific directory
ctx -c src/configs

# Use inline JSON configuration
ctx -i '{"documents":[{"description":"Quick Context","outputPath":"output.md","sources":[{"type":"text","content":"Sample content"}]}]}'
```

## Initialize a Configuration File

Creates a new configuration file in the current directory. The default filename is `context.yaml` if not specified.

```bash
ctx init
```

You can also specify a different file type [Supported types: `yaml`, `json`]:

```bash
ctx init --type=json
# or
ctx init -t json
```

## Check Version

Checks for available updates by comparing your version with the latest release on GitHub, and provides update
instructions if a newer version is available.

```bash
ctx version
# or by first letter
ctx v
```

Displays the current version of Context Generator.

```bash
ctx version --check-updates
# or
ctx version -c
```

## Self-Update

Updates the Context Generator to the latest version.

```bash
ctx self-update
# or
ctx update
# or by first letter
ctx u
```

If you installed the PHAR file in a non-standard location, you can specify the path:

```bash
ctx self-update --phar-path=/usr/local/bin/ctx
# or
ctx self-update -p /usr/local/bin/ctx
```

## Get JSON Schema

Shows the URL where the JSON schema for IDE integration is hosted.

```bash
ctx schema
# or by first letter
ctx s
```

```bash
ctx schema --download
# or
ctx schema -d
```

Downloads the JSON schema to the current directory with the default filename (`json-schema.json`).

```bash
ctx schema --download --output=custom-name.json
# or
ctx schema -d -o custom-name.json
```

## Inline Configuration

You can provide a JSON configuration directly on the command line without needing a config file:

```bash
ctx --inline='{"documents":[{"description":"Quick Context","outputPath":"output.md","sources":[{"type":"text","content":"Sample content"}]}]}'
# or
ctx -i '{"documents":[{"description":"Quick Context","outputPath":"output.md","sources":[{"type":"text","content":"Sample content"}]}]}'
```

**This is useful for:**

- One-off context generation without creating config files
- CI/CD pipelines or automated workflows
- Testing configurations quickly
- Scripting and integration with other tools

The JSON configuration structure follows the same schema as config files. For complex configurations,
consider using a heredoc in your shell scripts:

```bash
ctx --inline='
{
  "documents": [
    {
      "description": "API Documentation",
      "outputPath": "api-docs.md",
      "sources": [
        {
          "type": "file",
          "sourcePaths": ["src/Api"],
          "filePattern": "*.php"
        }
      ]
    }
  ]
}
'
```

## MCP Server

Starts the Model Control Protocol (MCP) server to enable direct integration with Claude AI. This server acts as a bridge
between your codebase and AI assistants, allowing Claude to access project context in real-time.

```bash
ctx server -c /path/to/project
```

### Options

| Option              | Description                                                     |
|---------------------|-----------------------------------------------------------------|
| `-c, --config-path` | Path to the project containing context configuration (required) |