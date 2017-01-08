window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.js');

const {remote, ipcRenderer}  = require('electron');
const {BrowserWindow} = remote;
const fs = require('fs');
const dataPath = "./data/"
//const dataPath = "./resources/app/data/"


//상단 매뉴 버튼
function newSticky(){
   ipcRenderer.send('newSticky');
}

//스티커 저장하고 닫기
function hideSticky() {
  let currentWindow = remote.getCurrentWindow();
  let title = currentWindow.getTitle();

  if(title != ""){
    let jsonData = makeFileJson();
    fs.writeFileSync(dataPath + title, jsonData);

    window.close();
  }else{
    let jsonData = makeFileJson();
    let opt = {
      encoding : 'utf-8',
    }

    ipcRenderer.send('saveClose', jsonData);
  }
}

ipcRenderer.on('saveCloseComplete', (event, msg) => {
  window.close();
});

//스티커 영구 삭제
function deleteSticky(){
  let currentWindow = remote.getCurrentWindow();
  let title = currentWindow.getTitle();
  if(confirm("영구 삭제하시겠습니까?")){
      fs.unlinkSync(dataPath + title);
      window.close();
  }
}

//스티커 저장하기
ipcRenderer.on('saveComplete', (event, title) => {
  let currentWindow = remote.getCurrentWindow();
  currentWindow.setTitle(title);

  $(".glyphicon-trash").show();
});

//앱 사이즈 변경
function setComponentRatio(){
  console.log("화면 크기 설정");
  let bodyHeight = $("body").height();
  let pagerHeight = $(".pager").height();

  console.log(bodyHeight, pagerHeight)

  $("#my-textarea").height(bodyHeight - pagerHeight - 12);
}

//저장 데이터 만들기
function makeFileJson(){
 let content = $("#my-textarea").val();
 let bodyHeight = $("body").height();
 let bodyWidth = $("body").width();
 let currentWindow = remote.getCurrentWindow();

 let object = {
     position : currentWindow.getPosition(),
     size : [bodyWidth,bodyHeight],
     content : content
 }

 let jsonData = JSON.stringify(object);

 return jsonData;
}

//앱 초기화
$("document").ready(function(){
  $(window).keypress(function(event) {
      if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;

      let currentWindow = remote.getCurrentWindow();
      let title = currentWindow.getTitle();

      if(title != ""){
        let jsonData = makeFileJson();
        fs.writeFileSync(dataPath + title, jsonData);
      }else{
        let content = $("#my-textarea").val();
        ipcRenderer.send('save', content);
      }

      event.preventDefault();
      return false;
  });

  //파일 로드
  let currentWindow = remote.getCurrentWindow();
  let title = currentWindow.getTitle();

  if(title != ""){
      let content = fs.readFileSync(dataPath + title,{
        encoding : "utf8"
      });

      var obj = JSON.parse(content);
      $("#my-textarea").val(obj.content);
      currentWindow.setSize(obj.size[0], obj.size[1]);
      currentWindow.setPosition(obj.position[0], obj.position[1]);
  }else{
    $(".glyphicon-trash").hide();
  }

  //사이즈 변경
  setComponentRatio();
})
