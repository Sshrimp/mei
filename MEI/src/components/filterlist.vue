<template>
	<div id="filterlist">
		<transition name="fade">
		<div class="topMenuBar" v-show="isShow">
			<div class="topMenuBar-top">
				<div class="div1" @click = 'back()'>
					<i class="iconfont icon-fanhui"></i>
				</div>
				<div class="div2">
					<span>{{title}}</span>
				</div>
				<div class="div3" @click="menuShow()">
					<i class="iconfont icon-gengduo"></i>
				</div>
			</div>
			<div class="topMenuBar-bottom">
				<ul>
					<li class="li1">人气</li>
					<li class="li2">折扣</li>
					<li class="li3">价格
						<span></span>
					</li>
					<li class="li4">筛选</li>
				</ul>
			</div>
		</div>
		</transition>


		<div class="promotions" v-if="list">
			<div class="promotions-1">
				<div class="promotions-1-1" v-if="false">
					<i class="promotions-1-1-1">满折</i>
					<span>{{list.couponScheme.eventCoupon[0].couponContent}}</span>	
				</div>
				<div class="promotions-1-2" v-if="false">
					<i class="promotions-1-2-1">免运</i>
					<span>{{list.couponScheme.otherCoupon[0].couponContent}}</span>	
				</div>
			</div>
			
			<ul class="promotions-2"  v-infinite-scroll="loadMore"
  				infinite-scroll-disabled="loading"
 				infinite-scroll-distance="10">
				<li v-for="data,myindex in listarr" @click="chuanCan(myindex)">
					<div class="li1">
						<img :src="data.imageUrl" alt="">
					</div>
					<div class="li2">
						<span v-for="item  in data.tagListDto">{{item.tag}}</span>
					</div>
					<div class="li3">
						<p class="li3-1">{{data.brandName}}</p>
						<p class="li3-2">{{data.productName}}</p>
					</div>
					<div class="li4">
						<div class="li4-1">
							<span class="li4-1-1">￥{{data.price}}</span>
							<span class="li4-1-2">￥{{data.marketPrice}}</span>
						</div>
						<!-- <div class="li4-2">{{data.discount}}折</div> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="slide-btn-bar">
			<div class="div1">
				<i class="iconfont icon-56"></i>
			</div>
			<div class="div2">
				<i class="iconfont icon-18huidaodingbu"></i>
			</div>
		</div>
		<div class="menu" v-show="isShoe">
			<div class="arrow"></div>
			<ul>
				<li>
					<span>首页</span>
				</li>
				<li>
					<span>购物袋</span>
				</li>
				<li>
					<span>个人中心</span>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>
	import Vue from 'vue';
	import { InfiniteScroll } from 'mint-ui';

	Vue.use(InfiniteScroll);
	import axios from "axios";
	export default{
		name:'filterlist',
		 data(){
		 	return {
		 		isShow:true,
		 		isShoe:false,
		 		isShor:false,
		 		isShot:false,
		 		list:null,
		 		listarr:null,
		 		title:"",
		 		zhi:0,
		 		loading:false,
		 		lan:1
		 	}
		 },
		  mounted(){
		  	this.$store.state.navshow = false;
		  	///appapi/secondcategory/product/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=1000000337&siloId=2013000100000000011&thirdCategories=%E6%9C%8D%E8%A3%85&key=&sort=&isCrossBorder=1&timestamp=1542870990207&summary=56b915b70fcd68767a0a21a3f5839826&platform_code=H5



		  	axios.get(`appapi/secondcategory/product/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=${this.$store.state.filterlist.categoryIdTwoId}&siloId=${this.$store.state.filterlist.siloId}&thirdCategories=%E6%9C%8D%E8%A3%85&key=&sort=&isCrossBorder=1`).then(res=>{
		  		//console.log(res.data);
		  		this.list=res.data
		  		this.listarr =res.data.products
		  		//console.log(res.data)
		  		/*if (this.list.couponScheme.otherCoupon.length > 0 ) {
		  			this.isShor = true
		  		}


		  		if (this.list.couponScheme.eventCoupon.length !== 0) {
		  			this.isShot = true
		  		}*/
		  		this.title =this.list.shareContent.shareInfo.split(' ')[0] 
		  	}),
		  	window.addEventListener('scroll',this.topMenuBarShow)
		  },
		  destroyed(){
		  	this.$store.state.navshow = true;
		  },
		  methods:{
		  	menuShow(){
		  		this.isShoe = !this.isShoe
		  	},
		  	topMenuBarShow(){
		  		//console.log(scrollY)
		  		if (scrollY >= 80) {
		  			this.isShow=false;
		  			if(scrollY<this.zhi){
		  				this.isShow = true
		  			}
		  			//console.log(this.zhi)
		  			
		  			this.zhi = scrollY
		  		}else {
		  			this.isShow=true;
		  		}
		  		
		  	},
		  	chuanCan(index){
		  		this.$store.commit('chuanChan',this.list.products[index].productId);
		  		//console.log(this.list.products[index].productId);
		  		this.$router.push('/productdetail/')
		  	},
		  	loadMore() {
		  		this.lan++;
		  		if (this.lan> this.list.totalPages) {
		  			this.loading=true;
		  		}
		  		//
		  	 	axios.get(`appapi/secondcategory/product/v3?brandNames=&chineseCodes=&pageIndex=${this.lan}&categoryId=${this.$store.state.filterlist.categoryIdTwoId}&siloId=${this.$store.state.filterlist.siloId}&thirdCategories=%E6%9C%8D%E8%A3%85&key=&sort=&isCrossBorder=1`).then(res=>{
		  	 		//this.list.products={...this.list.products,...res.data.products}
		  	 		//console.log(this.list.products)
		  	 		this.listarr =[...this.listarr,...res.data.products]
		  	 		//console.log(this.listarr)

		  	 	})
		  	
		  	},
		  	back(){
		  		this.$router.go(-1)
		  	}
		  }
	}

