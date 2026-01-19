# Dynamic Project Switching

CTX allows you to manage multiple projects and seamlessly switch between them.

> **Note**: After switching projects, you may need to restart MCP clients (like Claude) to ensure they
> recognize the new context.

**This feature is especially valuable for developers who:**

- Work on multiple projects simultaneously
- Need to provide context from different codebases to AI assistants
- Want to maintain separate configurations for different projects

## Project Configuration Methods

CTX supports two ways to configure projects:

### 1. Global Registry (CLI-based)

Register projects globally using CLI commands. These projects can be accessed from anywhere using their alias name.

### 2. Path-based Projects (YAML-based)

Define projects directly in your `context.yaml` using relative or absolute paths. This method is ideal for:

- Projects that live alongside your main project (monorepos, shared libraries)
- Temporary project references without polluting the global registry
- Portable configurations that work across different machines

See [Configuring Projects in YAML](#configuring-projects-in-yaml) for details.

## Using Dynamic Project Switching

With Project Switching, you can start the MCP server without specifying a project path:

```bash
ctx server
```

When the `-c` option is omitted, CTX will use the globally registered projects configuration. This means:

1. The server starts with the currently active project (if one is set)
2. You can switch between registered projects using console commands
3. AI assistants like Claude will always have access to the current project context

## Project Management Commands

CTX provides several commands for managing your projects:

## Adding a Project (`project:add`)

Register a new project with the system:

```bash
ctx project:add <path> [--name=<alias>] [--config-file=<path>] [--env-file=<path>]
```

**Example:**

The easiest way to add a project is to run the command from the project directory:

```bash
ctx project:add . --name=my-backend
```

If you want to specify environment variables for the project, you can do so with the `--env-file` option:

```bash
ctx project:add . --name=my-backend --env-file=.env.dev
```

**Arguments:**

- `path`: Path to the project directory. Use `.` for current directory.

**Options:**

- `--name`: Alias name for the project (optional)
- `--config-file` or `-c`: Path to custom configuration file within the project (optional)
- `--env-file` or `-e`: Path to .env file within the project (optional)

## Switching Between Projects (`project`)

Switch to a different registered project:

```bash
ctx project [<path_or_alias>]
```

**Arguments:**

- `path_or_alias`: Path or alias to the project (optional). If omitted, displays an interactive selection menu.

**Example:**

Switch to a project using its alias:

```bash
ctx project my-backend
```

or switch to a project using its path:

```bash
ctx project .
```

or you can omit the argument to see a list of all registered projects:

```bash
ctx project
```

### Listing Projects (`project:list` or `projects`)

View all registered projects:

```bash
ctx project:list
```

**Example output:**

```
┌─────────────────────────────┬────────────────────┬──────────┬─────────────────┬─────────────────┬─────────┐
│ Path                        │ Config File        │ Env File │ Aliases         │ Added           │ Current │
├─────────────────────────────┼────────────────────┼──────────┼─────────────────┼─────────────────┼─────────┤
│ /home/user/projects/my-app  │                    │          │ my-app          │ 2025-05-01 10:15│         │
├─────────────────────────────┼────────────────────┼──────────┼─────────────────┼─────────────────┼─────────┤
│ /home/user/projects/backend │ custom-context.yaml│ .env.dev │ my-backend,     │ 2025-05-01 14:30│ active  │
│                             │                    │          │ backend         │                 │         │
├─────────────────────────────┼────────────────────┼──────────┼─────────────────┼─────────────────┼─────────┤
│ /home/user/projects/frontend│                    │          │ my-ui           │ 2025-05-02 09:45│         │
└─────────────────────────────┴────────────────────┴──────────┴─────────────────┴─────────────────┴─────────┘
```

## Configuring MCP Server for Project Switching

In your Claude app configuration, set up the MCP Server without specifying a project path:

### Linux Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "ctx",
      "args": [
        "server"
      ]
    }
  }
}
```

### Windows Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "C:\\ctx.exe",
      "args": [
        "server"
      ]
    }
  }
}
```

### Windows with WSL Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "ctx server"
      ]
    }
  }
}
```

This configuration allows the MCP server to automatically use the currently active project from your project registry
without requiring a specific path at startup time.

## Configuring Projects in YAML

You can define projects directly in your `context.yaml` file using the `projects` section. This allows you to reference sibling directories, shared libraries, or any other project without registering them globally.

### Basic Syntax

```yaml
projects:
  # Path-based project (no global registration needed)
  - name: shared-lib
    path: ../shared/lib
    description: "Shared utility library"
    
  # Alias-based project (references globally registered project)
  - name: ctx-mcp-server
    description: "MCP Server library"
```

### Path Types

#### Relative Paths

Paths are resolved relative to the directory containing `context.yaml`:

```yaml
projects:
  # Sibling directory
  - name: common-models
    path: ../common/models
    
  # Subdirectory
  - name: packages-utils
    path: ./packages/utils
    
  # Complex relative path
  - name: vendor-lib
    path: ../../vendor/company/package
```

#### Absolute Paths

You can also use absolute paths for system-wide libraries:

```yaml
projects:
  - name: system-lib
    path: /opt/company/libs/system
```

### Mixed Configuration

Combine path-based and alias-based projects in the same configuration:

```yaml
projects:
  # Path-based (local to this project)
  - name: local-vendor
    path: ./vendor/company/package
    description: "Local vendor package"
    
  # Alias-based (globally registered)
  - name: company-tools
    description: "Company-wide tools"
```

### Priority Rules

When a path-based project and a global alias point to the same physical directory:

1. **Path-based definitions take priority** over global aliases
2. The local definition's name is used for the project
3. This allows you to override global aliases with local configurations

**Example:**

If you have a global alias `mylib` pointing to `/home/user/mylib`, and your `context.yaml` contains:

```yaml
projects:
  - name: my-custom-name
    path: ../mylib  # Resolves to /home/user/mylib
```

The project will be registered as `my-custom-name`, not `mylib`.

### Validation

CTX validates path-based projects during configuration parsing:

- **Path must exist** — Non-existent paths are logged and skipped
- **Path must be a directory** — Files are rejected
- **Path must be readable** — Unreadable directories are skipped

Invalid paths do not cause errors; they are simply not registered as available projects.

### Using Path-based Projects with MCP Tools

Once configured, path-based projects work exactly like alias-based projects with MCP tools:

```
# Example: Read a file from a path-based project
file-read path="src/utils.php" project="shared-lib"

# Example: List directory in a path-based project
directory-list path="." project="common-models"
```

## MCP Tools for Project Management

In addition to the command-line interface, CTX provides MCP tools that AI assistants can use to manage projects
programmatically. Read more about [MCP Tools](./tools.md#project-operations-mcp_project_operationstrue).