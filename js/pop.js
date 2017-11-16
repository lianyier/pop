(function($){
	var defaults={
		title:'',
		message:'',
		popClass:'',//弹窗额外的弹窗样式
		okText:'确定',//确定文本
		cancelText:'取消',
		onOk:function(){},//确定时间
		onCancel:function(){}
	}
	//构造函数
	function PopUp(ele,opt){
		//指定父容器
		this.container=ele||document.body;
		//合并配置 $extend方法 将多个对象进行合并最终返回合并后的对象
		var opt = $.extend({}, defaults, opt);
		//将合并后的配置迭代进类的属性
		for(var k in opt){
			this[k]=opt[k];
		}
		this.init();
	}
	PopUp.prototype = {
		init:function(){
			//创建弹窗
			this.create();
			//绑定事件
			this.bindEvents();
		},
		create:function(){
			//创建蒙层
			var $mask=$('<div id="pop-mask"></div>');
			this.$mask=$("#pop-mask").length > 0 ? $("#pop-mask") : $mask;
			$('body').append(this.$mask);
			
			//创建弹窗主体
			var popbody=$("<div class='default-pop'></div>");
			if(this.title!==""){
				var header=$('<header>'+this.title+'</header>');
				popbody.append(header);
			}
			
			//创建弹窗内容
			var popcontent=$('<div class="pop-content">'+this.message+'</div>');
			popbody.append(popcontent);
			
			//创建底部按钮
			var popfooter=$('<footer><span class="pop-cancel">'+this.cancelText+'</span><span class="pop-ok">'+this.okText+'</span></footer>');
			popbody.append(popfooter);
			
			//将弹窗主体放入容器中
			$(this.container).append(popbody);
			this.$pop=$('.default-pop').length>0?$('.default-pop'):popbody;
			this.show();
		},
		show:function(){
			var _this=this;
			this.$pop.css({
				'margin-left':-(_this.$pop.width()/2),
				'margin-top':-(_this.$pop.height()/2),
			})
			setTimeout(function(){
				_this.$pop.addClass('show');
			},300)
		},
		
		bindEvents:function(){
			this.okBtn=this.$pop.find('.pop-ok');
			this.canBtn=this.$pop.find('.pop-cancel');
			var _this=this;
			
			this.okBtn.on('click',function(){
				//执行配置的确定函数
				_this.onOk();
				//关闭弹窗
				_this.close();
			})
			
			this.canBtn.on('click',function(){
				//执行配置的确定函数
				_this.onCancel();
				//关闭弹窗
				_this.close();
			})
		},
		close:function(){
			var _this=this;
			this.$pop.removeClass('show');
			this.unBindEvents();
			setTimeout(function(){
				_this.$pop.remove();
				_this.$mask.hide();
			},400)
		},
		unBindEvents:function(){
			this.okBtn.off('click');
			this.canBtn.off('click');
		}
	}
	//将实例注册到zepto插件对象中
	$.fn.popup=function(opt){
		//转化为js
		return new PopUp(this[0],opt);
	}
}($))