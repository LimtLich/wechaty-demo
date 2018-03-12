<template>
  <section class="container">
    <div>
      <el-row>
        <el-col :span="24">
          <el-tabs type="border-card">
            <el-tab-pane label="文字消息">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="message">
              </el-input>
              <!-- <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
              </el-checkbox-group> -->
              <el-button type="primary" @click="sendText" plain class="sendBtn">发送</el-button>
            </el-tab-pane>
            <el-tab-pane label="图片消息">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <div class="uploader">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar addBorder">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
              <el-button type="primary" @click="sendMedia" plain class="sendBtn">发送</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import * as api from "~/api/";
export default {
  layout: "main",
  data() {
    return {
      message: "",
      checkList: [],
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    sendText() {
      console.log(this.message);
      api.sendText({ message: this.message });
    },
    sendMedia() {
      console.log(this.imageUrl);
      // api.sendText({ url: this.imageUrl });
    }
  },
  async mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.sendBtn{
  margin-top:20px;
}
</style>
