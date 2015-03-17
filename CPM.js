//@fooklook xiashuo.he@foxmail.com 2014-08-13 弹窗插件
//书写原因  网上的弹窗插件不符合个人要求 
//使用说明
//	要求jquery-1.7.2.js一下版本 因为使用到的是live事件

$(function(){
	var loadingImg = ['images/loading0.gif', 'images/loading1.gif', 'images/loading2.gif', 'images/loading3.gif'];
	var imgStyle = ['url(images/xubox_ico0.png) -90px 0px no-repeat','url(images/xubox_ico0.png) 0px 0px no-repeat'];
	//预先加载所需的图片
	function loadImgTime(img){
		var imgArray = [];
		img.load(function(){
			imgArray['width']= img.width(); 
			imgArray['height'] = img.height();
			alert(img.height());
		});
		return imgArray;
	}
	/*--------全屏幕布--------*/
	//普通幕布0.2
	function allScreen(){
		$("body").append('<div id="screen"></div>');
	}
	//警告幕布0.6
	function warnScreen($percent){
		if(typeof($percent)=="undefined"){
			$percent="0.6";
		}
		allScreen();
		$("#screen").css({"opacity":$percent});
	}
	/*------全屏幕布结束--------*/
	/*--------关闭弹窗---------*/
	function closeCPM(){
		$("#cpm").remove();
		$("#screen").remove();
	}
	/*-------关闭弹窗结束-------*/
	/*--------加载弹窗---------*/
	function loadingW(num){
		allScreen();
		$("body").append('<div id="cpm"></div>');
		var $CPM = $("#cpm");
		var imgArray = [];
		var img = new Image();
		img.src = loadingImg[num];
		//动态加载图片
		$(img).load(function(){
			var $html = '<img src="'+loadingImg[num]+'" />';
			$CPM.html($html);
			imgArray['width'] = $CPM.find("img").width()/2;
			imgArray['height'] = $CPM.find("img").height()/2;
			$CPM.css({'margin-left':'-'+imgArray['width']+'px','margin-top':'-'+imgArray['height']+'px'});
		});
	}
	/*------加载弹窗结束---------*/
	/*--------公告弹窗-----------*/
	function noticeW(text){
		allScreen();
		$("body").append('<div id="cpm"></div>');
		var $CPM = $("#cpm");
		text += '<div class="closecpm closeCPM"></div>';
		$CPM.html(text);
		var imgArray = [];
		imgArray['width'] = $CPM.find(".notice").width()/2;
		imgArray['height'] = $CPM.find(".notice").height()/2;
		$CPM.css({'margin-left':'-'+imgArray['width']+'px','margin-top':'-'+imgArray['height']+'px'});
	}
	$(".closeCPM").live("click", function(){
		closeCPM();
	});
	//noticeW('<div class="notice"><div class="title">公告</div><p>&nbsp;&nbsp;告诉大家这是一个开源的提示框，欢迎大家使用，并且提出相关意见。</p></div>');
	/*-------公告弹窗结束---------*/
	/*-------提示框标准----------*/
	function remindW(head,text,button){
		allScreen();
		$("body").append('<div id="cpm"></div>');
		var $CPM = $("#cpm");
		var cpm = '<div class="cpmHead"><div class="headtitle">'+head+'</div><a class="closeCPM closecpm1"></a></div><div class="cpmbody"><p>';
		cpm += text;
		cpm += '<p>'+button+'</div>'
		$CPM.html(cpm);
		var imgArray = [];
		imgArray['width'] = $CPM.width()/2;
		imgArray['height'] = $CPM.height()/2;
		$CPM.css({'margin-left':'-'+imgArray['width']+'px','margin-top':'-'+imgArray['height']+'px'});
	}
	/*-------提示框标准结束----------*/
	/*-------简单提示弹窗---------*/
	function alertW(text){
		remindW('',text,'<a class="cancel closeCPM" href="javascript:;">确定</a>');
	}
	//alertW('你确dfadaf定？你确dfadaf定？你确dfadaf定？你确dfadaf定？');
	/*------简单提示弹窗结束-------*/
	/*--------选择提示弹窗--------*/
	function confirmW(text,confirmEvent){
		remindW('',text,'<a class="confirm" href="javascript:;">确定</a><a class="cancel closeCPM" href="javascript:;">取消</a>');
		//确定事件
		var $confirm = $('.confirm');
		//取消原先绑定的事件
		$confirm.die('click');
		//绑定新的事件
		$confirm.live('click', function(){confirmEvent();});
	}
	//confirmW('你确定？', event1);
	//function event1(){
	//	alert();
	//	closeCPM();
	//}
	/*------选择提示弹窗结束------*/
	/*--------小贴士------------*/
	/* 考虑状况，页面可能同时出现多个小贴士。在实现上，小贴士将会放在body的最后位置，那么每次获取小贴士单元的时候，获取body中最后的一个小贴士。
	 * 
	 */
	function tipsW(element, text, bgcolor, color, time, positionW){
		//小贴士尖角出现位置
		var CornerPosition = ['tipsB', 'tipsL', 'tipsT', 'tipsR'];
		//elementO 元素对象
		var elementO = $(element);
		$('body').append('<div class="tipsW"><i></i>'+text+'</div>');
		//获取小贴士单元
		var tipsW = $(".tipsW:last");
		//小贴士的宽度和高度
		tipsWHeight = tipsW.outerHeight(true);
		tipsWWidth = tipsW.outerWidth(true);
		//小贴士对象的宽度和高度
		elementOHeight = elementO.outerHeight();
		elementOWidth = elementO.outerWidth();
		//小贴士对象相对屏幕上边和左边的距离
		elementOTop = elementO.offset().top;
		elementOLeft = elementO.offset().left;
		//小贴士出现位置
		var TipsPosition =[
			{'top':(elementOTop-tipsWHeight)+'px', 'left':(elementOLeft-10)+'px'},
			{'top':(elementOTop-10)+'px', 'left':(elementOLeft+elementOWidth)+'px'},
			{'top':(elementOTop+elementOHeight)+'px', 'left':(elementOLeft-10)+'px'},
			{'top':(elementOTop-15)+'px','left':(elementOLeft-tipsWWidth)+'px'},
		];
		
		if(typeof(positionW) != 'undefined'){
			tipsW.css(TipsPosition[positionW]);
			tipsW.find('i').addClass(CornerPosition[positionW]);
		}else if(elementOTop>tipsWHeight){
			//默认小贴士出现在元素的头部
			tipsW.css(TipsPosition[0]);
			tipsW.find('i').addClass(CornerPosition[0]);
			positionW = 0;
		}else{
			//如果元素出现在头部的位置不够，设定小贴士出现在元素右边
			tipsW.css(TipsPosition[1]);
			tipsW.find('i').addClass(CornerPosition[1]);
			positionW = 1;
		}
		//给元素上色
		if(typeof(bgcolor)!='undefined' && bgcolor != '' ){
			var TipsIcolor = [
				{'border-color':'transparent '+bgcolor+' transparent transparent'},
				{'border-color':'transparent transparent '+bgcolor+' transparent'},
				{'border-color':'transparent '+bgcolor+' transparent transparent'},
				{'border-color':'transparent transparent '+bgcolor+' transparent'},
				];
			tipsW.css({'background': bgcolor});
			tipsW.find('i').css(TipsIcolor[positionW]);
		}
		if(typeof(color)!='undefined' && color != '' ){
			tipsW.css({'color':color});
		}
		if(typeof(time)!='undefined' && time != '' ){
			setTimeout(function(){tipsW.remove()},time*1000);
		}
	}
	//tipsW("div","今天是新奇以爱的发的发掘客户的卡回复",'red','#fff', 1,1);
	/*------小贴士结束----------*/
	/*--------- 左下浮动菜单 ----------------*/
	//设置浮动菜单可拖拽
	var $cpmFixItem = {moveSide:1};
	$("#cpmfixnav").draggable(
		//拖拽开始事件
		{start:function(event,ui){
			//中间框显示
			$("#cpmTarget").addClass("cpmTarget");
			$("#cpmTarget").css({"border":"1px solid #000"});
		}},
		//拖拽中事件
		{drag:function(event,ui){
			$("p").html($(window).width()+"|"+ui.offset.left);
		}},
		//拖拽停止事件
		{stop:function(event,ui){
			//浏览器时下窗口可视区域高度
			var WinH = $(window).height();
			var WinW = $(window).width() ;
			if($cpmFixItem.moveSide==1){
				if(ui.offset.left<(WinW/2)){
					$(this).animate({"left":"100px"},500);
				}else{
					$(this).animate({"left":(WinW-100)+"px"},500);
				}
				//去除放置中间框
				$("#cpmTarget").removeClass("cpmTarget");
				$("#cpmTarget").css({"border":"0px"});
			}
			
		}}
	);
	$('#cpmTarget').droppable({drop: function() {
		$cpmFixItem.moveSide = 0;
		var element = $("#cpmfixnav a:eq(0)");
		var $cpm = element.parent();
		//设置悬浮菜单居中
		$cpm.css({top:"50%",left:"50%",
		"margin-left":"-"+(element.outerWidth()/2)+"px",
		"margin-top":"-"+(element.outerHeight()/2)+"px"});
		//悬浮菜单展开
		curve_track($cpm.find("a"),100);
		//curve_track($cpm);
	}},
	{out: function() {
		$("#cpmTarget").css({"border":"1px solid #000"});
		//设置为自动移动，为下次拖拽赋值
		$cpmFixItem.moveSide = 1;
		var element = $("#cpmfixnav a:eq(0)");
		var $cpm = element.parent();
		//悬浮菜单收起
		$cpm.find("a:gt(0)").animate({"top":"0px","right":"0px"},300);
	}},
	{over: function(){
		//拖至可放置位置时
		$(this).css({"border":"red 3px solid"});
	}});
	function cpmFixNav(left,bottom){
		//将悬窗口放置在指定位置
		var cpmNav = $("#cpmfixnav");
		cpmNav.css({"left":left+"px","bottom":bottom+"px"});
		var element = $("#cpmfixnav a:eq(0)");
		element.css({"z-index":"600"});
	};
	/* 盒子的曲线（curve）轨迹（track）
	 * $item 运行盒子
	 * $radius运行半径
	 */
	function curve_track($items,$radius){
		$spreadTime = 300;						//展开时间
		$itemNum = $items.length-1;
		$items.each(function(index){
			if(index != 0){
				var $start = index/$itemNum*Math.PI*2;
				var top = Math.sin($start)*$radius;
				var right = Math.cos($start)*$radius;
				$(this).animate({"top":top,"right":right},$spreadTime);
				$slideNum = 0.125*Math.PI*2;
				top = Math.sin($start-$slideNum)*$radius;
				right = Math.cos($start-$slideNum)*$radius;
				$(this).animate({"top":top,"right":right},$spreadTime);	
			}
		});
	}

	cpmFixNav(50,50);
	/*--------- 左下浮动菜单结束 ----------------*/
	/*--------- 图片显示优化 ----------*/
	function cpmShowPic($imgbox){
		var $imgLi = $imgbox.find("ul li");
		var $imgLiWidth = $imgLi.width();
		var $imgLiHeight = $imgLi.height();
		var $imgLiWH = $imgLiWidth/$imgLiHeight;
		$imgLi.each(function(index){
			var imgItem = $(this).find("img");
			var imgItemWH = imgItem.width()/imgItem.height();
			if($imgLiWH>=imgItemWH){
				var margin_top = 0-($imgLiWidth/imgItemWH-$imgLiHeight)/2;
				imgItem.css({"width":$imgLiWidth,"margin-top":margin_top});	
			}else{
				var Width = $imgLiHeight*imgItemWH;
				var margin_left = 0-(Width-$imgLiWidth)/2
				imgItem.css({"width":Width,"margin-left":margin_left});	
			}
		});
	}
	cpmShowPic($(".cpmAlbum"));
	/*--------- 弹窗幻灯片显示 ----------*/
	
	/*----------图片最在幻灯片中最优化显示------------*/
	function cpmSlidePic($imgbox){
		//计算幻灯片展示盒子宽度和宽度及比例
		$imgboxHeight = $imgbox.innerHeight();
		$imgboxWidth = $imgbox.innerWidth();
		itemImg = $imgbox.find("img");
		itemImgHeight = itemImg.height();;
		itemImgWidth = itemImg.width();
		if($imgboxHeight>=itemImgHeight && $imgboxWidth>=itemImgWidth){
			//图片左右居中显示
			$imgbox.find("div").addClass("center");
			//图片上下居中显示
			itemImg.css({"margin-top":($imgboxHeight-itemImgHeight)/2});
		}else if($imgboxHeight>itemImgHeight && $imgboxWidth<itemImgWidth){
			//计算图片与盒子的宽度差
			BoxItemW = itemImgWidth-$imgboxWidth;
			//设置div的宽与高 margin值
			$imgbox.find("div").css({"height":itemImgHeight,
									"width":2*BoxItemW+$imgboxWidth,
									"margin-left":"-"+BoxItemW+"px",
									"margin-top":($imgboxHeight-itemImgHeight)/2,
									});
			//设置图片的显示位置
			$imgbox.find("img").css({"left":BoxItemW});
			//设置可拖拽
			$imgbox.find("img").draggable({containment:'.albumImgShow div'});
			//显示预览框
			$imgbox.append("<div class='Sample'><div class='Sampleimg'><img src='"+$imgbox.find("div img").attr("src")+"' /><div class='SampleWindow'></div></div></div>");
			//设置预览框图片显示
			imgSamplebox = $imgbox.find("div.Sample");
			imgSampleimg = $imgbox.find("div.Sample img");
			if(imgSampleimg.innerHeight()>imgSampleimg.innerWidth()){
				imgSampleimg.css({"height":imgSamplebox.innerHeight()});
			}else{
				imgSampleimg.css({"width":imgSamplebox.innerWidth()});
				$imgbox.find("div.Sample div.Sampleimg").css({"margin-top":(imgSamplebox.innerHeight()-imgSampleimg.innerHeight())/2});
			}
			//大图与预览小图比例
			imgRatioW = BoxItemW/($imgbox.find("div.Sample div.Sampleimg img").innerWidth()-$imgbox.find("div.Sample div.Sampleimg div.SampleWindow").outerWidth());
			//设置可视区域高度
			$imgbox.find("div.Sample div.SampleWindow").css({"height":imgSampleimg.innerHeight()-4});
			//设置可拖拽
			$imgbox.find("div.Sample div.SampleWindow").draggable({containment:'div.Sample div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.show img").css({"left":BoxItemW-($imgbox.find("div.Sample div.SampleWindow").position().left)*imgRatioW});
			}}
			);
			
			$imgbox.find("div.show img").draggable({containment:'.albumImgShow div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.Sample div.SampleWindow").css({"left":(BoxItemW-$imgbox.find("div.show img").position().left)/imgRatioW});
			}}
			);
		}else if($imgboxHeight<itemImgHeight && $imgboxWidth>itemImgWidth){
			//计算图片与盒子的高度差
			BoxItemH = itemImgHeight-$imgboxHeight;
			//设置div的宽与高 margin值
			$imgbox.find("div").css({"height":2*BoxItemH+$imgboxHeight,
									"width":itemImgWidth,
									"margin":"0px auto",
									"margin-top":"-"+BoxItemH+"px",
									});
			//设置图片的显示位置
			$imgbox.find("img").css({"top":BoxItemH});
			//设置可拖拽
			$imgbox.find("img").draggable({containment:'.albumImgShow div'});
			//显示预览框
			$imgbox.append("<div class='Sample'><div class='Sampleimg'><img src='"+$imgbox.find("div img").attr("src")+"' /><div class='SampleWindow'></div></div></div>");
			//设置预览框图片显示
			imgSamplebox = $imgbox.find("div.Sample");
			imgSampleimg = $imgbox.find("div.Sample img");
			if(imgSampleimg.innerHeight()>imgSampleimg.innerWidth()){
				imgSampleimg.css({"height":imgSamplebox.innerHeight()});
			}else{
				imgSampleimg.css({"width":imgSamplebox.innerWidth()});
				$imgbox.find("div.Sample div.Sampleimg").css({"margin-top":(imgSamplebox.innerHeight()-imgSampleimg.innerHeight())/2});
				//alert($(window).height());
			}
			//大图与预览小图比例
			imgRatioH = BoxItemH/($imgbox.find("div.Sample div.Sampleimg img").innerHeight()-$imgbox.find("div.Sample div.Sampleimg div.SampleWindow").outerHeight());
			//设置可视区域宽度
			$imgbox.find("div.Sample div.SampleWindow").css({"width":imgSampleimg.innerWidth()-4});
			//设置可拖拽
			$imgbox.find("div.Sample div.SampleWindow").draggable({containment:'div.Sample div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.show img").css({"top":BoxItemH-($imgbox.find("div.Sample div.SampleWindow").position().top)*imgRatioH});
			}}
			);
			$imgbox.find("div.show img").draggable({containment:'.albumImgShow div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.Sample div.SampleWindow").css({"top":(BoxItemH-$imgbox.find("div.show img").position().top)/imgRatioH});
			}}
			);
		}else{
			//计算图片与盒子的高度差
			BoxItemH = itemImgHeight-$imgboxHeight;
			//计算图片与盒子的宽度差
			BoxItemW = itemImgWidth-$imgboxWidth;
			//设置div的宽与高 margin值
			$imgbox.find("div").css({"width":2*BoxItemW+$imgboxWidth,
									"height":2*BoxItemH+$imgboxHeight,
									"margin-left":"-"+BoxItemW+"px",
									"margin-top":"-"+BoxItemH+"px"});
			//设置图片的显示位置
			$imgbox.find("img").css({"left":BoxItemW,
									"top":BoxItemH});
			//显示预览框
			$imgbox.append("<div class='Sample'><div class='Sampleimg'><img src='"+$imgbox.find("div img").attr("src")+"' /><div class='SampleWindow'></div></div></div>");
			//设置预览框图片显示
			imgSamplebox = $imgbox.find("div.Sample");
			imgSampleimg = $imgbox.find("div.Sample img");
			if(imgSampleimg.innerHeight()>imgSampleimg.innerWidth()){
				imgSampleimg.css({"height":imgSamplebox.innerHeight()});
			}else{
				imgSampleimg.css({"width":imgSamplebox.innerWidth()});
				$imgbox.find("div.Sample div.Sampleimg").css({"margin-top":(imgSamplebox.innerHeight()-imgSampleimg.innerHeight())/2});
				//alert($(window).height());
			}
			//大图与预览小图比例
			imgRatioW = BoxItemW/($imgbox.find("div.Sample div.Sampleimg img").innerWidth()-$imgbox.find("div.Sample div.Sampleimg div.SampleWindow").outerWidth());
			imgRatioH = BoxItemH/($imgbox.find("div.Sample div.Sampleimg img").innerHeight()-$imgbox.find("div.Sample div.Sampleimg div.SampleWindow").outerHeight());
			//设置可拖拽
			$imgbox.find("div.Sample div.SampleWindow").draggable({containment:'div.Sample div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.show img").css({"top":BoxItemH-($imgbox.find("div.Sample div.SampleWindow").position().top)*imgRatioH,
												"left":BoxItemW-($imgbox.find("div.Sample div.SampleWindow").position().left)*imgRatioW});
			}}
			);
			$imgbox.find("div.show img").draggable({containment:'.albumImgShow div',
			//拖拽中事件
			drag:function(event,ui){
				$imgbox.find("div.Sample div.SampleWindow").css({"top":(BoxItemH-$imgbox.find("div.show img").position().top)/imgRatioH,
																"left":(BoxItemW-$imgbox.find("div.show img").position().left)/imgRatioW});
			}}
			);
		}
		
	}
	/*----------图片最在幻灯片中最优化显示 END---------*/
	/*-----------ERROR-----------------*/
	function cpmAlbum($imgbox,$showImg){
		//获取图片地数组址
		var $imgLi = $imgbox.find("ul li");
		var imgUrl = new Array();				//图片地址数组
		$imgLi.each(function(index){
			var imgItem = $(this).find("img");
			var url = imgItem.attr("src");
			imgUrl.push(url);
		});
		//开启幕布
		warnScreen();
		$("body").append('<div id="cpm"></div>');
		var $CPM = $("#cpm");
		var text = "";								//显示内容
		text += '<div class="closecpm closeCPM"></div>';
		text += '<div class="albumImg">';
		text += '<div class="albumImgShow">';
		text += '<div class="show">';
		text += '<img src="'+imgUrl[$showImg]+'" />';
		text += '</div>';
		text += '</div>';
		//text += '<div class="albumMiniImg"><ul>';
		//$.each(imgUrl,function(index){
		//	text += '<li><img src="'+imgUrl[index]+'" /></li>';
		//});
		//text +='</ul></div>';
		text += '</div>';
		text += '<div class="albumComment">图片说明文字</div>';
		$CPM.html(text);
		var CPMwidth = 980;
		var CPMheight = $(window).height()/2-20;
		$CPM.css({"height":$(window).height()-22,"width":"980px","background":"#000"});
		$CPM.css({'margin-left':'-'+CPMwidth/2+'px','margin-top':'-'+CPMheight+'px'});
		cpmSlidePic($(".albumImgShow"));
		
	}
	$(".cpmAlbum ul li").click(function(){
		cpmAlbum($(".cpmAlbum"),$(this).index());
	});
	/*-----------ERROR-----------------*/
	/*--------- 弹窗幻灯片显示    未完结----------*/
});
