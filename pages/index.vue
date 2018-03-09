<template>
  <section class="container">
    <div>
      <el-row>
        <el-col :span="24">
          <el-tabs type="border-card">
            <el-tab-pane label="文字消息">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="message">
              </el-input>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group>
              <el-button type="primary" plain>发送</el-button>
            </el-tab-pane>
            <el-tab-pane label="图片消息">配置管理</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import * as api from "~/api/";
export default {
  layout: "aside",
  components: {
    AppLogo
  },
  data() {
    return {
      message: "",
      checkList: []
    };
  },
  mounted() {
    api.init()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
