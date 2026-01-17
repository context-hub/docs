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
operations, with optional line range selection for single files.

**Parameters:**

- `path` (optional): Path to a single file relative to project root
- `paths` (optional): Array of file paths for batch reading
- `encoding` (optional): File encoding (default: utf-8)
- `startLine` (optional): First line to read (1-based, inclusive). Only applies to single file requests.
- `endLine` (optional): Last line to read (1-based, inclusive). Only applies to single file requests.
- `project` (optional): Project identifier if multiple projects are supported

**Single File Example:**

```json
{
  "path": "src/ExampleClass.php",
  "encoding": "utf-8"
}
```

**Reading Specific Lines:**

```json
{
  "path": "src/Domain/Entity/User.php",
  "startLine": 10,
  "endLine": 50
}
```

**Reading From a Specific Line to End:**

```json
{
  "path": "src/Config/app.php",
  "startLine": 100
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

- For single files (full read): Returns the raw file content
- For single files (partial read): Returns formatted output with line numbers and metadata
- For multiple files: Returns formatted response with all file contents separated by headers

**Partial Read Response Example:**

```
=== src/Domain/Entity/User.php (lines 10-50 of 150) ===

10 | class User
11 | {
12 |     public function __construct(
13 |         private string $name,
...
50 |     }
```

**Limits:**

- Maximum 50 files per batch request
- Maximum 10 MB per file
- Maximum 50 MB total response size per request
- Line range parameters only apply to single file requests (not batch)

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

### file-search

Search for text or regex patterns in files. Returns matches with surrounding context lines and line numbers. Useful for
finding code patterns, function definitions, or specific content across the codebase.

**Parameters:**

- `query` (required): Search query - text string or regex pattern to find in files
- `path` (optional): Base directory path to search (relative to project root, default: project root)
- `pattern` (optional): File name pattern(s) to match (e.g., "*.php", comma-separated for multiple)
- `depth` (optional): Maximum directory depth to search (0 = only specified directory, default: 10)
- `contextLines` (optional): Number of context lines to show before and after each match (default: 2, max: 10)
- `caseSensitive` (optional): Whether the search is case-sensitive (default: true)
- `regex` (optional): Whether to treat query as a regex pattern (default: false)
- `maxMatchesPerFile` (optional): Maximum matches to return per file, 0 = unlimited (default: 50, max: 1000)
- `maxTotalMatches` (optional): Maximum total matches across all files, 0 = unlimited (default: 200, max: 5000)
- `size` (optional): Size filter expression (e.g., "< 1M", "> 1K")
- `project` (optional): Project identifier if multiple projects are supported

**Basic Text Search Example:**

```json
{
  "query": "Repository",
  "path": "src",
  "pattern": "*.php"
}
```

**Regex Search Example:**

```json
{
  "query": "class\\s+\\w+Repository",
  "path": "src",
  "pattern": "*.php",
  "regex": true,
  "contextLines": 3
}
```

**Case-Insensitive Search:**

```json
{
  "query": "TODO",
  "path": "src",
  "caseSensitive": false,
  "depth": 5
}
```

**Response:**
Returns formatted results with:

- Total match count and file count
- For each file with matches:
    - File path header
    - Each match with line number
    - Context lines before and after the match (highlighted with `>` for the matched line)

**Example Output:**

```
Found 3 matches in 2 files

=== src/Domain/Repository/UserRepository.php ===

[Line 15]
  13 | use App\Domain\Entity\User;
  14 |
> 15 | class UserRepository implements UserRepositoryInterface
  16 | {
  17 |     public function __construct(

=== src/Domain/Repository/CustomerRepository.php ===

[Line 12]
  10 | namespace App\Domain\Repository;
  11 |
> 12 | class CustomerRepository implements CustomerRepositoryInterface
  13 | {
  14 |     // ...
```

**Key Features:**

- Automatic binary file detection and skipping
- Respects global exclude configuration from `context.yaml`
- Supports both literal text and regex patterns
- Configurable context lines for understanding matches in context
- Limits per file and total to prevent overwhelming results
- Skips large files (> 5 MB) automatically

### php-structure

Analyze PHP file structure and relationships. Returns class/interface/trait/enum signatures with links to related files
(extends, implements, use statements, type hints). Use depth parameter to follow relationships recursively.

**Parameters:**

- `path` (required): Path to PHP file, relative to project root
- `depth` (optional): How deep to follow relationships (0 = only requested file, 1-3 = follow local links, default: 1)
- `showPrivate` (optional): Include private and protected members in output (default: false)
- `project` (optional): Project identifier if multiple projects are supported

**Basic Example:**

```json
{
  "path": "src/Domain/Entity/User.php"
}
```

**Deep Analysis Example:**

```json
{
  "path": "src/Domain/Repository/UserRepository.php",
  "depth": 2,
  "showPrivate": true
}
```

**Response:**
Returns PHP-like signature representation with relationship annotations:

```php
// src/Domain/Repository/UserRepository.php
namespace App\Domain\Repository;

use App\Domain\Entity\User;  // → src/Domain/Entity/User.php
use App\Domain\Repository\UserRepositoryInterface;  // → src/Domain/Repository/UserRepositoryInterface.php
use Cycle\ORM\RepositoryInterface;  // → (unresolved)

#[Repository]  // → src/Infrastructure/Attribute/Repository.php
final class UserRepository implements UserRepositoryInterface  // → src/Domain/Repository/UserRepositoryInterface.php
{
   public function __construct(private ORMInterface $orm) {}
   
   public function findById(int $id): ?User {}
   public function save(User $user): void {}
}

// ────────────────────────────────────────────────────────────────
// Linked (depth 1): src/Domain/Repository/UserRepositoryInterface.php

namespace App\Domain\Repository;

use App\Domain\Entity\User;  // → src/Domain/Entity/User.php

interface UserRepositoryInterface
{
   public function findById(int $id): ?User;
   public function save(User $user): void;
}
```

**Key Features:**

- Outputs interface-style signatures (method bodies replaced with `{}` or `;`)
- Shows file path comments for all referenced types
- Recursive depth traversal follows local (non-vendor) references
- Supports classes, interfaces, traits, and enums
- Shows extends, implements, use statements, and attributes
- Resolves namespaces and use statements to actual file paths
- Filters private members by default for cleaner output

**Use Cases:**

- Understanding class hierarchy without reading full source code
- Quickly mapping relationships between files
- Generating documentation or API overviews
- Analyzing dependencies before refactoring

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

### Code Search and Pattern Finding

Use `file-search` for powerful text and regex searches across your codebase:

**Finding all TODO comments:**

```json
{
  "tool": "file-search",
  "query": "TODO",
  "path": "src",
  "caseSensitive": false,
  "contextLines": 1
}
```

**Finding method definitions with regex:**

```json
{
  "tool": "file-search",
  "query": "public function (find|get|load)\\w+",
  "path": "src/Domain/Repository",
  "pattern": "*.php",
  "regex": true,
  "contextLines": 3
}
```

**Finding deprecated code:**

```json
{
  "tool": "file-search",
  "query": "@deprecated",
  "path": "src",
  "pattern": "*.php",
  "maxTotalMatches": 100
}
```

**Searching for specific error handling patterns:**

```json
{
  "tool": "file-search",
  "query": "catch\\s*\\(\\s*\\\\?Exception",
  "path": "src",
  "regex": true,
  "depth": 10
}
```

### Understanding PHP Class Hierarchy

Use `php-structure` to analyze class relationships without reading full source:

**Quick class overview:**

```json
{
  "tool": "php-structure",
  "path": "src/Domain/Entity/User.php"
}
```

**Deep relationship analysis:**

```json
{
  "tool": "php-structure",
  "path": "src/Application/Handler/CreateUserHandler.php",
  "depth": 2,
  "showPrivate": false
}
```

**Example workflow for understanding a service:**

1. Start with the main class:
   ```json
   {
     "tool": "php-structure",
     "path": "src/Application/Service/OrderService.php",
     "depth": 1
   }
   ```
2. The output shows all related interfaces, repositories, and entities
3. Increase depth to follow those relationships:
   ```json
   {
     "tool": "php-structure",
     "path": "src/Application/Service/OrderService.php",
     "depth": 3
   }
   ```

**Use cases for `php-structure`:**

- Understanding unfamiliar code quickly
- Documenting API boundaries
- Planning refactoring by mapping dependencies
- Onboarding new developers to a codebase
- Generating interface documentation
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
- Use `startLine` and `endLine` for reading specific sections of large files
- Line numbers are 1-based and inclusive
- Partial reads include line numbers in output for easy reference
- Line range only works with single file requests (not batch)

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

### File Search

- Start with literal text search; use regex only when needed
- Use `contextLines` to understand matches in context (default: 2)
- Limit results with `maxMatchesPerFile` and `maxTotalMatches` for large codebases
- Combine with `pattern` parameter to focus on specific file types
- Use case-insensitive search for user-facing text or comments
- Binary files are automatically skipped
- Files larger than 5 MB are skipped for performance

### PHP Structure Analysis

- Use `depth: 0` for quick single-file overview
- Use `depth: 1-2` to understand immediate dependencies
- Keep `showPrivate: false` (default) for cleaner public API view
- Enable `showPrivate: true` when debugging internal implementation
- The tool resolves local project files but marks vendor dependencies as "(unresolved)"
- Great for generating documentation or understanding unfamiliar code

### General Tips

- Work incrementally on large projects
- Verify changes by reading files after modification
- Use directory-list to understand structure before making changes
- Leverage batch operations to reduce back-and-forth
- Let tools handle line endings and encoding automatically
- Use `projects-list` to see all available projects when working with multiple codebases
- Specify the `project` parameter when you need to work with files in a non-active project