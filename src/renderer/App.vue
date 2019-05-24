<template>
  <div id="app">
    <VueFullScreenFileDrop @drop='onDrop'></VueFullScreenFileDrop>
    <div class="w3-sidebar w3-bar-block  w3-border" style="width:20%">
      <a href="#" class="w3-bar-item w3-button  w3-teal"><span>Menu</span></a>
      <a href="#" class="w3-bar-item w3-button w3-border-bottom" @click="print()"><i class="material-icons md-18">print</i><span> 印刷</span></a>
      <a href="#" class="w3-bar-item w3-button"><i class="material-icons md-18">folder_open</i><span>ファイルを開く(複数選択可能)<br>　　ファイルを直接ドロップ可能</span></a>
    </div>

    <div style="margin-left:25%">
      <Sheet v-for="(userList , index) in userLists" :key="index" :userList="userList"></Sheet>
    </div>
  </div> 
</template>

<script>
  import Sheet from '@/components/Sheet'
  import VueFullScreenFileDrop from 'vue-full-screen-file-drop'
  import 'vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css'
  // const fs = require('fs')
  // const { BrowserWindow, dialog } = require('electron').remote
  const userData = require('./assets/userData.json')
  export default {
    name: 'winshoko-barcode-printer',
    components: {
      Sheet,
      VueFullScreenFileDrop
    },
    data () {
      return {
        userLists: []
      }
    },
    methods: {
      print: function () {
        window.print()
      },
      onDrop (formData, files) {
        console.log(formData) // Can be posted to server
        console.log(files) // Can get access to things like file name and size
      }
    },
    created () {
      [...Array(Math.floor(userData.length / 40))].forEach((_, i) => {
        this.userLists.push([])
      }, this)
      userData.forEach((user, index) => {
        this.userLists[Math.floor(index / 40)].push(user)
      }, this)
    }
  }
</script>

<style>
@font-face {
    font-family: 'STSBAR7';
    src: url('./assets/STSBAR7.woff') format('woff'),
         url('./assets/STSBAR7.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
#app {
    display: flex;
    flex-direction: row;
    font-size: 12px
}
.w3-sidebar .material-icons{
  vertical-align: middle;
}
</style>
