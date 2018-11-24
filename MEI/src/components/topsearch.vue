<template>
	<div :id= 'changeclass'class ="clear">
		<router-link to ='/login/mobile' tag= 'div' class="login"><span>{{loginState}}</span></router-link>
		<div class="search"><i class="iconfont icon-sousuo"></i> JIMMY CHOO 水晶鞋4折起</div>
		<div class="icon"><i class="iconfont icon-56"></i></div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name :'topsearch',
		data(){
			return{
				isfff:true,
				loginState :'登录'
			}
		},
		created(){
			axios.get('/v4/isMan').then(res=>{
				console.log(res)
				if (res.data.isHere === true) {
					this.loginState = '我的'
				}else{
					this.loginState = '登录'
				}
			})
		},
		mounted(){
			let self = this
			// addEventListener('scroll', self.heihei())
			window.onscroll = function(evt){
				if (document.documentElement.scrollTop === 0){
					self.isfff = true
				}else{
				self.isfff = false
				}
			}
		},
		methods:{

		},
		computed:{
				changeclass(){
				if (this.isfff === true) {
					return 'topsearch'
				}else{
					return 'topsearchc'
				}
			},
			add(){
				if (this.isfff === true) {
					return ''
				}else{
					return 'add'
				}
			},
			destroyed(){
			removeEventListener('scroll',  function(){
				if (document.documentElement.scrollTop === 0){
					self.isfff = true
				}else{
					self.isfff = false
				}
			})
		}
		}

		
	}
</script>
 
<style scoped lang="scss">
	#topsearch{
		padding-top: 10px;
		display: flex;
		color: #fff;
		height: 34px;

		.login{
			font-size: 14px;
			padding-top: 5px;
			flex: 1;
			text-align: center;
		}
		.search{
			padding-top: 5px;
			background: rgba(255, 255, 255, 0.3);
			flex: 4;
			text-align: center;
			font-size: 14px;
			height: 26px;
			color: rgba(255, 255, 255, 0.6);
		}
		.icon{
			padding-top: 5px;
			flex: 1;
			text-align: center;
		}
	}

		#topsearchc{
		padding-top: 10px;
		display: flex;
		color: #000;
		height: 34px;
		background: #fff;

		.login{
			font-size: 14px;
			padding-top: 5px;
			flex: 1;
			text-align: center;
		}
		.search{
			padding-top: 5px;
			background: rgba(0, 0, 0, 0.1);
			flex: 4;
			text-align: center;
			font-size: 14px;
			height: 26px;
			color: rgba(0, 0, 0, 0.6);
		}
		.icon{
			padding-top: 5px;
			flex: 1;
			text-align: center;
		}

	}

	
	
</style>