</script>


<style scoped lang="scss">
	#filterlist{

		.fade-enter-active, .fade-leave-active {
		  transition: all .5s;
		}
		.fade-enter, .fade-leave-to{
		  opacity: 0;
		  transform: translateY(-80px);
		}


		.fadw-enter-active, .fadw-leave-active {
		  transition: all .5s;
		}
		.fadw-enter, .fadw-leave-to{
		 
		  transform: translateY(45px);
		}



		.topMenuBar{
			background:#ffffff;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			.topMenuBar-top{
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				font-weight: bold;
				width: 100%;
				div{
					flex-direction: row;
					text-align: center;
					height: 40px;
					line-height: 40px;
					cursor:pointer;
					span{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
				.div1{
					width: 15%;
				}
				.div2{
					width: 70%;

				}
				.div3{
					width: 15%;
				}
			}
			.topMenuBar-bottom{
				width: 100%;
				ul{
					display: flex;
					justify-content: space-around;
					li{
						flex-direction: row;
						text-align: center;
						height: 40px;
						line-height: 40px;

					}
					.li2{
						color: #999;
					}
					.li3{
						color: #999;
						position: relative;
						span{
							display: block;
							border-width: 5px;
						    border-style: solid;
						    border-color: transparent transparent #aaa;
						    position: absolute;
						    top: 10px;
						    right: -15px;
						}
					}
				}
			}

		}
		.promotions{
			margin-top: 80px;
			font-size: 12px;
			.promotions-1{
				width: 90%;
				margin: 0 auto;
				font-size: 14px;
				.promotions-1-1{
					position: relative;
					i{
						font-size: 12px;
						color: red;
						border: 1px solid red;
						line-height: 14px;
						font-style:normal;
						position: absolute;
						top: 0;
						left: 0;
					}
					span{
						display: block;
						font-size: 12px;
						margin-left: 30px;
					}
				}
				.promotions-1-2{
					position: relative;
					i{
						font-size: 12px;
						color: red;
						border: 1px solid red;
						line-height: 14px;
						font-style:normal;
						position: absolute;
						top: 0;
						left: 0;
					}
					span{
						display: block;
						font-size: 12px;
						margin-left: 30px;
					}
				}
			}
			.promotions-2{
				width: 90%;
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				li{
					width: 48%;
					justify-content: space-around;

					.li1{
						img{
							display: block;
							width: 100%;
							height: 220px;
						}
					}
					.li2{
						height: 14px;
						span{
							font-size: 12px;
							border: 1px solid #000;
							margin-right: 2px;
						}
					}
					.li3{
						.li3-1{
							text-transform: uppercase;
						}
						.li3-2{
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
					.li4{
						display: flex;
						justify-content: space-between;
						.li4-1{
							.li4-1-1{
								color: red;
								font-size: 12px;
								margin-right: 10px;
							}
							.li4-1-2{
								color: #ccc;
								font-size: 12px;
								text-decoration: line-through;
							}
						}
						.li4-2{
							color: #666;
						}
					}
				}
			}
		}
		.slide-btn-bar{
			position: fixed;
			right: 20px;
			bottom: -45px;
			color: #000;

			div{
				width: 45px;
				height: 45px;
				text-align: center;
				line-height: 45px;
				border-radius: 50%;
				background: rgba(255, 255, 255,.6);
				box-shadow: 2px 2px 1px #888888;
				i{
					font-size: 20px;
				}
			}
			.div1{
				margin-bottom: 15px;
				
			}

		}
		.menu{
			position: absolute;
			right: 0px;
			top: 40px;
			width: 30%;
			z-index: 11;
			background-color: hsla(0,0%,96%,.96);
			.arrow{
				width: 0;
			    height: 0;
			    border-left: 12px solid transparent;
			    border-right: 12px solid transparent;
			    border-bottom: 12px solid hsla(0,0%,96%,.96);
			    position: absolute;
			    right: 12px;
			    top: -12px;

			}
			ul{
				li{
					height: 48px;
					line-height: 48px;
					text-align: center;
				}
			}
		}
	}
	
</style>