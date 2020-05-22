<template>
    <div>
      <mt-header  title="班课">
  <router-link to="/class" slot="left">
      我加入的      
  </router-link>
      
    <router-link to="/classteacher" slot="left">
    我创建的  
  </router-link>
   <mt-button @click.native="sheetVisible = true" size="large" slot="right">
     <font size="5">+</font>
     </mt-button>
</mt-header>
<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>


    <router-link to="/classdetail" slot="left">
    <mt-cell title="工程实践"></mt-cell>
    <mt-cell title="池志标"></mt-cell>
    <mt-cell title="计算机技术"></mt-cell>
    </router-link>

    <!-- 全局引入有跨域问题，先暂时使用一下局部 -->
     <button @click="getData">测试axios</button>


          <mt-tabbar v-model="selected">
    
  <mt-tab-item id="班课">
    <router-link to="/class">
    班课</router-link>
  </mt-tab-item>
  <mt-tab-item id="我的">
    <router-link to="/">
    我的
    </router-link>
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data() {
      return {
        sheetVisible: false,
        actions: []
      };
    },

    methods: {
      create() {
        this.$router.push("/create");
      },

      join() {
        this.$router.push("/join");
      },

        getData() {
      Axios.get('https://www.easy-mock.com/mock/5c10e14fbe3cc90fa1b1706a/boke/api/use-axios')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("111111");
        });

    }



    },

    mounted() {
      this.actions = [{
        name: '创建班课',
        method: this.create
      }, {
        name: '使用班课号加入班课',
        method: this.join
      }];
    }
}
</script>

<style>

</style>