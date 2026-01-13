import DefaultTheme from 'vitepress/theme'
import GitHubStars from './GitHubStars.vue'
import { h } from 'vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'nav-bar-content-after': () => h(GitHubStars),
        })
    },
    enhanceApp({app}) {

    }
}