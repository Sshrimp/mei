<template>
	<div id="upcoming">
		<div class="title">
			<h3>距离开场还有<span>16</span>小时</h3>
			<span class="tips">{{tips}}</span>
		</div>
		<div class="content">
			<div v-for = 'data in datalist' class="screen">
				<img :src="data.imageTmallUrl" alt="">
				<div class="outer">
					<div class="event-text">
						
					<p>{{data.englishName}}</p>
					<p>{{data.chineseName}}</p>
					<p>{{data.discount}}</p>
					</div>
				</div>
				<div class="right">
					<div>开售提醒</div>
				</div>
			</div>
		</div>
	</div>

</template>


<script>
import axios from 'axios'
	export default{
		name:'upcoming',
		data(){
			return{
				datalist:[],
				title :'',
				tips:'',
				time:'',
			}
		},
		mounted(){
			document.documentElement.scrollTop = 100
			console.log(document.documentElement.scrollTop)
			axios.get('/appapi/upcoming/index/v3?userId=2017201799900099819&platform_code=H5&timestamp=1542958420644&summary=f906dab53530ca7d293ef89b241c7845').then(res=>{
				console.log(res.data)
				this.tips = res.data.tips
				this.datalist = res.data.lists[0].events
				this.title =res.data.lists[0].title
				this.time = res.data.lists[0].launchTime
				console.log(this.tips,this.datalist,this.title,this.time)
			})
		}
	}

</script>

<style scoped lang="scss">
	#upcoming{
		margin-top: 80px;
	}
	.title{
		width: 90%;
		margin: 0 auto;
		.tips{
			font-size: 12px;
			color: #666
		}
	}

	h3{
		font-size: 18px;
		font-weight: 500;
		span{
			color: #dd2828;
		}
	}

	.screen{
		position: relative;
		margin-bottom: 10px;
		}
	.content{
	
		width: 90%;
		margin: 0 auto;
		img{
			width: 100%
		}
	}

	.outer{
		position: absolute;
		left: 0px;
		bottom: 5px;
		width: 100%;
		background-image: linear-gradient(180deg,transparent,rgba(0,0,0,1));
		.event-text{
			padding-left: 10px;
			padding-bottom: 5px;
			color: #fff;
			font-size: 14px
		}

	}

	.right{
		position: absolute;
		right: 5px;
		bottom: 10px;
		width: 55px;
		height: 14px;
		background: #fff;
		font-size: 12px;
		text-align: center;
		padding: 2px 5px;
	}


</style>