var mainList = document.querySelector('.mainList');
function openWindow(e,item,li,list){
	e.stopPropagation();
	_ID = item.id;
	// if (_ID == 3) { // 双击回收站
	// 	console.log(3);
	// 	popupShow(item);
	// 	// render( getChildren( _ID ),list );
	// 	return;
	// }
	// console.log( item.id);
	if (item.pid == 0) {
		popupShow(item);
		toTaskBar(item.id, 'open');
	} else {
		// 由于每次生成窗口的不一样，要根据当前li来获取，要不然先获取，只能在第一个窗口渲染路径
		var lljing = li.parentNode.previousElementSibling.children[0].children[2];
		li.parentNode.parentNode.dataset.cc = get(_ID).id;
		lljing.innerHTML = road(get(_ID));
		render( getChildren( get(_ID).id ),list );
	}
}
function render(data,list){ // 	桌面新建文件夹
	// var blogContent = document.querySelector('.blogContent');
	mainList = document.querySelector('.mainList');
	// console.log(list);
	if (!list) {
		list = mainList;
	}
	list.innerHTML = ""; // 每次渲染之前，先清空
	data.forEach(function(item,index){
		var li = document.createElement('li');
		li.className = item.type;
		li.setAttribute('_contextmenu', 'folder');
		li.dataset.cc = item.id;
		li.addEventListener('dblclick', function(e){
			openWindow(e,item,li,list);
		});
		
		li.addEventListener('mousedown', liGo); // 元素拖拽
		function liGo(e){
			// isMove = false;
			e.cancelBubble = true;
			var startMouse = {
				x: e.clientX,
				y: e.clientY
			};
			var liStart = { // li初始位置
				x: css(li, 'left'),
				y: css(li, 'top')
			};
			var nowPlace = {};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
			function move(e){
				var nowMouse = { // 鼠标现在位置
					x: e.clientX,
					y: e.clientY
				};
				var dis = {
					x: nowMouse.x - startMouse.x,
					y: nowMouse.y - startMouse.y
				};
				nowPlace = {
					x: liStart.x + dis.x,
					y: liStart.y + dis.y
				};
				css(li, 'left', nowPlace.x);
				css(li, 'top', nowPlace.y);
				li.style.zIndex = liZIndex++;
				isMove = true;
			}
			
			function up(e){
				e.cancelBubble = true;
				if (isMove == false) {
					document.removeEventListener('mousemove', move);
					document.removeEventListener('mouseup', up);
					return;
				}
				// console.log(isMove);
				deskBack = document.querySelector('.deskBack');
				_ID = item.id;
				
				var lists = list.querySelectorAll('li');
				var pengLi = null;
				lists.forEach(function (item){ // 元素移动到另一个非回收站元素上，该元素成为另一个元素的子级
					if ( peng(item,li) && item != li ) {
						pengLi = item;
					}
				});
				lists.forEach(function (item){ // 元素移动到另一个非'pdf,doc.ppt元素上，该元素成为另一个元素的子级
					if ( peng(item,li) && item != li && item.className != 'img' && item.className != 'ppt' && item.className != 'doc' && item.className != 'pdf') { // 文件移入文件夹
						// console.log(pengLi.className);
					
						if (pengLi.className != 'deskBack') {
							getChildren( pengLi.dataset.cc ).forEach(function(b){
								if (b.name == li.children[0].children[0].innerHTML && b.type == li.className) {
									// console.log('重名了')
									// console.log(li);
									css(li, 'left', liStart.x);
									css(li, 'top', liStart.y);
									b.name = b.name + '(副本)';
									return; // return 了怎么还执行下面的代码
									// b.name = nameSet(b,b.type);
								}
							});
						}
						//  else if (pengLi.className == 'deskBack') {
						// 	backData.push(li);
						// 	// console.log(backData);
						// }
						data.forEach(function(a){ // 循环数组
							if (a.id == li.dataset.cc) { // 如果数组第a个的id = li的自定义属性cc
								a.pid = parseInt(pengLi.dataset.cc); // 修改a的pid
							}
						});
						// console.log('移入成为子级');
						render( getChildren( get( pengLi.dataset.cc ).pid ),e.target.parentNode );
					} else if (!pengLi) {
						// console.log('拖拽移动');
						css(li, 'left', nowPlace.x);
						css(li, 'top', nowPlace.y);
					} else if (pengLi.className == 'pdf' || pengLi.className == 'ppt' || item.className == 'doc') {
						// console.log('文件夹不能移入文件里');
						css(li, 'left', liStart.x);
						css(li, 'top', liStart.y);
					}

				});
				li.style.backgroundColor = "";
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
			}
		}
		li.addEventListener('click', function(e){
			e.stopPropagation();
			var lis = list.querySelectorAll('li');
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.backgroundColor = "";
			}
			li.style.backgroundColor = "rgba(255,255,255,.5)";
		});
		var p = document.createElement('p');
		var span = document.createElement('span');
		var input = document.createElement('input');
		input.type = "text";
		span.innerHTML = item.name;
		p.appendChild(span);
		p.appendChild(input);
		li.appendChild(p);
		list.appendChild(li);
	});
	liPlace(list);
}


