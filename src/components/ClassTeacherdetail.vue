<template>
  <div>
    <mt-header title="班课详情">
      <router-link to="/class" slot="left">
        <mt-button icon="back">班课</mt-button>
      </router-link>
    </mt-header>
    <router-link :to="{path:'/signedteacher',query:{classes_id:this.classes_id}}" slot="left">
      <mt-button>发起签到</mt-button>
    </router-link>
    <router-link :to="{path:'/code',query:{classes_id:this.classes_id}}" slot="right">
      <mt-button>班级二维码</mt-button>
    </router-link>
    <!-- 后台传该生该班课的经验值  -->
    <!-- <mt-cell title="当前获得经验值为" :value="experience"></mt-cell> -->
    <!-- 后台传该班课所有人数  -->
    <mt-cell title="班课人数" :value="studentList.length"></mt-cell>
    <mt-cell title="班课ID" :value="classes_id"></mt-cell>
    <mt-cell title="成员列表"></mt-cell>
    <!-- 后台传该班课所有人经验与姓名(按经验值倒序排好序再传过来)，通过班课号来搜班课表里数据  -->
    <mt-cell
      v-for="(item,index) in studentList"
      :key="index"
      :title="index+1 +'  ' + item.name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      classes_id: "",
      studentList: []
    };
  },
  activated() {
    this.getClassInfo();
  },
  methods: {
    async getClassInfo() {
      var qs = require("qs");
      //console.log(this.$route.query);
      this.classes_id = this.$route.query.classes_id + "";

      const { data: res } = await this.$axios.post(
        "/webClass/findAllUserInCurrentClass",
        qs.stringify({ classes_id: this.classes_id.toString() })
      );

      console.log(res);
      this.studentList = res.data;
    }
  }
};
</script>

<style>
</style>