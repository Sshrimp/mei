<template>
	<div id="brand">
		<!-- <div class="read">目前最底层路由</div> -->
			<div :id="changeNav">
				<!-- 跳到相应的首页 -->
				<!-- <router-link tag="i" to="/index/" class="iconfont icon-fanhui iconleft" style="font-size:30px; float: left;"></router-link> -->
				<i class="iconfont icon-fanhui iconleft" style="font-size:30px; float: left;" @click="handleindex()"></i>
				<p style="float:left;font-weight: bold;width: 82%;margin: 0 auto;
				text-align: center" v-show="pShow">{{brandnav.brandName}}</p>
				<i class="iconfont icon-gengduo iconright" style="font-size:30px;float:right;" @click="liShow=!liShow"></i>
				<div class="menu" v-show="liShow" style="position:relative">
					<div class="arrow"></div>
					<ul class="menu-list" >
					<router-link tag="li" to="/index/">首页</router-link>
					<router-link tag="li" to="/shoppingcart/">购物袋</router-link>
					<router-link tag="li" to="/login/mobile/" style="border-bottom:none">个人中心</router-link>
					</ul>
				</div>
			</div>
		<div class="imgbk">
			<!-- 引入icon -->
			<h3 class="brand-title" style="z-index:2">{{brandnav.brandName}}</h3>
			<img :src="brandnav.brandPageImage">
			<div class="brand-kv-mask"></div>
			<router-link to="/login/mobile/" tag="div" class="black follow"
		 >+关注</router-link>

		</div>
		<div class="brand-total">
			<span>在售商品{{brandnav1.onSaleTotal}}件</span>
			<span>上新{{brandnav1.newTotal}}件</span>
		</div>
		<!-- 展开动画效果 -->
		<div class="navout">
			<div :id="changep">
				
				<p class="navdes bounce">
					{{brandnav.brandStoryText}}
				</p>
				
				<p class="more" @click="handleMore()">{{word}}</p>
			</div>
		</div>

		<!-- div动画效果 -->
		<div class="donghuadiv">
		<!-- 第一个轮播 -->
		<div class="lunbo1">
			<p class="lunbo11">精选上新</p>
			<div class="swiper-container lunbo14">
    			<div  class="swiper-wrapper ">
    				<div v-for="data,myindex in lunboimg1" class="swiper-slide" @click="clicklunbo1(myindex)">
    					<div class="swiper11">
    						<img :src="data.fileUrl">
     						<span style="color:black">￥{{data.price}} </span>
     						<span style="text-decoration:line-through;color:#999"> ￥{{data.marketPrice}}</span>
    					</div>
     				</div>
    			</div>
 			 </div>
		</div>

		<!-- 第二个轮播 -->
		<div class="lunbo1">
			<p class="lunbo11">人气热销</p>
			<div class="swiper-container lunbo14">
    			<div  class="swiper-wrapper ">
    				<div v-for="data,myindex in lunboimg2" class="swiper-slide" @click="clicklunbo2(myindex)">
    					<div class="swiper11">
    						<img :src="data.fileUrl">
     						<span style="">￥{{data.price}} </span>
     						<span style="text-decoration:line-through;color:#999"> ￥{{data.marketPrice}}</span>
    					</div>
     					
     				</div>
    			</div>
 			 </div>
		</div>
		<!-- 好货推荐 -->
		<div class="lunbo3">
			<p class="lunbo31">好货推荐</p>
			 <div class="swiper-container" style="margin-left: 5%">
    			<div class="swiper-wrapper">   				
      				<div class="swiper-slide" v-for="data in goodlist2" :key="data.categoryId" @click="handleClick(data.categoryId)">
      					<div class="goodslist" style="height:50px;line-height: 50px;" >
      						{{data.categoryName}}
      					</div>
      				</div>
    			</div>
  			</div>
  		</div>

  			<!-- 商品列表 -->
  			<div class="good">	
				<ul class="goodUL">
					<li class="goodLI" v-for="data,myindex in goodlist"  @click="clickli(myindex)">
						<img :src="data.fileUrl">
						<p class="good2">{{data.brandName}}</p>
						<p class="good3">{{data.productName}}</p>
						<div class="tuijian" style="height: 20px;margin-bottom: 5px">
							<span v-for="data1 in data.tagListDto" >
								<!-- <div  v-bind:style="background-color:{{data1.fontBackgroudColor}}"> -->
									{{data1.tag}}
								<!-- </div> -->
								
							</span>
						</div>
							
						<div class="goodprice">
							<p class="newprice">￥{{data.price}}</p>
							<p class="oriprice" style="text-decoration:line-through">￥{{data.marketPrice}}</p>
							<p class="goodprice1">{{data.discount}}折</p>
						</div>
					</li>
				</ul>
		
		</div>

		</div>
			
			
			
		
		
	</div>
