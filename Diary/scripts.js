
// 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();
// 获取 .txt 文件
xhr.open('GET', 'https://liuutin9.github.io/Diary/markdown/20240403.md', true);
// 定义当读取完成时的回调函数
xhr.onload = function() {
  // 确保响应状态为成功
  if (xhr.status === 200) {
    // 将 .txt 文件的内容插入到页面中
    var dataArr = xhr.responseText.split('\n');
    // console.log(dataArr);

    var paragraphList = document.createElement('div');
    paragraphList.setAttribute('class', 'paragraphList');
    paragraphList.setAttribute('id', 'paragraphList');

    var paragraph = document.createElement('div');
    paragraph.setAttribute('class', 'paragraph');

    var date = document.createElement('p');
    date.setAttribute('class', 'paragraphDate');
    date.append(dataArr[0]);
    paragraph.appendChild(date);

    paragraph.appendChild(document.createElement('hr'));

    var title = document.createElement('p');
    title.setAttribute('class', 'paragraphTitle');
    title.append(dataArr[1]);
    paragraph.appendChild(title);

    paragraph.appendChild(document.createElement('br'));

    for (var i = 3; i < dataArr.length; i++) {
        var sentence = document.createElement('p');
        sentence.append(dataArr[i]);
        sentence.setAttribute('class', 'paragraphText');
        paragraph.appendChild(sentence);
    }
    paragraphList.appendChild(paragraph);
    document.body.appendChild(paragraphList);
    // document.getElementById('p1').innerText += xhr.responseText.split('\n');
  }
};
// 发送请求
xhr.send();

// document.getElementById("HW1").onclick = function() {
//     var markdown = "https://liuutin9.github.io/Diary/markdown/20240403.md";
//     var html = marked(markdown);

//     document.getElementById("p1").innerHTML = html;
// }

// let can;
// let result;
// function preload() {
//   result = loadStrings('markdown/20240403.md', (result) =>{
// 	for(txt of result){
// 		console.log(txt);
// 		select("#p1").child(createP(txt));
// 	}
// 	select("#p1").style("padding", "10px");
//   });
// }

// function setup() {

// 	can = createCanvas(200, 200);
// 	can.id("can1");
// 	can.class("c1");
// 	can.style("padding", "10px");
// 	background(0);

// 	fill(255);
// 	textAlign(LEFT, TOP);
//     textSize(24);
// 	text("canvas", 10, 10);
// }