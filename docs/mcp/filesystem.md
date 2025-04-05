# Filesystem Tools

**CTX** MCP server includes a comprehensive set of filesystem tools that allow Claude to directly interact
with your project files. These tools enable powerful AI-assisted development workflows and make it easy to analyze,
modify, and create files without leaving your conversation.

## Available Tools

### file-read

Reads content from a file with encoding support.

**Parameters:**

- `path` (required): Path to the file to read
- `encoding` (optional): File encoding (default: utf-8)

**Example:**

```json
{
  "path": "src/ExampleClass.php"
}
```

**Response:**
Returns the content of the file as text.

### file-write

Writes content to a file with optional directory creation.

**Parameters:**

- `path` (required): Relative path to the file (e.g., "src/file.txt")
- `content` (required): Content to write to the file
- `createDirectory` (optional): Create directory if it doesn't exist (default: true)

**Example:**

```json
{
  "path": "src/utils/Helper.php",
  "content": "<?php\n\ndeclare(strict_types=1);\n\nclass Helper\n{\n    // Class implementation\n}"
}
```

**Response:**
Returns a success message with the number of bytes written.

### file-rename

Renames a file or directory.

**Parameters:**

- `path` (required): Current relative path
- `newPath` (required): New relative path

**Example:**

```json
{
  "path": "src/OldName.php",
  "newPath": "src/NewName.php"
}
```

**Response:**
Returns a success message confirming the rename operation.

### file-move

Moves a file to a different location with optional directory creation.

**Parameters:**

- `source` (required): Source relative path
- `destination` (required): Destination relative path
- `createDirectory` (optional): Create destination directory if it doesn't exist (default: true)

**Example:**

```json
{
  "source": "src/utils/Helper.php",
  "destination": "src/helpers/UtilityHelper.php"
}
```

**Response:**
Returns a success message confirming the move operation.

### file-info

Gets detailed information about a file or directory.

**Parameters:**

- `path` (required): Path to the file or directory

**Example:**

```json
{
  "path": "src/ExampleClass.php"
}
```

**Response:**
Returns detailed information about the file or directory in JSON format:

```json
{
  "path": "src/ExampleClass.php",
  "exists": true,
  "type": "file",
  "size": 1024,
  "permissions": "644",
  "lastModified": "2023-04-12 15:30:42"
}
```

For directories, it also includes the list of files and subdirectories.

## Use Cases

### Code Analysis and Modification

Claude can read existing files, analyze them, and suggest modifications or improvements. For example:

1. Read a class file to understand its structure
2. Analyze dependencies and relationships
3. Suggest refactoring or optimization
4. Write the modified version back to the file

### Code Generation

Claude can generate new files based on your requirements and project context:

1. Understand your project structure using context tools
2. Generate new classes, interfaces, or utility functions
3. Write the generated code to appropriate locations
4. Create necessary directories if they don't exist

### Project Exploration

Claude can explore your project structure to better understand its organization:

1. Get information about directories to understand the project layout
2. Examine specific files to understand their purpose and functionality
3. Build a mental model of your codebase to provide more relevant assistance

### Refactoring and Reorganization

Claude can assist with refactoring and reorganizing your project:

1. Rename files to follow naming conventions
2. Move files to more appropriate locations
3. Create new directory structures for better organization
4. Update file content to reflect the new structure