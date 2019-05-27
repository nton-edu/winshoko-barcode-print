<template>
    <section class="cell">
      <div v-if="user.name !== ''">
        <p>{{user.studentNum[0]+'年'+user.studentNum[1]+'組'+user.studentNum[2]+'番'}}</p>
        <p>{{user.name}}</p>
        <p class="barcode">a9{{user.id}}a</p>
      </div>
    </section>
</template>

<script>
  export default {
    name: 'barcode-cell',
    props: ['user'],
    data () {
      return {
  
      }
    }
  }
</script>

<style>
    .cell{
      width: 50mm;
      height: 29mm;
      text-align: center
    }
    .cell p {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 16px
    }
    .cell p.barcode{
        font-family:'STSBAR7';
        font-size: 30px;
    }

</style>
