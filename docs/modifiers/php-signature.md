# PHP Signature Modifier

Extracts PHP class signatures without implementation details.

**Identifier**: `"php-signature"`

```yaml
documents:
  - description: API Documentation
    outputPath: docs/api.md
    sources:
      - type: file
        description: API Source Files
        sourcePaths:
          - src/Api
        filePattern: "*.php"
        modifiers:
          - php-signature
```

This modifier transforms:

```php
class Example 
{
    private $property;
    
    public function doSomething($param)
    {
        // Implementation...
        return $result;
    }
    
    private function helperMethod()
    {
        // Implementation...
    }
}
```

Into:

```php
class Example 
{
    public function doSomething($param) 
    {
        /* ... */
    }
}
```