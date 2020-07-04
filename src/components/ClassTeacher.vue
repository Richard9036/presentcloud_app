
<!-- 班课页面，对应我创建的，面向教师，绝大部分与class相同，改完class后复制一样的就行 -->
<template>
  <div>
    <mt-header title="班课">
      <router-link to="/class" slot="left">我加入的/</router-link>
      <router-link to="/classteacher" slot="left">我创建的</router-link>
      <mt-button @click.native="sheetVisible = true" size="large" slot="right">
        <font size="5">+</font>
      </mt-button>
    </mt-header>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>

    <div class="infoDiv" v-for="item in classInfo" :key="item.id">
      <router-link :to="{path:'/classteacherdetail',query:{classes_id:item.classesId}}" slot="left">
        <mt-cell title="课程名">{{item.classesName}}</mt-cell>
        <mt-cell title="学校">{{item.school}}</mt-cell>
        <mt-cell title="专业">{{item.department}}</mt-cell>
      </router-link>
    </div>
    <mt-tabbar fixed>
      <mt-tab-item id="班课">
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
export default {
  data() {
    return {
      classInfo: [],
      sheetVisible: false,
      actions: []
    };
  },
  activated() {
    this.getClassInfo();
  },
  methods: {
    create() {
      this.$router.push("/create");
    },

    join() {
      this.$router.push("/join");
    },
    async getClassInfo() {
      const { data: res } = await this.$axios.get(
        "/app/class/getCurrentUserCreateClass"
      );
      this.classInfo = res.data;
      console.log(this.classInfo);
    },
     scan(){
      this.$router.push("/scan")
    },
  },

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

<style>
.infoDiv {
  margin-top: 1%;
  /* margin-left: 5%; */
  /* margin-right: 10%; */
  border: 1px solid #96c2f1;
  background: #eff7ff;
}
</style>