# Installation

We provide two versions of Context Generator:

- a native binary
- a PHAR file.

The native binary is the recommended version, because it does not require PHP to be installed on your system. You can
use it on Linux and MacOS.

The PHAR file can be used on any system with PHP 8.2 or higher.

## Using bash (Recommended)

### Requirements

- Linux,
- MacOS
- or Windows with or without WSL

The easiest way to install Context Generator is by using our installation script. This automatically downloads the
latest version and sets it up for immediate use.

```bash
# Install to /usr/local/bin (will be added to PATH in most Linux distributions)
curl -sSL https://raw.githubusercontent.com/context-hub/generator/main/download-latest.sh | sh
```

**What the script does**

- Detects the latest version
- Downloads the binary file from GitHub releases
- Installs it (`ctx`) to your bin directory (default: `/usr/local/bin`)
- Makes it executable

<br>

If you install to a system directory like `/usr/local/bin`, you probably need `sudo`:

```bash
curl -sSL https://raw.githubusercontent.com/context-hub/generator/main/download-latest.sh | sudo sh
```

> **Note**: When using `sudo`, to run the script, you may need use `sudo` to run the `ctx` command as well.

Install to a custom path to avoid using `sudo`:

```bash
curl -sSL https://raw.githubusercontent.com/context-hub/generator/main/download-latest.sh | sh -s $HOME/.local/bin
```

<br>

### Installation Location

**macOS:**

When installing ctx on macOS, the binary is installed to `~/.local/bin/ctx` by default. However, this directory may not be in your system's PATH, which can cause issues when using ctx with applications like Claude Desktop.

**Verifying Installation:**
```bash
which ctx
# Should output: /Users/yourusername/.local/bin/ctx
```

**Option 1: Use Full Path (Recommended for MCP)**

When configuring MCP servers in Claude Desktop or similar applications, use the full path to the ctx binary:
```json
{
  "mcpServers": {
    "ctx": {
      "command": "/Users/yourusername/.local/bin/ctx",
      "args": ["server", "-c", "/path/to/your/project"]
    }
  }
}
```

**Option 2: Add to System PATH**

To use `ctx` as a simple command everywhere, create a symlink in a system directory:
```bash
sudo ln -s ~/.local/bin/ctx /usr/local/bin/ctx
```

Or add `~/.local/bin` to your PATH by adding this line to `~/.zshrc` (or `~/.bash_profile` for bash):
```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload your shell:
```bash
source ~/.zshrc
```

**Note:** Applications like Claude Desktop may not inherit your shell's PATH. In such cases, using the full path in the configuration is the most reliable approach.

**Linux:**

On Linux, ctx is typically installed to `~/.local/bin/ctx` or `/usr/local/bin/ctx` depending on your installation method. The same PATH considerations apply as with macOS.

**Troubleshooting:**

If you encounter "command not found" errors:
1. Verify ctx is installed: `ls -la ~/.local/bin/ctx`
2. Check the binary is executable: `chmod +x ~/.local/bin/ctx`
3. Use the full path in your configuration
4. For shell usage, ensure `~/.local/bin` is in your PATH


---

<br>

After installation, you can use it by simply running the command to generate context:

```bash
ctx
```

## PHAR File

If you prefer to use a PHAR file, you can download the latest version from
the [GitHub releases page](https://github.com/context-hub/generator/releases)

## Requirements

- PHP 8.2 or higher
