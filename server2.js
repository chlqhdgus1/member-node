var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"))
app.use(app.router);

app.all("/list",function(request,response){
  response.send("<h1>글목록보기</h1>");
})

app.all("/write",function(request,response){
  response.send("<h1>글작성하기</h1>");
})

app.all("/update",function(request,response){
  response.send("<h1>글수정하기</h1>");
})

http.createServer(app).listen(52273,function(){
  console.log("서버를 가동하였습니다.");
});
