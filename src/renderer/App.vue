<template>
  <div id="app">
    <VueFullScreenFileDrop @drop='onDrop'></VueFullScreenFileDrop>
    <div class="w3-sidebar w3-bar-block  w3-border" style="width:20%">
      <a href="#" class="w3-bar-item w3-button  w3-teal"><span>Menu</span></a>
      <a href="#" class="w3-bar-item w3-button w3-border-bottom" @click="print()"><i class="material-icons md-18">print</i><span> 印刷</span></a>
      <a href="#" class="w3-bar-item w3-button" @click="selectFile()"><i class="material-icons md-18">folder_open</i><span>ファイルを開く(複数選択可能)<br>　　ファイルを直接ドロップ可能</span></a>
    </div>

    <div class="contents">
      <Sheet v-for="(userList , index) in userLists" :key="index" :userList="userList"></Sheet>
    </div>
  </div> 
</template>

<script>
  import Sheet from '@/components/Sheet'
  import VueFullScreenFileDrop from 'vue-full-screen-file-drop'
  import 'vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css'
  const fs = require('fs')
  const { dialog } = require('electron').remote
  const iconv = require('iconv-lite')
  const jschardet = require('jschardet')
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
    computed: {

    },
    methods: {
      print: function () {
        window.print()
      },
      loadCsvFiles: function (filePaths) {
        if (filePaths.length === 0) return
        let self = this
        self.userLists = []
        let i = 0
        let beforeStudentSheetNum = 0
        filePaths.forEach(filePath => {
          fs.readFile(filePath, (err, data) => {
            if (!err) {
              let isSkipedHeader = false
              let {encoding} = jschardet.detect(data)
              iconv.decode(Buffer.from(data), encoding).split('\n').forEach(text => {
                let csv = text.split(',')
                if (csv[0] === '番号：') {
                  isSkipedHeader = true
                  return
                }
                // Win書庫で吐き出されるCSVは先頭行にフィールドがないためスキップする
                if (isSkipedHeader === false || !csv[0]) return
                if (i % 39 === 0) self.userLists.push([])
                // １クラス10人に合わせるために、空の配列を追加
                let studentNum = csv[2].match(/(\d+)\D$/)[1]
                if (beforeStudentSheetNum !== 0 && (studentNum === '1' || studentNum === '01') {
                  [...Array(10 - beforeStudentSheetNum)].forEach(element => {
                    self.userLists[Math.floor(i++ / 40)].push({id: csv[i], studentNum: [], name: ''})
                    if (i % 39 === 0) self.userLists.push([])
                  })
                }
                self.userLists[Math.floor(i++ / 40)].push({
                  id: csv[1],
                  studentNum: csv[2].split(/\D+/g),
                  name: csv[3]
                })
                beforeStudentSheetNum = studentNum
              })
            }
          })
        })
      },
      onDrop (formData, files) {
        let filePaths = Object.values(files).map(file => file.path).filter(path => path.match(/csv$/))
        this.loadCsvFiles(filePaths)
      },
      selectFile () {
        let self = this
        dialog.showOpenDialog(null, {
          title: 'Win書庫で出力したファイルを選択してください。複数選択することも可能です',
          defaultPath: '.',
          filters: [{name: 'text file', extensions: ['csv']}],
          properties: ['openFile', 'multiSelections']
        }, filePaths => {
          self.loadCsvFiles(filePaths)
        })
      }
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
.contents {
  margin-left: 25%
}
@media screen {
  body {
    background: #eee;
  }
  .sheet {
    background: white; /* 背景を白く */
    box-shadow: 0 .5mm 2mm rgba(0,0,0,.3); /* ドロップシャドウ */
    margin: 5mm;
  }
}
@media print {
  .w3-sidebar {
    visibility: hidden;
  }
  .contents {
    margin-left: 0%
  }
} 
</style>
