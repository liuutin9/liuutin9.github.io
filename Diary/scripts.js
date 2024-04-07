const filesName = [
    "20231206.md",
    "20231208.md",
    "20231214.md",
    "20231231.md",
    "20240112.md",
    "20240116.md",
    "20240125.md",
    "20240205.md",
    "20240212.md",
    "20240222.md",
    "20240306.md",
    "20240307.md",
    "20240309.md",
    "20240311.md",
    "20240317.md",
    "20240325.md",
    "20240329.md",
    "20240330.md",
    "20240401.md",
    "20240402.md",
    "20240403.md",
];

// var reader = new FileReader();
// var file = files[0]; //files为上传组件获取的地址
// reader.readAsText(file, 'utf-8');
// reader.onload = function(){
//     reader.result.split('\n').forEach(function(v, i){
//         console.log(v);
//     });
// };
// reader.onerror = function(){
//     console.log('读取失败');
//     console.log(reader.error);
// };

// 创建 XMLHttpRequest 对象
var xhr = [];
// var paras = new Map();
for (var i = 0; i < filesName.length; i++) xhr.push(new XMLHttpRequest());
var paragraphList = document.createElement('div');
paragraphList.setAttribute('class', 'paragraphList');
// paragraphList.setAttribute('id', 'paragraphList');



for (var i = 0; i < filesName.length; i++) {
    // 获取 .txt 文件
    console.log('https://liuutin9.github.io/Diary/markdown/' + filesName[i]);
    xhr[i].open('GET', 'https://liuutin9.github.io/Diary/markdown/' + filesName[i], true);

    // 定义当读取完成时的回调函数
    xhr[i].onload = function() {
        // 确保响应状态为成功
        var it = xhr.indexOf(this);
        if (this.status === 200) {
            // console.log("it = " + it);
            // 将 .txt 文件的内容插入到页面中
            var dataArr = this.responseText.split('\n');
            // console.log(dataArr);

            var paragraph = document.createElement('div');
            paragraph.setAttribute('class', 'paragraph');

            // var title = document.createElement('p');
            // title.setAttribute('class', 'paragraphTitle');
            // title.append(dataArr[1]);
            // paragraph.appendChild(title);

            // paragraph.appendChild(document.createElement('br'));

            for (var i = 0; i < dataArr.length; i++) {
                // console.log(dataArr[i]);
                // console.log(dataArr[i].length);
                if (dataArr[i].includes("### ")) {
                    var title = document.createElement('p');
                    title.setAttribute('class', 'paragraphTitle');
                    title.append(dataArr[i].substring(4, dataArr[i].length));
                    // if (i != 1) paragraph.appendChild(document.createElement('br'));
                    paragraph.appendChild(title);
                    // paragraph.appendChild(document.createElement('br'));
                }
                else if (dataArr[i].includes("## ")) {
                    var date = document.createElement('p');
                    date.setAttribute('class', 'paragraphDate');
                    date.append(dataArr[i].substring(3, dataArr[i].length));
                    paragraph.appendChild(date);

                    paragraph.appendChild(document.createElement('hr'));
                }
                else if (dataArr[i].length == 0) {
                    // console.log(dataArr[i]);
                    paragraph.appendChild(document.createElement('br'));
                }
                else {
                    var sentence = document.createElement('p');
                    sentence.append(dataArr[i]);
                    sentence.setAttribute('class', 'paragraphText');
                    paragraph.appendChild(sentence);
                }
                    
            }
            // paras[it] = paragraph;
            // console.log(paras[it]);
            // paras.set(it, paragraph);
            // console.log(paras.get(it));
            // console.log(paras.size);
            // console.log(filesName.length);
            paragraph.setAttribute('style', 'order: ' + (-(it * 2 + 1)) + ';');
            // var newLine = document.createElement('br');
            // newLine.setAttribute('style', 'order: ' + (it * 2) + ';');
            // paragraphList.appendChild(newLine);
            paragraphList.appendChild(paragraph);
            // console.log(paragraphList);
            // paras.append(i.toString, paragraph);
            
            // document.getElementById('p1').innerText += xhr.responseText.split('\n');
            
        }
    };
    // 发送请求
    xhr[i].send();
}

// while (paras.size != filesName.length) console.log("false");
// console.log("true");

// for (var i = 0; i < paras.size; i++) {
//     console.log(i);
//     paragraphList.appendChild(document.createElement('br'));
//     paragraphList.appendChild(paras[i]);
// }

document.body.appendChild(paragraphList);
document.body.appendChild(document.createElement('br'));