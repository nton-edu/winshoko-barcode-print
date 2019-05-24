<template>
    <section class="cell">
        <p>{{user.studentNum}}</p>
        <p>{{user.name}}</p>
        <p class="barcode">a9{{user.id}}a</p>
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
