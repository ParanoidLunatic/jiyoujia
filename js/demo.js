$(".all .top .qujian").mouseenter(function(){
	$(this).find(".queding").show();
}).mouseleave(function(){
	$(".all .top .qujian .queding").hide();
});
$(".all .top .suozai").mouseenter(function(){
	$(this).find(".city").show();
}).mouseleave(function(){
	$(".all .top .suozai .city").hide();
});
$(".all .top .title").click(function(){
	$(this).addClass("jia").siblings().removeClass("jia");
});

$.fn.extend({
	_all:function(option){
		var _data = option.data,
			_this = this;
			_this.num = 0;
			_this.data = _data;
			_this._sheng(_this.data)
			_this._huan(_this.data)
			_this._paixu(_this.data)
			_this._dianji(option.data);
	},
	_sheng:function(data){
		var _this = this,
			_data = data,
			num = _this.num;
		var $bao = $("<div class='bao'></div>");
			if(parseInt((data.length-num*10)/10)>0){
				var y=10;
			}else(y=(data.length-num*10)%10)
		for(var i = 0+num*10;i<y+num*10;i++){
			$bao.append(
				'<div class="one">'
				+'<div class="tupian">'
				+'<a>'
					+"<img src=\"http:"+_data[i].image+"\">"
				+'</a>'
				+'<div class="zhao">'
				+'<span>找同款</span>'
				+'<span>'+'<a>找相似</a>'+'</span>'
				+'</div>'
				+'<div class="gai">'
				+'<div class="baoyou tuxia">'
					+'<span>¥</span>'
					+'<span>'+_data[i].price+'</span>'
					+'<label>包邮</label>'
				+'</div>'
				+'<div class="zi tuxia">'
					+'<a href="#">'
						+_data[i].name
					+'</a>'
				+'</div>'
				+'<div class="dizhi tuxia">'
					+'<a href="#">'
					+_data[i].owner
					+'</a>'
					+'<span>'
					+_data[i].location
					+'</span>'
				+'</div>'
				+'<div class="xiaoliang">交易量：'+_data[i].sold+'</div>'
				+'<div class="goumai tuxia">'
					+'<a href="#">购买</a>'
				+'</div>'
			);
		}
		$(this).html($bao);
	},
	_huan:function(data){
		var dataPage = parseInt(data.length/10),
			_this = this;
		var $xz = $(".xz"),
			$xy = $(".xy"),
			$yeshu = $(".yeshu"),
			$weiye = $(".weiye"),
			nowtext = $yeshu.text();
			if(parseInt(data.length%10)>0){
				$weiye.text(dataPage+1);
			}else{
				$weiye.text(dataPage);
			}
			nowtext == "1"? $xz.attr("disabled","true"):$xz.removeAttr("disabled");

		$xz.click(function(){
			nowtext <= 2? $xz.attr("disabled","true"):$xz.removeAttr("disabled");
			$yeshu.text(--nowtext);
			$xy.removeAttr("disabled");
			_this.num = nowtext-1;
			_this._sheng(_this.data);
		})
		$xy.click(function(){
			nowtext >= dataPage-1? $xy.prop("disabled","true"):$xy.removeAttr("disabled");
			$yeshu.text(++nowtext);
			$xz.removeAttr("disabled");
			_this.num = nowtext-1;
			_this._sheng(_this.data);
		})
	},
	_paixu : function(data){
		var _this=this,
			changedata = data;
		$(".titone").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].price)>parseInt(changedata[i+1].price)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._sheng(_this.data);
			_this._huan(_this.data);
			
		});
		$(".tittwo").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].price)<parseInt(changedata[i+1].price)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._sheng(_this.data);
			_this._huan(_this.data);
			
		});
		$(".titthree").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].sold)>parseInt(changedata[i+1].sold)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._sheng(_this.data);
			_this._huan(_this.data);
			
		});
		$(".titfor").click(function(){
			var changedata = _this.data;
			for (var j = 0; j< changedata.length-1; j++) {
				for(var i=0;i<changedata.length-1;i++){
					var datamin;
					if(parseInt(changedata[i].sold)<parseInt(changedata[i+1].sold)){
						datamin=changedata[i+1];
						changedata[i+1]=changedata[i];
						changedata[i]=datamin;
					}
				}
			}
			var _data=changedata;
			_this.data=_data;
			_this._sheng(_this.data);
			_this._huan(_this.data);
			
		});
	},
	_dianji : function(data){
		var _this=this,
			min=0,
			max=999999;
		$(".queding").click(function(){
			var yuandata = data,
				dataArea=[];
			var $intleft = $(".intleft").val()/* =="¥"?0:$(".numLeft").val() */,
				$intright = $(".intright").val() /*=="¥"?999999:$(".numRight").val()*/;
			if(parseInt($intleft)<=parseInt($intright)){
				min=$intleft;
				max=$intright;
			}else{
				min=$intright;
				max=$intleft;
			};
			var x=0;
			for(var i=0;i<yuandata.length;i++){
				if(parseInt(yuandata[i].price)>=min&&parseInt(yuandata[i].price)<=max){
					dataArea[x]=yuandata[i];
					x++;
				}
			}
			_this.data = dataArea;
			_this._sheng(_this.data);
			_this._huan(_this.data);
		})
	}
});
$.ajax({
	url : "http://www.ikindness.cn/api/test/getProduct"
}).done(function(data){
	$(".main")._all({
		data:data.data
	});
})	
	

