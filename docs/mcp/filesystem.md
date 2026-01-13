# Filesystem Tools

**CTX** MCP server includes a comprehensive set of filesystem tools that allow Claude to directly interact
with your project files. These tools enable powerful AI-assisted development workflows and make it easy to analyze,
modify, and create files without leaving your conversation.

## Working with Multiple Projects

If you have multiple projects registered with CTX, you can use the `projects-list` tool to see all available projects
and their configurations. This is particularly useful when you need to:

- Switch between different codebases
- Verify which project is currently active
- Check project configurations and aliases

**Example:**

```json
{
  "tool": "projects-list"
}
```

**Response includes:**

- List of all registered projects
- Current active project indicator
- Project paths, aliases, and configuration files
- Whitelisted projects for the `project` parameter

Once you know the available projects, you can specify the `project` parameter in any filesystem tool to work with files
in a specific project context.

> **Note:** Learn more about project management in the [Projects documentation](./projects.md).

## Available Tools

### file-read

Reads content from one or more files within the project directory structure. Supports both single-file and batch reading
operations.

**Parameters:**

- `path` (optional): Path to a single file relative to project root
- `paths` (optional): Array of file paths for batch reading
- `encoding` (optional): File encoding (default: utf-8)
- `project` (optional): Project identifier if multiple projects are supported

**Single File Example:**

```json
{
  "path": "src/ExampleClass.php",
  "encoding": "utf-8"
}
```

**Batch Reading Example:**

```json
{
  "paths": [
    "src/Domain/Entity/User.php",
    "src/Domain/Entity/Customer.php",
    "src/Infrastructure/Repository/UserRepository.php"
  ]
}
```

**Response:**
For single files, returns the raw file content. For multiple files, returns formatted response with all file contents
separated by headers.

**Limits:**

- Maximum 50 files per batch request
- Maximum 10 MB per file
- Maximum 50 MB total response size per request

### file-write

Writes content to a file with optional directory creation. Best used for creating new files.

**Parameters:**

- `path` (required): Relative path to the file (e.g., "src/file.txt")
- `content` (required): Content to write to the file
- `createDirectory` (optional): Create directory if it doesn't exist (default: true)
- `project` (optional): Project identifier if multiple projects are supported

**Example:**

```json
{
  "path": "src/utils/Helper.php",
  "content": "<?php\n\ndeclare(strict_types=1);\n\nnamespace App\\Utils;\n\nclass Helper\n{\n    // Class implementation\n}",
  "createDirectory": true
}
```

**Response:**
Returns a success message with the number of bytes written.

### file-replace-content

Replaces a unique occurrence of text in a file with exact matching. This is the preferred method for updating existing
files as it handles line endings automatically and provides detailed feedback.

**Parameters:**

- `path` (required): Path to the file relative to project root
- `search` (required): Exact content to find (must appear exactly once)
- `replace` (required): Content to replace the matched text with
- `project` (optional): Project identifier if multiple projects are supported

**Example:**

```json
{
  "path": "src/Domain/Entity/Customer.php",
  "search": "    private string $email;",
  "replace": "    private string $email;\n    private bool $verified = false;"
}
```

**Key Features:**

- Automatic line ending normalization (handles Windows CRLF, Unix LF, and legacy Mac CR)
- Exact matching with whitespace and special characters
- Validates uniqueness before replacement
- Provides detailed line number and character count information
- Safe for insertions by including original text in replacement

**Response:**
Returns success message with:

- Original line range
- Modified line range
- Characters replaced count
- Characters added count
- Net change in characters

**Important Notes:**

- Search pattern must match exactly including all whitespace and special characters
- Pattern must be unique (appear exactly once in the file)
- If pattern not found or appears multiple times, operation fails with helpful error message
- Use `file-read` first to see actual file content including whitespace

### directory-list

Lists directories and files with powerful filtering options using Symfony Finder. Automatically respects global exclude
configuration from `context.yaml`.

**Parameters:**

