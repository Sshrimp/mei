
<template>
	<div class="detail">
		<div class="title" :class="isScroll?'transparent':'pink'">
			<i class="iconfont icon-fanhui" ></i>
			<p>titiletttttttt
				<span>￥100</span>
			</p>
			<i class="iconfont icon-gengduo"></i>
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
			<ul>
				<li v-for="can in canshulist">
					<p>{{can.name}}</p>
					<span>{{can.value}}</span>
				</li>
			</ul>
		</div>
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
				imglist:[],
				datalist:'',
				taglist:[],
				isShow:true,
				day:0,
				hour:0,
				min:0,
				second:0,
				endtime:'',
				ticket:'',
				serverlist:[],
				canshulist:[]

			}
		},
		methods:{
			time(){
					var a = this.endtime;	
					// console.log(a)
					var n = new Date();
					var d = new Date(this.endtime);
					var t = d - n;
					var day = Math.floor(t/86400000);
					var hour = Math.floor(t/(1000*60*60));
					var min = Math.floor((t-hour*1000*3600)/1000/60);
					var second = Math.floor((t-hour*1000*3600-min*1000*60)/1000);
					// console.log(second)
					this.day = day;
					this.hour = hour;
					this.min = min;
					this.second = second;
					// console.log(this.day,this.hour,this.min,this.second)
					// setTimeout(this.time(),1000)

			},

		},

		mounted(){
			this.$store.state.navshow = false;

			axios.get("/appapi/product/detail/v3?categoryId=2121005100000001521&productId=2042204299000377860&platform_code=H5&timestamp=1542872272394&summary=72d8bee1c0d9217bd5f54ae847852c39").then(res=>{
				// console.log(res.data.infos.newTagList);
				this.datalist = res.data.infos;
				this.imglist = res.data.infos.images;
				this.taglist = res.data.infos.product_labels;
				this.endtime = res.data.infos.ticketInfo[0].startDateLong;
				this.ticket = res.data.infos.ticketInfo[0].ruleInfo;
				this.serverlist = res.data.infos.service_labels;
				this.canshulist = res.data.infos.description.attributesList;
				
				// console.log(this.taglist)

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
				this.time()
				
				console.log(window.scrollY)
					
				

			}).catch(err=>{console.log('请求错误');})
		},
		
	}
</script>
<style scoped lang="scss">
	.pink{background: pink;}
	.transparent{background: blue;}
	.l{float: left;}
	.r{float: right;}
	.img{display: block;}

	 
	.detail{
		div.title{
			height: 45px;width: 100%;color: #222;display: flex;flex-direction: row;justify-content: space-between;
			i.icon-fanhui{margin-left: 15px;font-size: 24px;line-height: 45px;}
			i.icon-gengduo{margin-right: 8px;font-size: 30px;line-height: 45px;}
			p{
				display: flex;flex-direction: column;justify-content: center; font-size: 12px;text-align: center;font-size: 16px;font-weight: bold;color: #000;line-height: 16px;margin-top: 8px;width: 200px;
				span{font-size: 12px;color: #e66565;}
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
			padding:0 20px;
			h3{margin-top: 30px;line-height: 22px;font-size: 18px;}
			ul{
				li{
					float: left;
					p{float: left;width: 115px;}
					span{float: left;}
				}
			}
		}
	}
</style>