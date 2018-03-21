<template>
  <section class="container" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div>
      <el-row>
        <el-col :span="24">
          <el-tabs type="border-card">
            <el-tab-pane label="文字消息">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="message">
              </el-input>
              <el-button type="primary" @click="showSend('text')" plain class="sendBtn">发送</el-button>
            </el-tab-pane>
            <el-tab-pane label="图片消息">
              <form id="themeForm" action="/api/sendMedia" target="submitFrame" method="post" enctype="multipart/form-data">
                <iframe id="submitFrame" style="display: none;width:0; height:0" name="submitFrame" src="about:blank"></iframe>
                <div class="uploadMedia">
                  <p>点击上传图片</p>
                  <i class="icon-upload iconfont icon-ic_cloud_upload" v-if="!mediaMessage.imgMedia"></i>
                  <img class="showImg" :src="mediaMessage.imgMedia" alt="" v-if="mediaMessage.imgMedia">
                  <input v-for="item in checkList" :name="item" :key="item" :value="item" type="hidden" />
                  <input accept="image/png,image/jpg" id="imgMedia" name="image" @change="uploadFiles" type="file" />
                </div>
                <br />
                <el-button type="primary" @click="showSend('media')" plain>发送</el-button>
              </form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-dialog title="选择接收信息对象" :visible.sync="dialogVisible" width="50%">
        <el-checkbox-group v-model="checkList" size="small">
          <el-checkbox :label="item?item:'群聊'" border v-for="item in rooms" :key="item.id"></el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="type=='text'" type="primary" @click="sendText">确 定</el-button>
          <el-button v-if="type=='media'" type="primary" @click="sendMedia">确 定</el-button>
        </span>
      </el-dialog>
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
      dialogVisible: false,
      mediaMessage: {
        imgMedia: null
      },
      rooms: [],
      loading: false,
      type: "text"
    };
  },
  methods: {
    initData() {
      this.checkList = [];
      this.message = "";
      this.mediaMessage.imgMedia = null;
    },
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
    readFile(e) {
      console.log(e);
      let id = e.target.id;
      this.file = e.target.files[0];
    },
    showSend(e) {
      let that = this;
      that.type = e;
      if (
        (e == "text" && that.message) ||
        (e == "media" && that.mediaMessage.imgMedia)
      ) {
        that.loading = true;
        api.getRooms().then(rooms => {
          that.rooms = rooms;
          that.loading = false;
          that.dialogVisible = true;
          console.log("rooms:", rooms);
        });
      }
    },
    sendText() {
      console.log("text");
      console.log("checklist:", this.checkList);
      api
        .sendText({ message: this.message, rooms: this.checkList })
        .then(res => {
          if (res.message) {
            this.dialogVisible = false;
            this.initData();
          }
        });
    },
    sendMedia() {
      console.log("media");
      console.log("checklist:", this.checkList);
      if (this.mediaMessage.imgMedia) {
        $("#themeForm").submit();
      }
    }
  },
  async mounted() {
    let that = this;
    $("#themeForm").ajaxForm(function(data) {
      console.log("data:", data);
      that.dialogVisible = false;
      that.initData();
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
.el-checkbox {
  margin-left: 10px;
  margin-bottom: 15px;
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
    font-size: 14px;
    position: absolute;
    bottom: 10%;
    left: 36%;
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