- `path` (required): Base directory path to list (relative to project root)
- `pattern` (optional): File name pattern(s) to match (e.g., "*.php", comma-separated)
- `depth` (optional): Maximum directory depth to search (0 = only given directory, default: 0)
- `size` (optional): Size filter expression (e.g., "> 1K", "< 10M")
- `date` (optional): Date filter expression (e.g., "since yesterday", "> 2023-01-01")
- `contains` (optional): Only files containing this text (grep-like behavior)
- `type` (optional): Filter by type: "file", "directory", or "any" (default: any)
- `sort` (optional): Sort results by: "name", "type", "date", "size" (default: name)
- `showTree` (optional): Include visual ASCII tree in response (default: false)
- `treeView` (optional): Configuration for tree view visualization
- `project` (optional): Project identifier if multiple projects are supported

**Exclude Configuration:**

This tool automatically filters out files and directories matching patterns defined in your `context.yaml`:

```yaml
exclude:
  patterns:
    - "*.log"
    - ".env*"
  paths:
    - "vendor"
    - "node_modules"
```

Files matching these exclusions will not appear in results. See
the [Exclude System Guide](../getting-started/exclude-system.md) for details.

**Basic Example:**

```json
{
  "path": "src",
  "pattern": "*.php",
  "depth": 2
}
```

**Advanced Filtering Example:**

```json
{
  "path": "src",
  "pattern": "*.php",
  "depth": 3,
  "size": "> 1K",
  "date": "since yesterday",
  "contains": "class.*Repository",
  "type": "file",
  "sort": "date"
}
```

**Tree View Example:**

```json
{
  "path": "src/Domain",
  "depth": 2,
  "showTree": true,
  "treeView": {
    "showSize": true,
    "showLastModified": false,
    "includeFiles": true
  }
}
```

**Response:**
Returns either:

- List of files with metadata (path, name, size, lastModified, isDirectory)
- ASCII tree view (if `showTree: true`)

**Tree View Options:**

- `showSize`: Display file sizes
- `showLastModified`: Display modification dates
- `showCharCount`: Display character counts
- `includeFiles`: Include files in tree (false = directories only)

## Use Cases

### Code Analysis and Batch Reading

Claude can efficiently read and analyze multiple related files at once:

**Example workflow:**

1. Use `directory-list` to find all repository classes
2. Read multiple files in one batch request using `file-read` with `paths` parameter
3. Analyze patterns, dependencies, and relationships across files
4. Generate comprehensive reports or documentation

**Practical example:**

```json
// Find all repositories
{
  "tool": "directory-list",
  "path": "src/Infrastructure/Repository",
  "pattern": "*Repository.php"
}

// Read them all at once
{
  "tool": "file-read",
  "paths": [
    "src/Infrastructure/Repository/UserRepository.php",
    "src/Infrastructure/Repository/CustomerRepository.php",
    "src/Infrastructure/Repository/OrderRepository.php"
  ]
}
```

### Precise Code Modification

Use `file-replace-content` for safe, targeted updates to existing files:

**Example workflow:**

1. Read a file to understand its current state
2. Identify the exact text to replace (including whitespace)
3. Use `file-replace-content` to make the change
4. Get detailed feedback about what changed

**Best practices:**

- Include enough context in the search pattern to ensure uniqueness
- Match whitespace exactly (spaces, tabs, newlines)
- Use for insertions by including original text in replacement
- Great for adding properties, methods, or updating existing code

**Example:**

```json
{
  "tool": "file-replace-content",
  "path": "src/Domain/Entity/User.php",
  "search": "    public function __construct(\n        private string $name,\n        private string $email,\n    ) {}",
  "replace": "    public function __construct(\n        private string $name,\n        private string $email,\n        private \\DateTimeImmutable $createdAt,\n    ) {\n        $this->createdAt = $createdAt ?? new \\DateTimeImmutable();\n    }"
}
```

### Code Generation with Context

Generate new files with full understanding of project structure:

**Example workflow:**

1. Use `directory-list` to understand project organization
2. Read related files to match coding style and patterns
3. Generate new code following project conventions
4. Write to appropriate location with `file-write`

### Project Exploration and Analysis

Efficiently explore and analyze your codebase:

**Finding specific code patterns:**

```json
{
  "tool": "directory-list",
  "path": "src",
  "pattern": "*.php",
  "depth": 5,
  "contains": "interface.*Repository"
}
```

**Analyzing recent changes:**

```json
{
  "tool": "directory-list",
  "path": "src",
  "date": "since yesterday",
  "sort": "date"
}
```

