module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'wechaty-demo',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_525903_2k0hqi0oteobhuxr.css'
      }
    ],
    script: [{
      src: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
    }, {
      src: '//cdn.bootcss.com/jquery.form/4.2.2/jquery.form.js'
    }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    vendor: ['element-ui'],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.devtool = false
    }
  },
  // 组件缓存
  cache: true,
  // 插件
  plugins: [{
    src: '~/plugins/element',
    ssr: true
  }]
}
