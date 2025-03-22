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

| Option                 | Description                                                                                    |
|------------------------|------------------------------------------------------------------------------------------------|
| `--github-token`, `-t` | GitHub token for authentication (default: reads from `GITHUB_TOKEN` environment variable)      |
| `--env`, `-e`          | Load environment variables from a file. If used without specifying a file, defaults to `.env`. |

Examples of using the `--env` option:

```bash
# Load variables from a specific file
ctx --env=.env.local

# Do not load any environment variables (default behavior)
ctx
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