<template>
	<div id="cosmetics">	
		<div  class = 'brand' v-for="data in datalist" @click="handelClick(data.id)" >
			<img :src="data.main_image" alt="">
			<div class="text">
				<p class="title">{{data.main_title}}</p>
				<p class="">{{data.sub_title}}</p>
				<p class="">{{data.description}}</p>
			</div>
		</div>
		<router-link  to='/filterlist' tag ='ul' class="list">
				<li v-for="li in lilist" :key="li.id" class="l" @click="handleClickFilter(li.categoryOneId,li.categoryTwoId,li.siloId)">
					<img :src="li.categoryImgStr" alt="">
				</li>
		</router-link>

		<ul  class="content" 
			  v-infinite-scroll="loadMore"
			  infinite-scroll-disabled="loading"
			  infinite-scroll-distance="0"
			  infinite-scroll-immediate-check="false">
			<li v-for="box in boxlist" :key="box.id" @click="handleClickProduct(box.eventId,box.urlkey)">
				<img :src="box.imageUrl" alt="">
				<div class="text">
					<div v-if="isShow">海外直发</div>
					<p>{{box.englishName}}</p>
					<p>{{box.chineseName}}</p>
					<p>{{box.discountText}}</p>
				</div>
			</li>
		</ul>	
		<mt-spinner v-if="isShow" class="circle" type="fading-circle" color="black"></mt-spinner>		
		<div class="line"></div>


		<footer>
			<p class="number">400 - 664 - 6698</p>
			<ul>
				<li>首页</li>
				<li class="line">|</li>
				<li>客户端</li>
				<li class="line">|</li>
				<li>登陆</li>
				<li class="line">|</li>
				<li>注册</li>
			</ul>
		</footer>

	
	</div>

</template>


<script>
	import axios from "axios";
	import { InfiniteScroll } from 'mint-ui';
	import { Spinner } from 'mint-ui';
	import Vue from 'vue'
	import MintUI from 'mint-ui'
	import 'mint-ui/lib/style.css'
	Vue.component(Spinner.name, Spinner);
	Vue.use(MintUI); //注册mobile UI
	export default{
		name:'cosmetics',
		data(){
			return{
				datalist:[],
				lilist:[],
				boxlist:[],
				isCreate:true,
				loading:false,
				totalPages:7,
				currentPage:0,
				categoryId:[],
				isShow:true
			}
		},
		methods:{
			handelClick(url){
				url = this.datalist[0].link_url;
				var arr=[];
				arr.push(url.split('/brand',2))
				url = arr[0][1];
				this.$router.push('/brand'+ url);
			},

			handleClickFilter(categoryOneId,categoryTwoId,siloId){
				var payload = {
					oneId:categoryOneId,
					twoId:categoryTwoId,
					siloId:siloId
				}
				this.$store.commit('lrx',payload);
				// this.$router.push('/filerlist/');
			},
			handleClickProduct(eventId,urlkey){
				var payload = {
					eventId,
					urlkey
				};
				this.$store.commit('lrx2',payload);
				this.$router.push('/productlist/')
			},
			//懒加载!!!!
			loadMore() {
				this.currentPage++;
				if(this.currentPage>this.totalPages){
					this.loading = true;
					this.isShow = false
					console.log('sss');
					return;
				}
				
			  	axios.get(`/appapi/silo/eventForH5?categoryId=cosmetics&pageIndex=${this.currentPage}&timestamp=1543018967701&summary=d16c099bda4ab45392f836c7530c19e7&platform_code=H5`).then(res=>{
					this.boxlist = [...this.boxlist,...res.data.eventList];
				}).catch(err=>{
					console.log('请求失败');
				})
			}	
		},
		mounted(){
			axios.get("/appapi/home/mktBannerApp/v3?silo_id=2013000100000000003&platform_code=PLATEFORM_H5")
			.then(res=>{
				this.datalist = res.data.banners;
			}).catch(err=>{
					console.log('请求失败');
				})

			axios.get("/appapi/cms/cmsList/v3?silo=2013000100000000003&timestamp=1543018967694&summary=3924820db17a680b6cea5febcc6b5a04&platform_code=H5").then(res=>{
				this.lilist = res.data.resultList[0].data;
			}).catch(err=>{
				console.log('请求失败');
			})

			axios.get("/appapi/silo/eventForH5?categoryId=cosmetics&pageIndex=1&timestamp=1543018967701&summary=d16c099bda4ab45392f836c7530c19e7&platform_code=H5").then(res=>{
				this.boxlist = res.data.eventList;
			}).catch(err=>{
				console.log('请求失败');
			})

			
		}
	}

</script>

<style scoped lang="scss">
	*{margin:0;padding: 0;}
	.l{float: left;}
	img{display: block;}
	ul li{list-style: none;}
	#cosmetics{
		div.brand{
			position: relative;
			img{width:100%;height: auto;}
			div.text{
				color: white;font-weight: bold;text-align: center;position: absolute;left: 50%;bottom:60px;transform: translateX(-50%);font-size: 12px;line-height: 20px;
				p.title{font-size: 20px;line-height: 25px;}
			}
		}
		ul.list{
			padding: 0 10px;width: 100%; display: flex;box-sizing: border-box;
				li{
					width: 20%; flex-direction: row;justify-content:space-between;flex-grow:1;margin:5px;
					img{width: 100%;}
				}
		}
		ul.content{
			padding: 0 15px;box-sizing: border-box;
			li{
				width: 100%;margin: 10px 0;position: relative;
				img{width: 100%;}
				div.text{
					width: 100%;box-sizing: border-box; position: absolute;left:0px;bottom:0px;color: white;background:linear-gradient(top,transparent,rgba(0,0,0,.55));padding-left: 10px;padding-bottom:10px;
					div{width: 50px;height: 15px;background: white;color: black;font-size: 12px;line-height: 15px;text-align: center;}
					p{line-height: 20px;font-size: 14px;}
				}
			}
		}
		.circle{position: absolute;left: 50%;transform: translateX(-50%);}
		div.line{
			border-top: 2px solid #e5e5e5;border-bottom: 2px solid #eeeeee;margin:0 15px;
		}
		footer{
			text-align: center;margin-bottom: 20px;
			p.number{font-size: 12px;line-height: 40px;}
			ul{
				display: flex;justify-content: center;
				li{font-size: 12px;color: #666;}
				li.line{
					float: left;padding: 0 15px;
					
				}
			}
		}
	}


</style>