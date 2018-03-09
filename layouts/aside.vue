<template>
    <section>
        <header>
            <div class="top-nav-wrapper">
                <div class="nav-logo">wechaty</div>
                <el-menu active-text-color="#409EFF" default-active="1" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">消息管理</el-menu-item>
                    <el-menu-item index="2">用户管理</el-menu-item>
                </el-menu>
            </div>
        </header>
        <section class="el-container">
            <aside>
                <el-menu class="el-menu-vertical-demo" default-active="1">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">消息发送</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">消息配置</span>
                    </el-menu-item>
                </el-menu>
            </aside>
            <main>
                <nuxt/>
            </main>
        </section>
    </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  border: none;
}
main {
  height: calc(100vh - 60px);
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 20px;
  -webkit-box-flex: 1;
  flex: 1;
}
aside {
  height: calc(100vh - 60px);
  width: inherit !important;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}

.el-menu-vertical-demo {
  li {
    padding-left: 0 !important;
    margin-top: 15px;
  }
}
.top-nav-wrapper {
  position: relative;
  padding-left: 160px;
  .nav-logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 60px;
    line-height: 70px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
}
</style>
