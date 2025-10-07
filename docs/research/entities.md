# Domain Entities

The Research Module operates with three core entities that work together to provide a structured research experience.

## Overview

- **[Template](#template)** - Reusable blueprint defining research structure and AI behavior
- **[Research](#research)** - Active project instance containing data and context
- **[Entry](#entry)** - Individual artifact or finding within a research

---

## Template

**Definition**: A reusable blueprint that defines research structure, workflow phases, entry types, and AI behavior for
a specific domain or methodology.

**Purpose**: Templates provide consistency, guide users through proven methodologies, and configure AI behavior for
domain-specific consultation.

### Template Structure

Templates are stored as YAML files in the `.templates` directory:

```yaml
key: feature_discovery              # Unique identifier
name: Product Feature Discovery     # Human-readable name
description: Systematic feature discovery through customer needs analysis
tags:
  - product-management
  - discovery

categories: # Workflow phases
  - name: audience_research
    display_name: Target Audience Research
    entry_types:
      - persona
      - segment_analysis

  - name: needs_analysis
    display_name: Needs & Problems Analysis
    entry_types:
      - pain_point
      - job_to_be_done

  - name: feature_ideation
    display_name: Feature Ideation
    entry_types:
      - feature_concept
      - user_story

entry_types: # Artifact definitions
  persona:
    display_name: User Persona
    content_type: text/markdown
    default_status: draft
    statuses:
      - display_name: Draft
        value: draft
      - display_name: Validated
        value: validated
      - display_name: Published
        value: published

  pain_point:
    display_name: Pain Point
    content_type: text/markdown
    default_status: draft
    statuses:
      - display_name: Draft
        value: draft
      - display_name: Validated
        value: validated
      - display_name: Prioritized
        value: prioritized
      - display_name: Addressed
        value: addressed

  feature_concept:
    display_name: Feature Concept
    content_type: text/markdown
    default_status: idea
    statuses:
      - display_name: Idea
        value: idea
      - display_name: Evaluated
        value: evaluated
      - display_name: Approved
        value: approved
      - display_name: In Development
        value: in_development

prompt: |                           # AI system instructions
  You are a strategic product manager specializing in feature discovery.

  Your role is to guide users through systematic feature discovery by:
  1. Understanding their target audience deeply
  2. Uncovering real user problems and jobs-to-be-done
  3. Generating feature concepts that address genuine needs

  Conduct discovery sessions using strategic questioning:
  - Ask one thoughtful question at a time
  - Encourage detailed, specific answers
  - Use voice dictation for rich responses
  - Synthesize answers into structured entries

  For each category, follow this approach:

  ## Audience Research
  - Who are the primary users?
  - What are their technical backgrounds?
  - What tools do they currently use?
  - What frustrates them about existing solutions?

  ## Needs Analysis
  - What specific problems do they face?
  - What jobs are they trying to get done?
  - What's the impact of these problems?
  - How do they work around limitations today?

  ## Feature Ideation
  - What features would solve these problems?
  - How would features integrate with workflows?
  - What makes this better than alternatives?
  - What's the minimal viable version?
```

### Key Components

#### Categories

Workflow phases that structure the research progression:

- **Purpose**: Organize research into logical stages
- **Structure**: Sequential phases like Research → Analysis → Planning
- **Entry Types**: Each category specifies which entry types are allowed
- **Example**: `audience_research` → `needs_analysis` → `feature_ideation`

#### Entry Types

Specific artifact types that can be created:

- **Purpose**: Define what kind of content can be captured
- **Display Name**: Human-readable name shown to users
- **Content Type**: MIME type (typically `text/markdown`)
- **Default Status**: Initial status for new entries
- **Statuses**: Lifecycle stages specific to this entry type
- **Examples**: User Persona, Pain Point, Feature Concept, Technical Decision

#### Statuses

Lifecycle stages for each entry type:

- **Purpose**: Track entry maturity and workflow progress
- **Type-Specific**: Each entry type has its own status progression
- **Examples**:
    - **Pain Point**: Draft → Validated → Prioritized → Addressed
    - **Feature Concept**: Idea → Evaluated → Approved → In Development
    - **Persona**: Draft → Validated → Published

#### Prompt

System instructions that define AI behavior:

- **Purpose**: Configure AI consultation methodology
- **Content**: Role definition, workflow guidance, question strategies
- **Scope**: Applies to all research sessions using this template
- **Best Practice**: Include domain frameworks and specific methodologies

### Template File Location

```
.templates/
├── feature_discovery.yaml
├── market_research.yaml
├── architecture_design.yaml
└── strategic_planning.yaml
```

### Creating Templates

Templates can be created:

1. **Manually**: Write YAML file following the structure above
2. **With Template Generator**: Use dedicated Claude project with template generation instructions
3. **From Examples**: Copy and modify existing templates

**See**: [Generate Research Template](getting-started.md#step-2-generate-template) for detailed instructions.

---

## Research

**Definition**: A project instance created from a template that contains actual research data, entries, and context.

**Purpose**: Research represents an active investigation or analysis project with its own context, memory, and
collection of findings.

### Research Structure

Research is stored as `research.yaml` file in the research directory:

```yaml
id: research_abc123
name: CTX Feature Discovery Q1 2025
description: Identifying next major features for CTX context generator
template: feature_discovery
status: active
tags:
  - ctx
  - product
  - q1-2025
  - developer-tools
entry_dirs:
  - audience_research
  - needs_analysis
  - feature_ideation
memory:
  - Conduct sessions in Russian for natural conversation flow
  - Focus on PHP developer audience, specifically Laravel users
  - Target users already work with AI tools (Claude, Cursor, GitHub Copilot)
  - Priority on developer productivity and context management features
  - Document findings in English for team accessibility
```

### Key Attributes

#### Template

- **Purpose**: Links research to its methodology blueprint
- **Value**: Template key (e.g., `feature_discovery`)
- **Immutable**: Cannot be changed after research creation
- **Effect**: Determines available categories, entry types, and AI behavior

#### Memory Blocks

Critical for context restoration. Project-specific AI instructions that supplement the template prompt:

**Language Preferences**:

```yaml
- Conduct discovery sessions in Russian for natural conversation
- Document all findings in English for team accessibility
```

**Domain Constraints**:

```yaml
- Focus on PHP developer audience, especially those using Laravel
- Consider integration with existing IDE workflows
- Target users already using AI coding assistants
```

**Methodology Preferences**:

```yaml
- Prioritize strategic questioning over rapid entry creation
- Aim for depth over breadth in initial discovery
- Use voice dictation for detailed responses
```

**Context Specifics**:

```yaml
- This is for CTX context generator tool
- Product serves developers who work with large codebases
- Key differentiator is intelligent context selection
```

#### Entry Directories

- **Purpose**: Map to template categories, organize findings
- **Structure**: One directory per category
- **Creation**: Automatically created when research is initialized
- **Content**: Contains entry markdown files

#### Status

Tracks research lifecycle:

- `draft` - Initial creation, still defining scope
- `active` - Actively conducting research
- `published` - Research completed, findings available
- `archived` - Historical reference, no longer active

#### Tags

Enable filtering and organization:

- **Purpose**: Cross-cutting categorization
- **Usage**: Filter research lists, group related projects
- **Examples**: `q1-2025`, `high-priority`, `customer-facing`, `technical`

### Research File Location

```
.researches/
└── research_abc123_ctx-feature-discovery/
    ├── research.yaml                 # Research metadata
    ├── audience_research/            # Category directory
    │   ├── entry_001.md
    │   ├── entry_002.md
    │   └── .gitkeep
    ├── needs_analysis/
    │   ├── entry_003.md
    │   ├── entry_004.md
    │   └── .gitkeep
    └── feature_ideation/
        ├── entry_005.md
        └── .gitkeep
```

### Creating Research

Research is created using MCP tools:

```
Tool: research-create
Parameters:
  - templateId: feature_discovery
  - title: CTX Feature Discovery Q1 2025
  - description: Identifying next major features
  - tags: [ctx, product, q1-2025]
  - memory: [<memory entries>]
```

**See**: [Create Research](getting-started.md#step-3-create-orchestrator) for detailed instructions.

---

## Entry

**Definition**: An individual artifact, document, or finding captured during research. Entries are categorized, typed,
and contain both structured metadata and content.

**Purpose**: Entries are the fundamental units of research output - they capture specific insights, analyses, or work
products in an organized, retrievable format.

### Entry Structure

Entries are stored as Markdown files with YAML frontmatter:

```markdown
---
entry_id: entry_xyz789
title: Developer Pain - Manual Context Gathering
description: Analysis of time wasted on manual context preparation for AI tools
entry_type: pain_point
category: needs_analysis
status: validated
created_at: 2025-01-15T10:30:00Z
updated_at: 2025-01-15T14:20:00Z
tags:
  - context-management
  - productivity
  - high-priority
---

# Developer Pain Point: Manual Context Gathering

## Problem Statement

Developers spend 15+ minutes per AI session manually gathering files, copying code snippets, and explaining project
context to tools like Claude or Cursor. This creates significant friction and reduces the value of AI assistance.

## Impact Analysis

- **Time Lost**: 15-30 minutes per session × 5-10 sessions per day = 2-5 hours daily
- **Context Quality**: Often incomplete due to time constraints, leading to suboptimal AI suggestions
- **Flow Disruption**: Breaks concentration and momentum during development
- **Inconsistency**: Different context each session leads to inconsistent AI responses

## Root Causes

1. No persistent memory of project structure
2. Manual file selection process
3. No automatic relevance detection
4. Copy-paste workflow interrupts coding flow

## User Quotes

> "Every time I want Claude's help, I spend more time copy-pasting files than actually getting answers. It's frustrating
because I know the AI could help, but the setup overhead makes me think twice." - Senior PHP Developer, Interview #7

> "I often skip using AI for quick questions because gathering context takes longer than just solving the problem
myself." - Laravel Developer, Survey Response #23

## Potential Solutions

1. **Automated Context Collection**: Tool that automatically identifies and includes relevant files based on:
    - Current working file
    - Recent git changes
    - Import/require statements
    - Project structure analysis

2. **Project-Aware Context Loading**: Persistent project understanding that remembers:
    - Architecture patterns
    - Key files and their purposes
    - Common workflows
    - Team conventions

3. **Intelligent Context Selection**: Smart algorithms that:
    - Prioritize recently modified files
    - Include dependencies automatically
    - Respect context size limits
    - Learn from user selections

## Priority Assessment

- **Impact**: High (affects daily workflow)
- **Frequency**: Very High (multiple times per day)
- **User Segment**: All developers using AI tools
- **Competitive Advantage**: Significant differentiator

## Next Steps

1. Validate with larger user sample
2. Prototype automatic context detection
3. Test with real Laravel projects
4. Measure time savings in pilot study
```

### Key Attributes

#### Entry ID

- **Format**: Unique identifier (e.g., `entry_xyz789`)
- **Generation**: Automatic on creation
- **Purpose**: Reference entries across research

#### Title

- **Source**: User-provided or auto-generated from content first line
- **Purpose**: Quick identification of entry content
- **Length**: Recommended 50-100 characters
- **Example**: "Developer Pain: Manual Context Gathering"

#### Description

- **Purpose**: Short summary for LLM understanding
- **Length**: Maximum 200 characters
- **Usage**: Quick scanning without reading full content
- **Generation**: User-provided or auto-generated from content
- **Example**: "Analysis of time wasted on manual context preparation for AI tools"

#### Entry Type

- **Purpose**: Defines what kind of artifact this is
- **Validation**: Must match template's defined entry types
- **Examples**: `persona`, `pain_point`, `feature_concept`, `technical_decision`
- **Effect**: Determines available statuses

#### Category

- **Purpose**: Places entry within research workflow phase
- **Validation**: Must match template categories
- **Constraint**: Entry type must be allowed in this category
- **Examples**: `audience_research`, `needs_analysis`, `feature_ideation`

#### Status

- **Purpose**: Tracks entry lifecycle within its type
- **Values**: Type-specific (e.g., Draft → Validated → Prioritized)
- **Validation**: Must be valid status for the entry type
- **Workflow**: Progresses as entry is refined and validated

#### Tags

- **Purpose**: Cross-cutting organization beyond category structure
- **Usage**: Filter entries, group related findings
- **Examples**: `high-priority`, `quick-win`, `technical-debt`, `customer-request`
- **Flexibility**: Can be added or removed at any time

#### Content

- **Format**: Markdown
- **Location**: Below YAML frontmatter
- **Structure**: Freeform, but follows entry type conventions
- **Best Practice**: Use clear sections, quotes, data, and actionable insights

### Entry File Location

```
.researches/research_abc123_ctx-feature-discovery/
└── needs_analysis/
    └── entry_xyz789.md
```

File naming: `entry_<entry_id>.md`

### Creating Entries

Entries are created using MCP tools during research sessions:

```
Tool: research-entry-create
Parameters:
  - researchId: research_abc123
  - category: needs_analysis
  - entryType: pain_point
  - content: <markdown content>
  - title: <optional>
  - description: <optional>
  - tags: [<optional>]
```

**See**: [Conduct Research](getting-started.md#step-4-conduct-research) for detailed instructions.

### Entry Generation Pattern

1. **AI asks strategic questions** during session
2. **User provides detailed answers** (preferably via voice dictation)
3. **AI synthesizes answers** into structured entries
4. **Entries are automatically saved** as Markdown files with frontmatter
5. **Entries become reference material** for future sessions

### Entry Lifecycle

```
Create (draft) 
    ↓
Work In Progress
    ↓
Review & Validate
    ↓
Complete
    ↓
Published/Archived
```

Specific lifecycle depends on entry type status definitions in template.

---

## Relationships

### Template → Research

- **One to Many**: One template can create multiple research projects
- **Immutable**: Research template cannot be changed after creation
- **Inheritance**: Research inherits categories, entry types, and AI behavior from template

### Research → Entries

- **One to Many**: One research contains multiple entries
- **Organization**: Entries organized into categories (directories)
- **Validation**: Entry types must match template definitions
- **Context**: Entries share research memory and context

### Template → Entry Types

- **Definition**: Template defines available entry types
- **Constraints**: Entry types specify allowed statuses
- **Validation**: Entries must use defined types and statuses

### Category → Entry Types

- **Allowlist**: Categories specify which entry types are allowed
- **Validation**: System enforces category-type compatibility
- **Organization**: Logical grouping of related entry types

---

## Next Steps

- **[Getting Started Guide](getting-started.md)** - Step-by-step instructions to create and use research
- **[MCP Integration](mcp.md)** - Technical details and tool reference
- **[Best Practices](best-practices.md)** - Recommended patterns and workflows