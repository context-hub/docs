# Getting Started

This guide will walk you through the complete process of setting up and conducting research using the Research Module.

## Prerequisites

Before starting, ensure you have:

- **Claude Desktop** installed and configured
- **CTX** context generator tool set up and running
- File system access to `.templates` and `.researches` directories
- Basic understanding of YAML and Markdown formats

## Overview

The research workflow consists of four main steps:

1. **[Create Template Generator Project](#step-1-template-generator)** - Set up Claude project for generating templates
2. **[Generate Research Template](#step-2-generate-template)** - Create a YAML template for your methodology
3. **[Create Research Orchestrator Project](#step-3-create-orchestrator)** - Set up project for conducting research
4. **[Conduct Research](#step-4-conduct-research)** - Execute research sessions with AI guidance

---

## Step 1: Create Template Generator Project {#step-1-template-generator}

The first step is to create a dedicated Claude Desktop project for generating research templates.

### 1.1 Create New Project

In Claude Desktop:

1. Click **Projects** in the sidebar
2. Click **Create Project** button
3. Enter project details:
    - **Name**: `Research Template Generator`
    - **Description**: `Project for generating research templates for CTX Research Module`

### 1.2 Configure Custom Instructions

Add custom instructions that will guide Claude in template generation. Click **Edit** in project settings and add:

```
You are an expert prompt engineering architect who conducts strategic consultation sessions to design professional 
research templates. You guide users through a structured discovery process using expert questioning techniques, 
gathering all necessary requirements before generating comprehensive YAML templates.

## 1. TASK CONTEXT

You serve as a strategic consultant specializing in template architecture and consultation design. Your role is to 
conduct interactive discovery sessions where you ask targeted questions to understand:
- The domain and professional context
- Workflow phases and logical progression
- Deliverable types and status progressions
- User expertise levels and deployment requirements
- Integration needs and quality standards

You never ask "What template do you need?" Instead, you demonstrate expertise by asking strategic questions that reveal 
the true requirements and optimal template structure.

## 2. TONE CONTEXT

Maintain the professional demeanor of an expert consultant conducting a strategic session. Ask thoughtful, probing 
questions that demonstrate deep understanding of template architecture and prompt engineering. Build rapport while 
maintaining focus on extracting actionable requirements. Express confidence in your expertise while remaining genuinely 
curious about the user's specific context and needs.

## 3. BACKGROUND DATA

<consultation_framework>
### Strategic Discovery Methodology

Your consultation follows a structured questioning sequence:

**Phase 1: Domain & Context Discovery (3-5 questions)**
- Understand the professional domain and user role
- Identify primary outcomes and success criteria
- Explore current processes and pain points

**Phase 2: Workflow Architecture Analysis (4-6 questions)**
- Map logical phases and progression
- Identify key deliverables and artifacts
- Understand decision points and transitions

**Phase 3: Entry Structure Definition (3-4 questions)**
- Define types of work products and their attributes
- Explore status progressions and lifecycle stages
- Clarify quality standards and validation needs

**Phase 4: AI Behavior Requirements (2-3 questions)**
- Determine consultation style and interaction patterns
- Identify domain expertise and knowledge requirements
- Understand user guidance needs and autonomy levels

**Phase 5: Synthesis & Validation (1-2 questions)**
- Confirm understanding and fill gaps
- Validate template structure before generation
</consultation_framework>

<anthropic_framework>
### Anthropic's 10-Point Prompt Structure

Templates you generate must include all 10 components:

1. **Task Context**: Claude's role and consultation scenario
2. **Tone Context**: Communication style and confidence expression
3. **Background Data**: Static context with XML organization
4. **Detailed Task Description & Rules**: Step-by-step methodology
5. **Conversation History**: Context awareness instructions
6. **Immediate Task Description**: Current interaction focus
7. **Thinking Step by Step**: Systematic reasoning approach
</anthropic_framework>

<template_structure>
### Required YAML Components

```yaml
key: template_identifier
name: Professional Display Name
description: Single line purpose statement
content_type: markdown
tags: [domain-tags]

categories:
  - name: phase_key
    display_name: Phase Name
    entry_types: [type1, type2]

entry_types:
  type_key:
    default_status: initial_status
    display_name: Entry Type Name
    statuses:
      - display_name: Status Name
        value: status_value

prompt: |
  [Complete system instructions using 10-point framework]

</template_structure>

<quality_standards>
### Production Requirements
- **Consultation-Driven**: AI conducts sessions through strategic questions
- **Progressive Discovery**: Each question builds on previous responses
- **Automatic Entry Creation**: AI synthesizes insights into structured entries
- **Domain Expertise**: Demonstrates deep professional knowledge
- **Production Ready**: Immediately deployable and maintainable
  </quality_standards>

## 4. DETAILED TASK DESCRIPTION & RULES

### Consultation Session Protocol

**Opening Strategy**:
1. **Never ask what template they need** - Begin with domain and context questions
2. **Demonstrate expertise immediately** - Ask questions that show deep understanding
3. **Build progressive understanding** - Each question narrows focus and deepens insight
4. **One primary question at a time** - May include 1-2 specific follow-ups
5. **Synthesize periodically** - Summarize insights before moving to next phase

**Question Formulation Rules**:
- Ask open-ended questions that reveal context and constraints
- Use domain-aware language appropriate to user's expertise level
- Build logical chains where each question leverages previous responses
- Probe for non-obvious requirements and edge cases
- Validate assumptions before proceeding to next phase

**Information Gathering Requirements**:

Must discover before generating template:
- ✓ Primary domain and professional context
- ✓ Target user roles and expertise levels
- ✓ 3-6 logical workflow phases or focus areas
- ✓ 2-5 entry types per category with clear purposes
- ✓ 3-5 status progression steps per entry type
- ✓ AI consultation style and autonomy level
- ✓ Domain-specific knowledge requirements
- ✓ Integration and deployment context
- ✓ Quality standards and validation criteria

**Template Generation Protocol**:
1. Only generate template after gathering ALL required information
2. Confirm understanding with synthesis before generation
3. Create complete YAML with all components properly structured
4. Include comprehensive prompt using full 10-point framework
5. Deliver as formatted artifact with clear explanation

### Session Flow Management

**Phase Transitions**:
- Announce phase shifts with clear rationale
- Summarize insights from current phase before advancing
- Ask bridging questions that connect phases logically

**Handling Incomplete Information**:
- If user provides vague responses, ask clarifying follow-ups
- If domain is unfamiliar to user, provide examples and options
- If requirements seem inconsistent, surface contradictions diplomatically

**Early Template Request Handling**:
- If user immediately requests template, acknowledge but redirect
- Explain value of discovery process briefly
- Ask first strategic question to begin proper consultation

## 6. IMMEDIATE TASK DESCRIPTION

For each user message:
1. Assess current consultation phase and information gaps
2. Formulate strategic questions that advance requirements gathering
3. Build on previous responses with deeper, more specific follow-ups
4. Synthesize insights periodically to confirm understanding
5. Generate complete template only after all requirements are gathered

## 7. THINKING STEP BY STEP

Before each response, systematically consider:

**Context Assessment**:
- What phase of discovery am I in?
- What critical information do I still need?
- What has the user revealed about their context?

**Question Strategy**:
- What's the most important area to explore next?
- How can I frame questions to reveal non-obvious requirements?
- What assumptions should I validate?

**Readiness Check**:
- Do I have enough information to generate a quality template?
- Are there any contradictions or gaps in requirements?
- Should I synthesize current understanding before proceeding?

## 8. OUTPUT FORMATTING

### For Strategic Questions

Present clear, focused questions with context:

**Format**:
"[Brief context or insight from previous response]. [Primary strategic question]?

[Optional: 1-2 specific follow-up questions if needed to guide response]"

### For Phase Transitions

Signal progression explicitly:

**Format**:
"[Summary of insights from current phase]. Now I'd like to explore [next phase focus]. [Strategic question to begin next phase]?"

### For Template Generation

Deliver as complete YAML artifact with explanation:

**Format**:
"Based on our consultation, I've designed a comprehensive template for [domain]. [Brief summary of key design decisions].

[YAML ARTIFACT with complete structure]

This template [explanation of how it addresses requirements]. You can [guidance on usage and customization]."

### Template Artifact Structure

<yaml>
key: kebab-case-identifier
name: Professional Display Name
description: Clear purpose statement
content_type: markdown
tags:
  - primary-domain
  - workflow-type
  - additional-tags

categories:
  - name: category_key
    display_name: Category Display Name
    entry_types: [entry_type_1, entry_type_2]

entry_types:
  entry_type_1:
    default_status: initial
    display_name: Entry Type Name
    statuses:
      - display_name: Status 1
        value: status_1
      - display_name: Status 2
        value: status_2

prompt: |
  ## 1. TASK CONTEXT
  You are an expert [domain specialist] serving as [specific role] conducting strategic consultation sessions.
  [Complete role definition and consultation scenario]
  
  ## 2. TONE CONTEXT
  [Communication style, confidence levels, rapport building approach]
  
  ## 3. BACKGROUND DATA
  <consultation_framework>
  [Strategic session methodology, question types, session flow]
  </consultation_framework>
  
  <domain_knowledge>
  [Domain-specific information, schemas, standards]
  </domain_knowledge>
  
  <quality_standards>
  [Accuracy requirements, validation criteria]
  </quality_standards>
  
  ## 4. DETAILED TASK DESCRIPTION & RULES
  [Step-by-step consultation protocol, entry creation rules, session management]
  
  ## 5. EXAMPLES
  [Representative consultation patterns and entry examples]
  
  ## 6. CONVERSATION HISTORY
  [Instructions for context awareness and reference]
  
  ## 7. IMMEDIATE TASK DESCRIPTION
  [Current interaction focus and objectives]
  
  ## 8. THINKING STEP BY STEP
  [Systematic reasoning approach for each interaction]
  
  ## 9. OUTPUT FORMAT
  [Precise formatting for questions, entries, transitions]
  
  ## 10. PREFILLED RESPONSE
  [Starting patterns to ensure consultation-driven approach]
</yaml>

## 10. PREFILLED RESPONSE

Always begin consultations with strategic domain questions that demonstrate expertise. Never start with:
- "What template do you need?"
- "How can I help you?"
- "What are your requirements?"

Instead, open with questions like:
- "I'd like to understand the [domain] context you're working in. What's the primary challenge or outcome you're focused on?"
- "Help me understand your workflow - walk me through how [domain work] typically progresses in your organization from start to finish."
- "What type of [domain work] are you conducting, and who are the key stakeholders involved in the process?"
```

### 1.3 Add Example Templates (Optional)

You can attach example template files to help Claude understand the format:

1. Click **Add Content** in project
2. Upload sample `.yaml` template files from `.templates` directory
3. This helps Claude generate templates that match your standards

### 1.4 Project Ready

Your Template Generator project is now configured. You'll use this project whenever you need to create new research
templates.

**Next**: [Generate Research Template](#step-2-generate-template)

---

## Step 2: Generate Research Template {#step-2-generate-template}

Now use your Template Generator project to create a research template.

### 2.1 Open Template Generator Project

1. In Claude Desktop, select **Research Template Generator** project
2. Start a new conversation in this project

### 2.2 Request Template Generation

Describe the type of research you want to conduct. Be specific about:

- **Domain**: What area? (product management, market research, architecture, etc.)
- **Goal**: What are you trying to discover or analyze?
- **Workflow**: What phases should research follow?
- **Artifacts**: What types of documents will you create?

**Example Request**:

```
I need a research template for product feature discovery.

The research should help me:
1. Understand target audience (create personas, segment analyses)
2. Identify user problems (document pain points, jobs-to-be-done)
3. Generate feature ideas (create feature concepts, user stories)

Each artifact type should have appropriate status progressions:
- Personas: draft → validated → published
- Pain Points: draft → validated → prioritized → addressed
- Feature Concepts: idea → evaluated → approved → in_development

The AI should act as a strategic product manager who uses deep questioning 
to uncover genuine user needs before suggesting features.
```

### 2.3 Review Generated Template

Claude will generate a complete YAML template. Review it for:

- **Clear category structure**: Logical workflow phases
- **Appropriate entry types**: Relevant artifact types for each category
- **Meaningful statuses**: Status progressions that match workflow
- **Comprehensive prompt**: Detailed AI consultation instructions

### 2.4 Save Template File

1. Copy the generated YAML content
2. Create a new file in `.templates` directory
3. Name it: `<template-key>.yaml` (e.g., `feature_discovery.yaml`)
4. Paste the YAML content
5. Save the file

**File location**:

```
.templates/
└── feature_discovery.yaml
```

### 2.5 Verify Template

Check that template is recognized by CTX:

```bash
# List available templates (if using CLI)
ctx research:templates

# Or use MCP tool in Claude
Use tool: research-templates-list
```

You should see your new template in the list.

**Next**: [Create Research Orchestrator Project](#step-3-create-orchestrator)

---

## Step 3: Create Research Orchestrator Project {#step-3-create-orchestrator}

Create a dedicated Claude Desktop project for conducting research sessions. This project will use the orchestrator to
manage research workflow.

### 3.1 Create New Project

In Claude Desktop:

1. Click **Projects** in the sidebar
2. Click **Create Project** button
3. Enter project details:
    - **Name**: `Research Orchestrator`
    - **Description**: `Project for conducting systematic research using CTX Research Module`

### 3.2 Configure Custom Instructions

Add orchestrator instructions that enable Claude to manage research workflow:

```
You are an expert research orchestrator specializing in intelligent research selection, context restoration, and 
strategic session continuation across multiple professional research areas.

## ROLE & EXPERTISE

You serve as a research management consultant who:

1. **Research Selection**: Analyzes user requests to identify the best matching research from available options
2. **Context Restoration**: Reads research memory blocks and prompt instructions to understand the research context
3. **Strategic Session Continuation**: Continues strategic consultation sessions based on research requirements and existing entries
4. **Entry Analysis**: Reviews relevant entries to restore comprehensive research understanding

## TONE CONTEXT

Be professional and analytical when evaluating research options. Make confident recommendations when matches are clear. 
When uncertain about research selection, ask targeted questions to understand which research fits best. Once a research 
is selected, follow that research's specific tone and consultation style as defined in its prompt.

## RESEARCH ORCHESTRATION PROTOCOL

### Step 1: Understand User Request

- Listen to what the user wants to accomplish
- Identify the domain, goals, and type of work needed
- Note key requirements and context clues

### Step 2: Find Matching Research

- Get list of all available research using `ctx:researches-list`
- Compare user request against each research title and description
- Identify which research best matches the user's needs
- If multiple research options seem viable, ask clarifying questions
- If no clear match, ask for more details about what they want to accomplish

### Step 3: Load Research Context

- Once research is selected, use `ctx:research-get` to load full research details
- **CRITICAL**: Read ALL memory blocks - these contain essential research context and background
- **CRITICAL**: Read and follow the research prompt instructions completely
- Switch to operating according to that research's specific methodology

### Step 4: Analyze Existing Entries

- Use `ctx:research-entries` to see what entries already exist in this research
- Read relevant entries using `ctx:research-entry-read` to understand current progress
- Identify what's been completed and what still needs work
- Understand the current state of the research

### Step 5: Continue Strategic Session

- Follow the research's prompt instructions for conducting sessions
- Ask strategic questions based on the research methodology
- Reference existing entries and memory blocks in your questions
- Create new entries using `ctx:research-create-entry` as the session progresses
- Maintain the research's specific consultation style

## DECISION MAKING

### When to Select Research Immediately:

- User request clearly matches one research (domain, goals, terminology align)
- Only one research is a strong fit
- You're confident this is the right match

### When to Ask Clarifying Questions:

- Multiple research options could work
- User request is somewhat vague
- Need to understand specific goals or context better

### Clarifying Questions Examples:

- "I see you want help with [topic]. Are you focusing more on [option A] or [option B]?"
- "To choose the right research, help me understand - are you looking to [specific goal 1] or [specific goal 2]?"
- "What's your main objective here - [outcome A] or [outcome B]?"

## KEY RULES

1. **Always read research memory blocks** - they contain critical context
2. **Always follow the research prompt instructions** - each research has specific methodology
3. **Continue existing strategic sessions** - don't start over, build on existing work
4. **Ask one clear question at a time** when clarifying research selection
5. **Reference existing entries** when continuing sessions to show continuity
6. **Create entries proactively** as strategic sessions progress

## SUCCESS CRITERIA

- **Accurate Selection**: Choose research that genuinely matches user needs
- **Complete Context**: Fully understand research memory and instructions before proceeding
- **Seamless Continuation**: Pick up where research left off, don't restart
- **Strategic Value**: Continue meaningful strategic sessions that advance the research
- **Entry Integration**: Use existing entries to inform new questions and create new entries as needed

Your goal is to intelligently connect users with the right research, restore full context, and continue valuable 
strategic consultation sessions that build comprehensive research through expert questioning.
```

### 3.3 Enable MCP Tools

Ensure Research Module MCP tools are available:

1. Check Claude Desktop settings
2. Verify CTX MCP server is running
3. Confirm these tools are accessible:
    - `research-templates-list`
    - `research-create`
    - `researches-list`
    - `research-get`
    - `research-entry-create`
    - `research-entries`
    - `research-entry-read`
    - `research-update`
    - `research-entry-update`

### 3.4 Project Ready

Your Research Orchestrator project is now configured. You'll use this project for all research sessions.

**Next**: [Conduct Research](#step-4-conduct-research)

---

## Step 4: Conduct Research {#step-4-conduct-research}

Now you can conduct actual research using your Research Orchestrator project.

### 4.1 Open Research Orchestrator Project

1. In Claude Desktop, select **Research Orchestrator** project
2. Start a new conversation in this project

### 4.2 Initialize Research

Tell Claude what research you want to conduct:

**Example - Starting New Research**:

```
I want to conduct feature discovery research for CTX context generator.

Target audience: PHP developers using Laravel, already working with AI tools
Focus area: Developer productivity, especially context management for AI coding assistants
Language preference: Conduct sessions in Russian, document findings in English
```

**Example - Resuming Existing Research**:

```
Continue my CTX feature discovery research
```

### 4.3 Orchestrator Actions

The orchestrator will automatically:

1. **List available templates** (if creating new research)
2. **List existing research** (if resuming)
3. **Create research** (if starting new)
    - Select appropriate template
    - Initialize research structure
    - Set up memory blocks
4. **Load research context** (if resuming)
    - Load template prompt
    - Read research memory blocks
    - Review existing entries
    - Identify current progress
5. **Begin consultation** following template methodology

### 4.4 Research Session

During the session, Claude will:

#### Ask Strategic Questions

Claude follows the template's consultation methodology:

```
Claude: "Let's start with understanding your target audience. 
Who are the primary users you want to serve with CTX?"
```

#### Use Voice Dictation (Recommended)

For best results, use voice dictation for your answers:

1. Click microphone icon in Claude Desktop
2. Speak your response naturally (30-60 seconds)
3. Review transcription
4. Send to Claude

**Why voice?**

- Captures more detail than typing
- Natural conversational flow
- Faster response time
- Enables "thinking out loud"

#### Synthesize Into Entries

Claude will synthesize your responses into structured entries:

```
Claude: "Based on your description, I'll create a User Persona entry:

Title: Laravel Developer Using AI Tools
Category: Audience Research
Status: Draft

[Shows entry content preview]

Should I create this entry?"
```

#### Progress Through Workflow

Claude guides you through template categories:

```
1. Audience Research (current)
   - Created 2 personas
   - Created 1 segment analysis
   
2. Needs Analysis (next)
   - Ready to begin
   
3. Feature Ideation (future)
   - Waiting for needs analysis
```

### 4.5 Session Management

#### During Session

- Answer one question at a time
- Provide detailed, specific responses
- Use voice dictation for rich input
- Review entries before creation
- Add tags for cross-cutting themes

#### End Session

```
You: "Let's continue this tomorrow"

Claude: "Research saved. We've completed:
- Audience Research: 3 entries created
- Needs Analysis: 2 entries created

Next session we can:
- Continue needs analysis
- Start feature ideation
- Deep dive into specific pain points

Your research is saved as: research_abc123"
```

#### Resume Session

```
You: "Continue my CTX feature discovery"

Claude: "Loading your CTX Feature Discovery research...

[Reads research memory]
[Reviews existing entries]
[Identifies current progress]

I've reviewed your 5 existing entries covering audience research 
and initial needs analysis. 

Where would you like to focus today?
1. Continue needs analysis with more pain points
2. Start feature ideation phase
3. Deep dive into existing findings"
```

### 4.6 Access Research Files

Your research is stored in the file system:

```
.researches/
└── research_abc123_ctx-feature-discovery/
    ├── research.yaml                 # Research metadata
    ├── audience_research/            # Category directory
    │   ├── entry_001.md             # Persona
    │   ├── entry_002.md             # Persona
    │   └── entry_003.md             # Segment analysis
    ├── needs_analysis/               # Category directory
    │   ├── entry_004.md             # Pain point
    │   └── entry_005.md             # Pain point
    └── feature_ideation/             # Category directory (empty)
        └── .gitkeep
```

You can:

- **View entries**: Open `.md` files in any text editor
- **Edit manually**: Modify content or frontmatter
- **Share findings**: Copy files or entire research directory
- **Version control**: Commit to git for collaboration

### 4.7 Update Research

You can update research metadata during sessions:

**Add Memory Entry**:

```
You: "Remember that we should prioritize features that work offline"

Claude: "I'll add this to research memory."
[Uses research-update tool]
```

**Change Status**:

```
You: "Mark this research as published"

Claude: "Updating research status to published."
[Uses research-update tool]
```

**Add Tags**:

```
You: "Tag this research as high-priority"

Claude: "Adding high-priority tag."
[Uses research-update tool]
```

### 4.8 Manage Entries

#### Update Entry Status

```
You: "Mark the 'Manual Context Gathering' pain point as validated"

Claude: "Updating entry status to validated."
[Uses research-entry-update tool]
```

#### Add Entry Tags

```
You: "Tag that entry as high-priority and quick-win"

Claude: "Adding tags: high-priority, quick-win"
[Uses research-entry-update tool]
```

#### Search Entries

```
You: "Show me all high-priority pain points"

Claude: [Uses research-entries tool with filters]
"Found 3 high-priority pain points:
1. Manual Context Gathering (validated)
2. Lost Work Switching Tools (draft)
3. Explaining Same Thing Repeatedly (validated)"
```

### 4.9 Complete Research

When research is complete:

1. **Review all entries** for completeness
2. **Update entry statuses** to final states
3. **Change research status** to `published`
4. **Generate summary** (optional - create summary entry)
5. **Share findings** with team

---

## Common Workflows

### Quick Start: Single Session

```
1. Open Research Orchestrator project
2. "I want to do market research for [product]"
3. Answer strategic questions (use voice)
4. Review and approve entries
5. Complete in 30-60 minutes
```

### Deep Dive: Multi-Session

```
Session 1: Audience research (30 min)
→ End session, save progress

Session 2: Needs analysis (45 min)
→ End session, review entries

Session 3: Feature ideation (60 min)
→ Complete research, publish findings
```

### Collaborative Research

```
1. Create research in shared directory
2. Team member 1: Conducts audience research
3. Team member 2: Reviews, adds needs analysis
4. Team member 3: Reviews all, adds ideation
5. Team reviews together, publishes results
```

---

## Tips for Success

### Use Voice Dictation

- **Detail**: Voice captures more nuance than typing
- **Speed**: Faster to speak than type
- **Natural**: Conversational flow reveals insights
- **Rich**: 60 seconds of voice = 150-300 words of structured content

### Trust the Orchestrator

- **Automatic**: Orchestrator handles all MCP tool calls
- **Context-Aware**: Knows which tools to use when
- **Workflow**: Follows template methodology
- **Memory**: Maintains full context across sessions

### Provide Specific Details

**Instead of**:

```
"Users want better features"
```

**Provide**:

```
"Laravel developers waste 15-30 minutes per day manually gathering 
files for AI tools. They copy-paste code from 5-10 files, explain 
project structure each time, and often provide incomplete context 
leading to poor AI suggestions."
```

### Review Before Creating

- **Preview**: Always review entry content before creation
- **Edit**: Request changes if needed
- **Tags**: Add relevant tags for filtering
- **Status**: Confirm initial status is appropriate

### Use Categories Sequentially

- **Follow template**: Progress through categories in order
- **Complete phases**: Finish one before moving to next
- **Build on previous**: Later phases use earlier findings
- **Context matters**: Sequential approach provides better insights

---

## Troubleshooting

### Template Not Found

**Problem**: `Template 'xyz' not found`

**Solution**:

1. Check `.templates` directory contains template file
2. Verify filename matches template key: `<key>.yaml`
3. List templates: Use `research-templates-list` tool
4. Refresh templates if needed

### Research Not Loading

**Problem**: Cannot load existing research

**Solution**:

1. Check `.researches` directory contains research folder
2. Verify `research.yaml` file exists
3. List research: Use `researches-list` tool
4. Check research ID is correct

### Entry Creation Failed

**Problem**: Entry cannot be created

**Solution**:

1. Verify category name matches template
2. Check entry type is allowed in category
3. Ensure status is valid for entry type
4. Confirm research exists and is accessible

### MCP Tools Not Available

**Problem**: Orchestrator cannot use research tools

**Solution**:

1. Check CTX MCP server is running
2. Verify Claude Desktop settings enable MCP
3. Restart Claude Desktop if needed
4. Check server logs for errors

---

## Next Steps

Now that you've completed the getting started guide:

- **[Best Practices](best-practices.md)** - Learn recommended patterns and workflows
- **[MCP Integration](mcp.md)** - Understand technical details and available tools
- **[Domain Entities](entities.md)** - Deep dive into templates, research, and entries

---

## Quick Reference

### File Locations

```
.templates/                          # Research templates
└── <template-key>.yaml

.researches/                         # Active research projects
└── <research-id>_<research-name>/
    ├── research.yaml
    └── <category>/
        └── entry_<id>.md
```

### Project Setup

1. **Template Generator**: For creating templates
2. **Research Orchestrator**: For conducting research

### Workflow Steps

1. Generate template → Save to `.templates/`
2. Create research → Stored in `.researches/`
3. Conduct sessions → Creates entries
4. Review findings → Update statuses
5. Complete research → Publish results

### Key Tools

- `research-templates-list` - List available templates
- `research-create` - Create new research
- `researches-list` - List existing research
- `research-get` - Load research context
- `research-entry-create` - Create entry
- `research-entries` - List entries with filters

**Full tool reference**: [MCP Integration](mcp.md)