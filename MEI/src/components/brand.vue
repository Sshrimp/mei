<template>
	<div id="brand">
		<!-- <div class="read">目前最底层路由</div> -->
		<div class="imgbk">
			<img :src="brandnav.brandPageImage">
			<div class="brand-kv-mask"></div>
			<router-link to="/login" tag="div" class="black follow"
		 >+关注</router-link>
		</div>
		<div class="brand-total">
			<span>在售商品{{brandnav1.onSaleTotal}}件</span>
			<span>上新{{brandnav1.newTotal}}件</span>
		</div>
		<div class="navout">
			<div class="navmain">
				<transition>
				<p class="navdes bounce" v-show="isShow" >
					{{brandnav.brandStoryText}}
				</p>
				</transition>
				<p class="more" @click="isShow=!isShow">更多</p>
			</div>
			
		</div>
		<!-- 第一个轮播 -->
		<div class="lunbo1">
			<p class="lunbo11">精选上新</p>
			<div class="swiper-container lunbo14">
    			<div  class="swiper-wrapper ">
    				<div v-for="data in lunboimg1" class="swiper-slide">
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
    				<div v-for="data in lunboimg2" class="swiper-slide">
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
      				<div class="swiper-slide" v-for="data in goodlist2" >
      					<div class="goodslist" style="height:50px;line-height: 50px;"@click="handleClick()">
      						{{data.categoryName}}
      					</div>
      				</div>
    			</div>
  			</div>

  			<!-- 商品列表 -->
  			<div class="good">
			
				<ul class="goodUL">
					<li class="goodLI" v-for="data in goodlist">
					
						<img :src="data.fileUrl">
						<p class="good2">{{data.brandName}}</p>
						<p class="good3">{{data.productName}}</p>
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
			lunboimg1:[],
			lunboimg2:[],
			goodlist:[],
			goodlist2:[]

		}
	},
	methods:{
		handleClick(){
			console.log('aaaa')
		}
	},

	mounted(){
		
		/*要写成VUEX*/
		this.$store.state.navshow=false;
		axios.get(`/appapi/brand/product/hotNew/v3?logoId=${this.$route.params.id}`).then(res=>{

			/*引入轮播*/
		
			this.brandnav=res.data.body.brandDetail;
			//console.log(res.data.body)
			this.brandnav1=res.data.body;
			this.lunboimg1=res.data.body.hotProductTop10
			this.lunboimg2=res.data.body.newProductTop10
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
				


		});

		axios.get(`/appapi/brand/product/secCategoryProduct/v3?logoId=${this.$route.params.id}&pageIndex=1`).then(res=>{
			//console.log(res.data.body)
			this.goodlist=res.data.body.categoryProducts;
			this.goodlist2=res.data.body.categories;
			//console.log(res.data.body.categories.categoryName)
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

	}
}

</script>


<style scoped lang="scss">
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
	.navout{
		width: 100%;
		height: 135px;
		margin-bottom: 20px;
	}
	.navmain{
		width: 80%;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		font-size: 18px;
		line-height: 20px;
		color: #999;
	}
	.more{
		height: 20px;
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
  .lunbo3{

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




