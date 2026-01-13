# Exclude System

The exclude system allows you to filter out files and directories from CTX operations. When configured, excluded paths
are hidden from MCP tool results (like `directory-list`) and document generation sources.

## Quick Start

Add an `exclude` section to your `context.yaml`:

```yaml
exclude:
  patterns:
    - ".env*"           # Glob pattern - matches .env, .env.local, .env.production
    - "*.log"           # All log files
    - "*.tmp"           # Temporary files
    - "**/*.bak"        # Backup files in any directory
  paths:
    - "vendor"          # Exact directory path
    - "node_modules"    # Node dependencies
    - "cache"           # Cache directory
    - ".git"            # Git directory
```

## Pattern Types

### Glob Patterns

Use glob patterns in the `patterns` section for flexible matching with wildcards:

| Pattern        | Matches                     | Example Files                           |
|----------------|-----------------------------|-----------------------------------------|
| `*.log`        | Any log file in root        | `app.log`, `error.log`                  |
| `.env*`        | Env files with any suffix   | `.env`, `.env.local`, `.env.production` |
| `**/*.tmp`     | Temp files in any directory | `data.tmp`, `cache/session.tmp`         |
| `test?.php`    | Single character wildcard   | `test1.php`, `testA.php`                |
| `{*.md,*.txt}` | Alternative extensions      | `README.md`, `notes.txt`                |

**Supported wildcards:**

- `*` - matches any characters except `/`
- `**` - matches any characters including `/` (recursive)
- `?` - matches single character
- `[abc]` - matches character set
- `{a,b}` - matches alternatives

### Path Exclusions

Use the `paths` section for exact directory or file matching:

```yaml
exclude:
  paths:
    - "vendor"              # Excludes vendor/ directory and all contents
    - "tests/fixtures"      # Excludes specific subdirectory
    - "config/secrets.php"  # Excludes specific file
```

**Path exclusions match:**

- Exact path matches
- Any file or directory within the specified path

## Where Exclusions Apply

### MCP Tools

The `directory-list` MCP tool automatically respects exclude configuration:

```json
{
  "tool": "directory-list",
  "path": "src",
  "depth": 3
}
```

Files and directories matching exclusion patterns won't appear in the results.

### Document Generation

All source finders automatically filter excluded paths when gathering files:

```yaml
documents:
  - description: "Source code"
    outputPath: code.md
    sources:
      - type: file
        sourcePaths: ./src
        # Files matching global excludes are automatically filtered
```

**Affected source types:**

- `file` - Local filesystem sources
- `github` - GitHub repository sources
- `gitlab` - GitLab repository sources

## Common Exclusion Patterns

### Hide Sensitive Files

```yaml
exclude:
  patterns:
    - ".env*"
    - "*.pem"
    - "*.key"
    - "*.p12"
    - "*.pfx"
  paths:
    - "secrets"
    - "credentials"
    - "private"
```

### Hide Build Artifacts

```yaml
exclude:
  patterns:
    - "*.map"
    - "*.min.js"
    - "*.min.css"
    - "*.d.ts"
  paths:
    - "dist"
    - "build"
    - ".cache"
    - "out"
```

### Development Environment

```yaml
exclude:
  patterns:
    - "*.log"
    - "*.tmp"
    - "*.swp"
    - "*~"
  paths:
    - "vendor"
    - "node_modules"
    - ".git"
    - ".idea"
    - ".vscode"
    - ".phpunit.cache"
```

### PHP Projects

```yaml
exclude:
  patterns:
    - "*.log"
  paths:
    - "vendor"
    - "var/cache"
    - "var/log"
    - ".phpunit.cache"
    - "public/bundles"
```

### JavaScript/Node Projects

```yaml
exclude:
  patterns:
    - "*.map"
    - "*.min.*"
  paths:
    - "node_modules"
    - "dist"
    - "build"
    - ".next"
    - ".nuxt"
    - "coverage"
```

### Python Projects