**Finding large files for optimization:**

```json
{
  "tool": "directory-list",
  "path": "src",
  "size": "> 50K",
  "sort": "size"
}
```

### Refactoring Workflows

Systematic refactoring with powerful tools:

**Example: Adding a new property to multiple classes**

1. Use `directory-list` to find all entity classes
2. Read entities in batch to understand their structure
3. Use `file-replace-content` to add property to each class
4. Verify changes by reading updated files

**Example: Reorganizing code**

1. Use `directory-list` with tree view to visualize current structure
2. Read files that need to be moved
3. Create new files in target locations
4. Update references using `file-replace-content`

### Working with Large Codebases

Efficient strategies for large projects:

**Focused exploration:**

- Use `depth` parameter to limit directory traversal
- Apply `pattern` to focus on specific file types
- Use `contains` to find code with specific keywords
- Leverage batch reading to analyze related files together

**Performance tips:**

- Start with shallow depth (0-2) and increase as needed
- Use specific patterns to reduce result sets
- Combine filters (pattern, size, date) for precision
- Read related files in batches rather than one by one

### Working Across Multiple Projects

When you have multiple projects registered with CTX, you can work with files across different codebases:

**Example workflow:**

```json
// First, list all available projects
{
  "tool": "projects-list"
}

// Read files from specific projects
{
  "tool": "file-read",
  "path": "src/Domain/Entity/User.php",
  "project": "backend-api"
}

{
  "tool": "file-read",
  "path": "src/components/UserProfile.tsx",
  "project": "frontend-app"
}

// Compare structures across projects
{
  "tool": "directory-list",
  "path": "src",
  "depth": 2,
  "showTree": true,
  "project": "backend-api"
}
```

**Use cases:**

- Compare implementations across microservices
- Share code patterns between related projects
- Analyze architectural consistency
- Generate documentation spanning multiple projects
- Coordinate refactoring across codebases

**Note:** The `project` parameter is optional. When omitted, tools operate on the current active project.

### Filtering Sensitive and Unwanted Files

Use the exclude system to automatically filter out files you don't want in results:

**Configure exclusions in `context.yaml`:**

```yaml
exclude:
  patterns:
    - ".env*"
    - "*.log"
    - "**/*.min.js"
  paths:
    - "vendor"
    - "node_modules"
    - ".git"
```

**Benefits:**

- **Security:** Automatically hide sensitive files like `.env`, `*.key`, `*.pem`
- **Performance:** Exclude large directories like `vendor` and `node_modules`
- **Clarity:** Remove build artifacts and temporary files from results
- **Consistency:** Exclusions apply to all filesystem operations automatically

**Example workflow:**

```json
// Without exclusions - returns thousands of files including vendor/
{
  "tool": "directory-list",
  "path": ".",
  "depth": 3
}

// With exclusions configured - clean, relevant results only
{
  "tool": "directory-list",
  "path": ".",
  "depth": 3
}
// vendor/, node_modules/, *.log automatically filtered
```

> **Learn more:** See the [Exclude System Guide](../getting-started/exclude-system.md) for complete configuration
> options.

## Best Practices

### File Reading

- Use batch reading for related files to reduce request overhead
- Maximum 50 files per batch request
- Each file limited to 10 MB
- Total response limited to 50 MB per request

### File Replacement

- Always read the file first to understand its current state
- Match whitespace exactly in search patterns
- Include enough context to ensure pattern uniqueness
- Use for both modifications and insertions
- Handles line endings automatically (Windows/Unix/Mac)

### Directory Listing

- Start with shallow depth and increase as needed
- Use specific patterns to reduce noise
- Combine multiple filters for precision
- Use tree view for understanding structure
- Sort results appropriately for your use case
- Configure global exclusions in `context.yaml` to automatically hide unwanted files
- Exclude sensitive files (`.env*`, `*.key`, `*.pem`) for security
- Exclude large dependency directories (`vendor`, `node_modules`) for performance

### General Tips

- Work incrementally on large projects
- Verify changes by reading files after modification
- Use directory-list to understand structure before making changes
- Leverage batch operations to reduce back-and-forth
- Let tools handle line endings and encoding automatically
- Use `projects-list` to see all available projects when working with multiple codebases
- Specify the `project` parameter when you need to work with files in a non-active project