# MCP Integration

The Research Module provides MCP (Model Context Protocol) tools for managing templates, research, and entries. These
tools enable Claude to orchestrate the complete research workflow automatically.

## Overview

Research Module exposes 9 MCP tools organized into three categories:

### Template Tools

- **research-templates-list** - Discover available research templates

### Research Tools

- **research-create** - Create new research project from template
- **researches-list** - Find existing research projects
- **research-get** - Load complete research context
- **research-update** - Modify research metadata and memory

### Entry Tools

- **research-entry-create** - Add new findings to research
- **research-entries** - List entries with filtering
- **research-entry-read** - Read full entry content
- **research-entry-update** - Modify existing entries

---

## Template Tools

### research-templates-list

**Purpose**: Discover what research templates are available in the system.

**When to Use**:

- Starting new research to find appropriate methodology
- Exploring available research types
- Verifying template exists before creating research

**Key Parameters**:

- `includeDetails` - Include full category and entry type information
- `nameContains` - Filter templates by name
- `tag` - Filter templates by tag

**Returns**: List of templates with names, descriptions, and tags. Optionally includes full template structure with
categories and entry types.

---

## Research Tools

### research-create

**Purpose**: Create a new research project based on a template.

**When to Use**:

- Starting new research investigation
- Beginning a new analysis project
- Initializing structured discovery process

**Key Parameters**:

- `templateId` - Template to use (required)
- `title` - Research name (required)
- `description` - What this research is about
- `tags` - Labels for organization
- `memory` - Initial context and instructions for AI

**What It Does**:

- Creates research directory structure
- Initializes `research.yaml` metadata file
- Creates category directories for entries
- Sets up research with specified memory blocks

**Important**: Template selection is permanent and cannot be changed after creation.

---

### researches-list

**Purpose**: Find and list existing research projects.

**When to Use**:

- Resuming work on existing research
- Finding research by status or tags
- Getting overview of all active research

**Key Parameters**:

- `status` - Filter by draft, active, published, or archived
- `template` - Filter by template type
- `tags` - Filter by research tags
- `nameContains` - Search in research names
- `limit` / `offset` - Control pagination

**Returns**: List of research projects with IDs, titles, status, and metadata. Does not include full entry list or
template details.

---

### research-get

**Purpose**: Load complete research context including template and metadata.

**When to Use**:

- Resuming research session (most important use case)
- Need full template prompt for AI consultation
- Reading research memory blocks
- Understanding research structure

**What It Returns**:

- Complete research metadata (title, description, status, tags)
- Research memory blocks (critical for context)
- Full template definition (categories, entry types, AI prompt)
- Research configuration

**Critical for Context Restoration**: This tool is essential when resuming research. It provides:

1. Template prompt that defines AI consultation methodology
2. Research memory with project-specific instructions
3. Research structure and progress information

---

### research-update

**Purpose**: Modify research metadata, status, and memory.

**When to Use**:

- Adding new memory entries during research
- Changing research status (draft → active → published)
- Updating research description or tags
- Managing entry directories

**Key Parameters**:

- `researchId` - Research to update (required)
- `title` - New title
- `description` - New description
- `status` - New status
- `tags` - Replace tags
- `memory` - Replace memory entries
- `entryDirs` - Replace entry directories

**Important Notes**:

- At least one field must be provided
- Array fields (tags, memory, entryDirs) replace entire array
- To add memory entry, must include existing + new entries

---

## Entry Tools

### research-entry-create

**Purpose**: Create a new entry (artifact/finding) in research.

**When to Use**:

- Capturing insights during research session
- Documenting findings from user responses
- Creating structured artifacts (personas, pain points, concepts, etc.)

**Key Parameters**:

- `researchId` - Research to add entry to (required)
- `category` - Workflow phase category (required)
- `entryType` - Type of artifact (required)
- `content` - Markdown content (required)
- `title` - Entry title (optional, auto-generated if not provided)
- `description` - Short summary for LLM (optional, auto-generated)
- `status` - Initial status (optional, uses entry type default)
- `tags` - Entry tags for filtering

**What It Does**:

- Creates markdown file with YAML frontmatter
- Saves to appropriate category directory
- Generates entry ID
- Sets creation timestamp
- Validates category, entry type, and status

**Display Name Resolution**: Tool accepts both internal keys and display names for user convenience:

- Category: `"needs_analysis"` or `"Needs Analysis"`
- Entry Type: `"pain_point"` or `"Pain Point"`
- Status: `"validated"` or `"Validated"`

**Validation**:

- Category must exist in template
- Entry type must exist in template
- Entry type must be allowed in the specified category
- Status must be valid for the entry type

---

### research-entries

**Purpose**: List entries in research with filtering options.

**When to Use**:

- Reviewing existing findings
- Filtering entries by category, type, or status
- Searching for specific content
- Getting overview of research progress

**Key Parameters**:

- `researchId` - Research to list entries from (required)
- Filters:
    - `category` - Filter by workflow phase
    - `entryType` - Filter by artifact type
    - `status` - Filter by entry status
    - `tags` - Filter by tags (any match)
    - `titleContains` - Search in titles
    - `descriptionContains` - Search in descriptions
    - `contentContains` - Search in full content
- `limit` / `offset` - Control pagination

**Returns**: List of entries with metadata (title, description, type, category, status, tags). Does **not** include full
content - use `research-entry-read` for that.

**Use Cases**:

- Find all validated pain points
- List entries needing review (status = draft)
- Search for specific topics in content
- Track progress through workflow phases

---

### research-entry-read

**Purpose**: Read complete entry content including full markdown body.

**When to Use**:

- Deep diving into specific entry
- Reviewing entry details for context restoration
- Reading findings to inform next questions
- Preparing entry for update

