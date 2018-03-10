toClockTime();
var isMove = false; // 默认是没有移动的
var mainList = document.querySelector('.mainList');
var mainLis = mainList.querySelectorAll('li');
var createfile = document.querySelector('.rightMenu .createfile'); // 文件选项
var dragBox = document.querySelector('#dragBox'); // 选框
// var deskBack = document.querySelector('.deskBack'); // 回收站
var changeName = document.querySelector('#changeName'); // 重命名
var blogContent = document.querySelector('.blogContent'); // 博客内容
var rightMenu = document.querySelector('.rightMenu'); // 右键菜单
var calendarWrap = document.querySelector('.calendar'); // 右下角时间显示
var wrap = document.querySelector('.wrap'); // 时间弹窗
var _ID = 0; // 从0开始建立文件夹
var liZIndex = 1;
var maxNub = getMax();
var isBig = false; // 默认是最大化图标
var renwuLan = document.querySelector('#renwu'); // 任务栏
var beggin = document.querySelector('#beggin h4'); // 开始
var task = document.querySelector('#task'); // 开始菜单
var shutDown = document.querySelector('#closed'); // 关闭
var byebye = document.querySelector('.byebye');
byebye.timer = null;

var calculation = document.querySelector('.calculation'); // 计算器快捷键
var calculator = document.querySelector('#calculator'); // 计算器主体
var calculatorHead = calculator.children[0];
var startVideo = document.querySelector('#startVideo'); // 开始菜单的视频播放
/* 拖拽 */
document.addEventListener('mousedown', down);
function down(e){
	mainLis = mainList.querySelectorAll('li');
	for (var i = 0; i < mainLis.length; i++) {
		mainLis[i].style.backgroundColor = "";
	}
	mainLis.forEach(function(li,index){
		var rect = li.getBoundingClientRect();
		var startMouse = { // 鼠标初始位置
			x: e.clientX,
			y: e.clientY
		};
		var liStart = { // li初始位置
			x: css(li, 'left'),
			y: css(li, 'top')
		};
		var nowPlace = {};
		if(startMouse.x < rect.left || startMouse.x > rect.right || startMouse.y < rect.top || startMouse.y > rect.bottom){
			changeBox();
		}
		function changeBox(){
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
			function move(e){

				e.cancelBubble = true;
				var nowMouse = { // 鼠标现在位置
					x: e.clientX,
					y: e.clientY
				};
				var dis = {
					x: nowMouse.x - startMouse.x,
					y: nowMouse.y - startMouse.y
				};

				/* 选框 */
				dragBox.style.display = "block";
				dragBox.style.left = startMouse.x + 'px';
				dragBox.style.top = startMouse.y + 'px';
				if (dis.x < 0) {
					dragBox.style.left = nowMouse.x + 'px';
				}
				if (dis.y < 0) {
					dragBox.style.top = nowMouse.y + 'px';
				}
				dragBox.style.width = Math.abs(dis.x) + 'px';
				dragBox.style.height = Math.abs(dis.y) + 'px';
				if( peng(dragBox, li) ){
					li.style.backgroundColor = "rgba(255, 255, 255, .5)";
				} else {
					li.style.backgroundColor = "";
				}
			}
			function up(e){
				dragBox.style.display = "none";
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
			}
		}
	});
}

document.addEventListener('click', function(e){ // 空白处点击
	rightMenu.style.display = "none";
	task.style.display = "none";
	wrap.style.display = "none";
});

render( getChildren( _ID ),mainList );

calendarWrap.addEventListener('click', function(e){ // 时间外框点击
	e.cancelBubble = true;
	wrap.style.display = "block";
});

beggin.addEventListener('click', function(e){
	e.cancelBubble = true;
	if (task.style.display == "block") {
		task.style.display = "none";
	} else {
		task.style.display = "block";
		task.style.zIndex = ++liZIndex;
	}
});

shutDown.addEventListener('click', function(e){ // 关闭
	e.cancelBubble = true;
	byebye.style.display = "block";
	task.style.display = "none";
	byebye.timer = setTimeout(function(){
		clearTimeout(byebye.timer);
		document.body.style.background = "#000";
		document.body.style.display = "none";
	},2000);
})

calculation.addEventListener('click', function(e){
	e.cancelBubble = true;
	task.style.display = "none";
	calculator.style.display = "block";
	calculator.style.zIndex = liZIndex;
})
drag(calculatorHead, calculator);

window.addEventListener('resize', function(){
	render( getChildren( 0 ),mainList );
});

startVideo.addEventListener('click', function(e){
	e.cancelBubble = true;
	task.style.display = "none";
	startVideo.style.display = "block";
	startVideo.style.zIndex = liZIndex++;
	toVideo();
});