/* 元素位置处理 */
function liPlace(list){
	var winW = document.documentElement.clientWidth; // 可视区宽度
	var liW = 100;
	var liWM = parseInt(winW/liW); // 每行最多放的个数
	var winH = document.documentElement.clientHeight; // 可视区高度
	var liH = 110;
	var liHM = parseInt(winH/liH); // 每列最多放的个数
	if (list == mainList) {
		var mainLiss = document.querySelectorAll('.mainList>li');
		mainLiss.forEach(function(li,index){
			li.style.left = parseInt(index/liHM) * liW + 15 + 'px';
			li.style.top = index%liHM * liH + 15 + 'px';
		});
	}
}

/* 根据传进来的数据，获取所有符合条件的的子级，也就是pid指向它的 */
function getChildren(pid){
	return data.filter(function(item){
		return pid == item.pid;
	});
}

/* 根据传进来的数据，获取这组数据 */
function get(id){
	return data.find(function(item){
		return id == item.id;
	});
}

function removeFile(id){ // 删除文件或者文件夹
	return data.filter(function(item){
		if ( id == item.id ) {
			return false;
		}
		return true;
	});
}

/* 找父级 */
function getParent(id){
	var info = get( id );
	if (info) {
		return get( info.pid );
	}
}

/* 获取所有父级 */
function getParents(pid){
	var parents = [];
	var parent = getParent(pid);
	if (parent) {
		parents.push(parent);
		parents = getParents( parent.id ).concat( parents ) ;
	}
	return parents;
}

/* 获取ID */
function getNameId(name){
	return data.filter(function(item){
		return item.name == name;
	});
}

/* 碰撞检测 */
function peng(el1,el2){ 
	var rect1 = el1.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();
	if(rect1.left > rect2.right || rect1.right < rect2.left || rect1.top > rect2.bottom || rect1.bottom < rect2.top){
		return false; // 没有碰撞
	}
	return true; // 碰撞了
}
function dianPeng(el1,el2){ // 元素左上角碰撞检测
	var elPlace = {
		x: css(el1, 'left'),
		y: css(el1, 'top')
	};
	var rect2 = el2.getBoundingClientRect();
	if(elPlace.x > rect2.left && elPlace.x < rect2.right && elPlace.y < rect2.bottom && elPlace.y > rect2.top){
		return true; // 碰撞了
	}
	return false; // 没有碰撞
}