</template>


<script>

	import axios from "axios";
export default{
	name:'brand',
	data(){
		return {
			brandnav:[],
			brandnav1:[],
			isShow:true,
			liShow:false,
			lunboimg1:[],
			lunboimg2:[],
			goodlist:[],
			goodlist2:[],
			id:'',
			titleShow:false,
			pShow:false,
			zhankai:false,
			isShoe:true

		}
	},
	methods:{
		handleClick(id){
			//console.log(id)
			//console.log('aaaa')
			var listid= id
			//console.log(listid)

			axios.get(`/appapi/brand/product/secCategoryProduct/v3?logoId=${this.$route.params.id}&pageIndex=1&categoryId=${id}`).then(res=>{
						//console.log(res.data)

						this.goodlist=res.data.body.categoryProducts;
						this.goodlist2=res.data.body.categories;

			})
		},
		handleMore(){
			this.zhankai=!this.zhankai
			console.log(this.zhankai)
		},
		handleindex(){
			this.$router.go(-1)
		},
		clickli(index){
			this.$store.commit('chuanChan',this.goodlist[index].productId)
			this.$router.push('/productdetail/')
		},
		clicklunbo1(index){
			this.$store.commit('chuanChan',this.lunboimg1[index].productId)
			this.$router.push('/productdetail/')
		},
		clicklunbo2(index){
			this.$store.commit('chuanChan',this.lunboimg2[index].productId)
			this.$router.push('/productdetail/')
		}

	},

	mounted(){

		let self=this
		addEventListener('scroll', function(){
			if(document.documentElement.scrollTop <= 250){
				self.titleShow=false;
				//console.log('1111')
				self.pShow=false
			}else{
				self.titleShow=true;
				self.pShow=true
			}
		});
		
		/*要写成VUEX*/
		this.$store.state.navshow=false;
		axios.get(`/appapi/brand/product/hotNew/v3?logoId=${this.$route.params.id}`).then(res=>{

			this.brandnav=res.data.body.brandDetail;
			//console.log(res.data.body)
			this.brandnav1=res.data.body;
			this.lunboimg1=res.data.body.hotProductTop10
			this.lunboimg2=res.data.body.newProductTop10
				this.$nextTick(()=>{
					/*引入轮播*/
				var swiper = new Swiper('.swiper-container', {
				    slidesPerView: 3,
				    spaceBetween: 30,
				    pagination: {
				      el: '.swiper-pagination',
				      clickable: true,
				    },
				  });
				})	
				


		});
		axios.get(`/appapi/brand/product/secCategoryProduct/v3?logoId=${this.$route.params.id}&pageIndex=1`).then(res=>{
			//console.log(res.data)
			this.goodlist=res.data.body.categoryProducts;
			this.goodlist2=res.data.body.categories;

			//console.log(res.data.body.categoryProducts)
			this.$nextTick(()=>{
					
				var swiper = new Swiper('.swiper-container', {
				    slidesPerView: 3,
				    spaceBetween: 30,
				    pagination: {
				      el: '.swiper-pagination',
				      clickable: true,
				    },
				  });
				})	

		})

	},
	destroyed(){
		this.$store.state.navshow=true;
	},
	computed:{
		changeNav(){
			if(this.titleShow===true){
				return 'iconchange1'
			}else{
				return 'iconchange'
			}
		},
		changep(){
			if(this.zhankai===true){
				return 'xianshi'
			}else{
				return 'yincang'
			}
		},
		word(){
			if(this.zhankai===true){
				return "收起"
			}else{
				return "展开"
			}
		}
		

	}
}

</script>


