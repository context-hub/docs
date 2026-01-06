# Git Diff Source

The source allows you to include changes from Git commits, providing a streamlined way to show recent code changes:

```yaml
documents:
  - description: Recent Git Changes
    outputPath: docs/recent-changes.md
    sources:
      - type: git_diff
        description: Recent Git Changes
        commit: last
        filePattern: "*.php"
        notPath:
          - tests
          - vendor
        path: src
        contains: class
        notContains: "@deprecated"
        render:
          strategy: llm
          showStats: true
          showLineNumbers: true
          contextLines: 5
```

## Parameters

| Parameter     | Type           | Default    | Description                                                |
|---------------|----------------|------------|------------------------------------------------------------|
| `type`        | string         | required   | Must be `"git_diff"`                                       |
| `description` | string         | `""`       | Human-readable description of the source                   |
| `repository`  | string         | `"."`      | Path to the git repository                                 |
| `commit`      | string         | `"staged"` | Git commit range or preset                                 |
| `filePattern` | string\|array  | `"*.*"`    | File pattern(s) to match                                   |
| `notPath`     | array          | `[]`       | Patterns to exclude files                                  |
| `path`        | string\|array  | `[]`       | Patterns to include only files in specific paths           |
| `contains`    | string\|array  | `[]`       | Patterns to include only files containing specific content |
| `notContains` | string\|array  | `[]`       | Patterns to exclude files containing specific content      |
| `render`      | object\|string | see below  | Configuration for rendering diffs                          |
| `showStats`   | boolean        | `true`     | **Deprecated:** Use `render.showStats` instead             |
| `modifiers`   | array          | `[]`       | Content modifiers to apply                                 |
| `tags`        | array          | []         | List of tags for this source                               |

## Render Configuration

The `render` parameter allows you to control how diffs are displayed. It can be either a string (for simple strategy
selection) or an object with detailed configuration:

```yaml
# Simple form - just specify the strategy
render: llm

# Full configuration form
render:
  strategy: llm  # 'llm' or 'raw'
  showStats: true
  showLineNumbers: true
  contextLines: 3
```

| Render Option     | Type    | Default | Description                                    |
|-------------------|---------|---------|------------------------------------------------|
| `strategy`        | string  | `"raw"` | Rendering strategy: `"raw"` or `"llm"`         |
| `showStats`       | boolean | `true`  | Whether to show file stats in the output       |
| `showLineNumbers` | boolean | `false` | Whether to show line numbers in diff output    |
| `contextLines`    | integer | `3`     | Number of context lines to show around changes |

### Render Strategies

- **raw**: Standard git diff output with `+/-` notation
- **llm**: Enhanced diff format optimized for readability by both humans and LLMs. Uses semantic tags for additions and
  removals.

## Commit Range Presets

Supports many convenient presets for `commit` parameter:

```yaml
documents:
  - description: Last Week's Changes
    outputPath: docs/last-week.md
    sources:
      - type: git_diff
        commit: last-week
        filePattern: "*.php"
```

| Preset                | Description                          | Git Command Equivalent                 |     |
|-----------------------|--------------------------------------|----------------------------------------|-----|
| `"last"`              | Last commit                          | `HEAD~1..HEAD`                         |     |
| `"last-2"`            | Last 2 commits                       | `HEAD~2..HEAD`                         |     |
| `"last-3"`            | Last 3 commits                       | `HEAD~3..HEAD`                         |     |
| `"last-5"`            | Last 5 commits                       | `HEAD~5..HEAD`                         |     |
| `"last-10"`           | Last 10 commits                      | `HEAD~10..HEAD`                        |     |
| `"today"`             | Changes from today                   | `HEAD@{0:00:00}..HEAD`                 |     |
| `"last-24h"`          | Changes in last 24 hours             | `HEAD@{24.hours.ago}..HEAD`            |     |
| `"yesterday"`         | Changes from yesterday               | `HEAD@{1.days.ago}..HEAD@{0.days.ago}` |     |
| `"last-week"`         | Changes from last week               | `HEAD@{1.week.ago}..HEAD`              |     |
| `"last-2weeks"`       | Changes from last 2 weeks            | `HEAD@{2.weeks.ago}..HEAD`             |     |
| `"last-month"`        | Changes from last month              | `HEAD@{1.month.ago}..HEAD`             |     |
| `"last-quarter"`      | Changes from last quarter            | `HEAD@{3.months.ago}..HEAD`            |     |
| `"last-year"`         | Changes from last year               | `HEAD@{1.year.ago}..HEAD`              |     |
| `"unstaged"`          | Unstaged changes                     | `` (empty string)                      |     |
| `"staged"`            | Staged changes                       | `--cached`                             |     |
| `"wip"`               | Work in progress (last commit)       | `HEAD~1..HEAD`                         |     |
| `"main-diff"`         | Changes since diverging from main    | `main..HEAD`                           |     |
| `"master-diff"`       | Changes since diverging from master  | `master..HEAD`                         |     |
| `"develop-diff"`      | Changes since diverging from develop | `develop..HEAD`                        |     |
| `"stash"`             | Latest stash                         | `stash@{0}`                            |     |
| `"stash-last"`        | Latest stash                         | `stash@{0}`                            |     |
| `"stash-1"`           | Second most recent stash             | `stash@{1}`                            |     |
| `"stash-2"`           | Third most recent stash              | `stash@{2}`                            |     |
| `"stash-3"`           | Fourth most recent stash             | `stash@{3}`                            |     |
| `"stash-all"`         | All stashes                          | `stash@{0}..stash@{100}`               |     |
| `"stash-latest-2"`    | Latest 2 stashes                     | `stash@{0}..stash@{1}`                 |     |
| `"stash-latest-3"`    | Latest 3 stashes                     | `stash@{0}..stash@{2}`                 |     |
| `"stash-latest-5"`    | Latest 5 stashes                     | `stash@{0}..stash@{4}`                 |     |
| `"stash-before-pull"` | Stash with "before pull" in message  | `stash@{/before pull}`                 |     |
| `"stash-wip"`         | Stash with "WIP" in message          | `stash@{/WIP}`                         |     |
| `"stash-untracked"`   | Stash with "untracked" in message    | `stash@{/untracked}`                   |     |
| `"stash-index"`       | Stash with "index" in message        | `stash@{/index}`                       |     |

## Advanced Commit Specifications

You can use more specific Git expressions:

## Specific commit hash

```yaml
documents:
  - description: Specific Commit Changes
    outputPath: docs/specific-commit.md
    sources:
      - type: git_diff
        repository: .
        commit: abc1234
        filePattern: "*.php"
```

## Specific file in commit

```yaml
documents:
  - description: Specific File Changes
    outputPath: docs/file-changes.md
    sources:
      - type: git_diff
        repository: .
        commit: abc1234:path/to/file.php
        filePattern: "*.php"
```

## Version comparison

```yaml
documents:
  - description: Version Diff
    outputPath: docs/version-diff.md
    sources:
      - type: git_diff
        repository: .
        commit: v1.0.0..v2.0.0
        filePattern: "*.php"
```

## Date-based commit

```yaml
documents:
  - description: Changes Since Date
    outputPath: docs/since-date.md
    sources:
      - type: git_diff
        repository: .
        commit: since:2023-01-15
        filePattern: "*.php"
```

## Specific date commit

```yaml
documents:
  - description: Changes On Date
    outputPath: docs/on-date.md
    sources:
      - type: git_diff
        repository: .
        commit: date:2023-01-15
        filePattern: "*.php"
```
