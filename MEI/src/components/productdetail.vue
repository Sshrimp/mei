
<template>
	<div class="detail">
		<div class="LrxTitle" :class="isScroll?'transparent':'pink'">
			<i class="iconfont icon-fanhui" @click="fanhui()" ></i>
			<p>{{this.datalist.brand}}
				<span>￥{{this.datalist.price}}</span>
			</p>
			<i class="iconfont icon-gengduo" @click='returnListIsShow=!returnListIsShow'></i>
			<div class="returnList" :class="returnListIsShow?'block':'none'">
				<i></i>
				<ul>
					<router-link to='/index' tag='li'>首页</router-link>
					<router-link to='/shoppingcart' tag='li'>购物袋</router-link>
					<router-link to='/' tag='li'>个人中心</router-link>
				</ul>
			</div>
		</div>
		<div class="body">
			
			<div class="swiper-container">			    					
					<div class="swiper-wrapper">
				        <div class="swiper-slide" v-for="img in imglist"  >
				        	<img :src="img.smallImgUrl" alt="" class="swiper-slide l" >
				        </div>
				    </div>
			</div>
			<div class="info">
				<p class="title">{{datalist.name}} </p>
				<span>￥{{datalist.marketPrice}}</span>
				<div class="price">
					<p>￥{{datalist.price}}</p>
					<i class="sale " v-for="tag in taglist" >{{tag.label_text}}</i>
					<!-- <i class="sale" >{{this.taglist[0].label_text}}</i> -->
				</div>
				<div class="where">
					<img :src="this.datalist.warehouse_icon" alt="" v-if="isShow">
					<p> {{datalist.warehouse_name}}</p>
					<p><i class="iconfont icon-clock"></i>{{datalist.deliver_date}}</p>
				</div>
			</div>
			<div class="date">
				<span class="shangou">闪购</span>
				<p class="time"> <span class="day">距结束 {{this.day}} </span> 天<span class="hour"> {{this.hour}}</span> 小时<span class="min"> {{this.min}} </span> 分<span class="second"> {{this.second}}</span> 秒</p>
			</div>
			<div class="ticket">
				<span>领劵</span>
				<span class="box">{{this.ticket}}</span>
			</div>
			<div class="server">
				<p class="l">服务</p>
				<ul>
					<li v-for="ser in serverlist">{{ser.label_title}} <span class="haha">|</span></li>
				</ul>
			</div>
		</div>

		<div class="pramas">
			<h3>商品参数</h3>

			<div class="content" :class="isHeigh?'heigh':'short'">
				<div v-for="can in description.attributesList">
					<label for="">{{can.name}}</label><span class="value">{{can.value}}</span>
				</div>
				<div v-if="JSON.stringify(this.description.groupAttribute) !== '{}'"><label for="">主要成分与功效</label><span class="value">{{this.groupAttribute.主要成分与功效}}</span></div>
				<div v-if="JSON.stringify(this.description.groupAttribute) !== '{}'"><label for="">使用方法</label><span class="value">{{this.groupAttribute.使用方法}}</span></div>
				<div v-if="JSON.stringify(this.description.groupAttribute) !== '{}'"><label for="">特别提示</label><span class="value">{{this.groupAttribute.特别提示}}</span></div>
				
				<div class="more" @click="more">
					<div>
						<i></i>
						<p>MORE</p>
					</div>
				</div>
			</div>
		</div>
		<div class="detail">
			<h3>商品详情</h3>		
			<img v-for="info in description.product_img1" :src="info.bigImgUrl" alt="">
			<p>{{description.message}}</p>
		</div>
		<section>
			<div class="tuihuo liu">
				<h3>退货提示</h3>
				<p>{{this.tuihuo}} </p>
			</div>
			<div class="pinpai lrx liu">
				<h3>{{this.datalist.brandName}} <span>品牌主页<i></i></span></h3>
				<p>{{this.datalist.brand_story}}</p>
			</div>
			<div class="tishi_img liu">
				<img :src="this.datalist.overseas_tip_url" alt="">
			</div>
			<div>
				<img :src="jinyongci" alt="">
			</div>
			<div class="pinglun lrx liu">
				<h3>用户评论({{this.length}})<span>查看全部<i></i></span></h3>
				<ul>
					<li v-for="review in reviewsList" >
						<p>{{review.userName}} <i v-if="review.isVip == 'true'"></i></p>
						<span v-for="review in Math.floor(review.score)"></span>
						<p class="content">{{review.review}}</p>
						<p class="time">{{new Date(review.reviewDate*1000).getFullYear()}}.{{new Date(review.reviewDate*1000).getMonth()}}.{{new Date(review.reviewDate*1000).getDate()}}</p>
					</li>
				</ul>
				
			</div>
			<div class="allLook liu lrx" v-if="this.allLookList.length!== 0">
				<h3>大家都在看</h3>
				<ul>
					<li v-for="list in allLookList">
						<img :src="list.imgUrl" alt="">
						<b class="brand_name">{{list.brand_name}}</b>
						<p class="name">{{list.product_name}}</p>
						<div class="price">
							<p class="first">￥{{list.price}} <span>￥{{list.market_price}} </span> <span class="last">{{list.discount}}折</span></p>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<footer>
			<div class="left">
				<div>
					<i class="iconfont icon-56"></i>
					<p>购物袋</p>
				</div>
				<p class="cart" @click="runToCart">加入购物车</p>
			</div>
			<div class="right">立即购买</div>
		</footer>
		
	</div>
