<template>
  <section class="container" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-table :data="recordList" :header-cell-style="headerCell" style="width: 80%" height="500">
      <el-table-column fixed prop="from_name" label="发送人" width="150">
      </el-table-column>
      <el-table-column prop="to_name" label="接受者" width="120">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="120">
      </el-table-column>
      <el-table-column prop="content" label="内容" width="120">
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
import * as api from "~/api/";
import { equal } from "assert";
export default {
  layout: "main",
  data() {
    return {
      headerCell: { "text-align": "center" },
      loading: false,
      recordList: [
      ]
    };
  },
  methods: {},
  async mounted() {
    let list = api.getRecords()
    this.recordList = list
    console.log(recordList)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