/* 资源管理器 */
function popupShow(item){
	var div10 = document.createElement('div');
	div10.className = "resources";
	div10.style.display = "block";
	div10.dataset.cc = item.id;
	div10.style.zIndex = liZIndex++;
	div10.addEventListener('mousedown', function(e){ // 窗口按下，层级增加到最高
		e.cancelBubble = true;
		div10.style.zIndex = liZIndex++;
		ul.style.display = "none";
	});
	
	/* 资源搜索框头部 */
	var header = document.createElement('header');
	drag(header, div10);
	header.className = 'clearFix';
	var h3 = document.createElement('h3');
	var strong = document.createElement('strong');
	strong.className = "biaoti";
	strong.innerHTML = item.name;
	var span = document.createElement('span');
	h3.appendChild(strong);
	header.appendChild(h3);
	var div = document.createElement('div');
	div.className = "closBox";
	var span1 = document.createElement('span');
	var span2 = document.createElement('span');
	var span3 = document.createElement('span');
	span1.addEventListener('click', function(e){ // 关闭窗口
		e.cancelBubble = true;
		document.body.removeChild(div10);
		render( getChildren(0), mainList );
		toTaskBar(div10.dataset.cc, 'close');
	});
	
	span2.addEventListener('click', function(e){ // 最大化
		e.cancelBubble = true;
		if (!isBig) { // 最大化图标 -- 最大化
			span2.style.backgroundImage = 'url(img/sizeBack.png)';
			startMove(div10, {
				left: 0,
				top: 0,
				width: window.innerWidth - 10,
				height: window.innerHeight - 50
			},100, 'linear');
		} else {
			span2.style.backgroundImage = 'url(img/max.png)';
			startMove(div10, {
				left: l,
				top: t,
				width: w,
				height: h
			},100, 'linear');
		}
		isBig = !isBig;
	});
	span3.addEventListener('click', function(e){ // 最小化
		e.cancelBubble = true;
		div10.style.display = "none";
	});
	div.appendChild(span1);
	div.appendChild(span2);
	div.appendChild(span3);
	header.appendChild(div);
	var div2 = document.createElement('div');
	div2.className = "showSize";
	var div3 = document.createElement('div');
	var input1 = document.createElement('input');
	input1.value = "<";
	input1.type = "button";
	input1.className = "showPrev";
	input1.addEventListener('click', function(e){ // 返回上一级
		e.cancelBubble = true;
		if (_ID == 1 || !getParent(_ID)) {
 			return;
		}
		render( getChildren( getParent(_ID).id ), ul1 );
		div4.innerHTML = road( get(get(_ID).pid) );
		_ID = getParent(_ID).id;
	});
	var input2 = document.createElement('input');
	input2.value = ">";
	input2.className = "showNext";
	input2.type = "button";
	input2.addEventListener('click', function(e){ // 去往下一级
		e.cancelBubble = true;
	});
	var div4 = document.createElement('div');
	div4.className = "pashRoad";
	div4.innerHTML = road( get( _ID) );
	div4.addEventListener('click', function(e){ // 路径显示
		e.cancelBubble = true;
		if (e.target.tagName == 'A') {
			var _id = e.target.getAttribute('_id');
			_ID = _id;
			render( getChildren(get(_id).id), ul1 );
			div4.innerHTML = road(get(_id));
			div10.dataset.cc = get(_ID).id;
		}
	});
	var p = document.createElement('p');
	p.innerHTML = "展现形式";
	div3.appendChild(input1);
	div3.appendChild(input2);
	div3.appendChild(div4);
	div3.appendChild(p);
	var ul = document.createElement('ul'); // 展现形式
	var li = document.createElement('li');
	ul.style.zIndex = liZIndex++;
	li.innerHTML = "大图标";
	li.addEventListener('click', function(e){ // 大图标
		e.stopPropagation();
		liSize('1.3');
	});
	var li2 = document.createElement('li');
	li2.innerHTML = "中图标";
	li2.addEventListener('click', function(e){ // 中图标
		e.stopPropagation();
		liSize('1');
	});
	var li3 = document.createElement('li');
	li3.innerHTML = "小图标";
	li3.addEventListener('click', function(e){ // 小图标
		e.stopPropagation();
		liSize('.8');
	});
	p.addEventListener('click',function(){ // 展现形式列表消失或显示
		if (ul.style.display == "block") {
			ul.style.display = "none";
		} else {
			ul.style.display = "block";
		}
	});
	ul.appendChild(li);
	ul.appendChild(li2);
	ul.appendChild(li3);
	div2.appendChild(div3);
	div2.appendChild(ul);

	/* 内容部分 */
	var ul1 = document.createElement('ul'); // 微博主要内容
	ul1.className = "blogContent clearFix";
	div10.appendChild(header);
	div10.appendChild(div2);
	div10.appendChild(ul1);
	render( getChildren(item.id),ul1 );
	document.body.appendChild(div10);
	function liSize(size){ // 元素大小改变,有问题
		var lis = ul1.querySelectorAll('li');
		lis.forEach(function(item){
			item.style.transform = 'scale(' + size + ')';
		});
		ul.style.display = "none";
	}
	var l = div10.offsetLeft;
	var t = div10.offsetTop;
	var w = css(div10, 'width');
	var h = css(div10,'height');
}

