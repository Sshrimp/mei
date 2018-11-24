<template>
	<div id="recommend">
		<router-link  to='/brand' tag ='div' class = 'brand'>
			<div v-for = 'data in banner' :key = 'data.id' class="banner">
				<img :src='data.main_image' alt="">
				<div class="toptext">
					<strong>{{data.main_title}}</strong>
					<div>{{data.sub_title}}</div>
				</div>
			</div>
		</router-link>

		<router-link  to='/filterlist' tag ='div' class = 'newman'>
			<img :src="newMan.img" alt="">
		</router-link>
		<div class="new">
			<div class="newtitle">
				<img src="data:image/png;base64,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" alt="">
			</div>
		</div>

			<div class="newlist">
				<div v-for = 'data in newlists' :key = 'data.eventId' class="newitem" @click="topro(data.eventId,data.urlkey)">
					<div class="itemcontainer">
			 			<img :src="data.imageUrl" alt="">
						<div class="itemtext">
							<div class="inner">
								<div>{{data.englishName}}</div>
								<div>{{data.chineseName}}</div>
								<div>{{data.discountText}}</div>
							</div>
						</div>
					</div>
		 		</div>
			</div>

			<div class="hot">
				<img src="data:image/png;base64,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" alt="">
			</div>

			<div class="hotlist">
				<div v-for = 'data in hotlists' :key = 'data.eventId'  class="hotitem">
					<div class="itemcontainer">
					<img :src="data.imageUrl" alt="">
						<div class="itemtext">
							<div class="inner">
								<div>{{data.englishName}}</div>
								<div>{{data.chineseName}}</div>
								<div>{{data.discountText}}</div>
							</div>
						</div>
					</div>
			</div>
		</div>


		<div class="more">
			<img data-v-1d91a4bd="" src="data:image/png;base64,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">
		</div>
		<div class="moreitem">
			<div></div>
			<div></div>
		</div>
		<footer class="footer">
			<div class="cellphone">400-664-6698</div>
			<div class="foot">
				<span>首页</span>
				<span>|</span>
				<span>客户端</span>
				<span>|</span>
				<span>登录</span>
				<span>|</span>
				<span>注册</span>
			</div >
		</footer>
		

	</div>
</template>


<script>
	import axios from 'axios'
	export default{
		name:'recommend',
		data(){
			return{
				banner:[],
				newMan:'',
				newlists:[],
				hotlists:[]
			}
		},
		mounted(){
			this.$store.state.navshow = true,
			axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then(res=>{
				this.banner = res.data.banners 
			})

			//http://www.mei.com/appapi/home/newZoneEntrance/v3?credential=

			axios.get('/appapi/home/newZoneEntrance/v3?credential=').then(res=>{
				this.newMan = res.data
			})

			axios.get('/appapi/home/eventForH5?params=%7B%7D&timestamp=1542777770548&summary=246ff540d70364cef6ed74f51141c651&platform_code=H5').then(res=>{
				
					this.newlists = res.data.lists[0].events
					this.hotlists = res.data.lists[1].events
			})
		},
		methods:{
			topro(eventId,urlkey){
				var payload = {
					eventId,
					urlkey
				};
				this.$store.commit('lrx2',payload);
				this.$router.push('/productlist/')
			}
		}
	}

</script>



<style scoped  lang="scss">  
	#recommend{
	}

	.banner{
		position: relative;
		img{
		width: 100%;
		
		}
		.toptext{
			position: absolute;
			width: 100%;
			bottom: 15%;
			text-align: center;
			color: #fff;

			strong{
				font-size: 26px
			}

			div{
				font-size: 14px
			}
		}
	}  

	.newman{
		img{
			width: 100%
		}
	}
	

	.new{
		.newtitle{
			img{
				width: 40%;
				margin: 20px 0px;
				margin-left: 20px
			}
		}
	}

	.hot{
		img{
			width: 40%;
			margin: 20px 0px;
			margin-left: 20px
		}
	}

	.more{
		img{
			width: 40%;
			margin: 20px 0px;
			margin-left: 20px
		}
	}

	.newlist{
		.newitem{
			text-align: center;
			.itemcontainer{
				position: relative;
				
			img{
				width: 94%;
				height: 207px
				
			}
			.itemtext{
				text-align: left;
				position: absolute;
				bottom: 2%;
				left: 3%;
				color: rgb(255, 255, 255);
				font-family: -apple-system, BlinkMacSystemFont, "'PingFang SC'", "Helvetica Neue", Helvetica, Arial, sans-serif;
				background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.55));
				width: 94%;
				height: 50%;

				.inner{
					padding-top: 40px;
					padding-left: 10px
				}

			}
			}
		
		}
	}

	.hotlist{
		.hotitem{
			text-align: center;
			.itemcontainer{
				position: relative;
				
			img{
				width: 94%;
				height: 207px
				
			}
			.itemtext{
				text-align: left;
				position: absolute;
				bottom: 2%;
				left: 3%;
				color: rgb(255, 255, 255);
				font-family: -apple-system, BlinkMacSystemFont, "'PingFang SC'", "Helvetica Neue", Helvetica, Arial, sans-serif;
				background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.55));
				width: 94%;
				height: 50%;

				.inner{
					padding-top: 40px;
					padding-left: 10px
				}

			}
			}
		
		}
	}


.footer{
	.cellphone{
		text-align: center;
		font-size: 14px
	}
	.foot{
		width: 100%;
		text-align: center;
		margin: 10px 0 ;
	}
	span {
		font-size: 12px;
		color: rgb(102, 102, 102);
	}
}
	
</style>
