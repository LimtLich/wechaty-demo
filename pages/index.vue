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
              <!-- <input type="file" @change="readFile" /> -->
              <form id="themeForm" action="/api/sendMedia" target="submitFrame" method="post" enctype="multipart/form-data">
                <iframe id="submitFrame" style="display: none;width:0; height:0" name="submitFrame" src="about:blank"></iframe>
                <div class="uploadMedia">
                  <p>点击上传图片</p>
                  <i class="icon-upload iconfont icon-ic_cloud_upload" v-if="!mediaMessage.imgMedia"></i>
                  <img class="showImg" :src="mediaMessage.imgMedia" alt="" v-if="mediaMessage.imgMedia">
                  <input accept="image/png,image/jpg" id="imgMedia" name="image" @change="uploadFiles" type="file" />
                </div>
                <!-- <input class="uploadMedia" type="file" name="image" size="50" /> -->
                <br />
                <el-button type="primary" @click="sendMedia" plain>发送</el-button>
              </form>
              <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <div class="uploader">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar addBorder">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload> -->
              <!-- <el-button type="primary" @click="sendMedia" plain class="sendBtn">发送</el-button> -->
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import * as api from "~/api/";
import { equal } from "assert";
export default {
  layout: "main",
  data() {
    return {
      message: "",
      checkList: [],
      imageUrl: "",
      file: null,
      mediaMessage: {
        imgMedia: null
      }
    };
  },
  methods: {
    async uploadFiles(e) {
      var file = e.target.files[0];
      //创建读取文件的对象
      var reader = new FileReader();
      //创建文件读取相关的变量
      var imgFile;
      let media = this.mediaMessage;
      let id = e.target.id;
      //为文件读取成功设置事件
      reader.onload = function(e) {
        imgFile = e.target.result;
        media[id] = imgFile;
      };
      //正式读取文件
      if (file) {
        reader.readAsDataURL(file);
      } else {
        media[id] = null;
      }
    },
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
    readFile(e) {
      console.log(e);
      let id = e.target.id;
      this.file = e.target.files[0];
    },
    sendText() {
      console.log(this.message);
      api.sendText({ message: this.message });
    },
    sendMedia() {
      if (this.mediaMessage.imgMedia) {
        $("#themeForm").submit();
      }else{
        alert('请上传图片！')
      }
    }
  },
  async mounted() {
    $("#themeForm").ajaxForm(function(data) {
      console.log("data:", data);
      // let themeImgName = data.results[0].filePath;
      // themeImgName = themeImgName.split("/").pop();
      // alert(themeImgName);
    });
  }
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
.sendBtn {
  margin-top: 20px;
}
.uploadBtn {
  width: 70px;
  height: 140px !important;
  line-height: 200px;
}
.uploadMedia {
  margin: 0 auto;
  border: 1px dashed #dfdfdf;
  position: relative;
  width: 300px;
  height: 200px;
  cursor: pointer;
  input {
    width: 300px;
    height: 200px;
    outline: none;
    opacity: 0;
  }
  p {
    position: absolute;
    bottom: 5%;
    left: 34%;
    color: #409eff;
  }
  .showImg {
    position: absolute;
    width: 300px;
    height: 200px;
  }
  .icon-upload {
    font-size: 120px;
    position: absolute;
    color: #99a9bf;
    top: 10%;
    left: 30%;
  }
}
</style>