function road(item){// 路径
	return paths = getParents( item.id ).concat(item).map(function(item){
		return '<a _id="' + item.id + '" href="javascript:;">' + item.name + '</a>';
	}).join(' > ');
}

function drag(el1,el2){ // 弹窗拖拽
	el1.addEventListener('mousedown', elGo); // 元素拖拽
	function elGo(e){
		el2.style.zIndex = liZIndex++;
		e.cancelBubble = true;
		var startMouse = {
			x: e.clientX,
			y: e.clientY
		};
		var liStart = { // 元素初始位置
			x: css(el2, 'left'),
			y: css(el2, 'top')
		};
		var nowPlace = {};
		document.addEventListener('mousemove', move);
		document.addEventListener('mouseup', up);
		function move(e){
			var nowMouse = { // 鼠标现在位置
				x: e.clientX,
				y: e.clientY
			};
			var dis = {
				x: nowMouse.x - startMouse.x,
				y: nowMouse.y - startMouse.y
			};
			nowPlace = {
				x: liStart.x + dis.x,
				y: liStart.y + dis.y
			};
			css(el2, 'left', nowPlace.x);
			css(el2, 'top', nowPlace.y);
		}
		function up(e){
			css(el2, 'left', nowPlace.x);
			css(el2, 'top', nowPlace.y);
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);
		}
	}
}
document.addEventListener('contextmenu', function(e){
	var rightbute = 'global';
	if (e.target.parentNode.parentNode.dataset.cc == 3) {
		rightbute = 'back';
	} else if (e.target.getAttribute('_contextmenu')) {
		rightbute = e.target.getAttribute('_contextmenu');
	}
	addRightList(e, rightList[rightbute]);
});

/* 右键菜单 */
function addRightList(e, data){
	e.preventDefault();
	var oldE = e;
	rightMenu.style.display = "block";
	rightMenu.innerHTML = "";
	rightMenu.style.left = e.clientX + 'px';
	rightMenu.style.top = e.clientY + 'px';
	rightMenu.style.zIndex = 999999999999999;
	data.forEach(function(item){
		var li = document.createElement('li');
		li.innerHTML = item.name;
		li.addEventListener('mouseover', function(e){
			e.cancelBubble = true;
			li.style.color = '#fff';
			li.style.backgroundColor = '#666'
			if (li.children[1]) {
				li.children[1].style.display = "block";
			}
		});
		li.addEventListener('mouseout', function(e){
			e.cancelBubble = true;
			li.style.color = '#000';
			li.style.backgroundColor = '#f1f1f1'
			if (li.children[1]) {
				li.children[1].style.display = "none";
			}
		});
		li.addEventListener('click', function(e){
			if (typeof item.exe == 'function') {
				// console.log(e.target,oldE.target);
				item.exe( e,oldE );
				/* item.exe穿的两个参数的作用在于,第一个参数e，指的是li点击的时候的事件，第二个参数是右键菜单的事件，传进去，在调用对象中这个函数的时候，可以对元素进行设置 */
			}
		});
		if (item.children) {
			li.innerHTML = '';
			li.className = 'newFileText';
			var span = document.createElement('span');
			span.innerHTML = item.name;
			li.appendChild(span);
			var ul3 = document.createElement('ul');
			item.children.forEach(function(a){
				var li1 = document.createElement('li');
				li1.innerHTML = a.name;
				li1.addEventListener('click', function(e){
					if (typeof a.exe == 'function') {
						a.exe(e, oldE);
					}
				});
				ul3.appendChild(li1);
			});
			li.appendChild(ul3);
		}
		rightMenu.appendChild(li);
	});
}

function getMax(){
	return data.sort(function(a,b){
		return a.id - b.id;
	})[data.length - 1].id;
}

