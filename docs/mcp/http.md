# HTTP Server Configuration

The MCP server can run in HTTP mode with SSE (Server-Sent Events) support, enabling remote access and web-based
integrations. This mode is ideal for scenarios where stdio transport isn't suitable or when you need to access the MCP
server from different applications or network locations.

## Table of Contents

- [When to Use HTTP Mode](#when-to-use-http-mode)
- [Starting the HTTP Server](#starting-the-http-server)
- [Configuration Options](#configuration-options)
- [Environment Variables](#environment-variables)
- [OAuth Authentication](#oauth-authentication)
- [CORS Configuration](#cors-configuration)
- [Security Considerations](#security-considerations)

## When to Use HTTP Mode

Use HTTP server mode when you need:

- **Remote Access**: Access the MCP server from different machines or containers
- **Web Integration**: Integrate with web applications or browser-based tools
- **Multiple Clients**: Allow multiple clients to connect simultaneously
- **Custom Transport**: Build custom clients that communicate over HTTP
- **Network Isolation**: Run the server in a separate network segment or container

## Starting the HTTP Server

To start the MCP server in HTTP mode with SSE support:

```bash
ctx server --sse --host 127.0.0.1 --port 8080 -c /path/to/project
```

### Command Options

- `--sse`: Enable SSE (Server-Sent Events) transport mode
- `--host`: Host address to bind to (default: `127.0.0.1`)
- `--port`: Port to bind to (default: `8080`)
- `-c, --config-file`: Path to project configuration file

### Example Configurations

**Local development:**

```bash
ctx server --sse -c /path/to/project
```

**Custom host and port:**

```bash
ctx server --sse --host 0.0.0.0 --port 3000 -c /path/to/project
```

**Production with environment file:**

```bash
ctx server --sse -c /path/to/project -e .env.production
```

## Configuration Options

### Transport Mode

The server automatically configures transport based on the `--sse` flag:

- **Without `--sse`**: Uses stdio transport (default for Claude Desktop)
- **With `--sse`**: Uses HTTP transport with SSE support

### Session Management

Configure session handling via environment variables:

```bash
# Session type: 'array' (in-memory) or 'cache' (persistent)
MCP_SESSION_TYPE=array

# Session TTL in seconds
MCP_SESSION_TTL=3600

# Garbage collection interval in seconds
MCP_SESSION_GC_INTERVAL=300
```

### Cache Configuration

```bash
# Cache type: 'array' (in-memory) or 'file' (persistent)
MCP_CACHE_TYPE=array
```

## Environment Variables

### Core Settings

| Variable        | Description                                    | Default     |
|-----------------|------------------------------------------------|-------------|
| `MCP_TRANSPORT` | Transport type (`stdio`, `http`, `streamable`) | `stdio`     |
| `MCP_HOST`      | Server host address                            | `127.0.0.1` |
| `MCP_PORT`      | Server port                                    | `8080`      |
| `MCP_PATH`      | MCP endpoint path                              | `/mcp`      |

### Server Configuration

| Variable             | Description                  | Default             |
|----------------------|------------------------------|---------------------|
| `MCP_SERVER_NAME`    | Server name shown to clients | `Spiral MCP Server` |
| `MCP_SERVER_VERSION` | Server version               | `1.0.0`             |
| `MCP_INSTRUCTIONS`   | Optional server instructions | -                   |

### Feature Toggles

| Variable                 | Description                   | Default |
|--------------------------|-------------------------------|---------|
| `MCP_ENABLE_TOOLS`       | Enable tools capability       | `true`  |
| `MCP_ENABLE_RESOURCES`   | Enable resources capability   | `true`  |
| `MCP_ENABLE_PROMPTS`     | Enable prompts capability     | `true`  |
| `MCP_ENABLE_LOGGING`     | Enable logging capability     | `true`  |
| `MCP_ENABLE_COMPLETIONS` | Enable completions capability | `true`  |

### Transport-Specific Settings

| Variable                   | Description                        | Default |
|----------------------------|------------------------------------|---------|
| `MCP_ENABLE_JSON_RESPONSE` | Enable JSON responses (streamable) | `true`  |
| `MCP_STATELESS`            | Enable stateless mode (streamable) | `false` |
| `MCP_TRUST_PROXY`          | Trust proxy headers                | `true`  |

### Pagination

| Variable               | Description            | Default |
|------------------------|------------------------|---------|
| `MCP_PAGINATION_LIMIT` | Maximum items per page | `50`    |

## OAuth Authentication

The HTTP server supports OAuth authentication for secure access control. This is particularly useful when exposing the
server to external networks.

### Configuration

Set up OAuth via environment variables or `.env` file:

```bash
# Enable OAuth authentication
OAUTH_ENABLED=true

# OAuth client credentials
OAUTH_CLIENT_ID=your_client_id
OAUTH_CLIENT_SECRET=your_client_secret

# OAuth server URLs
OAUTH_ISSUER_URL=https://github.com
OAUTH_SERVER_URL=http://127.0.0.1:8080
```

### GitHub OAuth Integration

The server is pre-configured for GitHub OAuth:

```bash
OAUTH_ENABLED=true
OAUTH_CLIENT_ID=your_github_client_id
OAUTH_CLIENT_SECRET=your_github_client_secret
OAUTH_ISSUER_URL=https://github.com
```

### OAuth Endpoints

When OAuth is enabled, the following endpoints are available:

- `/.well-known/oauth-authorization-server` - OAuth metadata
- `/.well-known/oauth-protected-resource` - Protected resource metadata
- `/oauth/authorize` - Authorization endpoint (proxied)
- `/oauth/token` - Token endpoint (proxied)
- `/oauth/revoke` - Revocation endpoint (proxied)
- `/oauth/register` - Dynamic client registration (proxied)

### Custom OAuth Provider

To use a different OAuth provider, configure the appropriate endpoints:

```bash
OAUTH_ENABLED=true
OAUTH_CLIENT_ID=your_client_id
OAUTH_CLIENT_SECRET=your_client_secret
OAUTH_ISSUER_URL=https://your-oauth-provider.com
OAUTH_SERVER_URL=http://your-server:8080
```

## CORS Configuration

Configure Cross-Origin Resource Sharing for browser-based clients:

```bash
# Allowed origins (comma-separated or '*' for all)
MCP_CORS_ALLOWED_ORIGINS=*

# Allowed HTTP methods
MCP_CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS

# Allowed headers
MCP_CORS_ALLOWED_HEADERS=Content-Type,Authorization
```

### Examples

**Allow specific domains:**

```bash
MCP_CORS_ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com
```

**Restrict methods:**

```bash
MCP_CORS_ALLOWED_METHODS=GET,POST
```

**Custom headers:**

```bash
MCP_CORS_ALLOWED_HEADERS=Content-Type,Authorization,X-Custom-Header
```

## Security Considerations

### Network Exposure

**Local development:**

```bash
# Bind to localhost only
ctx server --sse --host 127.0.0.1 --port 8080
```

**Production deployment:**

```bash
# Bind to specific interface
ctx server --sse --host 192.168.1.100 --port 8080

# Or bind to all interfaces (ensure proper firewall rules)
ctx server --sse --host 0.0.0.0 --port 8080
```

### Authentication Best Practices

1. **Always enable OAuth in production:**
   ```bash
   OAUTH_ENABLED=true
   ```

2. **Use strong client secrets:**
    - Generate cryptographically secure secrets
    - Rotate secrets regularly
    - Never commit secrets to version control

3. **Restrict CORS origins:**
   ```bash
   # Avoid using '*' in production
   MCP_CORS_ALLOWED_ORIGINS=https://trusted-domain.com
   ```

### SSL/TLS Configuration

For production deployments, use a reverse proxy (nginx, Apache) or load balancer to handle SSL/TLS:

**Nginx example:**

```nginx
server {
    listen 443 ssl;
    server_name mcp.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Proxy Configuration

When running behind a reverse proxy, enable proxy awareness:

```bash
MCP_TRUST_PROXY=true
```

This allows the server to correctly interpret `X-Forwarded-*` headers for client IP addresses and protocols.

## Complete Example

Here's a complete example for a production deployment:

**.env.production:**

```bash
# Transport
MCP_TRANSPORT=http
MCP_HOST=127.0.0.1
MCP_PORT=8080
MCP_PATH=/mcp

# Server Info
MCP_SERVER_NAME=Production MCP Server
MCP_SERVER_VERSION=1.0.0

# OAuth
OAUTH_ENABLED=true
OAUTH_CLIENT_ID=your_secure_client_id
OAUTH_CLIENT_SECRET=your_secure_client_secret
OAUTH_ISSUER_URL=https://github.com
OAUTH_SERVER_URL=https://mcp.example.com

# CORS
MCP_CORS_ALLOWED_ORIGINS=https://app.example.com
MCP_CORS_ALLOWED_METHODS=GET,POST
MCP_CORS_ALLOWED_HEADERS=Content-Type,Authorization

# Security
MCP_TRUST_PROXY=true

# Session
MCP_SESSION_TYPE=cache
MCP_SESSION_TTL=7200
MCP_CACHE_TYPE=file

# Features
MCP_ENABLE_TOOLS=true
MCP_ENABLE_RESOURCES=true
MCP_ENABLE_PROMPTS=true
```

**Start command:**

```bash
ctx server --sse -c /path/to/project -e .env.production
```

## Architecture Overview

The HTTP server uses several key components:

### Bootstrap Components

- **MCPServerCommand** - Command-line entry point with configuration handling
- **HttpTransportBootloader** - Initializes HTTP transport, middleware, and OAuth components
- **McpServerCoreBootloader** - Core server infrastructure (session, cache, registry, dispatcher)

### Middleware Stack

The server processes requests through a middleware pipeline:

1. **LoggerMiddleware** - Request/response logging
2. **ExceptionHandlerMiddleware** - Global error handling
3. **CorsMiddleware** - CORS header management
4. **ProxyAwareMiddleware** - Proxy header interpretation
5. **McpAuthRouter** - OAuth authentication (if enabled)
6. **AuthMiddleware** - Request authentication

### Transport Modes

- **HttpServerTransport** - Standard HTTP with session management
- **StreamableHttpServerTransport** - SSE support with optional stateless mode
- **StdioServerTransport** - Standard I/O for Claude Desktop (default)

For more details on the internal architecture, see the [MCP Bootstrap](bootstrap.md) documentation.
