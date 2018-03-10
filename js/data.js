var data = [
	{
		id: 1,
		pid: 0,
		type: 'blog',
		name: '我的博客',
		backnub: 0
	},
	{
		id: 2,
		pid: 0,
		type: 'setblog',
		name: '博客设置',
		backnub: 0
	},
	{
		id: 3,
		pid: 0,
		type: 'deskBack',
		name: '回收站',
		backnub: 0
	},
	{
		id: 4,
		pid: 1,
		type: 'folder',
		name: '海贼王',
		backnub: 1
	},
	{
		id: 5,
		pid: 1,
		type: 'folder',
		name: '前端',
		backnub: 1
	},
	{
		id: 6,
		pid: 4,
		type: 'folder',
		name: '草帽海贼团',
		backnub: 4
	},
	{
		id: 7,
		pid: 4,
		type: 'folder',
		name: '海军三大战力',
		backnub: 4
	},
	{
		id: 8,
		pid: 7,
		type: 'img',
		name: '赤犬',
		backnub: 7
	},
	{
		id: 9,
		pid: 7,
		type: 'img',
		name: '青雉',
		backnub: 7
	},
	{
		id: 10,
		pid: 7,
		type: 'folder',
		name: '黄猿',
		backnub: 7
	},
	{
		id: 11,
		pid: 5,
		type: 'folder',
		name: 'CSS',
		backnub: 5
	},
	{
		id: 12,
		pid: 5,
		type: 'folder',
		name: 'HTML',
		backnub: 5
	},
	{
		id: 13,
		pid: 5,
		type: 'folder',
		name: 'Javascript',
		backnub: 5
	},
	{
		id: 14,
		pid: 13,
		type: 'folder',
		name: 'ECMAScript',
		backnub: 13
	}
];
var createNew = data.length;
var rightList = {
	global: [
		{
			name: '新建文件夹',
			exe: function(e, oldE) {
				dododo(e,oldE,'folder')
			}
		},
		{
			name: '新建文件',
			children: [
				{
					name: '新建PPT',
					exe: function(e, oldE) {
						dododo(e,oldE,'ppt')
					}
				},
				{
					name: '新建PDF',
					exe: function(e, oldE) {
						dododo(e,oldE,'pdf')
					}
				},
				{
					name: '新建DOC',
					exe:  function(e, oldE) {
						dododo(e,oldE,'doc')
					}
				}
			]
		},
		{
			name: '刷新',
			exe: function() {
				render( getChildren(0),mainList );
			}
		},
		{
			name: '粘贴',
			exe: function(e, oldE){
				console.log('粘贴');
			}
		}
	],
	folder: [
		{
			name: '打开',
			exe: function(e,oldE) {
				var newe = e;
				openWindow(e, get(oldE.target.dataset.cc), oldE.target, oldE.target.parentNode);
				e.target.parentNode.style.display = "none";
			}
		},
		{
			name: '删除',
			exe: function(e,oldE) {
				
				var idd = get(oldE.target.dataset.cc); // 获取要删除的元素 
				var ipd = idd.pid; // 把这个数据的pid存下来
				data.forEach(function(item){ // 循环数组
					if (item.id == idd.id) { // 如果数组中某一位的id等于这个数据的id
						item.pid = 3; // 把这个数据的pid改成3，也就是指向回收站
					}
				});
				render( getChildren( ipd ), oldE.target.parentNode ); // 重新渲染
			}
		},
		{
			name: '重命名',
			exe: function(e, oldE) {
				var elLi = get(oldE.target.dataset.cc); // 修改对象
				var text = oldE.target.children[0].children[1];
				var liType = oldE.target.className;
				text.style.display = "block";
				text.value = elLi.name;
				text.select();
				text.addEventListener('blur', function(e){
					e.cancelBubble = true;
					nameSet(elLi,liType);
					data.forEach(function(item){
						if (item.id == elLi.id && text.value != "") {
							item.name = text.value;
						}
					});
					render( getChildren( elLi.pid ), oldE.target.parentNode );
					text.style.display = "none";
				});
			}
		},
		{
			name: '复制',
			exe: function(e, oldE){
				var copyElement = get( oldE.target.dataset.cc );
				var copyChildren = getAllChildren( oldE.target.dataset.cc );
				copyData.length = 0;
				copyData.push(copyElement);
				copyData = copyData.concat(copyChildren);
			}
		}
	],
	back: [
		{
			name: '还原',
			exe: function (e, oldE){
				var liEl = get( oldE.target.dataset.cc );
				data.forEach(function(item){
					if (item.id == liEl.id) {
						item.pid = item.backnub;
					}
				});
				render( getChildren( 3 ), oldE.target.parentNode );
				render( getChildren(0),mainList );
			}
		},
		{
			name: '删除',
			exe: function(e, oldE){
				var delElement = [];
				delElement.push(Number(oldE.target.dataset.cc));
				var idd = get(oldE.target.dataset.cc);
				removeEl(delElement);
				render( getChildren( idd.pid ),oldE.target.parentNode );
			}
		}
	]
};
var backData = [ // 用于存放回收站的数据

];
var copyData = [ // 用于存放复制元素的数组

];
function dododo(e,oldE,typeSet) {
	if (!oldE.target.children[0]) {
		var firstElcc = oldE.target.parentNode.dataset.cc;
		// console.log(oldE);
	} else {
		var firstElcc = get(oldE.target.children[0].dataset.cc).pid; // 通过设置的自定义属性得到当前容器下第0个元素的pid  当前父级下不为空
	}
	nameSet({
		pid: firstElcc,
		name: '',
		type: typeSet,
		backnub: firstElcc
	},typeSet);
	render( getChildren( firstElcc ),oldE.target );
}

/* 获取所有子级 */
function getAllChildren(pid) {
	var allChildren = []; // 空数组存放所有子级
	allChildren = getChildren( pid );
	allChildren.forEach(function(item){
		var children = getAllChildren( item.id );
		allChildren = allChildren.concat( children );
	});
	return allChildren;
}

function removeEl(ids) { // 删除元素, 传进来的是个数组，因为框选删除的话可能是多个
	var allids = []; // 空数组存储所有id
	ids.forEach(function(id) {
		allids.push(id);
		// console.log(allids);
		allids = allids.concat( getAllChildren(id ).map( function(item) {
			return item.id;
		}));
	});
	data = data.filter(function(item) {
		return allids.indexOf(item.id) == -1;
	});
}
