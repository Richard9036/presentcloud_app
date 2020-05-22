<template>
<div>
        <mt-header title="班课详情">
        <router-link to="/class" slot="left">
          <mt-button icon="back">班课</mt-button>
        </router-link>
      </mt-header>
   <router-link to="/signed" slot="left">
    <mt-button >进行签到</mt-button>
  </router-link>
      <mt-cell title="当前获得经验值为" :value='experience'></mt-cell>
       <mt-cell title="班课人数" :value='number'></mt-cell>


       
     <mt-cell title="成员列表" ></mt-cell>
  
      <mt-cell v-for="(item,index) in list" :key="index" :title="index+1 +' ' + item.name"  :value="'经验值 ' + item.experience"    />


     
 </div>     
</template>

<script>
export default {
data(){
  return{
        experience:52,
        number:150,
        list:
          [
            {
              name:'王小名',
              experience:'52',
            },
            {
              name:'王小',
              experience:'50',
            },
            {
              name:'小名',
              experience:'48',
            },
          ]
        
       
  };
}
}
</script>

<style>

</style>