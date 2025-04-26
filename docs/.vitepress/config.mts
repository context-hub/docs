import {defineConfig} from 'vitepress'
import {withMermaid} from "vitepress-plugin-mermaid";

export default withMermaid({
    ignoreDeadLinks: true,
    title: "CTX Docs",
    description: "Documentation for CTX",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },

        nav: [
            {text: 'Docs', link: '/'},
            {text: 'GitHub', link: 'https://github.com/context-hub/generator'},
            {
                text: 'Json Schema',
                link: 'https://raw.githubusercontent.com/context-hub/generator/refs/heads/main/json-schema.json'
            }
        ],

        sidebar: [
            {
                text: 'Home',
                link: '/',
                items: [
                    {text: 'What is CTX?', link: '/'},
                    {text: 'Quick Start', link: '/quick-start'},
                    {text: 'Understanding CaC, CDD', link: '/cdd'}
                ]
            },
            {
                text: 'Getting Started',
                items: [
                    {text: 'Installation', link: '/getting-started'},
                    {text: 'Configuration', link: '/getting-started/configuration'},
                    {text: 'Json Schema', link: '/getting-started/json-schema'},
                    {text: 'Command Reference', link: '/getting-started/command-reference'},
                    {text: 'Variables in Configuration', link: '/getting-started/variables'},
                    {text: 'IDE Integration', link: '/getting-started/ide-integration'},
                    {text: 'Logging', link: '/getting-started/logging'}
                ]
            },
            {
                text: 'MCP Server',
                items: [
                    {text: 'Integration', link: '/mcp'},
                    {text: 'Filesystem', link: '/mcp/filesystem'},
                    {text: 'Prompts', link: '/mcp/prompts'},
                    {text: 'Tools', link: '/mcp/tools'},
                    {text: 'Custom tools', link: '/mcp/custom-tools'}
                ]
            },
            {
                text: 'Config Reference',
                items: [
                    {text: 'Document Structure', link: '/documents'},
                    {text: 'File Source', link: '/sources/file-source'},
                    {text: 'GitHub Source', link: '/sources/github-source'},
                    {text: 'GitLab  Source', link: '/sources/gitlab-source'},
                    {text: 'Git Diff Source', link: '/sources/git-diff-source'},
                    {text: 'URL Source', link: '/sources/url-source'},
                    {text: 'Text Source', link: '/sources/text-source'},
                    {text: 'Composer Source', link: '/sources/composer-source'},
                    {text: 'Tree Source', link: '/sources/tree-source'},
                    {text: 'MCP Source', link: '/sources/mcp-source'},
                    {text: 'Docs Source', link: '/sources/docs-source'},
                ]
            },
            {
                text: 'Modifiers',
                items: [
                    {text: 'What is a Modifier?', link: '/modifiers'},
                    {text: 'PHP Signature Modifier', link: '/modifiers/php-signature'},
                    {text: 'PHP Content Filter Modifier', link: '/modifiers/php-content-filter'},
                    {text: 'Sanitizer Modifier', link: '/modifiers/sanitizer'},
                    {text: 'PHP-Docs Modifier', link: '/modifiers/php-docs'},
                    {text: 'Document-Level Modifiers', link: '/modifiers/document-level'},
                    {text: 'Modifier Aliases', link: '/modifiers/aliases'}
                ]
            },
            {
                text: 'Advanced',
                items: [
                    {text: 'Instructions (Examples)', link: '/advanced/instructions'},
                    {text: 'Development steps', link: '/advanced/development-steps'},
                    {text: 'Development with CTX', link: '/advanced/development-process'},
                    {text: 'LLM Integration: Smart Context Requesting', link: '/advanced/smart-context-requesting'},
                ],
            },
            {
                text: 'Contributing',
                link: '/contributing',
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/context-hub/docs'}
        ]
    },
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    // optionally set additional config for plugin itself with MermaidPluginConfig
    mermaidPlugin: {
        class: "mermaid my-class", // set additional css classes for parent container
    },
});