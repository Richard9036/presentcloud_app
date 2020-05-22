<template>
  <div>
    <mt-header title>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="imgDiv">
      <img src="..\assets\logo.png" alt class="logo" />
    </div>
    <div class="operateDiv">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="loginForm.username" class="myinput"></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        type="password"
        v-model="loginForm.password"
        class="myinput"
      ></mt-field>
      <div class="registerDiv">
        <span>免费注册</span>
      </div>
      <mt-button type="primary" @click.native="login" size="large">登录</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    async login() {
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/login",
        qs.stringify(this.loginForm)
      );
      // const { data: res } = await this.$axios.get("/user/findAllUsersGoPage");
      //   console.log(res);
      if (res.code != 0) {
        MessageBox("提示", "服务器错误");
      } else {
        MessageBox("提示", "登录成功");
        // let loginInfo = {
        //   token: res.token
        // };
        // this.cookie.setCookie(loginInfo, 30);
        console.log(this.cookie.getCookie("sid"));
        // window.localStorage.setItem("sid", res.token);
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
/* 操作区域的样式*/
.operateDiv {
  padding-left: 20px;
  padding-right: 20px;
}
/* 输入框边距 */
.myinput {
  margin-top: 30px;
}
/* 上面的线隐藏 */
.mint-cell-wrapper {
  background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 0%);
}
/* 输入框底边框样式 */
.mint-cell-wrapper {
  border-bottom: 1px solid #007bff;
}
.imgDiv {
  padding-top: 20%;
  display: flex;
  justify-content: center;
}
/* 图片样式 */
.logo {
  width: 75%;
  height: 75%;
}
/* 免费注册根样式 */
.registerDiv {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5%;
}
/* 免费注册字体样式*/
.registerDiv span {
  color: #555;
}
/* 同上 */
.mint-button--primary {
  border-radius: 25px;
  height: 48px;
}
</style>