# Tree Source

The Tree source allows you to generate hierarchical visualizations of directory structures. This is useful for providing
context about your file organization or for documenting the structure of your codebase.

```yaml
documents:
  - description: Project File Structure
    outputPath: docs/file-structure.md
    sources:
      - type: tree
        description: Project File Structure
        sourcePaths:
          - src
        filePattern: *.php
        notPath:
          - tests
          - vendor
        renderFormat: ascii
        maxDepth: 3
        includeFiles: true
        showSize: true
```

## Parameters

| Parameter          | Type          | Default  | Description                                              |
|--------------------|---------------|----------|----------------------------------------------------------|
| `type`             | string        | required | Must be `"tree"`                                         |
| `description`      | string        | `""`     | Human-readable description of the source                 |
| `sourcePaths`      | string\|array | required | Path(s) to generate tree from                            |
| `filePattern`      | string\|array | `"*"`    | Pattern(s) to match files                                |
| `notPath`          | array         | `[]`     | Patterns to exclude paths                                |
| `path`             | string\|array | `[]`     | Patterns to include only specific paths                  |
| `contains`         | string\|array | `[]`     | Patterns to include files containing specific content    |
| `notContains`      | string\|array | `[]`     | Patterns to exclude files containing specific content    |
| `maxDepth`         | integer       | `0`      | Maximum depth of the tree to display (0 for unlimited)   |
| `includeFiles`     | boolean       | `true`   | Whether to include files in the tree or only directories |
| `showSize`         | boolean       | `false`  | Include file/directory sizes in the tree                 |
| `showLastModified` | boolean       | `false`  | Include last modified dates in the tree                  |
| `showCharCount`    | boolean       | `false`  | Include character counts in the tree                     |
| `dirContext`       | object        | `{}`     | Optional context/descriptions for specific directories   |
| `tags`             | array         | `[]`     | List of tags for this source                             |

## Example output

```
└── src/ [87.6 KB, 89,744 chars]
    └── ConfigLoader/ [22.8 KB, 23,306 chars] # Contains all application controllers
        ├── CompositeConfigLoader.php [2.1 KB, 2,156 chars]
        ├── ConfigLoader.php [2.3 KB, 2,405 chars]
        ├── ConfigLoaderFactory.php [3.1 KB, 3,133 chars]
        ├── ConfigLoaderInterface.php [739.0 B, 739 chars]
        ├── Exception/ [452.0 B, 452 chars]
        │   ├── ConfigLoaderException.php [229.0 B, 229 chars]
        │   ├── ReaderException.php [223.0 B, 223 chars]
        ├── Parser/ [4.3 KB, 4,385 chars]
        │   ├── CompositeConfigParser.php [1.2 KB, 1,231 chars]
        │   ├── ConfigParser.php [1.8 KB, 1,820 chars]
        │   ├── ConfigParserInterface.php [455.0 B, 455 chars]
        │   ├── ConfigParserPluginInterface.php [879.0 B, 879 chars]
        ├── Reader/ [6.8 KB, 7,010 chars]
        │   ├── AbstractReader.php [2.6 KB, 2,642 chars]
        │   ├── JsonReader.php [842.0 B, 842 chars]
        │   ├── PhpReader.php [1.6 KB, 1,613 chars]
        │   ├── ReaderInterface.php [774.0 B, 774 chars]
        │   ├── YamlReader.php [1.1 KB, 1,139 chars]
        ├── Registry/ [3.0 KB, 3,026 chars]
        │   └── ConfigRegistry.php [1.7 KB, 1,716 chars]
        │   └── DocumentRegistry.php [859.0 B, 859 chars]
        │   └── RegistryInterface.php [451.0 B, 451 chars]
    └── Lib/ [64.9 KB, 66,438 chars]
        └── Content/ [5.8 KB, 5,910 chars]
            ├── ContentBlock.php [1.1 KB, 1,141 chars]
            ├── ContentBuilder.php [4.1 KB, 4,224 chars]
            ├── ContentBuilderFactory.php [545.0 B, 545 chars]
        └── Files.php [1.6 KB, 1,678 chars]
        └── Finder/ [1.3 KB, 1,363 chars]
            ├── FinderInterface.php [828.0 B, 828 chars]
            ├── FinderResult.php [535.0 B, 535 chars]
        └── GithubClient/ [4.2 KB, 4,324 chars]
            ├── GithubClient.php [3.2 KB, 3,245 chars]
            ├── GithubClientInterface.php [1.1 KB, 1,079 chars]
```

## Basic Usage

Generate a simple directory tree:

```yaml
documents:
  - description: Project Structure
    outputPath: docs/structure.md
    sources:
      - type: tree
        description: Source Code Structure
        sourcePaths:
          - src
        filePattern: *.php
        notPath:
          - tests
          - vendor
```

## Advanced Usage

Create a more detailed tree with size information and limited depth:

```yaml
documents:
  - description: Core Components
    outputPath: docs/core-structure.md
    sources:
      - type: tree
        description: Core Components
        sourcePaths:
          - src/Core
        filePattern:
          - *.php
          - *.json
        maxDepth: 2
        showSize: true
        showLastModified: true
        dirContext:
          src/Core/Models: Data models used throughout the application
          src/Core/Controllers: Request handlers and business logic
```

## Multiple Source Paths

Include trees from multiple directories:

```yaml
documents:
  - description: Application Structure
    outputPath: docs/app-structure.md
    sources:
      - type: tree
        description: Application Structure
        sourcePaths:
          - src/App
          - config
          - resources/views
        filePattern: *.*
        maxDepth: 3
```

## Content Filtering

Filter files based on their content:

```yaml
documents:
  - description: Controller Classes
    outputPath: docs/controllers.md
    sources:
      - type: tree
        description: Controller Classes
        sourcePaths:
          - src
        contains: class Controller
        notContains: @deprecated
        filePattern: *.php
```

## Directory-Only View

Generate a tree showing only directories:

```yaml
documents:
  - description: Project Directory Structure
    outputPath: docs/dir-structure.md
    sources:
      - type: tree
        description: Project Directory Structure
        sourcePaths:
          - .
        includeFiles: false
        maxDepth: 2
```