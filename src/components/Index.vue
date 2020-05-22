<template>
  <div>
    <mt-header title="个人信息"></mt-header>
    <div class="infoDiv">
      <mt-cell title="姓名" v-model="userInfo.name"></mt-cell>
      <mt-cell title="性别" v-model="userInfo.sex"></mt-cell>
      <mt-cell title="电话号码" v-model="userInfo.tel"></mt-cell>
      <mt-cell title="创建时间" v-model="userInfo.creationdate"></mt-cell>
      <mt-cell title="最后修改时间" v-model="userInfo.modificationdate"></mt-cell>
      <mt-cell title="修改密码" :to="{path:'/editpassword',query:{name:userInfo.name}}" is-link></mt-cell>
    </div>
    <mt-button type="primary" @click.native="logout" size="large">退出登录</mt-button>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="班课">
        <router-link to="/class">班课</router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <router-link to="/">我的</router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Cell } from "mint-ui";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
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
    async getUserInfo() {
      const { data: res } = await this.$axios.get("/user/getCurrentUserApi");

      if (res.code != 200) {
        MessageBox("提示", "获取用户列表失败");
      } else {
        this.userInfo = res.data;
        console.log(this.userInfo);
        this.userInfo.creationdate = this.dateFormat(
          this.userInfo.creationdate
        );
        this.userInfo.modificationdate = this.dateFormat(
          this.userInfo.modificationdate
        );
        console.log(this.userInfo);
      }
    },
    //退出登录
    logout() {
      this.cookie.clearCookie("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.infoDiv {
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
  border: 1px solid #96c2f1;
  background: #eff7ff;
  border-radius: 5px;
}
</style>