<!-- 班课页面，对应我加入的，面向学生 -->
<template>
  <div>
    <mt-header title="班课">
      <router-link to="/class" slot="left">我加入的/</router-link>
      <router-link to="/classteacher" slot="left">我创建的</router-link>
      <!-- +号界面，对应mounted里功能-->
      <mt-button @click.native="sheetVisible = true" size="large" slot="right">
        <font size="5">+</font>
      </mt-button>
    </mt-header>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div class="infoDiv" v-for="item in classInfo" :key="item.id">
      <router-link :to="{path:'/classdetail',query:{classes_id:item.classesId}}" slot="left">
        <mt-cell title="课程名">{{item.classesName}}</mt-cell>
        <mt-cell title="学校">{{item.school}}</mt-cell>
        <mt-cell title="专业">{{item.department}}</mt-cell>
      </router-link>
    </div>
    <mt-tabbar fixed>
      <mt-tab-item id="班课" to="/class">
        <img slot="icon" src="../assets/cangku.png" />
        <router-link to="/class">班课</router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/yonghu.png" />
        <router-link to="/userinfo">我的</router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
var scan = null;
import Axios from "axios";
export default {
  data() {
    return {
      classInfo: [],
      sheetVisible: false,
      actions: [],
      codeUrl: ""
    };
  },
  activated() {
    this.getClassInfo();
  },
  methods: {
    async getClassInfo() {
      const { data: res } = await this.$axios.get(
        "/app/class/getCurrentusertClass"
      );
      this.classInfo = res.data;
      console.log(this.classInfo);
    },
    create() {
      this.$router.push("/create");
    },

    join() {
      this.$router.push("/join");
    },
    scan(){
      this.$router.push("/scan")
    },
   
    async sign() {
      console.log("调用")
      const { data: res } = await this.$axios.post("/app/sign/startSign", {
        userName: "n29037011",
        classId: 74922,
        type: 0,
        singnNum: 1234567,
        score: 2,
        distance: 100,
        time: 3,
        latitude: 11.11,
        longitude: 22.12
      });
      console.log(res)
    },
  },
  //其中创建班课功能要先判断是否拥有创建班课权限，没有的话提示‘你没有创建班课权限，请联系管理员’，参照云班课里面的提示
  mounted() {
    this.actions = [
      {
        name: "创建班课",
        method: this.create
      },
      {
        name: "使用班课号加入班课",
        method: this.join
      },

      {
        name: "扫一扫加入班课",
        method: this.scan
      }
    ];
  }
};
</script>

<style scoped>
.infoDiv {
  margin-top: 1%;
  /* margin-left: 5%; */
  /* margin-right: 10%; */
  border: 1px solid #96c2f1;
  background: #eff7ff;
}
</style>
