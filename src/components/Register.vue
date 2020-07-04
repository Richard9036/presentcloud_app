<template>
  <div>
    <mt-header title>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="infoDiv">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="editForm.username"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号码" v-model="editForm.mobile"></mt-field>
      <mt-field label="新密码" placeholder="请输入密码" type="password" v-model="editForm.password1"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="editForm.password2"></mt-field>
    </div>
    <mt-button type="primary" @click.native="register" size="large">确定</mt-button>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "Register",
  data() {
    return {
      editForm: {
        username: "",
        mobile: "",
        password1: "",
        password2: ""
      }
    };
  },
  methods: {
    async register() {
      if (this.editForm.password1 == this.editForm.password2) {
        var qs = require("qs");
        let postForm = {
          username: this.editForm.username,
          password: this.editForm.password1,
          mobile: this.editForm.mobile
        };
        const { data: res } = await this.$axios.post(
          "/user/create",
          qs.stringify(postForm)
        );
        console.log(res);
        MessageBox("提示", "注册成功，登陆！");
        this.$router.push("/login");
      } else {
        console.log("密码不同");
        MessageBox("提示", "两次输入的密码需相同");
      }
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  text-decoration: none;
}
</style>