</template>

<script>
	import axios from "axios";
	// import Swiper from "swiper";
	export default{
		name:'productdetail',
		data(){
			return{
				isScroll:false,
				isHeigh:true,
				returnListIsShow:false,
				imglist:[],
				datalist:'',
				taglist:[],
				isShow:true,
				day:0,//倒计时
				hour:0,
				min:0,
				second:0,
				endtime:'',
				ticket:'',
				jinyongci:'',//禁用词说明
				serverlist:[],
				description:'',
				tuihuo:'',
				length:0,//评论的个数
				reviewsList:[],//评论
				groupAttribute:'',//保质期,功效.....有的有 有的没有

				allLookList:[],//大家都在看
			}
		},
		methods:{
			time(){
					var a = this.endtime;	
					var n = new Date();
					var d = new Date(this.endtime);
					var t = d - n;
					var day = Math.floor(t/86400000)<0?0:Math.floor(t/86400000);
					var hour = Math.floor(t/(1000*60*60))<0?0:Math.floor(t/(1000*60*60));
					var min = Math.floor((t-hour*1000*3600)/1000/60)<0?0:Math.floor((t-hour*1000*3600)/1000/60);
					var second = Math.floor((t-hour*1000*3600-min*1000*60)/1000);
					this.day = day;
					this.hour = hour;
					this.min = min;
					this.second = second;
			},
			timeNow(item){
				var data = new Date(item*1000);
				var Y = data.getFullYear();
				var M = data.getMonth()+1;
				var D = data.getDate();
				var result = Y+'.'+M+'.'+D;
				return result;
			},
			more(){
				// console.log(this.description.groupAttribute)
			
				this.isHeigh = !this.isHeigh;
			},
			runToCart(){
				axios.get('/v4/isMan').then(res=>{
					if(res.data.isHere ){
						axios.post(`/v4/pushCart`,{
							img:this.imglist[0].smallImgUrl,
							price:this.datalist.price,
							name:this.datalist.name
						}).then(res=>
							console.log(res)
						)
					}else {
						this.$router.push('/login/account/');
					}
				}).catch(err=>{
					console.log('登陆请求有错误')
				})
			},
			fanhui(){
				this.$router.go(-1);
			},
			fanhuilist(){

			}
		},

		mounted(){
			this.$store.state.navshow = false;

			axios.get(`/appapi/product/detail/v3?categoryId${this.$store.state.filterlist.categoryId}&productId=${this.$store.state.filterlist.productId}`).then(res=>{
				this.datalist = res.data.infos;
				this.imglist = res.data.infos.images;
				this.taglist = res.data.infos.product_labels;
				this.endtime = res.data.infos.ticketInfo[0].endDateLong;
				this.ticket = res.data.infos.ticketInfo[0].ruleInfo;
				this.serverlist = res.data.infos.service_labels;
				this.description = res.data.infos.description;
				this.jinyongci = res.data.infos.postSellUrls[0];
				this.tuihuo = res.data.infos.returnNote;
				this.brandname = res.data.infos.brandName;
				this.length = res.data.infos.productReviews.totalCount;
				this.reviewsList = res.data.infos.productReviews.reviewsList;
				this.groupAttribute = res.data.infos.description.groupAttribute
					if(JSON.stringify(res.data.infos.description.groupAttribute) === '{}'){
						this.isHeigh = false;
					}else {
						this.isHeigh = true;
					}

				if(this.datalist.warehouse_icon === ""){
					this.isShow = false;
				}
				this.$nextTick(()=>{
					var mySwiper = new Swiper ('.swiper-container', {
				    	// loop: true, // 循环模式选项
				    	autoplay:true,
				 	 })      
				})
				//时间戳
				setInterval(this.time,1000)				
			}).catch(err=>{console.log('请求错误');})

			axios.get(`http://www.mei.com/appapi/product/hot/v3?categoryId=${this.$store.state.filterlist.categoryId}&productId=${this.$store.state.filterlist.productId}&platform_code=H5`).then(res=>{
				this.allLookList = res.data.categoryList;
			}).catch(err=>{
				console.log('请求错误')
			})
		},
	
	}
