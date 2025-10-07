# Best Practices

This guide provides recommended patterns and workflows for effective use of the Research Module.

## Table of Contents

1. [Template Design](#template-design)
2. [Research Organization](#research-organization)
3. [Voice Dictation Strategy](#voice-dictation-strategy)
4. [Session Management](#session-management)
5. [Entry Management](#entry-management)
6. [Workflow Patterns](#workflow-patterns)
7. [Collaboration](#collaboration)
8. [Common Mistakes](#common-mistakes)

---

## Template Design

### Create Focused Templates

**✅ Good: Specific Methodology**

```yaml
key: feature_discovery
name: Product Feature Discovery
description: Systematic feature discovery through customer needs analysis
```

**❌ Bad: Too Vague**

```yaml
key: business_stuff
name: General Business Analysis
description: Analyze business things
```

**Why**: Focused templates provide clear structure and enable specific AI consultation patterns.

### Structure Logical Workflows

Design categories as sequential phases:

**✅ Good: Clear Progression**

```yaml
categories:
  - name: discovery       # Start: What exists?
    display_name: Discovery
  - name: analysis        # Then: What does it mean?
    display_name: Analysis
  - name: planning        # Finally: What do we do?
    display_name: Planning
```

**❌ Bad: Random Organization**

```yaml
categories:
  - name: stuff
  - name: things
  - name: items
```

**Why**: Sequential categories guide research progression and make it clear what comes next.

### Define Meaningful Entry Types

Entry types should represent distinct artifact types:

**✅ Good: Specific Artifacts**

```yaml
entry_types:
  persona:
    display_name: User Persona
  pain_point:
    display_name: Pain Point
  feature_concept:
    display_name: Feature Concept
```

**❌ Bad: Generic Types**

```yaml
entry_types:
  note:
    display_name: Note
  document:
    display_name: Document
```

**Why**: Specific types enable better organization, filtering, and understanding of findings.

### Create Appropriate Status Progressions

Status should reflect actual workflow states:

**✅ Good: Meaningful Progression**

```yaml
pain_point:
  statuses:
    - value: draft          # Initial capture
    - value: validated      # Confirmed with users
    - value: prioritized    # Impact assessed
    - value: addressed      # Solution implemented
```

**❌ Bad: Arbitrary States**

```yaml
pain_point:
  statuses:
    - value: new
    - value: done
```

**Why**: Meaningful statuses enable progress tracking and workflow management.

### Write Comprehensive Prompts

Template prompts should define AI behavior completely:

**✅ Good: Detailed Instructions**

```yaml
prompt: |
  You are a strategic product manager specializing in feature discovery.

  Your role is to:
  1. Understand target audience deeply through strategic questioning
  2. Uncover real user problems using jobs-to-be-done framework
  3. Generate features that address genuine needs

  Consultation approach:
  - Ask one thoughtful question at a time
  - Encourage detailed, specific answers using voice dictation
  - Use 5 Whys technique to uncover root causes
  - Synthesize answers into structured entries

  For audience research:
  - Who are the users? (roles, skills, context)
  - What tools do they currently use?
  - What frustrates them about existing solutions?

  For needs analysis:
  - What specific problems do they face?
  - What is the business impact?
  - How do they work around limitations today?
```

**❌ Bad: Vague Instructions**

```yaml
prompt: |
  Help the user with product research.
  Ask questions and create entries.
```

**Why**: Detailed prompts ensure consistent, high-quality AI consultation.

---

## Research Organization

### Use Descriptive Names

**✅ Good: Clear and Specific**

```
CTX Feature Discovery Q1 2025
Market Research - Enterprise SaaS Competitors
Architecture Design - Payment Processing System
```

**❌ Bad: Vague or Cryptic**

```
Research 1
My Research
Project X
```

### Tag Strategically

Use tags for cross-cutting organization:

**✅ Good: Meaningful Tags**

```yaml
tags:
  - ctx                    # Product/project
  - product-management     # Domain
  - q1-2025               # Time period
  - high-priority         # Importance
  - customer-facing       # Type
```

**❌ Bad: Redundant Tags**

```yaml
tags:
  - important
  - very-important
  - really-important
```

**Why**: Strategic tags enable filtering and organization across multiple research projects.

### Maintain Research Memory

Keep memory blocks focused and actionable:

**✅ Good: Specific Instructions**

```yaml
memory:
  - Conduct discovery sessions in Russian for natural conversation
  - Document all findings in English for team accessibility
  - Focus on PHP developers using Laravel framework
  - Target users already work with AI coding assistants
  - Prioritize features that work offline-first
```

**❌ Bad: Vague Statements**

```yaml
memory:
  - Make it good
  - Focus on users
  - Be thorough
```

**Why**: Specific memory blocks guide AI behavior and maintain research context.

### Organize by Status

Track research lifecycle:

- **draft**: Initial planning, defining scope
- **active**: Actively conducting research
- **published**: Research complete, findings available
- **archived**: Historical reference, no longer active

**Best Practice**: Keep only 3-5 research projects in "active" status at a time.

---

## Voice Dictation Strategy

### When to Use Voice

Voice dictation is optimal for:

- ✅ Answering strategic questions (30-60 seconds)
- ✅ Providing detailed examples
- ✅ Sharing user quotes or stories
- ✅ Describing complex problems or workflows

Voice is less optimal for:

- ❌ Simple yes/no answers
- ❌ Short factual responses
- ❌ Code snippets or technical syntax
- ❌ Lists of items

### Voice Dictation Process

1. **Listen to Question**: Understand what AI is asking
2. **Think Before Speaking**: Organize thoughts (10-15 seconds)
3. **Speak Naturally**: Use conversational tone (30-60 seconds)
4. **Review Transcription**: Check for accuracy
5. **Submit**: Send to AI for synthesis

### Optimize Voice Responses

**✅ Good: Detailed and Specific**

```
"So the primary pain point I'm seeing is that PHP developers using 
Laravel spend about 15 to 30 minutes every time they want to use AI 
coding assistants like Claude or Cursor. They have to manually gather 
relevant files, copy-paste code snippets from maybe 5 to 10 different 
files, explain the project structure and relationships between 
components, and even then the context is often incomplete. This 
happens multiple times per day, so we're talking about 2 to 5 hours 
of wasted time daily. The frustration is that they know the AI could 
help them, but the overhead of preparing context makes them think 
twice about using it for quick questions."
```

**❌ Bad: Brief and Vague**

```
"Developers waste time gathering context for AI tools."
```

**Why**: Detailed voice responses provide rich data for AI to synthesize into comprehensive entries.

### Voice Best Practices

1. **Provide Examples**: Use specific cases from experience
2. **Include Numbers**: Quantify impact when possible
3. **Quote Users**: Share direct feedback or quotes
4. **Explain Context**: Describe situations and workflows
5. **Think Out Loud**: Explore thoughts as you speak

---

## Session Management

### Start Each Session

When beginning a research session:

1. **Identify Research**: Tell AI which research to load
2. **Wait for Context**: Let AI load template, memory, and entries
3. **Confirm Understanding**: Verify AI has correct context
4. **Set Focus**: Decide which category or topic to explore

**Example**:

```
You: "Continue my CTX feature discovery research"

AI: "Loading research...
[Reads memory blocks]
[Reviews 5 existing entries]

I've reviewed your audience research and initial needs analysis.
Where would you like to focus today?"

You: "Let's continue with pain points in the needs analysis phase"
```

### During Session

**Maintain Focus**:

- Complete one category before moving to next
- Finish one entry type before switching
- Deep dive into specific topics
- Build on previous findings

**Provide Rich Input**:

- Use voice dictation for detailed answers
- Give specific examples and stories
- Quantify impact when possible
- Share user quotes or feedback

**Review Entries**:

- Preview content before creation
- Request edits if needed
- Add relevant tags
- Confirm status is appropriate

### End Each Session

When concluding a session:

1. **Review Progress**: Summarize what was created
2. **Note Next Steps**: Identify what to focus on next
3. **Confirm Save**: Verify research is saved
4. **Plan Return**: Decide when to continue

**Example**:

```
You: "Let's stop here for today"

AI: "Great session! We've created:
- Audience Research: 2 new personas
- Needs Analysis: 4 validated pain points

Next session we can:
- Continue needs analysis
- Start feature ideation phase
- Deep dive into specific pain points

Your research is saved. See you next time!"
```

---

## Entry Management

### Create Quality Entries

**Good Entry Characteristics**:

- **Clear Title**: Descriptive, specific
- **Focused Content**: Single topic or finding
- **Structured Format**: Sections, headers, lists
- **Actionable**: Includes insights or next steps
- **Evidence-Based**: Quotes, data, examples

**Entry Structure Example**:

```markdown
# Developer Pain Point: Manual Context Gathering

## Problem Statement

[Clear description of the problem]

## Impact Analysis

[Quantified impact: time, cost, frequency]

## Root Causes

[Why this problem exists]

## User Quotes

[Direct feedback from users]

## Potential Solutions

[Ideas for addressing the problem]

## Priority Assessment

[Impact, frequency, segment affected]
```

### Use Descriptions Effectively

Descriptions (max 200 chars) enable quick scanning:

**✅ Good: Informative Summary**

```
description: "Analysis of 15-30 min daily wasted on manual context preparation for AI tools, affecting all developers"
```

**❌ Bad: Redundant Title**

```
description: "Manual context gathering"
```

**Why**: Descriptions help AI and users quickly understand entry content without reading full text.

### Tag Appropriately

Use 3-5 tags per entry:

**✅ Good: Specific and Useful**

```yaml
tags:
  - high-priority      # Importance
  - productivity       # Theme
  - context-management # Domain
  - quick-win         # Implementation
```

**❌ Bad: Too Many or Redundant**

```yaml
tags:
  - important
  - very-important
  - critical
  - high-priority
  - urgent
  - must-have
  - priority-1
```

### Progress Status Appropriately

Move entries through status workflow:

**Example: Pain Point**

```
draft → (validate with users) → validated → 
(assess impact) → prioritized → (implement solution) → addressed
```

**Best Practice**: Update status as research progresses, don't skip stages.

### Maintain Entry Quality

**Regular Reviews**:

- Review entries periodically for accuracy
- Update with new information
- Refine based on additional insights
- Remove or archive outdated entries

**Quality Checks**:

- Is content still accurate?
- Are examples current?
- Does evidence support claims?
- Are next steps actionable?

---

## Workflow Patterns

### Pattern 1: Voice-Driven Discovery

Optimal for rich data collection:

```
1. AI asks strategic question
   ↓
2. User responds via voice (30-60 sec)
   ↓
3. User reviews transcription
   ↓
4. AI synthesizes into entry
   ↓
5. User reviews and approves
   ↓
6. Entry saved, next question
```

**When to Use**: Initial discovery, user research, problem exploration

### Pattern 2: Multi-Session Research

Continuous discovery across sessions:

```
Session 1: Audience Research (30 min)
- Create 3 personas
- Create 2 segment analyses
→ Save and end

Session 2: Needs Analysis (45 min)  
- Review personas
- Create 5 pain points
- Create 3 jobs-to-be-done
→ Save and end

Session 3: Feature Ideation (60 min)
- Review pain points
- Create 8 feature concepts
- Prioritize concepts
→ Complete research
```

**When to Use**: Complex research, multiple topics, team collaboration

### Pattern 3: Iterative Refinement

Deep dive into specific findings:

```
1. Initial discovery → Create draft entries
   ↓
2. User validation → Update to validated status
   ↓
3. Impact assessment → Add priority, data
   ↓
4. Solution exploration → Add potential solutions
   ↓
5. Final review → Publish research
```

**When to Use**: High-impact topics, strategic decisions, detailed analysis

### Pattern 4: Collaborative Research

Team-based research:

```
Team Member 1: Initial Discovery
- Create research
- Complete audience research
- Add memory blocks

Team Member 2: Needs Analysis
- Review audience research
- Add pain points
- Add jobs-to-be-done

Team Member 3: Synthesis
- Review all entries
- Add feature concepts
- Prioritize findings

Team Review: Finalization
- Review together
- Refine entries
- Publish research
```

**When to Use**: Team projects, cross-functional research, peer review

---

## Collaboration

### Share Research

**File-Based Sharing**:

```
# Copy entire research directory
cp -r .researches/research_abc123_project .researches/

# Or commit to git
git add .researches/research_abc123_project
git commit -m "Add feature discovery research"
git push
```

**Export Findings**:

- Copy individual entry markdown files
- Generate summary document from entries
- Share research.yaml for metadata

### Collaborate Effectively

**Division of Work**:

- Assign categories to team members
- Split entry types by expertise
- Review each other's entries
- Synthesize findings together

**Maintain Consistency**:

- Use same template
- Follow same entry format
- Use consistent tagging
- Align on status definitions

### Review Process

**Peer Review**:

1. Team member creates entries (draft status)
2. Peer reviews content for accuracy
3. Update status to validated
4. Group prioritizes findings

**Quality Assurance**:

- Check entry completeness
- Verify evidence and data
- Ensure actionable insights
- Confirm proper categorization

---

## Common Mistakes

### Mistake 1: Skipping Context Restoration

**❌ Wrong**:

```
You: "Continue research"
AI: [Starts asking questions without loading context]
```

**✅ Right**:

```
You: "Continue my CTX feature discovery"
AI: [Loads research-get, reviews entries, reads memory]
"I've reviewed your 5 existing entries..."
```

**Why**: Without context, AI cannot effectively continue research.

### Mistake 2: Not Using Voice Dictation

**❌ Wrong**:

```
AI: "Who is your target audience?"
You: [Types] "Developers"
```

**✅ Right**:

```
AI: "Who is your target audience?"
You: [Voice, 45 seconds] "So we're targeting PHP developers..."
```

**Why**: Typed responses lack detail needed for quality entries.

### Mistake 3: Creating Too Broad Entries

**❌ Wrong**:

```markdown
# All User Problems

Users have many problems including context, performance,
integration, documentation, pricing, and more...
```

**✅ Right**:

```markdown
# Developer Pain: Manual Context Gathering

Specific problem: Developers waste 15-30 minutes per session...
[Focused, detailed analysis]
```

**Why**: Focused entries are more useful and actionable.

### Mistake 4: Ignoring Entry Status

**❌ Wrong**:

```
[All entries stay in "draft" status forever]
```

**✅ Right**:

```
draft → validated → prioritized → addressed
[Status progresses as research advances]
```

**Why**: Status tracking enables progress monitoring and workflow management.

### Mistake 5: Poor Memory Management

**❌ Wrong**:

```yaml
memory:
  - Remember everything we discussed
  - This is important
  - Don't forget
```

**✅ Right**:

```yaml
memory:
  - Conduct sessions in Russian
  - Focus on Laravel developers
  - Prioritize offline-first features
```

**Why**: Specific memory blocks provide actionable guidance.

### Mistake 6: Inconsistent Tagging

**❌ Wrong**:

```
Entry 1: tags: [important, high-pri, urgent]
Entry 2: tags: [priority-1, critical]
Entry 3: tags: [must-have, high priority]
```

**✅ Right**:

```
Entry 1: tags: [high-priority, productivity]
Entry 2: tags: [high-priority, integration]
Entry 3: tags: [high-priority, performance]
```

**Why**: Consistent tags enable effective filtering and organization.

### Mistake 7: Not Reviewing Before Creating

**❌ Wrong**:

```
AI: "Should I create this entry?"
You: "Yes" [Without reading preview]
```

**✅ Right**:

```
AI: "Should I create this entry?"
You: [Reviews content] "Can you add more detail about impact?"
AI: [Updates] "How about now?"
You: "Perfect, create it"
```

**Why**: Review ensures entry quality and accuracy.

---

## Performance Tips

### Optimize Sessions

1. **Batch Creation**: Create multiple entries in one session
2. **Focus Time**: Dedicate 30-60 min blocks
3. **Minimize Switching**: Complete one category before next
4. **Use Templates**: Let methodology guide you

### Manage Research Scale

**Small Research** (< 10 entries):

- Single session completion
- Lightweight organization
- Quick turnaround

**Medium Research** (10-30 entries):

- 2-3 sessions
- Strategic organization
- Iterative refinement

**Large Research** (30+ entries):

- 5+ sessions
- Careful categorization
- Team collaboration
- Regular reviews

### Maintain System Health

**Regular Maintenance**:

- Archive completed research
- Clean up draft entries
- Update outdated findings
- Refine templates based on learnings

**File System**:

- Keep `.researches` organized
- Remove abandoned research
- Back up important findings
- Version control with git

---

## Next Steps

- **[Getting Started Guide](getting-started.md)** - Step-by-step instructions
- **[Domain Entities](entities.md)** - Understand core concepts
- **[MCP Integration](mcp.md)** - Technical tool reference