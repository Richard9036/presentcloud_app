<template>
  <div>
    <mt-header title="个人信息"></mt-header>
    <div class="infoDiv">
      <mt-field label="旧密码" placeholder="请输入当前密码" type="password" v-model="editForm.prepassword"></mt-field>
      <mt-field label="新密码" placeholder="请输入修改后的密码" type="password" v-model="editForm.password1"></mt-field>
      <mt-field
        label="确认新密码"
        placeholder="请再次输入修改后的密码"
        type="password"
        v-model="editForm.password2"
      ></mt-field>
    </div>
    <mt-button type="primary" @click.native="editPassword" size="large">确定</mt-button>
  </div>
</template>

<script>
import { Cell } from "mint-ui";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      editForm: {
        prepassword: "123456",
        password1: "123456",
        password2: "123456"
      }
    };
  },
  methods: {
    async editPassword() {
      console.log(this.editForm);
      console.log(this.$route.query);
      if (this.editForm.password1 == this.editForm.password2) {
        var qs = require("qs");
        console.log("密码相同");
        let postForm = {
          username: this.$route.query.name+'',
          passwordold:this.editForm.prepassword,
          passwordnew: this.editForm.password1
        };
        console.log(postForm);
        const { data: res } = await this.$axios.post(
          "/user/forgetpassword",
          qs.stringify(postForm)
        );
        console.log(res);
        MessageBox("提示", "修改密码成功，重新登陆！");
        //密码修改后重新登陆
        this.cookie.clearCookie("token");
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