<template>
  <div>
    <mt-header title="创建班课">
      <router-link to="/class" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="create">
      <mt-field label="班课名" placeholder="请输入班课名" v-model="Classes.classesName"></mt-field>
      <mt-field label="学校" placeholder="请输入学校" v-model="Classes.school"></mt-field>
      <mt-field label="学院" placeholder="请输入学院" v-model="Classes.department"></mt-field>
      <mt-field label="教师" rows="4" v-model="Classes.teacher_name" disabled></mt-field>
      <mt-field label="教师Id" rows="4" v-model="Classes.teacher_id" disabled></mt-field>
    </div>
    <mt-button type="primary" @click.native="createClass" size="large">创建班课</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Classes: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$axios.get("/user/getCurrentUserApi");
      var iTemp = ~~(Math.random() * 100000);
      this.Classes.classesId = iTemp;
      this.Classes.teacher_name = res.data.nickname;
      this.Classes.teacher_id = res.data.userId;
      console.log(this.Classes);
    },
    async createClass() {
      var qs = require("qs");
      console.log(this.Classes);
      let myclass = this.Classes;
      const { data: res } = await this.$axios
        .post("/app/class/createClass", this.Classes)
        .catch(() => alert("您的角色非教师，权限不足"));
      console.log(res);
      this.$router.push("/class");
    }
  }
};
</script>

<style>
</style>