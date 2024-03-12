import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'

export default {
  base: '/vue-weui',
  vite: {
    plugins: [
      whyframe({
        defaultSrc: '/frames/default'
      }),
      whyframeVue({
        include: /\.(?:vue|md)$/
      })
    ]
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://weui.io/style/weui.min.css' }]
  ],
  themeConfig: {
    siteTitle: 'vue-weui',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bangtz/vue-weui' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guide/index',
            },
            {
              text: '快速开始',
              link: '/guide/quickstart'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Icon',
              link: '/components/icon/'
            },
            {
              text: 'Button',
              link: '/components/button/'
            },
            {
              text: 'Slider',
              link: '/components/slider/'
            },
            {
              text: 'Loading',
              link: '/components/loading/'
            },
            {
              text: 'Progress',
              link: '/components/progress/'
            },
            {
              text: 'Badge',
              link: '/components/badge/'
            },
            {
              text: 'Article',
              link: '/components/article/'
            },
            {
              text: 'Flex',
              link: '/components/flex/'
            },
            {
              text: 'Footer',
              link: '/components/footer/'
            },
            {
              text: 'Grids',
              link: '/components/grid/'
            },
            {
              text: 'Loadmore',
              link: '/components/loadmore/'
            },
            {
              text: 'Cells',
              link: '/components/cells/'
            },
            {
              text: 'Panel',
              link: '/components/panel/'
            },
            {
              text: 'MediaBox',
              link: '/components/mediabox/'
            },
            {
              text: 'Preview',
              link: '/components/preview/'
            },
            {
              text: 'Steps',
              link: '/components/steps/'
            }
          ]
        },
        {
          text: '操作反馈',
          items: [
            {
              text: 'Toast',
              link: '/components/toast/'
            },
            {
              text: 'ActionSheet',
              link: '/components/actionsheet/'
            },
            {
              text: 'Dialog',
              link: '/components/dialog/'
            },
            {
              text: 'HalfScreenDialog',
              link: '/components/halfscreen-dialog/'
            },
            {
              text: 'Msg',
              link: '/components/msg/'
            },
            {
              text: 'Alert',
              link: '/components/alert/'
            }
          ]
        },
        {
          text: '导航相关',
          items: [
            {
              text: 'NavBar',
              link: '/components/navbar/'
            },
            {
              text: 'TabBar',
              link: '/components/tabbar/'
            }
          ]
        },
        {
          text: '搜索相关',
          items: [
            {
              text: 'SearchBar',
              link: '/components/searchbar/'
            }
          ]
        }
      ]
    }
  }
}