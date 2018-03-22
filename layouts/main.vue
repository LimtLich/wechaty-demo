<template>
    <section v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" class="dialog" title="登录账号" :show-close="false" :visible.sync="dialogVisible" width="30%" center>
            <img class="qrCode" :src="qrCode">
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
        <header>
            <div class="top-nav-wrapper">
                <div class="nav-logo">wechaty</div>
                <el-menu active-text-color="#409EFF" default-active="1" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">消息管理</el-menu-item>
                    <el-menu-item index="2">用户管理</el-menu-item>
                    <div class="userMsg">
                        <div>用户：{{userInfo.rawObj.NickName}}</div>
                        <div>
                            <el-button type="info" class="logoutBtn" @click="logout">登出</el-button>
                        </div>
                    </div>
                </el-menu>

            </div>
        </header>
        <section class="el-container">
            <aside>
                <el-menu class="el-menu-vertical-demo" :router="true">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">消息发送</span>
                    </el-menu-item>
                    <el-menu-item index="records">
                        <i class="el-icon-setting"></i>
                        <span slot="title">消息记录</span>
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
import * as api from "~/api/";
export default {
  data() {
    return {
      qrCode: null,
      dialogVisible: false,
      loading: true,
      userInfo: {
        rawObj: {}
      }
    };
  },
  methods: {
    logout() {
      api.logout().then(() => {
        location.reload();
      });
    }
  },
  async mounted() {
    let code = await api.init();
    if (code) {
      this.qrCode = code;
      this.dialogVisible = true;
    } else {
      this.dialogVisible = false;
    }
    let userInfo = await api.getUserInfo();
    if (userInfo) {
      this.dialogVisible = false;
      this.userInfo = userInfo;
      console.log("userInfo:", userInfo);
    }
    this.loading = false;
  }
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
.qrCode {
  width: 100%;
}
.userMsg {
  float: right;
  line-height: 60px;
  margin-right: 20px;
  color: #999;
  font-size: 14px;
  width: 210px;
  &:focus {
    outline: none;
  }
  .logoutBtn {
    height: 30px;
    line-height: 0px;
    font-size: 14px;
    font-weight: normal;
  }
  div {
    float: left;
  }
  div:last-child {
    margin-left: 15px;
    cursor: pointer;
    color: #909399;
    &:hover {
      color: #f56c6c;
    }
  }
}
</style>
