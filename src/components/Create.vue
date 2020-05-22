<template>
  <div>
        <mt-header title="创建班课">
        <router-link to="/class" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        
          <mt-button slot="right">下一步</mt-button>
        
      </mt-header>

    <div class="create">
      <mt-field label="班课名" placeholder="请输入班课名" type="class_name"></mt-field>
      <mt-field label="学校" placeholder="请输入学校" type="school"></mt-field>
      <mt-field label="学院" placeholder="请输入学院" type="college"></mt-field>
      <mt-field label="专业" placeholder="请输入专业" type="profession"></mt-field>
      <mt-field label="描述" placeholder="请输入班课描述" type="description" rows="4"></mt-field>
      
    </div>
 </div>  
</template>

<script>
export default {

}
</script>

<style>

</style>