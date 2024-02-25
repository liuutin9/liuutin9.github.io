'use strict';
var n = document.getElementById("name");
var IDNumber = document.getElementById("IDNumber");
var ord = document.getElementById("order");

function showMe(condition) {
	document.getElementById("na").innerHTML = condition + '<br>';
}

function node(order, name, id){
	this.order = parseInt(order);
	this.name = name;
	this.id = id;
	this.next = null;
};

let length = 0;
let head = null;

function clear() {
	document.getElementById("name").value = '';
	document.getElementById("IDNumber").value = '';
	document.getElementById("order").value = '';
}

function printF() {
	console.log(length);
	let str = print(head,'');
	document.getElementById("list").innerHTML = '<table>'+str+'</table>';
};

function print(index,str) {
	if (index != null){
		str += '<tr><td>'+index.order + '</td><td>' + index.name + '</td><td>' + index.id + '</td></tr>';
		str = print(index.next,str);
	}
	return str;
}

//掛號
function add () {
	if (ord.value == '' || n.value == '' || IDNumber.value == '') {
		var con = document.getElementById('na');
		con.style.color = "red";
		showMe("Failed");
		return;
	}
    //掛第一號的情況
	let p = new node(ord.value, n.value, IDNumber.value);
    if (length == 0) {
        head = p;
    }
	else if (p.order < head.order){
		if (p.name == head.name && p.id == head.id) {
			var con = document.getElementById('na');
			con.style.color = "red";
			showMe("Failed");
			return;
		}
		p.next = head;
		head = p;
	}
	else if (length == 1) {
		if (p.name == head.name && p.id == head.id) {
			var con = document.getElementById('na');
			con.style.color = "red";
			showMe("Failed");
			return;
		}
		head.next = p;
	}
    //掛其他號的情況
    else {
		let curr = head;
		let pre_curr = null;
		//避免重複新增
        for (let i=0; i<length; i++) {
            if (curr.order <= p.order) {
				pre_curr = curr;
            	curr = curr.next;
			}
			else {
				if(pre_curr.name == p.name && pre_curr.id == p.id) {
					var con = document.getElementById('na');
					con.style.color = "red";
					showMe("Failed");
					return;
				}
				break;
			}
        }
		p.next = curr;
		pre_curr.next = p;
    }
	length += 1;
	printF();
	var con = document.getElementById('na');
	con.style.color = "green";
	showMe("Successed");
	clear();
}

//取消掛號
function cancel () {
	if (length == 0) {
		var con = document.getElementById('na');
		con.style.color = "red";
		showMe("Failed");
		return;
	}
	let curr = head;
	let pre_curr = null;
	for (let i=0; i<length; i++) {
		if (curr.name == n.value && curr.id == IDNumber.value) {
			if (i == 0) {
				head = head.next;
				curr.next = null;
			}
			else {
				pre_curr.next = curr.next;
				curr.next = null;			
			}
			var con = document.getElementById('na');
			con.style.color = "green";
			showMe("Successed");
			break;
		}
		if (i == length - 1) {
			var con = document.getElementById('na');
			con.style.color = "red";
			showMe("Failed");
			return;
		}
		pre_curr = curr;
		curr = curr.next;
	}
	length -= 1;
	printF();
	clear();
}

//過號
function pass () {
	var times = 0;
	let curr = head;
	let pre_curr = null;
	if (length <= 1) {
		var con = document.getElementById('na');
		con.style.color = "red";
		showMe("Failed");
		return;
	}
	while (curr != null && times<4){
		pre_curr = curr;
		curr = curr.next;
		times += 1;
	}
	pre_curr.next = head;
	head = head.next;
	pre_curr.next.next = curr;
	printF();
	clear();
}

