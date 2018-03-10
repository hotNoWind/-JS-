function toVideo(){
	
	var div = document.createElement('div'); // 播放器外框
	div.className = 'videoShow';

	/* 视频头部 */
	var header = document.createElement('header');
	header.className = 'playHead';
	drag(header, div);
	var h4 = document.createElement('h4');
	h4.innerHTML = '视频播放器';
	header.appendChild(h4);
	var div2 = document.createElement('div'); // 头部右侧功能按钮
	var span = document.createElement('span'); // 最小化
	// span.addEventListener('click', function(e){
	// 	e.cancelBubble = true;
	// 	div.style.display = "none";

	// });
	var span2 = document.createElement('span'); // 最大化
	var isBig = false;
	span2.addEventListener('click', function(e){
		e.stopPropagation();
		if (!isBig) { // 最大化图标 -- 最大化
			span2.style.backgroundImage = 'url(img/sizeBack.png)';
			startMove(div, {
				left: 0,
				top: 0,
				width: window.innerWidth,
				height: window.innerHeight - 42,
				marginTop: 0,
				marginLeft: 0
			},30, 'linear' );

		} else {
			span2.style.backgroundImage = 'url(img/big.png)';
			startMove(div, {
				left: l,
				top: t,
				width: w,
				height: h
			},30, 'linear' );
		}
		isBig = !isBig;
	});
	var isAllCreen = false;
	var span3 = document.createElement('span'); // 全屏
	span3.addEventListener('click', function(e){
		e.cancelBubble = true;
		div3.webkitRequestFullscreen();
	});
	var span4 = document.createElement('span'); // 关闭视频窗口
	span4.addEventListener('click', function(e){
		e.cancelBubble = true;
		document.body.removeChild(div);
	});
	div2.appendChild(span);
	div2.appendChild(span2);
	div2.appendChild(span3);
	div2.appendChild(span4);
	header.appendChild(div2);
	div.appendChild(header);

	/* 视频显示区域 */
	var div3 = document.createElement('div');
	div3.className = 'vWrap';
	var div11 = document.createElement('div');
	div11.className = 'div11';
	div3.appendChild(div11);
	var v = document.createElement('video'); // 视频标签
	v.src = 'iceAge.mp4';
	v.className = 'v';
	v.addEventListener('timeupdate', function(e){
		setLoad();
	});
	function setLoad(){
		time2.innerHTML = setTime(v.duration); // 总时间
		time.innerHTML = setTime(v.currentTime);
		var ll = v.currentTime / v.duration * css(p, 'width');
		if (v.currentTime == v.duration) {
			ll = 0;
		}
		strong.style.left = ll + 'px';
		span5.style.width = ll + 'px';
	}
	div3.appendChild(v);
	div.appendChild(div3);

	

	/* 视频控制 */
	var div4 = document.createElement('div');
	div4.className = 'control';
	var div5 = document.createElement('div');
	div5.className = 'degree';

	var p = document.createElement('p'); // 播放进度
	p.className = 'range';
	var span5 = document.createElement('span'); // 已播放的进度
	var strong = document.createElement('strong'); // 播放进度按钮
	playScroll(p, strong, span5); // 视频播放进度
	span5.appendChild(strong);
	p.appendChild(span5);
	
	div5.appendChild(p);

	var span6 = document.createElement('span'); // 静音
	v.volume = 0; // 默认静音
	span6.className = 'muted';
	span6.addEventListener('click', function(e){
		e.stopPropagation();
		var p2W = css(p2, 'width');
		if ( v.volume == 0 ) {
			span6.style.backgroundImage = 'url(img/vol.png)';
			css(span7, 'width', p2W);
			css(strong2, 'left', p2W - css(strong2, 'width'));
			v.volume = 1;
		} else {
			span6.style.backgroundImage = 'url(img/vol2.png)';
			css(span7, 'width', 0);
			css(strong2, 'left', 0);
			v.volume = 0;
		}
		// v.muted = !v.muted;
	});
	div5.appendChild(span6);

	var p2 = document.createElement('p');
	p2.className = 'volume';
	var span7 = document.createElement('span'); // 当前音量大小
	var strong2 = document.createElement('strong'); // 音量调节按钮
	


	volScroll(p2, strong2, span7);
	


	p2.appendChild(span7);
	p2.appendChild(strong2);
	div5.appendChild(p2);
	div4.appendChild(div5);

	/* 播放，时间，倍速调节 */
	var div6 = document.createElement('div');
	div6.className = 'filmmess clearFix';

	var button = document.createElement('button'); // 播放暂停按钮
	button.className = 'playBtn';
	button.addEventListener('mousedown', function(e){
		e.cancelBubble = true;
		if (v.paused) {
			button.style.backgroundImage = 'url(img/pause2.png)';
		} else {
			button.style.backgroundImage = 'url(img/play2.png)';
		}
	});
	button.addEventListener('mouseup', function(e){
		if (v.paused) {
			v.play();
			button.style.backgroundImage = 'url(img/pause.png)';
		} else {
			v.pause();
			button.style.backgroundImage = 'url(img/play.png)';
		}
	});
	div6.appendChild(button);

	var button2 = document.createElement('button'); // 停止按钮
	button2.className = 'stopBtn';
	button2.addEventListener('click', function(e){
		playZero();
	});
	div6.appendChild(button2);

	var span8 = document.createElement('span');
	span8.className = 'fileTime';

	var time = document.createElement('span'); // 当前播放时间
	time.className = 'moveTime';
	if (time.innerHTML == '') {
		time.innerHTML = '00:00';
	}
	span8.appendChild(time);

	var strong3 = document.createElement('strong');
	strong3.innerHTML = '/';
	span8.appendChild(strong3);

	var time2 = document.createElement('span'); // 播放总时间
	time2.className = 'allTime';
	span8.appendChild(time2);
	if (time2.innerHTML == '') {
		time2.innerHTML = '00:00';
	}
	div6.appendChild(span8);

	var div7 = document.createElement('div');
	div7.className = 'playbackRate'; // 播放速率

	var span9 = document.createElement('span'); // 当前播放倍率
	span9.innerHTML = '1';
	div7.appendChild(span9);
	div7.addEventListener('mouseover', function(){
		ul.style.display = "block";
	});
	div7.addEventListener('mouseout', function(){
		ul.style.display = "none";
	});
	var ul = document.createElement('ul'); // 倍速调整
	var li = document.createElement('li');
	li.innerHTML = '0.5';
	li.addEventListener('click', function(e){
		liClick(e,li);
	});
	var li2 = document.createElement('li');
	li2.innerHTML = '1';
	li2.addEventListener('click', function(e){
		liClick(e,li2);
	});
	var li3 = document.createElement('li');
	li3.innerHTML = '1.2';
	li3.addEventListener('click', function(e){
		liClick(e,li3);
	});
	var li4 = document.createElement('li');
	li4.innerHTML = '1.5';
	li4.addEventListener('click', function(e){
		liClick(e,li4);
	});
	var li5 = document.createElement('li');
	li5.innerHTML = '2';
	li5.addEventListener('click', function(e){
		liClick(e,li5);
	});
	function liClick(e,li){
		e.stopPropagation();
		span9.innerHTML = li.innerHTML;
		v.playbackRate = span9.innerHTML;
		ul.style.display = "none";
	}
	ul.appendChild(li);
	ul.appendChild(li2);
	ul.appendChild(li3);
	ul.appendChild(li4);
	ul.appendChild(li5);
	div7.appendChild(ul);
	div6.appendChild(div7);
	div.appendChild(div4);
	div.appendChild(div6);
	
	document.body.appendChild(div);
	var l = div.offsetLeft;
	var t = div.offsetTop;
	var w = css(div, 'width');
	var h = css(div, 'height');


	/* 播放进度 */
	function playScroll(wrap, el, span){
		var l = 0;
		el.addEventListener('mousedown', down);
		function down(e){
			e.cancelBubble = true;
			var startMouse = e.clientX;
			var startEl = css(el, 'left');
			var wrapRect = wrap.getBoundingClientRect();
			document.addEventListener('mousemove',move);
			document.addEventListener('mouseup',up);
			function move(e){
				var nowMouse = e.clientX; // 鼠标移动的位置
				var dis = nowMouse - startMouse; // 移动中和移动前的差值
				var nowPl = startEl + dis;
				
				var elW = css(el, 'width');
				// console.log(elW);
				l = nowPl - elW/2;
				if (nowMouse < wrapRect.left) {
					l = 0;
				}
				if (nowMouse > wrapRect.right) {
					l = wrapRect.width - elW/2;
				}

				// css(el, 'left', l);
				
				startMove(span, {width: l}, 100, 'linear');
				startMove(el, {right: elW/2}, 100, 'linear');

				// css(span, 'width', l)
				
				v.currentTime = l / wrapRect.width * v.duration;
			}
			function up(e){
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',up);
			}
		}
		wrap.addEventListener('click', function(e){
			e.stopPropagation();
			var wrapRect = wrap.getBoundingClientRect();
			l = e.clientX - wrapRect.left;
			css(el, 'left', l);
			css(span, 'width', l)
			v.currentTime = l / wrapRect.width * v.duration;
		});
	}

	/* 声音 */
	function volScroll(wrap, el, span){
		var l = 0;
		el.addEventListener('mousedown', down);
		function down(e){
			e.cancelBubble = true;
			var startMouse = e.clientX;
			var startEl = css(el, 'left');
			var wrapRect = wrap.getBoundingClientRect();
			document.addEventListener('mousemove',move);
			document.addEventListener('mouseup',up);
			function move(e){
				var nowMouse = e.clientX; // 鼠标移动的位置
				var dis = nowMouse - startMouse; // 移动中和移动前的差值
				var nowPl = startEl + dis;
				l = nowPl;
				var elW = css(el, 'width');
				if (nowMouse < wrapRect.left + elW) {
					l = 0;
				}
				if (nowMouse > wrapRect.right) {
					l = wrapRect.width - elW/2;
				}
				if (l == 0) {
					span6.style.backgroundImage = 'url(img/vol2.png)';
				} else {
					span6.style.backgroundImage = 'url(img/vol.png)';
				}
				css(el, 'left', l);
				css(span, 'width', l )
				v.volume = l / wrapRect.width * 1;
			}
			function up(e){
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',up);
			}
		}
		wrap.addEventListener('click', function(e){
			e.stopPropagation();
			var wrapRect = wrap.getBoundingClientRect();
			l = e.clientX - wrapRect.left;
			if (l == 0) {
				span6.style.backgroundImage = 'url(img/vol2.png)';
			} else {
				span6.style.backgroundImage = 'url(img/vol.png)';
			}
			css(el, 'left', l);
			css(span, 'width', l)
			v.volume = l / wrapRect.width * 1;
		});
	
	}
	function playZero(){
		time.innerHTML = '00:00';
		v.currentTime = 0;
		v.pause();
		button.style.backgroundImage = 'url(img/play.png)';
	}
function setTime(nub){
	return toDB(parseInt(nub/60)) + ':' + toDB(parseInt(nub%60));
}



}