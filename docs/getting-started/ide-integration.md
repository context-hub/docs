# IDE Integration

To get the best experience when working with Context Generator configuration files, you can use the JSON schema for
autocompletion and validation in your IDE:

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