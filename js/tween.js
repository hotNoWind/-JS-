var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
function css(el,attr,val){
	if(arguments.length > 2){
		if(attr == "opacity"){
			el.style[attr] = val;
			el.style.filter = "alpha(opacity = "+val*100+")";
		} else if (attr == 'zIndex') {
			el.style[attr] = parseInt(val);//zIndex必须是整数
		} else {
			el.style[attr] = val + "px";
		}
	} else {
		return el.currentStyle?parseFloat(el.currentStyle[attr]):parseFloat(getComputedStyle(el)[attr]);
	}
}
function startMove(el,target,time,type,callBack){
	var t = 0;
	var b = {};//初始值
	var c = {};
	var d = Math.ceil(time/20);
	for(var s in target){
		//console.log(s);
		b[s] = css(el,s);
		c[s] = target[s] - b[s];
	}
	clearInterval(el.timer);
	el.timer = setInterval(function(){
		if(t >= d){
			clearInterval(el.timer);
			callBack&&callBack();
		} else {
			t++;
			for(var s in target){
				var val = Tween[type](t,b[s],c[s],d); 
				css(el,s,val);
			}	
		}
	},20); 
}
function shake(el,attr,number) {//元素、属性、目标值、时间、运动次数
	if (el.timer) { //如果定时器在运作的话
		return;
	}
	var shakeLength = number;
	el.timer = 0;
	clearInterval(el.timer);
	var arr = []; //获取一个函数
	var start = css(el,attr); // 获取元素的当前位置
	for (var i = shakeLength; i > 0; i -= 2 ) {//循环想要的次数
		arr.push(i, -i); //得到新的数组
	}
	arr.push(0);//在数组最后加0，确保执行结束后元素在原位
	el.timer = setInterval(function(){
		if(!arr.length){//如果数组的为0的话
			clearInterval(el.timer);//关闭元素的定时器
			el.timer = 0; // 0的布尔值为false
		} else {
			css(el, attr, start + arr.shift());
		}
	},30);
}
function toDB(nub){
	return nub = nub < 10?'0' + nub:'' +nub;
}
function mScroll(init){
	var wrap = init.wrap;
	var scrollWrap = init.scrollWrap;
	var con = init.con;
	var upBtn = scrollWrap.querySelector('.up');
	var downBtn = scrollWrap.querySelector('.down');
	var track = scrollWrap.querySelector('.scroll-track');
	var bar = scrollWrap.querySelector(".scroll-bar");
	var scroll = 0;// 当前滚动条的位置
	bar.timer = 0;
	// 点击upBtn 控制滚动条连续向上滚动
	setBarHeight();//注意如果后期修改了con中的内容，记得重新设置高度



	upBtn.addEventListener('mousedown', function(e) {
		loopUp();
		e.preventDefault();
	});
	downBtn.addEventListener('mousedown', function(e) {
		loopDown();
		e.preventDefault();
	});
	scrollWrap.addEventListener('mouseup', function(e) {
		clearInterval(bar.timer);
	});

	/* 拖拽操作元素位置 */
	var startScroll = 0;
	var startMouse = 0;

	bar.addEventListener('mousedown', function(e) {
		startScroll = scroll;
		startMouse = e.clientY;
		document.addEventListener('mousemove', move);
		document.addEventListener('mouseup', up);
		e.preventDefault();
	});

	function move(e){
		clearInterval(bar.timer);
		var nowMouse = e.clientY;
		var dis = nowMouse - startMouse;
		scroll = dis + startScroll;
		setScroll();
	}
	function up(e){
		document.removeEventListener('mousemove', move);
		document.removeEventListener('mouseup', up);
	}

	// 在轨道摁下，快速移动滚动条至鼠标点击区域
	track.addEventListener('mousedown', function(e) {
		var rect = track.getBoundingClientRect();
		var target = e.clientY - rect.top - bar.offsetHeight/2;//鼠标相对于轨道的坐标

		bar.timer = setInterval(function(){
			var dis = (target - scroll)/5;//把鼠标 和 滚动条之间的位置分成 5份， 每次只加 5分一下
			scroll = Math.round(scroll + dis);
			setScroll();
			// 当鼠标触碰 到 滚动条停止动画
			if(bar.offsetTop < scroll
			&&bar.offsetTop + bar.offsetHeight > scroll){
				clearInterval(bar.timer);
			}
		},20);
	});

	/* 拨动滚轮移动滚动条位置 */
	mouseScroll(wrap,function(){
		toUp()
	},function(){
		toDown();
	});




	// 滚动条向上滚动
	function toUp(){
		scroll -= 5;
		setScroll();
	} 
	//滚动条向下滚动
	function toDown(){
		scroll += 5;
		setScroll();
	}
	//滚动条连续向上滚动
	function loopUp(){
		clearInterval(bar.timer);
		bar.timer = setInterval(toUp,30);
	}
	//滚动条连续向下滚动 
	function loopDown(){
		clearInterval(bar.timer);
		bar.timer = setInterval(toDown,30);
	}
	// 根据scroll的数值 来同步滚动条位置
	function setScroll(){
		setBarHeight();// 防止con中的内容发生改变，重新计算滚动条高度
		var maxScroll = track.clientHeight - bar.offsetHeight;
		if(scroll < 0){
			scroll = 0;
		} else if(scroll > maxScroll){
			scroll = maxScroll;
		}
		css(bar,"top",scroll);
		setConTop();
	}

	// 根据比例计算bar的高度
	function setBarHeight(){
		/* 
			wrap(显示区域) 和 con (整个内容区域) 的高度比例,
			相当于 bar(滚动条) 和 track(滚动区域)的高度比例
		
		*/
		var scale = wrap.clientHeight/con.offsetHeight;
		css(bar,"height",track.clientHeight * scale);
	}
	// 根据scroll的数值，同步con的top值
	function setConTop(){
		// bar移动的距离相对track来说移动了多少，con 也就移动对应的多少比例
		var scale = scroll/track.clientHeight;
		var t = -con.offsetHeight* scale;
		css(con,"marginTop",t);
	}
}
function mouseScroll(el,up,down){
	el.addEventListener('DOMMouseScroll', function(e) {
		if(e.detail > 0){
			down&&down();
		} else {
			up&&up();
		} 
		e.preventDefault();
	});
	el.addEventListener('mousewheel', function(e) {
		if(e.wheelDelta < 0){
			down&&down();
		} else {
			up&&up();
		}
		e.preventDefault();
	});
}