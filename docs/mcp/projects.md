# Dynamic Project Switching

CTX allows you to manage multiple projects and seamlessly switch between them.

> **Note**: After switching projects, you may need to restart MCP clients (like Claude) to ensure they
> recognize the new context.

**This feature is especially valuable for developers who:**

- Work on multiple projects simultaneously
- Need to provide context from different codebases to AI assistants
- Want to maintain separate configurations for different projects

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

### Adding a Project (`project:add`)

Register a new project with the system:

```bash
ctx project:add <path> [--name=<alias>] [--config-file=<path>] [--env-file=<path>] [--switch]
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
- `--switch` or `-s`: Switch to this project after adding it (optional)

**Example output:**

```
  ✓ Project added successfully

╭─● CURRENT ─────────────────────────────────────────────────────────╮
│  /home/user/projects/my-backend
│  Aliases: my-backend
│  Added: Jan 18, 2025
╰────────────────────────────────────────────────────────────────────╯

  → Set as current project (first project added)
```

### Switching Between Projects (`project`)

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

**Example output:**

```
  ✓ Switched to project: /home/user/projects/my-backend
    Aliases: my-backend
```

### Listing Projects (`project:list` or `projects`)

View all registered projects:

```bash
ctx project:list
```

**Example output:**

```
╭─● CURRENT ─────────────────────────────────────────────────────────╮
│  /home/user/projects/my-app
│  Aliases: my-app
│  Config: context.yaml
│  Added: Jan 18, 2025
╰────────────────────────────────────────────────────────────────────╯

╭─○──────────────────────────────────────────────────────────────────╮
│  /home/user/projects/backend
│  Aliases: my-backend, backend
│  Config: custom-context.yaml
│  Env: .env.dev
│  Added: Jan 15, 2025
╰────────────────────────────────────────────────────────────────────╯

╭─○──────────────────────────────────────────────────────────────────╮
│  /home/user/projects/frontend
│  Aliases: my-ui
│  Added: Jan 10, 2025
╰────────────────────────────────────────────────────────────────────╯

Commands:
  ctx project <path|alias>         Switch to a project
  ctx project:add <path>           Add a new project
  ctx project:remove <path|alias>  Remove a project
```

The output uses visual indicators:

- `●` (green) — Current active project
- `○` (gray) — Other registered projects

### Removing a Project (`project:remove`)

Remove a project from the registry:

```bash
ctx project:remove [<path_or_alias>] [--force] [--keep-aliases]
```

**Arguments:**

- `path_or_alias`: Path or alias to the project (optional). If omitted, displays an interactive selection menu.

**Options:**

- `--force` or `-f`: Skip confirmation prompt
- `--keep-aliases`: Keep aliases when removing project (not recommended)

**Example:**

Remove a project using its alias:

```bash
ctx project:remove my-backend
```

Remove without confirmation:

```bash
ctx project:remove my-backend --force
```

Interactive selection (when no argument provided):

```bash
ctx project:remove
```

**Example output:**

```
╭─○──────────────────────────────────────────────────────────────────╮
│  /home/user/projects/old-project
│  Aliases: old-project
│  Added: Jan 10, 2025
╰────────────────────────────────────────────────────────────────────╯

  Are you sure you want to remove this project? [y/N] y

  ✓ Project removed: /home/user/projects/old-project
  → Aliases removed: old-project
```

If you remove the current project, CTX will suggest switching to another:

```
  ! This is the current project. It will be unset after removal.

  ✓ Project removed: /home/user/projects/my-app
  → Aliases removed: my-app

  → Use ctx project my-backend to switch to another project
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

## MCP Tools for Project Management

In addition to the command-line interface, CTX provides MCP tools that AI assistants can use to manage projects
programmatically. Read more about [MCP Tools](./tools.md#project-operations-mcp_project_operationstrue).