//完成
function finish() {
	if (length == 0) {
		var con = document.getElementById('na');
		con.style.color = "red";
		showMe("Failed");
		return;
	}
	head = head.next;
	length -= 1;
	var con = document.getElementById('na');
	con.style.color = "green";
	showMe("Successed");
	printF();
	clear();
}
/*
let hanzi = `奏春帮珍玻毒型挂封持项垮挎城挠政赴赵挡挺括拴拾挑指垫挣挤拼挖按挥挪某甚革荐巷带草茧茶荒茫荡荣故胡南药标枯柄栋相查柏柳柱柿栏树要咸威歪研砖厘厚砌砍面耐耍牵残殃轻鸦皆背战点临览竖省削尝是盼眨哄显哑冒映星昨畏趴胃贵界虹虾蚁思蚂虽品咽骂哗咱响哈咬咳哪炭峡罚贱贴骨钞钟钢钥钩卸缸拜看矩怎牲选适秒香种秋科重复竿段便俩贷顺修保促侮俭俗俘信皇泉鬼侵追俊盾待律很须叙剑逃食盆胆胜胞胖脉勉狭狮独狡狱狠贸怨急饶蚀饺饼弯将奖哀亭亮度迹庭疮疯疫疤姿亲音帝施闻阀阁差养美姜叛送类迷前首逆总炼炸炮烂剃洁洪洒浇浊洞测洗活派洽染济洋洲浑浓津恒恢恰恼恨举觉宣室宫宪突穿窃客冠语扁袄祖神祝误诱说诵垦退既屋昼费陡眉孩除险院娃姥姨姻娇怒架贺盈勇怠柔垒绑绒结绕骄绘耕耗艳泰珠班素蚕顽盏匪捞栽捕振载赶起盐捎捏埋捉捆捐损都哲逝捡换挽热恐壶挨耻耽恭莲莫荷获晋恶真框桂档桐株桥桃格校核样根索哥速逗栗配翅辱唇夏础破原套逐烈殊顾轿较顿毙致柴桌虑监紧党晒眠晓鸭晃晕蚊哨哭恩唤啊贿钱钳钻铁称倾倡倍倦健臭射躬息徒徐舰舱般航途拿爹爱颂翁脆脂胸胳脏胶脑狸狼逢留皱饿恋桨浆衰高席准座脊症病疾疼疲效离唐资凉站剖竞部旁旅畜阅羞瓶拳粉料益兼烤烘烦烧烛烟涉消浩海涂浴浮流润浪浸涨烫涌悟悄悔悦害宽家宵宴宾窄容宰案请朗诸读扇袜袖袍被祥课谁调冤谅谈谊剥恳展剧屑弱陵陶陷陪娱娘通能难预桑绢绣验继`;

let last = `趙錢孫李周吳鄭王馮陳褚衛蔣沈韓楊朱秦尤許何呂施張孔曹嚴華金魏陶姜戚謝鄒喻柏水竇章雲蘇潘葛奚范彭郎魯韋昌馬苗鳳花方俞任袁柳酆鮑史唐費廉岑薛雷賀倪湯滕殷羅畢郝鄔安常樂于時傅皮卞齊康伍余元卜顧孟平黃和穆蕭尹姚邵湛汪祁毛禹狄米貝明臧計伏成戴談宋茅龐熊紀舒屈項祝董梁杜阮藍閔席季麻強賈路婁危江童顏郭梅盛林刁鍾徐邱駱高夏蔡田樊胡凌霍虞萬支柯昝管盧莫經房裘繆干解應宗丁宣賁鄧郁單杭洪包諸左石崔吉鈕龔程嵇邢滑裴陸榮翁荀羊於惠甄麴家封芮羿儲靳汲邴糜松井段富巫烏焦巴弓牧隗山谷車侯宓蓬全郗班仰秋仲伊宮甯仇欒暴甘鈄厲戎祖武符劉景詹束龍葉幸司韶郜黎薊薄印宿白懷蒲邰從鄂索咸籍賴卓藺屠蒙池喬陰鬱胥能蒼雙聞莘党翟譚貢勞逄姬申扶堵冉宰酈雍郤璩桑桂濮牛壽通邊扈燕冀郟浦尚農溫別莊晏柴瞿閻充慕連茹習宦艾魚容向古易慎戈廖庾終暨居衡步都耿滿弘匡國文寇廣祿闕東歐殳沃利蔚越夔隆師鞏厙聶晁勾敖融冷訾辛闞那簡饒空曾毋沙乜養鞠須豐巢關蒯相查后荊紅游竺權逯蓋益桓公`;

let num = `0123456789`;

function feed(ord_, n_, idn_){
	ord.value = ord_;
	n.value = n_;
	IDNumber.value = idn_;
	add();
}

function main(){
	for (let i = 0; i < 10; i++){
		feed(Math.ceil(Math.random()*length*2),last[Math.floor(Math.random()*last.length)] +hanzi[Math.floor(Math.random()*hanzi.length)]+hanzi[Math.floor(Math.random()*hanzi.length)]  , num[Math.floor(Math.random()*num.length)]+num[Math.floor(Math.random()*num.length)]+num[Math.floor(Math.random()*num.length)]);
	}
}
main();*/