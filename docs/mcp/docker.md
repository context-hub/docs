# Docker-Based CTX

CTX can be run in a Docker container, providing a consistent environment across different platforms and simplifying
deployment. This guide covers how to configure and use CTX in a Docker container, including integration with Claude's
MCP server.

## Benefits of Docker-Based Deployment

- **Cross-platform consistency**: Same behavior regardless of host OS
- **Simplified deployment**: No need to install dependencies on host systems
- **Multi-architecture support**: Works on both amd64 and arm64 architectures
- **CI/CD integration**: Easy to incorporate into pipeline workflows
- **Isolated environments**: Run different CTX versions side-by-side
- **Container orchestration**: Integrates with Kubernetes, Docker Swarm, etc.

## Using the Docker Image

### Pull the Docker Image

```bash
docker pull ghcr.io/context-hub/ctx:latest
```

### Run CTX Commands in Docker

To run CTX commands in Docker, you need to mount your project directory as a volume:

```bash
docker run --rm -v /path/to/your/project:/workspace ghcr.io/context-hub/ctx:latest <command> <options>
```

For example, to generate context in the current directory:

```bash
docker run --rm -v $(pwd):/workspace ghcr.io/context-hub/ctx:latest generate
```

## Integrating with Claude's MCP Server

To configure Claude's desktop app to use CTX in a Docker container as an MCP server, you'll need to modify the Claude
desktop configuration.

```json
{
  "mcpServers": {
    "ctx": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "/path/to/project:/workspace",
        "ghcr.io/context-hub/ctx:latest",
        "server",
        "-c",
        "/workspace"
      ]
    }
  }
}
```

#### Windows with WSL Configuration

```json
{
  "mcpServers": {
    "ctx": {
      "command": "bash.exe",
      "args": [
        "-c",
        "docker run --rm -i -v /path/to/project:/workspace ghcr.io/context-hub/ctx:latest server -c /workspace"
      ]
    }
  }
}
```

## Docker Compose Example

For more complex setups, you can use Docker Compose to manage your CTX deployment:

```yaml
# docker-compose.yml
version: '3'
services:
  ctx:
    image: ghcr.io/context-hub/ctx:latest
    volumes:
      - ./:/workspace
    environment:
      - GITHUB_PAT=${GITHUB_PAT}
      - MCP_FILE_OPERATIONS=true
    command: server -c /workspace
```