<style scoped>
	a{ 
	text-decoration:none; 
	color:#333; 
	} 
	.brand{
		
		box-sizing: border-box;
	}
	.imgbk{
		
		width: 100%;
		position: relative;

	}
	.imgbk img{
		width: 100%;
		display: block;
	}
	.brand-kv-mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
    	position: absolute;
    	left: 0;
    	top: 0;
	}
	.brand-title{
		position: absolute;
		color: white;
		width: 100%;
		text-align: center;
		bottom: 35px;
		font-size: 25px;
	}


	.follow{
    line-height: 30px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -12%;
    bottom: -10px;
    box-shadow: rgba(0,0,0,.05);

	}
	.black{
		color: #fff;
    	background-color: #000;
    	font-size: 15px;
    	width: 25%;
    	height: 30px
	}
	.brand-total{
		padding-top: 30px;
		padding-bottom: 20px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
	.icon{
		width: 100%;
		height: 45px;
		position: fixed;
		left: 0;
		z-index: 5;
		color: white;
		line-height: 45px;
		box-sizing: border-box;
		padding-left:3%;
		padding-right: 3%; 
	}
	#iconchange{
		width: 100%;
		height: 45px;
		position: fixed;
		left: 0;
		z-index: 5;
		color: white;
		line-height: 45px;
		box-sizing: border-box;
		padding-left:3%;
		padding-right: 3%;
	}
		#iconchange1{
		width: 100%;
		height: 45px;
		position: fixed;
		left: 0;
		z-index: 5;
		color: black;
		line-height: 45px;
		box-sizing: border-box;
		padding-left:3%;
		padding-right: 3%;
		background: white;
	}
	.menu{
		position: relative;
	}
	.arrow{
		width: 0;
    	height: 0;
    	border-left: 12px solid transparent;
    	border-right: 12px solid transparent;
    	border-bottom: 12px solid hsla(0,0%,96%,.96);
    	position: absolute;
    	right: 12px;
    	top: 33px;
    	z-index: 20
	}
	.menu-list{
		position: absolute;
		right: -3%;
		top: 45px;
		background-color:hsla(0,0%,96%,.96);
		opacity: .9;
		width: 30%;
		padding-left: 5%;
		padding-right: 5%;
		box-sizing: border-box;
		text-align: center;
		color: black;
		font-size: 14px;
		z-index: 10;


	}
	.menu-list li{
		
		
		padding-top: 8px;
		padding-bottom: 8px;
		border-bottom: 1px solid #ccc
		

	}
	.navout{
		width: 100%;
		margin-bottom: 20px;
		color: #999;
		line-height: 30px;
		font-size: 14px;
		text-indent: 25px;
	}
	.navmain{ 
   		height: 124px;
   		overflow: hidden;
		width: 80%;
		margin: 0 auto;
		position: relative;
    
	}
	#yincang{
		height: 124px;
   		overflow: hidden;
		width: 80%;
		margin: 0 auto;
		position: relative;
		display: block;
    -webkit-animation: hide .5s ease;
    animation: hide .5s ease;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
	}

	#xianshi{

   		
		width: 80%;
		margin: 0 auto;
		color: #999;
		position: relative;
		-webkit-animation: show .5s ease;
    animation: show .5s ease;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
   		padding-bottom: 50px;
	}
	
	.more{
		height: 30px;
		background-color: white;
		opacity: .9;
		position: absolute;
		left: 0;
		bottom:0;
		width: 100%;
		color: #f60;
		text-align: center;
	}
/* 动画效果 */
  .lunbo1{
  	
  	width: 100%;
  	box-sizing: border-box;

  }
  .lunbo11{
  	font-weight: bold;
  	font-size: 20px;
  	line-height: 50px;
  	
  	padding-left: 10%;

  }
  .lunbo12{
  	font-weight: bold;
  	font-size: 20px;
  	line-height: 50px;
  }
   .lunbo14{
   	height: 200px;
  	margin-left: 10%;
	/* margin-right: 10px; */
  }
  .lunbo14 img{
  	width: 100%;
  }
  .swiper11{
  	width: 120%;
  	font-size: 12px;
  }
  .goodslist{
  	width: 100%;
  	text-align:center;
  	color: #999;

  }
  .goodslist:hover{
  	font-weight: bold;
  	color: black;
  	border-bottom: 3px solid black;

  }
  /* .goodlist:after {
			position: absolute;
		    content: '';
		    width: 10px;
		    height: 3px;
		    bottom: 0;
		    background: black;
		    left: 0;
		} */
  .lunbo3{
  	border-bottom:1px solid #eee; 
  }
  .lunbo31{
  	margin-left: 10%;
  	font-weight: bold;
  	font-size: 20px;
  	line-height: 50px; 
  }

   .good{
  	width: 90%;
  	margin: 0 auto;
  }

   .goodUL{
  	display: flex;
  	justify-content: space-between;
  	flex-wrap: wrap;
  	
  }
  .goodLI{
  	width: 48%;
  }
  .goodLI span{
  	font-size: 12px;
  	border: 1px solid black;
  	margin-right: 3px;
  }
  .goodUL .goodLI img{
  	width: 100%;
  }
  
 
 
 
 
  
  .good2{
  	font-size: 16px;
  	font-weight: bold;
  }
  .good3{
  	font-size: 14px;
  	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
  }
  .goodprice{
  	font-size: 12px;
  }
  .newprice{
  	float: left;
  	color: #e55a5a;
  	font-weight: bold;
  	margin-right: 5px;
  }
  .oriprice{
  	float: left;
  	color: #f1f1f1;
  }
  .goodprice1{
  	float: right;
  	color: #bababa;
  } 
  
  .winwin{
  	float: left;
  }
  .goodul{
  	width: 100%;
  	text-align: center;
  	line-height: 30px;
  	font-weight: bold;
  	border-bottom: 1px solid #eee;
  	margin-bottom: 5px;
  	font-size: 14px;
  	height: 30px;

  }

 












</style>