<template>
  <div id="app">
    <VueFullScreenFileDrop @drop='onDrop'></VueFullScreenFileDrop>
    <div class="w3-sidebar w3-bar-block  w3-border" style="width:20%">
      <a href="#" class="w3-bar-item w3-button  w3-teal"><span>Menu</span></a>
      <a href="#" class="w3-bar-item w3-button w3-border-bottom" @click="print()"><i class="material-icons md-18">print</i><span> 印刷</span></a>
      <a href="#" class="w3-bar-item w3-button" @click="selectFile()"><i class="material-icons md-18">folder_open</i><span>ファイルを開く(複数選択可能)<br>　　ファイルを直接ドロップ可能</span></a>
    </div>

    <div style="margin-left:25%">
      <Sheet v-for="(userList , index) in userListsTest" :key="index" :userList="userList"></Sheet>
    </div>
  </div> 
</template>

<script>
  import Sheet from '@/components/Sheet'
  import VueFullScreenFileDrop from 'vue-full-screen-file-drop'
  import 'vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css'
  const fs = require('fs')
  const { dialog } = require('electron').remote
  const userData = require('./assets/userData.json')
  export default {
    name: 'winshoko-barcode-printer',
    components: {
      Sheet,
      VueFullScreenFileDrop
    },
    data () {
      return {
        userData: [],
        userLists: []
      }
    },
    computed: {
      userListsTest: function () {
        [...Array(Math.floor(this.userData.length / 40))].forEach((_, i) => {
          this.userLists.push([])
        }, this)
        this.userData.forEach((user, index) => {
          this.userLists[Math.floor(index / 40)].push(user)
        }, this)
        return this.userLists
      }
    },
    methods: {
      print: function () {
        // window.print()
        console.log(this.userData)
        console.log(this.userLists)
      },
      loadCsvFiles: function (filePaths) {
        let self = this
        self.userData = []
        if (filePaths.length === 0) return
        filePaths.forEach(filePath => {
          fs.readFile(filePaths[0], {encoding: 'utf8'}, (err, data) => {
            if (!err) {
              let isSkipedHeader = false
              console.log(data)
              data.split('\n').forEach(text => {
                let csv = text.split(',')
                if (csv[0] === 'id番号') isSkipedHeader = true
                if (isSkipedHeader === false) return
                console.log(csv[0])
                self.userData.push({
                  id: csv[0],
                  studentNum: csv[1],
                  name: csv[2]
                })
              })
            }
          })
        })
        console.log(userData)
      },
      onDrop (formData, files) {
        let filePaths = Object.values(files).map(file => file.path).filter(path => path.match(/csv$/))
        console.log(this)
        this.loadCsvFiles(filePaths)
        console.log(filePaths)
      },
      selectFile () {
        let self = this
        dialog.showOpenDialog(null, {
          title: 'Win書庫で出力したファイルを選択してください。複数選択することも可能です',
          defaultPath: '.',
          filters: [{name: 'text file', extensions: ['csv']}],
          properties: ['openFile'],
          multiSelections: true
        }, filePaths => {
          self.loadCsvFiles(filePaths)
        })
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
