<template>
  <div>
    <mt-header title="发起签到">
      <router-link to="/classteacherdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="签到限时：" placeholder="请输入限制时间" v-model="signInfo.time"></mt-field>
    <mt-button type="primary" @click="sign">发起签到</mt-button>
    <mt-cell title="当前经度：">{{this.signInfo.longitude}}°</mt-cell>
    <mt-cell title="当前纬度：">{{this.signInfo.latitude}}°</mt-cell>
    <mt-cell title="历史签到记录"></mt-cell>
    <mt-cell
      v-for="(item,index) in list"
      :key="index"
      :title="index+1 +'  ' + item.userName"
      :value="'签到时间 ' + dateFormat(item.signTime)"
    />
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      signInfo: {
        time: ""
      }
    };
  },
  activated() {
    this.getPosition();
    this.getSignInfo();
  },
  methods: {
    //时间格式化
    dateFormat(data) {
      var date = data;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    async getSignInfo() {
      const { data: res } = await this.$axios.get("/user/getCurrentUserApi");
      this.signInfo.userName = res.data.name;
      this.signInfo.classId = this.$route.query.classes_id;

      var qs = require("qs");
      var class_id = this.signInfo.classId;
      console.log("传参:---------------");
      console.log(this.$route.query);
      console.log(class_id);
      console.log("传参:++++++++++++++++++");
      const { data: res1 } = await this.$axios
        .post("/app/sign/findAll", qs.stringify({ classid: class_id }))
        .catch(() => console.log("promise catch err"));
      console.log("结束++++++++++++++++++++++++");
      console.log(res1);
      this.list = res1.data;
    },
    async sign() {
      console.log("调用");
      const { data: res } = await this.$axios
        .post("/app/sign/startSign", {
          userName: this.signInfo.userName,
          classId: this.signInfo.classId,
          type: 0,
          singnNum: 1234567,
          score: 2,
          distance: 100,
          time: this.signInfo.time,
          latitude: this.signInfo.latitude,
          longitude: this.signInfo.longitude
        })
        .catch(() => alert("您的角色非教师，权限不足"));
      console.log(res);
      if (res.code == 200) {
        alert("发起签到成功");
      }
      this.getSignInfo();
    },
    getPosition() {
      var _this = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          //locationSuccess 获取成功的话
          function(position) {
            _this.getLongitude = position.coords.longitude; //position就是我们通过api获取的信息，而我们想获取的经纬度就在coords下，随后将经纬度分别赋值给外部data设定好的变量
            _this.getLatitude = position.coords.latitude; //记住如果这里直接写this可能会导致找不到外部的变量而报错，所以提前设置一下this的指向
            // alert(this.signInfo.longitude); //弹出经度测试
            // alert(this.signInfo.latitude); //弹出经度测试
            _this.signInfo.longitude = _this.getLongitude;
            _this.signInfo.latitude = _this.getLatitude;
          }, //locationError  获取失败的话
          function(error) {
            var errorType = [
              "您拒绝共享位置信息",
              "获取不到位置信息",
              "获取位置信息超时"
            ];
            alert(errorType[error.code - 1]);
          }
        );
      }

      console.log(this.signInfo);
    }
  }
};
</script>

<style>
</style>