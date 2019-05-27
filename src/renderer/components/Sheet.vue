<template>
    <section class="sheet" v-if="!!userList.length">
        <BarcodeCell v-for="user in userList" :key="user.id" :user="user" />
    </section>
</template>

<script>
 import BarcodeCell from './BarcodeCell'
 export default {
   name: 'sheet',
   props: ['userList'],
   components: {BarcodeCell},
   data () {
     return {
 
     }
   }
 }
</script>

<style>
  .sheet {
    width: 210mm;
    height: 296mm;
    padding-top: 5mm;
    padding-left: 3.5mm;
    page-break-after: always;
    display: flex;
    flex-direction: column;;
    flex-wrap: wrap;
  }
</style>
