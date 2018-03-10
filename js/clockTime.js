function toClockTime(){
	var weekNub = ["日","一","二","三","四","五","六"]; // 星期
	var monthNub = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	var head = document.querySelector('.head'); // 头部
	var calendar = document.querySelector('#calendar'); // 日历
	var dayList1 = document.querySelector('.dayList1'); // 日期列表1
	var dayList2 = document.querySelector('.dayList2'); // 日期列表2
	var pointerList = document.querySelector('.pointerList'); // 时钟指针
	var calendarHead = document.querySelector('#calendar h4 span'); // 日历头部时间
	var oneToTwelve = document.querySelector('#calendar .oneToTwelve'); // 日历头部时间点击之后出现的年份
	var oneToTwelve2 = document.querySelector('#calendar .oneToTwelve2');
	var hms = document.querySelector('#clock p'); // 时钟下的时分秒
	var showWeek = document.querySelector('#clock strong');
	var prev = document.querySelector('#calendar .prev');
	var next = document.querySelector('#calendar .next');
	var monthList = document.querySelector('.monthList');
	var weekList = document.querySelector('.weekList');
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var date2 = date.getDate();
	var a = new Date(year, month).getTime(); // 存储点击之后显示的时间
	var thisMonth = month; // 当前月份
	var wordColor = ["#444","#fff"]; // 文字颜色
	var bgColor = ["#fff","#444"]; // 背景颜色
	var isChange = false; // 默认是没有改变的
	var timer = null; // 声明一个定时器编号
	var timer2 = null;
	var isDDD = true;
	var inner = "";
	var inner2 = "";
	var inner3 = "";
	var timer3 = null;
	var showshow = document.querySelector('.showTime');
	var timeText1 = showshow.children[0];
	var timeText2 = showshow.children[1];
	for(var i = 0; i < 42; i++){ // 生成42个li
		inner += '<li style="left:' + (i%7)*50 + 'px;top:' + parseInt(i/7)*50 + 'px;"></li>';
	}
	dayList1.innerHTML = inner;
	var dayLis = dayList1.querySelectorAll('li');
	var dayLis2 = dayList2.querySelectorAll('li');
	lisShow();
	var add = dayList1.innerHTML;
	for(var i = 0; i < 60; i++){
		inner2 += '<li style="transform:rotate(' + i*6 + 'deg);"></li>';
	}
	pointerList.innerHTML = inner2;
	dayLL();
	function dayLL(){
		var buKong = new Date(year, month, 1).getDay();
		dayLis[date2 - 1 + buKong].className = "active";
	}

	for(var i = 0; i < 12; i++){
		inner3 += '<li style="left:' + (i%4)*90 + 'px;top:' + parseInt(i/4)*90 + 'px;">' + (i + 1) + '</li>';
	}
	oneToTwelve.innerHTML = oneToTwelve2.innerHTML = inner3;
	var oneToTwelveLis = document.querySelectorAll('.oneToTwelve li');
	var oneToTwelve2Lis = document.querySelectorAll('.oneToTwelve2 li');
	getTime();
	timer = setInterval(getTime, 1000);
	function getTime(){ // 圆盘时钟
		var date = new Date(); // 声明一个新的时间对象
		var year = date.getFullYear(); // 年
		var month = toDB(date.getMonth() + 1); // 月
		var date2 = toDB(date.getDate()); // 日
		var hours = toDB(date.getHours()); // 时
		var minutes = toDB(date.getMinutes()); // 分
		var seconds = toDB(date.getSeconds()); // 秒
		var week = date.getDay(); // 周几
		timeText1.innerHTML = hours + ':' + minutes;
		timeText2.innerHTML =  year + '/' + month + '/' + date2;
		head.innerHTML =  year + '年' + month + '月' + date2 + '日'; // 头部时间
		hms.innerHTML = hours + ':' + minutes + ':' + seconds; // 时间-时分秒
		showWeek.innerHTML = '星期' + weekNub[week];
		clockTime();
		function clockTime(){
			var hoursPointer = document.querySelector('#hours'); // 时针
			var minutesPointer = document.querySelector('#minutes'); // 分针
			var secondsPointer = document.querySelector('#seconds'); // 秒针
			var hours = date.getHours(); // 时
			var minutes = date.getMinutes(); // 分
			var seconds = date.getSeconds(); // 秒
			hoursPointer.style.transform = 'rotate(' + (hours + minutes/60)*30 + 'deg)';
			minutesPointer.style.transform = 'rotate(' + (minutes + seconds/60)*6 + 'deg)';
			secondsPointer.style.transform = 'rotate(' + seconds*6 + 'deg)';
		}
	}
	toDayNub(year, month);
	timer2 = setInterval(toDayNub, 1000);
	function toDayNub(year, month){ // 当前正常显示时间
		/* 先取到这是第几个月，再求出这个月有几天 */
		var date = new Date(); // 声明一个新的时间对象
		var year = date.getFullYear(); // 年
		var month = date.getMonth(); // 月
		var date2 = date.getDate(); // 日
		var week = date.getDay(); // 周几
		calendarHead.innerHTML = year + '年' + (month + 1) + '月'; // 日历头部年月
		targetMonth(year, month); // 去目标月份
	}
	function targetMonth(year, month){ // 去目标月份
		var date2 = date.getDate(); // 日
		var hours = date.getHours(); // 时
		var minutes = date.getMinutes(); // 分
		var seconds = date.getSeconds(); // 秒
		var week = date.getDay(); // 周几
		var todayTime = new Date(year, thisMonth, date2).getTime(); // 今天0点的时间戳
		var nowMonthTime = new Date(year, month).getTime(); //这个月的时间戳
		var nextMonthTime = new Date(year, month + 1).getTime(); //下个月的时间戳
		var monthTime = nextMonthTime - nowMonthTime; // 这个月的时间
		var nowMonthTime = new Date(year, month).getTime(); //今天的时间戳
		var targetTime = new Date(year,month,1); // 本月1号的时间戳
		var arr = []; // 存放要去那个月的天数
		
		/* 目标月份的天数 */
		var targetMonthA = new Date(year,month).getTime(); // 目标月1号的的时间戳
		var targetMonthB = new Date(year,(month + 1)).getTime(); // 目标月下个月1号的的时间戳
		var targetMonthDay = Math.abs(parseInt((targetMonthA - targetMonthB)/86400000)); // 目标月的天数
		/* 目标月份的天数 */

		/* 将目标月的天使放进数组 */
		fn(targetMonthDay);
		function fn(nub){ // 使用递归将每一天放进数组
			if(nub > 0){
				arr.unshift(nub);
				fn(nub - 1);
			}
		}
		/* 将目标月的天数放进数组 */
		var buKong = new Date(year, month, 1).getDay();
		fn2(buKong);
		function fn2(nub){//往数组里补空位
			if(nub > 0){
				arr.unshift("");
				fn2(nub - 1);
			}
		}
		for(var i = 0; i < dayLis.length; i++){
			dayLis[i].innerHTML = arr[i];
			if(dayLis[i] && arr[i] == null){ //显示区大于数组内容位数
				dayLis[i].innerHTML = "";
			}
		}
		if(isChange == false && isDDD == false){
			dayLis[buKong ].className = "active";
		}
		head.addEventListener('click', function(e){
			e.cancelBubble = true;
			isDDD == true;
			isChange = false;
			var date = new Date(); // 声明一个新的时间对象
			var year = date.getFullYear(); // 年
			var month = date.getMonth(); // 月
			var nowTime = new Date(year, month).getTime();
			if(a > nowTime){ //显示时间比当前大，就是从后往前
				toPrevMove();
			} else if(a < nowTime){ //显示时间比当前小，就是从前往后
				toNextMove();
			} else if(a == nowTime) { // 显示的时间跟当前一样，则不变
				return;
			}
			a = nowTime;
			nyrShow();
			toDayNub(year, month);
			timer2 = setInterval(toDayNub, 1000);
			gogogo();
			dayLis[date2 - 1].className = "active";
		});
		calendarHead.addEventListener('click', function(e){
			e.cancelBubble = true;
			gogogo();
			isChange = true;
			css(monthList, 'left', 0);
			calendarHead.innerHTML = year;
			monthShow();
		});
		for(var i = 0; i < dayLis.length; i++){
			dayLis[i].index = i;
			dayLis[i].addEventListener('click', function(e){
				e.cancelBubble = true;
				lisShow();
				dayLis[this.index].id = "active4";
			});
			dayLis[i].addEventListener('mouseover', function(e){
				e.cancelBubble = true;
				dayLis[this.index].className = "active";
				if (dayLis[this.index].innerHTML == '') {
					dayLis[this.index].className = "";
				}
			});
			dayLis[i].addEventListener('mouseout', function(e){
				e.cancelBubble = true;
				dayLis[this.index].className = "";
			});
		}
		prev.addEventListener('click', function(e){ // 上一个
			e.cancelBubble = true;
			isDDD = false;
			if(isChange == false){
				month--;
				if(month < 0){
					month = 11;
					year--;
				}
				toPrev(year, month);
			} else {
				year--;
				calendarHead.innerHTML = year;
				toPrevMove();
			}
			a = new Date(year, month).getTime();
		});
		next.addEventListener('click', function(e){ // 下一个
			e.cancelBubble = true;
			isDDD = false;
			if(isChange == false){
				month++;
				if(month > 11){
					year++;
					month = 0;
				}
				toNext(year, month);
			} else {
				year++;
				calendarHead.innerHTML = year;
				toNextMove();
			}
			a = new Date(year, month).getTime();
		});
		for(var i = 0 ; i < oneToTwelveLis.length; i++){
			oneToTwelveLis[i].onclick = oneToTwelve2Lis[i].onclick = function(){ //月份点击
				isDDD = false;
				isChange = false;
				clearInterval(timer2);
				month = Number(this.innerHTML);
				year = calendarHead.innerHTML;
				calendarHead.innerHTML = year + '年' + month + '月'; // 点击之后更改的日历头部年月
				month--;
				nyrShow();
				targetMonth(year, month);
				a = new Date(year, month).getTime();
				return false;
			};
		}
		add = dayList1.innerHTML;
	}
	function nyrShow(){ // 星期日子显示，周消失
		oneToTwelve.style.visibility = 'hidden';
		oneToTwelve2.style.visibility = 'hidden';
		oneToTwelve.style.transform = 'scale(1.5)';
		timer3 = setTimeout(function(){
			weekList.style.display = "block";
			dayList1.style.display = "block";
			dayList2.style.display = "block";
		},300);
	}
	function monthShow(){ // 星期日子消失，周显示
		oneToTwelve.style.visibility = 'visible';
		oneToTwelve2.style.visibility = 'visible';
		oneToTwelve.style.transform = 'scale(1)';
		oneToTwelve2.style.transform = 'scale(1)';
		weekList.style.display = "none";
		dayList1.style.display = "none";
		dayList2.style.display = "none";
	}
	function toNext(year, month){ // 左边显示年月（未点击）往后翻
		dayList2.innerHTML = add;
		dayList2.style.left = 0;
		dayList1.style.left = 420 + 'px';
		toNextMove();
		targetMonth(year, month);
		calendarHead.innerHTML = year + '年' + (month + 1) + '月'; // 日历头部年月
	}
	function toNextMove(){ // 左边显示年月（点击之后）往后翻
		lisShow();
		dayList2.innerHTML = add;
		clearInterval(timer2);
		css(monthList, 'left', 0);
		startMove(monthList, {left: -420}, 500, 'linear')
	}
	function toPrev(year, month){ // 左边显示年月（未点击）往前翻
		dayList2.innerHTML = add;
		dayList1.style.left = 0;
		dayList2.style.left = 420 + 'px';
		toPrevMove();
		targetMonth(year, month);
		calendarHead.innerHTML = year + '年' + (month + 1) + '月'; // 日历头部年月
	}
	function toPrevMove(){ // 左边显示年月（点击之后）往前翻
		lisShow();
		dayList2.innerHTML = add;
		clearInterval(timer2);
		css(monthList, 'left', -420);
		startMove(monthList, {left: 0}, 500, 'linear');
	}
	function lisShow(){ // 日期显示
		for(var i = 0; i < dayLis.length; i++){
			dayLis[i].id = "";
			if(i%2 == 1){
				dayLis[i].className = "active2";
			} else if(i%2 == 0) {
				dayLis[i].className = "active3";
			}
			// if (dayLis[i].innerHTML == "") {
			// 	console.log(1);
			// 	dayLis[i].onmouseover = null;
			// }
		}
	}
	function gogogo(){
		clearInterval(timer2);
		lisShow();
	}
}
