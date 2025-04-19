# Logging

**CTX** includes a PSR-3 compliant logging system with console output support. The logger integrates with
Symfony Console and respects verbosity levels.

### Verbosity Levels

The logger's output is controlled by the verbosity level of your console command:

| Verbosity Flag | Console Option | Log Levels Displayed                                         |
|----------------|----------------|--------------------------------------------------------------|
| Normal         | (none)         |
| Verbose        | `-v`           | `ERROR`, `WARNING`, `NOTICE`                                 |
| Very Verbose   | `-vv`          | `ERROR`, `WARNING`, `NOTICE`, `INFO`                         |
| Debug          | `-vvv`         | `ERROR`, `WARNING`, `NOTICE`, `INFO`, `DEBUG`                |
| Quiet          | `-q`           | Does not display any messages, include compiling information |

## Usage

You can control the verbosity when using the command-line interface:

### Verbose output

If you want to see more detailed information about the execution of the command, you can use the `-v` flag. This will
show all log levels, including error, warning, and notice messages.

```bash
ctx -v
```

Example of a command with verbose output:

```
[INFO] Compiling Context Generator Architecture Overview...

[ERROR] [tree-source] Error while generating tree: You must call one of in() or append() methods before iterating over a Finder.
{
    "error": "You must call one of in() or append() methods before iterating over a Finder.",
    "file": "phar:\/\/\/usr\/local\/bin\/ctx\/vendor\/symfony\/finder\/Finder.php",
    "line": 667
}

[ERROR] [documents] Error processing source
{
    "sourceType": "Butschster\\ContextGenerator\\Source\\Tree\\TreeSource",
    "error": "Error while generating tree: You must call one of in() or append() methods before iterating over a Finder.",
    "file": "phar:\/\/\/usr\/local\/bin\/ctx\/src\/Source\/Tree\/TreeSourceFetcher.php",
    "line": 155
}

[WARNING] [documents] Document compiled with errors
{
    "errorCount": 1
}

```

#### Verbose Verbose output

If you want to see more detailed information about the execution of the command, you can use the `-vv` flag. This will
show all log levels, including info messages. This is useful for understanding the flow of the application and

```bash
ctx -vv
```

Example of a command with verbose output:

```
[INFO] Compiling Variable Replacement System...

[INFO] [documents] Starting document compilation
{
    "document": "Variable Replacement System",
    "outputPath": "16-variable-replacement.md"
}

[INFO] [documents] Processing document sources
{
    "sourceCount": 3,
    "hasDocumentModifiers": false
}

[INFO] [text-source] Fetching text source content
{
    "description": "",
    "tag": "INSTRUCTION",
    "contentLength": 129
}
```

### Debug output

If you want to see detailed debug information, you can use the `-vvv` flag. This will show all log levels, including
debug messages. This is useful for troubleshooting and understanding the internal workings of the application.

```bash
ctx -vvv
```

Example of a command with debug output:

```
[INFO] [file-source] Fetching file source content
{
    "description": "Variable provider implementations",
    "basePath": "\/root\/repos\/butschster\/context-generator",
    "hasModifiers": true,
    "showTreeView": true
}

[DEBUG] [file-source] Creating content builder

[DEBUG] [file-source] Finding files
{
    "in": [
      "\/root\/repos\/butschster\/context-generator\/src\/Lib\/Variable\/Provider"
    ],
    "files": null
}

[DEBUG] [file-source] Files found
{
 "fileCount": 4
}

[DEBUG] [file-source] Adding tree view to output

[DEBUG] [file-source] Processing files

[DEBUG] [file-source] Processing file
{
    "file": "\/src\/Lib\/Variable\/Provider\/CompositeVariableProvider.php",
    "index": 1,
    "total": 4,
    "size": 1724
}`
```

### Quiet mode

If you want to suppress all output, including errors, you can use the `-q` flag. This is useful for running commands
in the background or in scripts where you don't want any output.

```bash
ctx -q
```