</script>
<style scoped lang="scss">
	.pink{background: pink;}
	.transparent{background: blue;}
	.l{float: left;}
	.r{float: right;}
	.img{display: block;width: 100%;}
	.liu{margin:0 0 0 20px;}
	.lrx{padding:0 20px 20px 0 ;border-bottom: 1px solid #e5e5e5;}
	.heigh{
		height: 350px;overflow: hidden;
		.more{display: block;}
		}
	.short{
		.more{display: none;}
	}
	.block{display: block;}
	.none{display: none;}
	.detail{
		position: relative;
		div.LrxTitle{
			height: 45px;width: 100%;position: fixed;left: 0;top: 0;z-index: 1000;display: flex;flex-direction: row;justify-content: space-between;background: rgba(255,255,255,0.9);

			i.icon-fanhui{margin-left: 15px;font-size: 24px;line-height: 45px;}
			i.icon-gengduo{margin-right: 10px;font-size: 30px;line-height: 45px;}
			p{
				display: flex;flex-direction: column;justify-content: center; font-size: 12px;text-align: center;font-size: 16px;font-weight: bold;color: #000;line-height: 16px;margin-top: 8px;width: 200px;
				span{font-size: 12px;color: #e66565;}
			}
			div.returnList{
				width: 115px;height: 172px;background: #f5f5f5;position: absolute;right: 0;top: 50px;
				i{border:10px solid transparent; border-bottom:10px solid #f5f5f5; position: absolute;right: 30px;top: -20px;}
				ul{
					padding:0 15px;
					li{
						font-size: 16px;line-height: 56px;border-bottom: 1px solid #cccccc;height: 56px;text-align: center;
					}
				}
			}
		}

		.body{
			width: 100%;padding:0 20px;/*background: hotpink;*/box-sizing: border-box;
			div.info{
				width: 100%;height: auto;padding-bottom: 30px;border-bottom: 1px solid #f7f7f7;
				p.title{font-size: 18px;line-height: 30px;}
				span{text-decoration: line-through;font-size: 12px;color: #cccccc;line-height: 12px;}
				div.price{
					font-size: 14px;line-height: 30px;
					p{font-weight: bold;color: #dd2828;float: left;margin-right: 10px;}
					i.sale{border:1px solid black;font-style: normal;margin-right: 5px;}
				}
				div.where{
					line-height: 12px;font-size: 12px;font-weight: bold;display: flex;flex-direction:row;justify-content: flex-start;margin-top: 5px;
					img{width: 15px;height: 15px;border-radius: 50%;float: left;margin-right: 4px;}
					p{margin-right: 5px;font-weight: normal;color: #666;}
					i{margin-right: 5px;/*align-self: flex-end;*/}
				}
			}
			div.date{
				color:#666;border-top:1px solid #eee;border-bottom:1px solid #eee;height: 60px;font-size:14px;line-height: 60px;
				span.shangou{float: left;margin-right: 20px;}
				p.time{
					float: left;color: black;
					span{font-weight: bold;}
				}
			}
			div.ticket{
				height: 60px;border-top:1px solid #f7f7f7;border-bottom:1px solid #f7f7f7;display: flex;flex-direction: row;align-items: center;font-size:14px;
				span{float: left;margin-right: 20px;}
				span.box{background: #dd2929;color: white;font-size: 12px;padding:2px;}
			}
			div.server{
				height: 60px;line-height: 60px;font-size: 14px;border-bottom: 2px solid #eeeeee;
				p{margin-right: 20px;}
				ul{
					li{
						float: left;box-sizing: border-box;
						span{font-size: 12px;padding:0 5px;}
					}
						li:last-child span{color: red;display: none;}
				}
			}
		} 

		.pramas{
			padding:25px 0 0 20px; width: 100%;height:300px;box-sizing: border-box;width: 100%;height: 100%;overflow: hidden;
			h3{line-height: 22px;font-size: 18px;}
			div.content{ bottom: 1px solid red;width: 100%;padding-right: 20px;box-sizing: border-box;border-bottom: 1px solid #e5e5e5;position: relative;overflow: hidden;padding-bottom: 20px;
				div{
					width: 100%;float: left;font-size: 12px;margin-top: 22px;
					label{
						width:30%;
						color:#9c9c9c;float: left;
					}
					span.value{color: black;float: left;display: block;	width: 70%;}	
				}
				div.more{
					width: 100%;height: 80px;position: absolute;left: 0;bottom: 0;text-align: center;background: rgba(255,255,255,.8);
					div{
						i{border:5px solid transparent;border-top:5px solid #666;}
						p{position: absolute;top: 25px;left: 50%;transform: translateX(-50%);font-weight: bold;}
					}
				}
			}	
			
		}
		div.detail{
			padding:25px 20px; width: 100%;box-sizing: border-box;margin-bottom: 22px;
			h3{line-height: 22px;font-size: 18px;}
			img{width: 100%;margin-top: 22px;}
			p{font-size: 12px;line-height: 16px;}
		}

		div.tuihuo{
			box-sizing: border-box;border:1px solid #e5e5e5;border-left: none;border-right: none;
			h3{font-size: 18px;line-height: 22px;margin-top: 27px;}
			p{font-size: 12px;line-height: 18px;padding: 25px 0;}
		}
		div.pinpai{
			h3{
				font-size: 14px;padding:28px 0;
				span{
					float: right;color: #666;font-weight: normal;line-height: 20px;position: relative;
					i{ border:5px solid transparent;border-left:5px solid #666;line-height: 14px;position: absolute;right: -15px;top: 50%;transform: translateY(-50%);}
				}
			}
			p{font-size: 14px;line-height: 18px;}
		}
		div img{width: 100%;}
		div.tishi_img{
			position: relative;left: -20px;top: 0;width: 100%;
		}
		div.pinglun{
			border-top:1px solid #e5e5e5;padding-bottom: 0;border-bottom: 0;height: 300px;
			h3{
				font-size: 20px;margin-top: 30px;
				span{
					float: right;color: #666;font-weight: normal;position: relative;font-size: 14px;
					i{ border:5px solid transparent;border-left:5px solid #666;line-height:- 14px;position: absolute;right: -15px;top: 50%;transform: translateY(-50%); }
				}
			}
			ul{
				width: 100%;height: 100%;
				li{
					width: 100%;float: left;border-bottom:2px solid #e5e5e5;padding:20px 0;
					p{
						font-size: 12px;width: 100px;float: left;
						i{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAUCAYAAAD2rd/BAAAABGdBTUEAALGPC/xhBQAAA4NJREFUSA3VV0tPU0EU/lpKIYIWBZVHBBEBQwBBARUSYiJgNNGFcaPixp0JbnRhoj+AxJUmboyJIUYimqiJmqg8A6JIeIohUirVQilKoe8H9NLWO1Pu0Mct0AUGJ5l7z3znm7lfTufMmUqqqqq8+A+aXq+HRqOBbDNr9Xg8mJmZweTkJOx2O5W6KQVzHAetVoupqSm4XK6AmG4qwU6nk0ZTp9PB7XYHCBUGooIvnzqMyqJMyvljsOLOk05Y7AvCHPqWR0fh+oVKZKUl0nH7wASeNg+h7nwFDmanUOxZ61e09qkQLYvCjYsr3ICFlgeOBReU6mk0vOqgkRXjEEwq5mhqGYbZ5hMYK4+GzbEYQnNxbkglEoobLA48bx2m9phmlnGVGj21uSU3VFNzDHd7vCB9ye2hnTi2xMpRnJeJe7ev4NKZSsYNNkQjTD7Q1q/CueMFUMTHojRvD3pHJwPm7uMjm5m6g2ItfBSJgPW22lsPMTI6BofDQadIpVLkZqaiof4adiUqUFd7Go1vukSXE40wYXYOqeFc5OikmrKckMk1ZdkUIz/lx6GfIf5ggGS80FQqFRNLMOL7PqFFZ98opSQnJUCxNU6gB7zDCnYscOga9glJT05AbsZONjEpIQ7FOWl03DGoxiK3xHzBBkkkpVJJsz7Y5z/erohHWaEvCE4+CFa709/NbNEtIXhJwpwo2Q9ZlBQnj+RC2JPVfMSlUgndf+39PwR6yHt8fByfB77B6/XyvZT5X96/yZ8CKxGXy2XYnZhAv0NIj1600aizCX7GqoJNVifduxWFe1GQlYyUpG00GSsKMugSn0Z+hZweNpuNLW80GqlYBiwb6SlJwRAdzxktuPv4LRpfi+9fQlpVMCG8/6IEEUxadWk29CY7YviIePgk+8D7SBMqEimd6YpjFFvtcfZqPYwWO6N4vR5+CyzAYvMlIXOIGGsK/j1vxbBKh6LsVBzNT2eJOKDUQqc3ha1IIt9ikG7WgHmTlY0jMdYUTBZ71zNGBZMCQDppD5qa0d0zGLYiUdIGPMKeEv7fUk8boJ6eZ1DviApt3X3/XCwRsC7BRsM8jCYzE8zxx1gUf3KItfLiAwwuP5RL7Ri+WpbkZ63gxT6cAREYknD3Yf9EEipSBOtuGDVkD692tdswFREszASTikSOJXJhDne1i2DdDaPKzGYzFUr+gpCKtNnbXxaGk+I6HywBAAAAAElFTkSuQmCC)no-repeat;display: block;width: 22px;height: 10px;background-size: contain; float: right;}
					}
					span{display: block;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAABGdBTUEAALGPC/xhBQAAAiNJREFUOBGdkktoE2EQx2e+b/Po9qHU4EkP4sVYwYuQ6k28S3vpSRC08YGKUEQK1mrSHqSHXnwcbD2oF08GEa/exatKQhClPsAmrcnGNJvXN35T3bCP2BQHlnn8Z37ft7MLsA3LvbzzehttIHo15TLpy2Fz53H2vXp7wkR0IMUQx28F3BKWfZ6+YITNYQaw5/y/YSJqzruH/blb4/ifN+MdhSIDu9wDnH/IpC66a+4Y32fSEwh4DIUxIgy5T2BotwyF+1HIwEGk2lD88g5Uq1kEpDwA5okwz7EkzBkC5Im+oViSgNB9Sre4vPoJ2q0GSzEg/QAd1Q/nbT19RsTHb5yvVQt3Ef9UWelmG9Yq2NWfXSRsIYpTieTyk81XiZ+cubphFRZ05+Yx/olWowZWccVfBr2epgCcGJ1cesZiZy8Hx25O25XinOZ5gEQKSj8++st6FOsoxHji3FLGOaUD40J8bOaWXSk9dUT2fCO+WdDwSmLy4St33QNjASX1OQ32r3WoWQUn9XghVMRT0EkQhsYIN7WbdbAKnznsaqTEIb8QgAlp7OHvUNZ7Uvq/YtOLVv5BQuoNk0Z0sLL2DRr1KkOKiHjN7A/F2HPuQJEgAPP8qNkXt4+ANN+WvucsPby4QwwvHji7UHEA2UfXB8tqfYqIpvQnH9I9e0eTy18d3XAC9krh4Vpp5QFGorOJ0/fX3BrHf8GpN48v3YO6PS0k7tflDuw3sai/hvlgR9gAAAAASUVORK5CYII=)no-repeat;width: 10px;height: 10px;background-size: contain;float: right;margin-left: 4px;}
					p.content{
						width: 100%;padding:20px 0;
					}
					p.time{color: #9d9d9d;}
				}
			}
		}
		div.allLook{
				padding-bottom: 0;margin-bottom: 60px;
				h3{font-size: 20px;line-height: 120px;width: 100%;}
				ul{
					width: 100%;height: 1300px;
					li{
						width: 50%; float: left;line-height: 16px;font-size: 12px;padding-right: 15px;box-sizing: border-box;
						img{width: 100%;display: block;}
						p.name{height: 16px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
						div.price{
							p.first{
								color: #dd2828; width: 100%; 
								span{color:#cccccc;margin-left: 10px;text-decoration: line-through;}
								span.last{float: right;text-decoration: none;color: #b2b2b2;}
							}
						}
					}
				}
			}
		
		footer{
			width: 100%;height:50px; position: fixed;left: 0;bottom: 0;border-top: 2px solid #e5e5e5;box-sizing: border-box;background: white;
			div.left{
				width: 60%;height: 100%;border-right: 1px solid #e5e5e5;float: left;
				div{
					padding-top: 8px;width: 40px;text-align: center;margin-left: 20px; float: left;
					i{font-size: 22px;}
					p{font-size: 12px;color: #666;}
				}
				p.cart{font-size: 16px;font-weight: bold;color: #000;line-height: 50px;float: right;margin-right: 35px;}
			}
			div.right{width: 39%;height: 100%;float: right;text-align: center;line-height: 50px;color: #dd2828;font-weight: bold;}
		}

	}
</style>