# Modifiers

Modifiers transform source content before it's included in the final document, allowing you to clean up, simplify, or
enhance raw content to make it more useful for LLM contexts.

There are several built-in modifiers:

1. **PHP Signature Modifier** (`php-signature`): Extracts PHP class signatures without implementation details, useful
   for providing an API overview.

2. **PHP Content Filter Modifier** (`php-content-filter`): Selectively includes or excludes PHP class elements (methods,
   properties, constants) based on configurable criteria.

3. **Sanitizer Modifier** (`sanitizer`): Cleans up or obfuscates sensitive information in code before sharing it.

4. **PHP-Docs Modifier** (`php-docs`): Transforms PHP code into structured markdown documentation.

## Use Cases

### Code Simplification

When sharing complex codebases with LLMs, you often don't need implementation details

Using the `php-signature` modifier to strip method bodies from PHP classes, providing just the API surface (method
signatures, property declarations) to give LLMs a clearer understanding of your code structure without overwhelming them
with implementation details

### Sensitive Information Protection

Removing or obfuscating sensitive information like API keys, passwords, and other credentials

Using the `sanitizer` modifier with regex patterns to automatically replace API keys, database connection strings, and
other sensitive information with placeholders like `[REDACTED]`

### Documentation Generation

Transforming source code into more readable documentation formats

Using the `php-docs` modifier to convert PHP classes into structured markdown documentation with proper headings, method
descriptions from docblocks, and organized sections

### Selective Content Inclusion

Including only relevant parts of files to reduce noise and context size

Using the `php-content-filter` modifier to include only public methods while excluding private
implementation details when explaining an API to an LLM

### Structure Standardization

Ensuring consistent formatting of content from disparate sources

Applying modifiers to standardize formatting across files from different sources (local files, GitHub
repositories, URLs) for a consistent context document

### Focus Control for LLMs

Directing the LLM's attention to specific aspects of your code

Using modifiers to emphasize interfaces and public APIs while de-emphasizing implementation details,
helping the LLM focus on design patterns rather than specific algorithms

### Size Optimization

Reducing the overall size of context documents to fit within LLM token limits

Using multiple modifiers to strip comments, remove method bodies, and eliminate unused code,
significantly reducing the context size

### Teaching and Learning

Creating educational materials from source code

Using the `php-docs` modifier to transform complex classes into readable documentation for teaching
purposes or onboarding new developers

These modifiers effectively serve as filters and transformers that help bridge the gap between raw source code and the
optimized, focused content that works best when communicating with LLMs about code.

Would you like me to dive deeper into any particular use case or discuss implementation strategies for custom modifiers?