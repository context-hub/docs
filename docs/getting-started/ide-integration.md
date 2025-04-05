# IDE Integration

To get the best experience when working with **CTX** configuration files, you can use the JSON schema for
autocompletion and validation in your IDE:

## Using schema definition in configuration files

The easiest way to enable IDE validation and autocompletion is to define the `$schema` property directly in your
configuration file. This approach works in most modern IDEs without requiring additional setup.

### YAML Configuration with Schema

```yaml
$schema: 'https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json'
documents:
  ...
```

### JSON Configuration with Schema

```json
{
  "$schema": "https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json",
  "documents": [
    ...
  ]
}
```

> **Note:** `ctx init` commands will automatically add the `$schema` property to generated configuration files.

This approach eliminates the need for manual schema downloads or complex IDE configurations, making it the recommended
method for integrating schema validation into your workflow.

## Download the schema

```bash
ctx schema --download
```

This command will download the `json-schema.json` file to your current working directory. You can also find the
schema file in
the [GitHub repository](https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json)

## Configure your IDE

### PhpStorm/IntelliJ IDEA

Add the `json-schema.json` file
or [url](https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json) to your
project and associate it with your `context.yaml` or `context.json` file.

### VS Code

Add the following to your `settings.json`:

```json
{
  "json.schemas": [
    {
      "fileMatch": [
        "context.json",
        "context.yaml"
      ],
      "url": "https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json"
    }
  ]
}
```