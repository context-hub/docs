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
# or
ctx compile
```

### Options

| Option                | Description                                                                                                                |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| `--inline`, `-i`      | Inline JSON configuration string. If provided, file-based configuration will be ignored.                                   |
| `--config-file`, `-c` | Path to a specific configuration file or directory. If not provided, will look for standard config files in the root path. |
| `--env`, `-e`         | Path to .env (like .env.local) file. If not provided, will ignore any .env files.                                          |

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

## Display Configuration

Displays the context configuration in a human-readable format.

```bash
ctx display
```

### Options

| Option                | Description                                                                                                                |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------|
| `--inline`, `-i`      | Inline JSON configuration string. If provided, file-based configuration will be ignored.                                   |
| `--config-file`, `-c` | Path to a specific configuration file or directory. If not provided, will look for standard config files in the root path. |

## Initialize a Configuration File

Creates a new configuration file in the current directory. The default filename is `context.yaml` if not specified.

```bash
ctx init
```

You can also specify a different filename:

```bash
ctx init --config-file=context.json
# or
ctx init -c context.json
```

> **Note**: Only `json` and `yaml` formats are supported for the configuration file.

## MCP Server

Starts the Model Control Protocol (MCP) server to enable direct integration with Claude AI. This server acts as a bridge
between your codebase and AI assistants, allowing Claude to access project context in real-time.

> **Note**: To enable Claude to access your project context through the MCP server read
> the [MCP documentation](/mcp-server.md#setting-up).

```bash
ctx server
```

### Options

| Option                | Description                                                                       |
|-----------------------|-----------------------------------------------------------------------------------|
| `--config-file`, `-c` | Path to configuration file (absolute or relative to current directory).           |
| `--env`, `-e`         | Path to .env (like .env.local) file. If not provided, will ignore any .env files. |

### Examples

**Starting the server with default settings:**

```bash
ctx server
```

**Using a specific configuration file:**

```bash
ctx server --config-file=path/to/custom-context.yaml
# or
ctx server -c path/to/custom-context.yaml
```

**Loading environment variables from a specific file:**

```bash
ctx server --env=.env.development
# or
ctx server -e .env.development
```

**Combining configuration and environment options:**

```bash
ctx server -c path/to/project/context.yaml -e .env.local
```

**Pointing to a project directory (will use default config file in that directory):**

```bash
ctx server -c /path/to/project/
```

### Log Verbosity

The MCP server logs its activities to a `mcp.log` file in the project root directory. The log level is determined by the
verbosity level of the command:

- Default: Warning level logs
- `--verbose` or `-v`: Info level logs
- `--very-verbose` or `-vv`: Debug level logs
- `--quiet` or `-q`: Error level logs only

```bash
# Get more detailed logs
ctx server -c /path/to/project -vv
```

## Get JSON Schema

Shows the URL where the JSON schema for IDE integration is hosted.

```bash
ctx schema
# or
ctx json-schema
```

### Options

| Option             | Description                                    |
|--------------------|------------------------------------------------|
| `--download`, `-d` | Download the schema to the current directory   |
| `--output`, `-o`   | The file path where the schema should be saved |

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

## Self-Update

Updates the **CTX** to the latest version.

```bash
ctx self-update
# or
ctx update
```

### Options

| Option         | Description                               |
|----------------|-------------------------------------------|
| `--path`, `-p` | Path where to store the binary            |
| `--name`, `-b` | Name of the binary file. Default is [ctx] |
| `--type`, `-t` | Binary type (phar or bin)                 |
| `--repository` | GitHub repository to update from          |

If you installed ctx in a non-standard location, you can specify the path:

```bash
ctx self-update --path=/usr/local/bin/ctx
# or
ctx self-update -p /usr/local/bin/ctx
```

## Check Version

Displays the current version of **CTX**.

```bash
ctx version
```

### Options

| Option                  | Description       |
|-------------------------|-------------------|
| `--check-updates`, `-c` | Check for updates |

To check for available updates:

```bash
ctx version --check-updates
# or
ctx version -c
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