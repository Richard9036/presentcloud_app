<template>
<div>
        <mt-header title="加入班课">
        <router-link to="/class" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        
          <mt-button slot="right">下一步</mt-button>
        
      </mt-header>
      <mt-field label="班课号" placeholder="请输入班课号" type="class_id"></mt-field>
 </div>     
</template>

<script>
export default {

}
</script>

<style>

</style>