function nameSet(newData,type){ // 文件名
	var children = getChildren( newData.pid ); // 根据传进来的对象获取同级元素
	if (newData.name != '') { //如果name不为空
		var isSameName = false;
		children.forEach(function(item){
			if ( item.name == newData.name && item.pid == newData.pid && item.type == newData.type ) { // 重名
				isSameName = true;
			}
		});
		if (isSameName) { // 重名了
			return false;
		}
	} else {
		if( type == 'pdf' ){
			newData.name = "新建PDF";
		} else if ( type == 'doc' ) {
			newData.name = "新建DOC";
		} else if ( type == 'ppt' ) {
			newData.name = "新建PPT";
		} else if ( type == 'folder' ) {
			newData.name = "新建文件夹";
		}
		var i = 1;
		while (true) {
			var isSameName = false;
			children.forEach(function(item){
				if (item.name == newData.name && item.type == newData.type) {
					isSameName = true;
				}
			});
			if (isSameName) {
				i++;
				if( type == 'pdf' ){
					newData.name = '新建PDF(' + i + ')';
				} else if ( type == 'doc' ) {
					newData.name = '新建DOC(' + i + ')';
				} else if ( type == 'ppt' ) {
					newData.name = '新建PPT(' + i + ')';
				} else if ( type == 'folder' ) {
					newData.name = '新建文件夹(' + i + ')';
				}
			} else {
				break;
			}
		}
	}
	newData.id = ++maxNub;
	data.push(newData);
	return true;
}


var taskBarData = [];

/* 任务栏 */
function toTaskBar(id,type){
	renwuLan.innerHTML = "";
	var arrEl = data.find(function(item){
		return item.id == id;
	});
	if ( type == 'open' ) {
		taskBarData.push(arrEl);
	} else {
		taskBarData.pop(arrEl);
	}
	var nnum = 0;
	taskBarData.forEach(function(item){
		var li = document.createElement('li');
		li.dataset.cc = item.id;
		li.index = nnum;
		li.className = item.type;
		li.addEventListener('click', function(e){
			e.cancelBubble = true;
			var boxes = document.querySelectorAll('.resources');
			var icons = renwuLan.querySelectorAll('li');
			boxes[li.index].style.display = "block";
			boxes[li.index].style.zIndex = liZIndex++;
		});
		renwuLan.appendChild(li);
		nnum++;
	});
}

mathOperation();
function mathOperation(){ // 计算
	var nubShow = calculator.querySelector('.nubShow .result'); // 数字显示
	var processa = calculator.querySelector('.nubShow .process'); // 运算过程
	var arabic = calculator.querySelector('.Arabic');
	var operator = calculator.querySelector('.operator'); // 运算
	var operation = calculator.querySelectorAll('.operator li'); // 运算符
	var toResult = calculator.children[3].children[1].children[0]; // 等于
	var nubClick = arabic.querySelectorAll('li');
	var nub1 = ''; // 存储按下运算按钮之前的值
	var nub2 = ''; // 存储等于按下之前的值
	var suansuan = ''; // 存储按了什么运算符
	var closBox = calculator.querySelector('.closBox');
	nubClick.forEach(function(li,index){
		li.addEventListener('click', function(e){
			e.cancelBubble = true;
			nubShow.innerHTML += li.innerHTML;
		});
	});
	operation.forEach(function(li){
		li.addEventListener('click', function(e){
			e.cancelBubble = true;
			nub1 = nubShow.innerHTML;
			suansuan = li.innerHTML;
			processa.innerHTML = nub1 + li.innerHTML;
			nubShow.innerHTML = '';
		})
	});
	toResult.addEventListener('click', function(e){
		if (suansuan != "") {
			processa.innerHTML = "";
			nub2 = parseFloat(nubShow.innerHTML);
			nub1 = parseFloat(nub1);
			if (suansuan == '+') {
				nubShow.innerHTML = nub1 + nub2;
			} else if (suansuan == '-') {
				nubShow.innerHTML = nub1 - nub2;
			} else if (suansuan == '*') {
				nubShow.innerHTML = nub1 * nub2;
			} else if (suansuan == '/') {
				nubShow.innerHTML = nub1 / nub2;
			}
			suansuan = "";
		} else {
			processa.innerHTML = "";
			nubShow.innerHTML = '';
		}
		
	});
	closBox.addEventListener('click', function(e){
		e.cancelBubble = true;
		calculator.style.display = "none";
	});
}