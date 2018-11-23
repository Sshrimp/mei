<template>
	<div id="shoppingcart">
		<!-- 购物车头 -->
		<div class="shoppingcart-bar">
			<div class="shoppingcart-bar-main">
				<router-link tag="div" to="/index/" class="iconfont icon-fanhui" style="font-size:30px"></router-link>
				<div class="shoppingcart-title">购物车</div>
				<div class="iconfont icon-gengduo" style="font-size:30px"></div>
			</div>
		</div>

		<div class="shopping-nav">
			<div class="shopping-nav-main">
				<p class="baoyou">满688包邮</p>
				<div class="triangle_border_right">
    				<span></span>
				</div>
				<p class="baoyour">1/1</p>
			</div>
		</div>

		<!-- 购物车主体 -->
		<div class="shoppingcart-body">
			<div class="zhifa">
				<div class="zhifatitle">
					<div class="kuang">
						<div class="checked"></div>
					</div>
					<div class="carbody-title">魅力惠直发</div>
				</div>
				<div class="zhifalist">
					<ul class="zhifaUl">
						<li class="zhifaLi">
							<div class="kuang1" style="float:left">
								<div class="checked"></div>
							</div>
							<div class="proli" style="float: left display: flex">
								<div class="proimg" style="height:143px;width: 100px;float:left;margin-right:20px">
									<img src="https://cdn13.mei.com/product/FE0-912-00269/FE0-912-00269a.jpg@182w_242h_2e_65q">
								</div>
								<div class="proneirong" style="width: 80%;position: relative;">
										<h3 class="proh3">FRETTE</h3>
										<p class="prodescription">浅绿色LUX.MAGNETIC四件套1.8-2米床</p>
										<p class="pro_prop">绿色</p>
										<p class="pro_price">￥3280</p>
										<p class="count" style="border:2px solid gray;">
											<span >-</span>
											<span style="border:2px solid gray;"> 3 </span>
											<span >+</span>
											<!-- <div>-</div>
											<div>3</div>
											<div>+</div> -->
										</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				
			</div>
			
			

		</div>

		<!-- 购物车脚 -->
		<div class="shoppingcart-foot">
			<div class="kuang">
				<div class="checked"></div>
			</div>
			<p class="cheall">全选</p>
			<p class="priall">总价</p>
			<p class="priceall">￥3250</p>
			<button class="goto">去结算</button>
		</div>
	</div>

</template>


<script>
	import axios from "axios"
	export default{
		name:'shoppingcart',
		data(){
			return {
				shopTitle:[]
			}
		},
		mounted(){
			this.$store.state.navshow=false;
		},
		destoryed(){
			this.$store.state.navshow=true;
		},
		methods:{

		},
		computed:{

		}
	}

</script>


<style scoped>
	.shoppingcart-bar{
		width: 100%;
		height: 45px;
		line-height: 45px;
		position: fixed;
		background-color: white;
		
	}
	.shoppingcart-bar-main{
		width: 90%;
		margin: 0 auto;
		display: flex;
		left: 0;
		top: 0;
		justify-content: space-between;
	}
	.shoppingcart-title{
		font-weight: bold;
		font-size: 20px;
	}
	.shopping-nav{
		height: 90px;
		width: 100%;
		box-sizing: border-box;
		padding-top: 45px;
		background-color: white;
	}
	.shopping-nav-main{
		height: 100%;
		width: 90%;
		margin: 0 auto;


	}
	.baoyou{
		line-height: 45px;
		float: left;
		color: red;
	}
	.baoyour{
		float: right;
		line-height: 45px
	}

	.triangle_border_right{
    width:0;
    height:0;
    border-width:5px 0 5px 5px;
    border-style:solid;
    border-color:transparent transparent transparent red;/*透明 透明 透明 灰*/
    /* margin:40px auto; */
    position: absolute;
    left: 25%;
    top: 63px;
	}

	/* #shoppingcart{
		background-color:#ccc;
	} */
    .shoppingcart-body{
    	margin-top: 20px;
    }
    .carbody-title{
    	width: 100%;
    	background-color: white;
    	height: 50px;
    	line-height: 50px;
    }
    .kuang{
    	height: 50px;
    	width: 50px;
    	padding: 13px;
    	float: left;
    	box-sizing: border-box;
    }
    .kuang1{
    	height: 100%;
    	width: 50px;
    	padding: 59px 13px;
    	box-sizing: border-box;

    }
    .checked{
    	width: 100%;
    	height: 100%;
    	border: 1px solid gray;
    }
    .zhifalist{
    	width: 100%;
    	overflow: hidden;
    }
   
    .zhifaLi{
    	height: 155px;
    	width: 120%;
    	border-bottom: 1px solid #ccc;
    	border-top: 1px solid #ccc;
    	background-color: white;
    	box-sizing: border-box;
    	padding-top: 6px;
    	padding-bottom: 6px;

    }
    .proimg{
    	display: flex;

    }
    .proimg img{
    	height: 143px;
    	display: block;
    	margin-right: 8%;
    }
    .prodescription{
    	white-space: nowrap;  

 		text-overflow:ellipsis; 

 		overflow:hidden;
    }
    .prodescription{
    	line-height: 40px;
    	font-size: 14px;
    }
    .pro_prop{
    	font-size: 14px;
    	color: gray;
    	line-height: 30px;
    	margin-bottom: 10px;
    }
   .pro_price{
   		font-size: 20px;
   		font-weight: bold;
   		color: #dd2828;
   }
   .count{
   		position: absolute;
   		right: 0;
   		bottom: 0;
   }
   .shoppingcart-foot{
   	height: 55px;
   	width: 100%;
   	border-top: 1px solid #ccc;
   	border-bottom: 1px solid #ccc;
   	position: fixed;
   	bottom: 0;
   }
   .shoppingcart-foot{
   	display: flex;
   	justify-content: space-between;
   }
   .goto{
   	width: 30%;
   	height: 100%;
   	line-height: 55px;
   	background-color: gray;
   	text-align: center;
   	color: white;
   	font-size: 18px;
   	font-weight: bold;
   	border: none;
   	outline: none;
   }
   .shoppingcart-foot p {
   	height: 55px;
   	line-height: 55px;
   }

	


</style>