```yaml
exclude:
  patterns:
    - "*.pyc"
    - "*.pyo"
    - "*.pyd"
  paths:
    - "__pycache__"
    - "venv"
    - ".venv"
    - "env"
    - ".pytest_cache"
    - "dist"
    - "build"
    - "*.egg-info"
```

## Advanced Usage

### Combining Patterns and Paths

Mix both pattern types for comprehensive exclusions:

```yaml
exclude:
  patterns:
    - "*.log"              # All log files
    - "**/*.backup"        # Backup files anywhere
    - ".env*"              # Environment files
  paths:
    - "vendor"             # Dependency directory
    - "tests/fixtures"     # Test fixtures
    - "docs/archive"       # Archived docs
```

### Recursive Pattern Matching

Use `**` to match files in any subdirectory:

```yaml
exclude:
  patterns:
    - "**/.DS_Store"       # macOS metadata files anywhere
    - "**/thumbs.db"       # Windows thumbnail cache anywhere
    - "**/*.test.js"       # Test files in any directory
```

### Character Classes

Use character classes for more specific patterns:

```yaml
exclude:
  patterns:
    - "test[0-9].php"      # test0.php through test9.php
    - "config[._-]*"       # config.bak, config_old, config-dev
    - "[!.]*.tmp"          # Temp files not starting with dot
```

## How It Works

The exclude system processes paths through multiple layers:

```
1. Configuration Parsing
   context.yaml → ExcludeParserPlugin
   
2. Pattern Registration
   patterns → PatternExclusion (glob → regex via PathMatcher)
   paths → PathExclusion (string matching)
   
3. Registry Storage
   All patterns stored in ExcludeRegistry
   
4. Path Checking
   ExcludeRegistry.shouldExclude(path) → true/false
   
5. Tool Integration
   DirectoryListAction, SymfonyFinder, etc. filter results
```

## Troubleshooting

### Pattern Not Matching

**Problem:** Files not being excluded as expected

**Solutions:**

1. Check pattern syntax - use `**` for recursive matching
2. Verify path separators (always use `/` even on Windows)
3. Test with simpler patterns first
4. Check if path is relative to project root

```yaml
# ❌ Wrong - missing recursive wildcard
exclude:
  patterns:
    - "*.log"  # Only matches root directory

# ✅ Correct - matches any directory
exclude:
  patterns:
    - "**/*.log"  # Matches logs anywhere
```

### Path Not Excluding Subdirectories

**Problem:** Path excludes directory but not its contents

**Solution:** Path exclusions automatically include all contents:

```yaml
exclude:
  paths:
    - "vendor"  # Automatically excludes vendor/ and everything inside
```

### Performance Issues

**Problem:** Slow directory listing with many exclusions

**Solutions:**

1. Use path exclusions for directories instead of recursive patterns
2. Combine related patterns
3. Be specific rather than broad with wildcards

```yaml
# ❌ Slow - checks every file with regex
exclude:
  patterns:
    - "**/*.min.js"
    - "**/*.min.css"
    - "**/*.map"

# ✅ Faster - excludes entire directory
exclude:
  paths:
    - "dist"  # Assumes minified files are in dist/
```

## Best Practices

1. **Start Broad, Refine Later** - Begin with common exclusions like `vendor` and `node_modules`

2. **Use Paths for Directories** - More efficient than recursive patterns for entire directories

3. **Prefer Specific Patterns** - `*.log` is clearer than `*.l*`

4. **Document Your Patterns** - Add comments explaining why paths are excluded

5. **Test Your Patterns** - Use `directory-list` to verify exclusions work as expected

6. **Security First** - Always exclude sensitive files like `.env*`, `*.pem`, `*.key`

## Related Configuration

Exclusions work alongside other CTX features:

- **[Sources](../sources/)** - All source types respect exclusions
- **[Documents](../documents.md)** - Document generation filters excluded paths
- **[MCP Filesystem Tools](../mcp/filesystem.md)** - `directory-list` tool applies exclusions

## See Also

- [Configuration Guide](./configuration.md) - General configuration options
- [Filesystem Tools](../mcp/filesystem.md) - MCP tools affected by exclusions
- [File Source](../sources/file-source.md) - Local file sources with exclusions
