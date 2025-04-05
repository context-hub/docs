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