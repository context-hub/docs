# Installation

We provide two versions of Context Generator: 
 - a native binary
 - a PHAR file. 

The native binary is the recommended version, because it does not require PHP to be installed on your system. You can 
use it on Linux and MacOS. 

The PHAR file can be used on any system with PHP 8.2 or higher.

## Using bash (Recommended)

### Requirements

- Linux or MacOS

The easiest way to install Context Generator is by using our installation script. This automatically downloads the
latest version and sets it up for immediate use.

```bash
# Install to /usr/local/bin (will be added to PATH in most Linux distributions)
curl -sSL https://raw.githubusercontent.com/butschster/context-generator/main/download-latest.sh | sh
```

**What the script does**

- Detects the latest version
- Downloads the binary file from GitHub releases
- Installs it (`ctx`) to your bin directory (default: `/usr/local/bin`)
- Makes it executable

After installation, you can use it by simply running the command to generate context:

```bash
ctx
```

## PHAR File

If you prefer to use a PHAR file, you can download the latest version from
the [GitHub releases page](https://github.com/butschster/context-generator/releases)

## Requirements

- PHP 8.2 or higher