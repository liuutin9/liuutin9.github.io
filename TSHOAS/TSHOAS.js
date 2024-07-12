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