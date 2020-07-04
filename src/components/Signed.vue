<template>
  <div>
    <mt-header title="进行签到">
      <router-link to="/classdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <br />
    <!-- 需要把定位信息传给后台 -->
    <!-- 1.老师没有发起签到，传回‘老师未发起签到，请稍后再试’ 2.老师发起了签到，距离超过设定距离，‘与老师距离过远，签到失败’ ，3.老师发起了签到，距离在设定范围内,查询场次记录表没有该场次签到，存入数据库中,并将班课表中该班课对应的该生经验值加上老师设定的经验值,‘签到成功’ 4.老师发起了签到，距离在设定范围内,查询场次记录表存在该场次签到‘已成功签到，请勿重复签到’-->
    <mt-button type="primary" @click="sign">参与签到</mt-button>
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
      signInfo: {}
    };
  },
  activated() {
    this.getPosition();
    this.getSignInfo();
    // this.getUserInfo();
    this.getHisSigned();
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
      this.signInfo.classid = Number(this.$route.query.classes_id);
      console.log(this.signInfo);
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
    },
    async sign() {
      console.log("开始签到");
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/app/sign/studentSign",
        qs.stringify({
          classid: this.signInfo.classid,
          latitude: this.signInfo.latitude,
          longitude: this.signInfo.longitude
        })
      );
      alert(res.msg);
      this.getHisSigned();
      console.log(res);
    },
    async getHisSigned() {
      const { data: res1 } = await this.$axios.get("/user/getCurrentUserApi");
      this.signInfo.username = res1.data.name.toString();
      var qs = require("qs");
      console.log({
        username: this.signInfo.username + "",
        classid: this.signInfo.classid + ""
      });
      const { data: res } = await this.$axios.post(
        "/app/sign/findCurrentUsersign",
        qs.stringify({
          username: this.signInfo.username,
          classid: this.signInfo.classid
        })
      );
      this.list = res.data;
      console.log("签到记录");
      console.log(this.list);
    }
    // async getUserInfo() {
    //   const { data: res } = await this.$axios.get("/user/getCurrentUserApi");
    //   this.signInfo.username = res.data.name;
    // }
  }
};
</script>

<style>
</style>