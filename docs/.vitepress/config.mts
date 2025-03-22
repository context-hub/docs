import {defineConfig} from 'vitepress'

export default defineConfig({
    ignoreDeadLinks: true,
    title: "Context Generator Docs",
    description: "Documentation for Context Generator for LLM",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },

        nav: [
            {text: 'Docs', link: '/'},
            {text: 'GitHub', link: 'https://github.com/butschster/context-generator'},
            {text: 'Json Schema', link: 'https://raw.githubusercontent.com/butschster/context-generator/refs/heads/main/json-schema.json'}
        ],

        sidebar: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Getting Started',
                items: [
                    {text: 'Installation', link: '/getting-started'},
                    {text: 'Configuration', link: '/configuration'},
                    {text: 'Command Reference', link: '/getting-started/command-reference'},
                    {text: 'Environment Variables', link: '/environment-variables'},
                    {text: 'IDE Integration', link: '/getting-started/ide-integration'},
                    {text: 'Logging', link: '/advanced/logging'}
                ]
            },
            {
                text: 'Config Reference',
                items: [
                    {text: 'Document Structure', link: '/documents'},
                    {text: 'File Source', link: '/sources/file-source'},
                    {text: 'GitHub Source', link: '/sources/github-source'},
                    {text: 'Git Diff Source', link: '/sources/git-diff-source'},
                    {text: 'URL Source', link: '/sources/url-source'},
                    {text: 'Text Source', link: '/sources/text-source'},
                    {text: 'Composer Source', link: '/sources/composer-source'},
                    {text: 'Tree Source', link: '/sources/tree-source'}
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
                    {text: 'Development with Context Generator', link: '/advanced/development-process'},
                ],
            },
            {
                text: 'Contributing',
                link: '/contributing',
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/butschster/context-generator'}
        ]
    }
})