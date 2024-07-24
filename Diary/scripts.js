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
    "20240404.md",
    "20240415.md",
    "20240419.md",
    "20240425.md",
    "20240426.md",
    "20240429.md",
    "20240504.md",
    "20240508.md",
    "20240509.md",
    "20240610.md",
    "20240718.md",
];

var xhr = [];
for (var i = 0; i < filesName.length; i++) xhr.push(new XMLHttpRequest());

var paragraphList = document.createElement('div');
paragraphList.setAttribute('class', 'paragraphList');

for (var i = 0; i < filesName.length; i++) {
    
    console.log('https://liuutin9.github.io/Diary/markdown/' + filesName[i]);
    xhr[i].open('GET', 'https://liuutin9.github.io/Diary/markdown/' + filesName[i], true);

    xhr[i].onload = function() {

        var it = xhr.indexOf(this);

        if (this.status === 200) {
            
            var dataArr = this.responseText.split('\n');
            var paragraph = document.createElement('div');
            paragraph.setAttribute('class', 'paragraph');

            for (var i = 0; i < dataArr.length; i++) {

                if (dataArr[i].includes("### ")) {
                    var title = document.createElement('p');
                    title.setAttribute('class', 'paragraphTitle');
                    title.append(dataArr[i].substring(4, dataArr[i].length));
                    paragraph.appendChild(title);
                }

                else if (dataArr[i].includes("## ")) {
                    var date = document.createElement('p');
                    date.setAttribute('class', 'paragraphDate');
                    date.append(dataArr[i].substring(3, dataArr[i].length));
                    paragraph.appendChild(date);
                    paragraph.appendChild(document.createElement('hr'));
                }

                else if (dataArr[i].length == 0) {
                    paragraph.appendChild(document.createElement('br'));
                }

                else {
                    var sentence = document.createElement('p');
                    sentence.append(dataArr[i]);
                    sentence.setAttribute('class', 'paragraphText');
                    paragraph.appendChild(sentence);
                }

            }

            paragraph.setAttribute('style', 'order: ' + (-(it * 2 + 1)) + ';');
            paragraphList.appendChild(paragraph);
            
        }
    };

    xhr[i].send();
    
}

document.body.appendChild(paragraphList);
document.body.appendChild(document.createElement('br'));