<template>
	<div id="welcome">
		<div class="back">叉</div>

		<div class="kv">
			<img :src="listImg" alt="">
		</div>

		<div class="coupon-area">
			<div class="slogan">
				<div class="slogan-1">{{listTips}}</div>
				<div class="slogan-2">更多好礼尽享新人专区！</div>
			</div>
			<div class="link" @click="zhuan()">进入新人专区</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name : 'welcome',
		data(){
			return{
				listImg:null,
				listTips:''
			}
		},
		 mounted(){
		 	axios.get(`/appapi/customer/getRegisterSuccessInfo`).then(res=>{
		 		//console.log(res.data);
		 		this.listImg = res.data.images;
		 		this.listTips = res.data.tips; 
		 	})
		 },
		 methods:{
		 	zhuan(){
		 		this.$router.push('/index')
		 	}
		 }
	}
</script>

<style scoped lang="scss">
	#welcome{
		width: 100%;
		.back{
			width: 60px;
			height: 60px;
			position: absolute;
			top: 0;
			right: 0;
			line-height: 60px;
			text-align: center;
			cursor: pointer;
		}
		.kv{
			width: 80%;
			margin: 0 auto;
			padding-top: 110px;
			img{
				width: 100%;
			}
		}
		.coupon-area{
			padding-top: 100px;
			width: 80%;
			margin: 0 auto;
			.slogan{
				width: 100%;
				padding-bottom: 15px;
				font-size: 14px;
				color: #666;
				.slogan-1{
					text-align: center;
				}
				.slogan-2{
					text-align: center;
				}

			}
			.link{
				width: 100%;
				margin: 0 auto;
				color: #fff;
				background: #000;
				text-align: center;
				cursor: pointer;
				height: 44px;
				line-height: 44px;
			}
		}
	}

</style>