<template>
  <section class="container" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div>
      <el-table :data="recordList" :header-cell-style="headerCell" style="width: 100%" height="600">
        <el-table-column fixed prop="from_name" label="发送人" width="100%">
        </el-table-column>
        <el-table-column prop="to_name" label="接受者">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
        </el-table-column>
      </el-table>
    </div>

  </section>
</template>

<script>
import * as api from "~/api/";
import { equal } from "assert";
import moment from "moment";
export default {
  layout: "main",
  data() {
    return {
      headerCell: { "text-align": "center" },
      loading: false,
      recordList: []
    };
  },
  methods: {},
  mounted() {
    api.getRecords().then((res) => {
      res.data.map((e) => {
        e.createdAt = moment(e.createdAt).format("YYYY-MM-DD HH:mm:ss")
        if (e.type == "media") {
          e.content = <img style="width:60%" src={e.content} />
        }
      })
      this.recordList = res.data
    })
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
