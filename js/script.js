$(function(){
	var fadeInOutObj={//创建一个节点
		flashNode:$('#flash'),
		leftNode:$('.flash_left'),
		rightNode:$('.flash_right'),
		lisNode:$('#flash li'),
		spansNode:$('.flash_buttom span'),
		spanCurName:'spanCur',
		spanCurstring:'.flash_buttom .spanCur',
		fadeInOut:function(oldpos,nowpos){
			fadeInOutObj.spansNode.eq(oldpos).removeClass();
			fadeInOutObj.spansNode.eq(nowpos).addClass(fadeInOutObj.spanCurName);
			fadeInOutObj.lisNode.eq(oldpos).stop().fadeOut();//淡出
			fadeInOutObj.lisNode.eq(nowpos).stop().fadeIn();//淡入
		},
		auto:null,
		
		slidelisNode:$('.flide li'),//取滑动元素中li的元素
		slidelisNamne:'liCur',
		slidelisString:'.flide .liCur',
		slideappName:'lisapp1',
		slideappNode:$('.lisapp1'),
		
		slideInOut:function(oldpos,nowpos){
			var appWidth;
			fadeInOutObj.slidelisNode.eq(oldpos).removeClass(fadeInOutObj.slidelisNamne)//去掉标记
			fadeInOutObj.slidelisNode.eq(oldpos).removeClass(fadeInOutObj.slideappName)//去掉标记
            fadeInOutObj.slidelisNode.eq(nowpos).css({"backgroundPositionY":-(667+170*nowpos-1)+"px"})
            fadeInOutObj.slidelisNode.eq(oldpos).css({"backgroundPositionY":(-166*oldpos-1)+"px"})
			fadeInOutObj.slidelisNode.eq(nowpos).addClass(fadeInOutObj.slidelisNamne);//新的位置加上标记
			fadeInOutObj.slidelisNode.eq(nowpos).addClass(fadeInOutObj.slideappName);//新的位置加上标记
			fadeInOutObj.slidelisNode.eq(oldpos).stop().animate({width:"0px"},1000);
			fadeInOutObj.slidelisNode.eq(nowpos).stop().animate({width:"344px"},1000);
		}
		
	};
	fadeInOutObj.flashNode.hover(
		
		function(){
		fadeInOutObj.leftNode.show();
		fadeInOutObj.rightNode.show();
		window.clearInterval(fadeInOutObj.auto);
	},

	function(){
		fadeInOutObj.leftNode.hide();
		fadeInOutObj.rightNode.hide();
		fadeInOutObj.auto=window.setInterval(function(){
			fadeInOutObj.rightNode.click();
		},3000);
	})
	
	fadeInOutObj.spansNode.mouseenter(function(){
		if($(this).is("."+fadeInOutObj.spanCurName))
		{
			return;
		}
		var oldpos=$(fadeInOutObj.spanCurstring).index();//找到span的类中的值，然后获取类所在的位置
		var nowpos=$(this).index();//碰上span后获取当前位置
		fadeInOutObj.fadeInOut(oldpos,nowpos);
	});
	
	fadeInOutObj.leftNode.click(function(){
		var oldpos=$(fadeInOutObj.spanCurstring).index();//点击即获取以前的位置
		var lastpos=fadeInOutObj.spansNode.length-1;
		var nowpos=oldpos==0?lastpos:oldpos-1;
		fadeInOutObj.fadeInOut(oldpos,nowpos);
	});
	
	fadeInOutObj.rightNode.click(function(){
		var oldpos=$(fadeInOutObj.spanCurstring).index();//寻找span的类所在的位置
//		console.log(3);
		var lastpos=fadeInOutObj.spansNode.length-1;//最后一个节点是当前点中的节点
		var nowpos=oldpos==lastpos?0:oldpos+1;
		fadeInOutObj.fadeInOut(oldpos,nowpos);
	});
	
	fadeInOutObj.slidelisNode.mouseenter(function(){
		if($(this).hasClass('liCur'))
		{
			return;
		}
		var nowspos=$(this).index();//寻找当前位置
		var oldpos=$('.flide .liCur').index();
		fadeInOutObj.slideInOut(oldpos,nowspos);
		
	});
	
	/*图片文字切换*/
	var itrightBox=$('#it_right');//获取右边框div节点
	var italeft=$('.nav_left');
	var itaright=$('.nav_right');
    var lisWidth=itrightBox.find('li:first');//获取li的可视宽度
	
	itrightBox.mouseenter(function(){
		window.clearInterval(auto);//鼠标移动后，停止触发，幻灯片不会切换
	})
	
	itrightBox.mouseleave(function(){
		var auto=window.setInterval(function(){
			itaright.click();
		},2000)
	})
	
	itaright.click(function(){
//			console.log(123);
		var firstli=$('#it_right ul li:first');//获取第一个li的节点
		firstli.animate({marginLeft:-lisWidth+"px"},0,function(){
			$(this).appendTo($(this).parent()).css({marginLeft:"0px"});
		});

	})
	
	italeft.click(function(){
		var lisWidth=itrightBox.find('li:first');//获取li的可视宽度
			var firstli=$('#it_right ul li:first');
			var lastli=$('#it_right ul li:last');
	lastli.css({marginLeft:-lisWidth+"px"}).prependTo(itrightBox.find('ul'));
		firstli.animate({marginLeft:"0px"},0);
	})
	
	var itleftbox=$('.it_left');
	itleftbox.mouseenter(function(){
		
		itleftbox.find('em').stop().animate({top:"0px"},1000);
		//找到img
		itleftbox.find('img').stop().animate({"width":"540px","height":"265px"},1000);
	});
	itleftbox.mouseleave(function(){
		var itheight=itleftbox.height();//获取itleftbox的高度
		itleftbox.find('em').stop().animate({top:itheight+"px"},1000);
		itleftbox.find('img').stop().animate({"width":"491px","height":"241px"});
	});
	
	var auto=window.setInterval(function(){
		itaright.click();
	},2000);
	

	/*图片切换*/
	var micbox=$('#micro');
	var micleft=$('.micleft');
	var micright=$('.micright');
	var firstlis=micbox.find('li:first');
	var marright=parseInt(firstlis.css("margin-right"));
	var liWidth=firstlis.width()+marright;
	micright.click(function(){
		//将最后个li插入到第一个去
//		console.log(liWidth);
		micbox.find("li:last").css({marginLeft:-liWidth+"px"}).prependTo(micbox.children('ul'));
		micbox.find('li:first').stop().animate({marginLeft:"0px"},1000);
	});
	
	micleft.click(function(){
		//获取第一个li的节点
		micbox.find('li:first').stop().animate({marginLeft:-liWidth+"px"},1000,function(){
			$(this).parent().append($(this).css("margin-left",'0px'));
		});
	})
	
	micbox.mouseleave(function(){
		var autoDo=window.setInterval(function(){
			micright.click();
		})
	},2000);
	micbox.mouseenter(function(){
		window.clearInterval(autoDo);
	});
	
	var autoDo=window.setInterval(function(){
		micright.click();
	},2000);
	
	/*回到顶部*/
	var toTopNode=document.getElementById('toTop');
	var backToNode=document.getElementById('backto');
	window.onscroll=function(){
		var scrolltoTopNum=document.documentElement.scrollTop+document.body.scrollTop;//窗口滚去滚动条的距离
		var winHeight=document.documentElement.clientHeight;//可视窗口的高度
		if(scrolltoTopNum>winHeight){
//			toTopNode.css({"display":"block"});
               toTopNode.style.display="";
		}
	   else
		{
//			toTopNode.css({"display":"none"});
         toTopNode.style.display="none";
		}
		toTopNode.onclick=toTopFun;
		backToNode.onclick=toTopFun;
		function toTopFun(){
//			console.log(1)
			document.body.scrollTop=0;
			document.documentElement.scrollTop=0;
		}
	}



	var topnavbox=$('#topnav');
	var lisNode=$('.top_nav_ul li, .top_nav_ul dd');//取导航中的元素li
	var dlslide=lisNode.children('dl');//取li的孩子dl
//  var dlheight=dlslide.height();  //获取下拉框的高度

lisNode.each(function(){
	if($(this).children('.topnavCur').hasClass('topnavCur'))
	{
		$(this).mouseenter(function(){
			if(this.nodeName=="DD")
			{
				$(this).children('a').addClass('dLcur');
			}
//			var nowpos=$(this).index();//获取当前鼠标移动的位置的值
           var nowdl=$(this).find('dl:first');
//			nowdl.css({"display":"block"});
nowdl.slideDown();
	})
		$(this).mouseleave(function(){
			if(this.nodeName=="DD")
			{
				$(this).children('a').removeClass('dLcur');
			}
		$(this).children('dl').css({"display":"none"});
//$(this).children('dl').slideUp();
	})
	}
});



$('#listul ul').children("*").slideDown();
$('.txt li').click(function(){
	$(this).addClass('proCur').siblings('.proCur').removeClass('proCur');
	var className=$(this).attr("date");
	console.log(className)
	if(className=="*")
	
		$('#listul ul').children(className).slideDown();
	
	else
	{
	$("#listul ul").children(className).slideDown();
	$("#listul ul").children(className).siblings("li:not("+className+")").slideUp();
	console.log(12)
	}
	
});

var linode=$('#list').children('ul').find('li');
linode.click(function(){
	$(this).addClass("listCur");
	$(this).siblings('.listCur').removeClass('listCur');
	
	var htmlcontent=$(this).find('a').html();//获取栏目内容
	$('.navdh').children('i').html(htmlcontent);//改变导航的内容
	
	var className=$(this).attr("data");
	console.log(className)
	if(className==".a")
	
		$('.detail_txt').children(className).slideDown();
		$('.detail_txt').children(className).siblings("div .b").slideUp();
	if(className==".b")
	
		$('.detail_txt').children(className).slideDown();
		$('.detail_txt').children(className).siblings("div .a").slideUp();
//     $(this).slideDown();
//     $(this).siblings('.listCur').slideUp();
	
})



})
