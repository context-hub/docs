# LLM Integration: Smart Context Requesting

This guide explains how to leverage inline configuration—a method of providing JSON-based configuration directly in
command-line commands rather than separate configuration files—with the tool. This approach creates an
efficient workflow between LLMs and your codebase for context-gathering and problem-solving, enabling on-the-fly context
requests without the need for predefined configuration files.

## Getting Started

Before diving into advanced usage, you need to understand:

1. **JSON Schema**: The Context Generator uses a specific JSON structure to define what context to gather

> Link to the [JSON Schema](https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json)

2. **Project Structure**: Understanding your codebase organization helps in creating effective context requests

> **Note**: There is [Tree source](/sources/tree-source) that is designed to generate project structure

3. **Request Instructions**: Learning how to formulate context requests properly

## Understanding the LLM-Context workflow

The inline configuration feature enables a powerful workflow where LLMs can request precisely the context they need
through executable commands. This creates a feedback loop that significantly enhances the quality of assistance:

> **Note**: Read more about inline configuration in
> the [Command Reference](/getting-started/command-reference#inline-configuration) section.

1. **User asks a question** about their codebase
2. **LLM generates a context request** as an executable command
3. **User runs the command** to gather relevant context
4. **LLM receives the context** and provides a more informed answer

## Real-World Example Workflow

Here's a complete workflow example showing how an LLM and the Context Generator can work together:

1. **User Question**:

```
I'm getting an error in our payment processing system when handling refunds. 
The error says 'Invalid transactionstate'. How can I fix this?

Here is my project structure:

├── services/
│   └── payment/
│       └── app/
│           └── src/
│               └── Application/
│                   ├── RefundService.php
│                   ├── TransactionState.php
│                   └── PaymentProcessor.php

I attached JSON schema of Context generator. Use it to ask for the context you need to fix the issue in the following format:

ctx --inline='{
  "documents": [{
    "description": "Document description",
    "outputPath": "context.md",
    "sources": [{
      "type": "file",
      "sourcePaths": ["src"]
    }]
  }]
}'
```

2. **LLM Initial Response**:
   "I'll help troubleshoot this issue. To understand what's happening, I need to see the payment processing code,
   especially the parts related to refunds and transaction state management. Could you run this command to gather the
   relevant context?"

```bash
ctx --inline='{
  "documents": [{
    "description": "Payment Refund Processing",
    "outputPath": "payment-refund.md",
    "sources": [{
      "type": "file",
      "sourcePaths": ["src"],
      "filePattern": "*.php",
      "contains": "refund|transaction.*state|payment.*process"
    }]
  }]
}'
```

3. **User Executes Command** and shares the generated `.context/payment-refund.md` file.

4. **LLM Analysis**:
   "Based on the code you shared, I can see the issue. In the `RefundService.php` file, line 142, your code checks if
   the transaction is in the 'SETTLED' state, but it doesn't check for the 'PARTIALLY_SETTLED' state, which can also be
   valid for refunds..."

5. **LLM Solution**:
   "Here's how to fix the issue: modify the `validateRefundTransaction` method to also accept 'PARTIALLY_SETTLED' as a
   valid state for refunds..."

## Best Practices

### Optimizing Context Requests

1. **Be specific with your searches:**
    - Use precise file paths when you know the location
    - Combine `filePattern` with `contains` to narrow down results
    - Use regex patterns for more complex search needs

2. **Manage output size:**
    - Apply content modifiers to remove unnecessary details
    - Split large context needs into multiple focused requests
    - Use content filters to extract only relevant code sections

3. **Structure for readability:**
    - Use meaningful descriptions for each document
    - Group related files in the same document
    - Add text sources to provide explanatory notes

### Security Considerations

When working with sensitive codebases:

1. **Limit scope:** Only include necessary files and avoid exposing sensitive information
2. **Verify outputs:** Review generated context files before sharing with external LLMs
3. **Consider isolation:** For highly sensitive projects, consider running LLMs locally

## Conclusion

The combination of Context Generator's inline configuration and LLMs creates a powerful workflow that drastically
improves the efficiency of code assistance, troubleshooting, and development guidance. By enabling LLMs to request
precise context, you eliminate the need for lengthy explanations and manual code searching, leading to faster and more
accurate solutions.