**Key Parameters**:

- `researchId` - Research containing entry (required)
- `entryId` - Entry to read (required)

**Returns**: Complete entry including:

- All metadata (title, description, type, category, status, tags)
- Full markdown content
- Timestamps (created, updated)

**Important**: Unlike `research-entries` which omits content, this tool provides the complete entry body.

---

### research-entry-update

**Purpose**: Update existing entry metadata, status, or content.

**When to Use**:

- Changing entry status as it progresses
- Adding or updating tags
- Editing entry content
- Updating title or description
- Find and replace in content

**Key Parameters**:

- `researchId` - Research containing entry (required)
- `entryId` - Entry to update (required)
- `title` - New title
- `description` - New description
- `content` - New content (replaces entire content)
- `status` - New status (must be valid for entry type)
- `tags` - Replace tags
- `textReplace` - Find and replace in content
    - `find` - Text to find
    - `replace` - Replacement text

**Important Notes**:

- At least one field must be provided
- Status must be valid for the entry's type
- Tags array replaces existing tags entirely
- Text replace applies to content field
- Display names accepted for status values

---

## Storage Structure

Research Module stores all data in the file system using YAML and Markdown formats.

### Directory Structure

```
.researches/                          # All research projects
└── research_abc123_ctx-feature-discovery/
    ├── research.yaml                 # Research metadata
    ├── audience_research/            # Category directory
    │   ├── entry_001.md             # Entry file
    │   ├── entry_002.md
    │   └── .gitkeep
    ├── needs_analysis/               # Category directory
    │   ├── entry_003.md
    │   ├── entry_004.md
    │   └── .gitkeep
    └── feature_ideation/             # Category directory
        ├── entry_005.md
        └── .gitkeep

.templates/                           # Template definitions
├── feature_discovery.yaml
├── market_research.yaml
└── architecture_design.yaml
```

### Research File (research.yaml)

Contains research metadata, configuration, and memory blocks. Stored at research root.

**Key Fields**:

- `id` - Unique research identifier
- `name` - Research title
- `description` - What this research is about
- `template` - Template key (immutable)
- `status` - Current status (draft, active, published, archived)
- `tags` - Research tags
- `entry_dirs` - Category directories
- `memory` - AI context and instructions

### Entry File (entry_xyz.md)

Contains entry content with YAML frontmatter. Stored in category directories.

**Frontmatter Fields**:

- `entry_id` - Unique entry identifier
- `title` - Entry title
- `description` - Short summary
- `entry_type` - Type of artifact
- `category` - Workflow phase
- `status` - Current status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `tags` - Entry tags

**Content**: Markdown body below frontmatter

---

## Context Restoration Pattern

When resuming research, the orchestrator follows this critical pattern:

### 1. Find Research

Use `researches-list` to find active or relevant research projects.

### 2. Load Full Context

Use `research-get` to load:

- Template prompt (defines AI consultation methodology)
- Research memory blocks (project-specific instructions)
- Research metadata and structure

### 3. Review Existing Entries

Use `research-entries` to get overview of existing findings and progress.

### 4. Read Priority Entries

Use `research-entry-read` for deep dive into relevant entries that inform next questions.

### 5. Continue Research

With full context loaded, AI can effectively continue research following template methodology.

### Why This Matters

**Context restoration is critical** because:

- Template prompt defines how AI should conduct research
- Memory blocks contain essential project-specific instructions
- Existing entries show what's been discovered
- Progress tracking identifies what phase comes next

Without full context restoration, AI cannot maintain research continuity.

---

## Display Name Resolution

All tools accept both internal keys and human-readable display names for user convenience:

### Categories

- Internal key: `"needs_analysis"`
- Display name: `"Needs Analysis"`
- Both accepted by tools

### Entry Types

- Internal key: `"pain_point"`
- Display name: `"Pain Point"`
- Both accepted by tools

### Statuses

- Internal value: `"validated"`
- Display name: `"Validated"`
- Both accepted by tools

This allows natural user interaction without memorizing internal keys.

---

## Best Practices

### Always Load Context When Resuming

- Use `research-get` before continuing research
- Read memory blocks explicitly
- Review existing entries for context
- Understand current progress

### Use Filters Effectively

- Filter entries by category to focus on current phase
- Filter by status to find items needing work
- Use tags for cross-cutting themes
- Use `contentContains` for searching

### Validate Before Creating

- Check category exists in template
- Verify entry type allowed in category
- Confirm status valid for entry type

### Minimize Tool Calls

- List entries once, filter in memory if needed
- Update multiple fields in single call
- Batch operations when possible

### Leverage Display Names

- Use human-readable names for user-facing interactions
- System handles resolution to internal keys
- More natural conversation flow

---

## Common Use Cases

### Starting New Research

1. `research-templates-list` - Find appropriate template
2. `research-create` - Initialize research with memory
3. Begin consultation following template methodology

### Resuming Research

1. `researches-list` - Find active research
2. `research-get` - Load full context
3. `research-entries` - Review existing findings
4. `research-entry-read` - Deep dive into priority entries
5. Continue research with full context

### Progress Tracking

1. `research-entries` with status filters
2. Identify draft entries needing review
3. Update statuses as entries progress
4. Track completion through workflow phases

### Finalizing Research

1. `research-entries` to find unfinished entries
2. `research-entry-update` to finalize statuses
3. `research-update` to mark research as published

---

## Next Steps

- **[Getting Started Guide](getting-started.md)** - Learn how to use these tools in practice
- **[Domain Entities](entities.md)** - Understand templates, research, and entries
- **[Best Practices](best-practices.md)** - Recommended patterns and workflows