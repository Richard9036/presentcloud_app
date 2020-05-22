<template>
<div>
        <mt-header title="班课详情">
        <router-link to="/class" slot="left">
          <mt-button icon="back">班课</mt-button>
        </router-link>   
      </mt-header>
        <router-link to="/signedteacher" slot="left">
    <mt-button >发起签到</mt-button>
  </router-link>
   <mt-cell title="班课人数">{{number}}</mt-cell>
         <mt-cell title="成员列表" ></mt-cell>
  
      <mt-cell v-for="(item,index) in list" :key="index" :title="index+1 +' ' + item.name"  :value="'经验值 ' + item.experience"    />
 </div>     
</template>

<script>
export default {
data(){
  return{
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