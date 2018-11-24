<template>
	<div id="setpassword">
		<div class="login-account">
			<div class="back"  @click="toHome()">叉</div>
			<div class="login-form">
				<div class="login-header">
					<h2>设置密码</h2>
					<!-- <span>{{title}}</span> -->
				</div>
				<p class="error" v-show="isShow">请输入6-20位字符！</p>
				<div class="login-main">
					<div class="input-box">
						<div class="input-item">
							<label v-show="isShoe">请输入6-20位字符</label>
							<input type="password" :placeholder="shouji" @focus="xianshi()" @blur="meile()" v-model="isValue">
							<span @click="shan()">叉</span>
						</div>	
					</div>
					<div :class="isShor?action2:action1" @click ="fafa()"> --> </div>
					<!-- <div class="login-switch">
						<router-link to="/login/account" tag="a">切换密码登录</router-link>
						<span> -> </span>
					</div> -->
				</div>
			</div>
			<!-- <div class="login-joint">
				<p>
					<span class="iconfont icon-changyonglogo25"></span>
					<span class="iconfont icon-zhifubao"></span>
					<span class="iconfont icon-xinlang"></span>
				</p>
			</div> -->
		</div>
	</div>
</template>


<script>
import axios from "axios";


export default{
	name:'setpassword',
	data(){
		return{
			isShow:false,
			isShoe:false,
			isShor:false,
			title:null,
			shouji:'请输入6-20位字符',
			isValue:'',
			action1:'action1',
			action2:'action2'

		}
	},
	 mounted(){
	 	this.$store.state.navshow = false;

	 	axios.get(`/appapi/customer/getRegisterTips`).then(res=>{
	 		//console.log(res.data);
	 		this.title = res.data.tips
	 	})
	 },
	 methods:{
	 	toHome(){
	 		this.$router.push('/recommend')
	 		//console.log('aaaaa');
	 	},
	 	xianshi(){
	 		this.shouji = "";
	 		this.isShoe = true
	 	},
	 	meile(){
	 		var myreg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
	 		//console.log(this.isValue)
	 		if (this.isValue !=='') {
	 			//console.log('不是空的')
	 			
	 			if (myreg.test(this.isValue)) {
	 				//console.log('正确')
	 				//this.isShow = !this.isShow
	 				this.isShor = true
	 				this.isShow = false;
	 			}else {
	 				//console.log('错误')
	 				this.isShow = true
	 			}
	 		}else {
	 			//console.log('是空的')
	 			this.shouji = '请输入6-20位字符';
	 			this.isShoe = false
	 		}
	 	},
	 	shan(){
	 		this.isValue ='';
	 		this.shouji = '请输入6-20位字符';
	 		this.isShoe =false;
	 		this.isShor = false;
	 		this.isShow = false;
	 	},
	 	fafa(){
	 		if (this.isShor ===true) {
	 			//console.log(this.$store.state.num,);
	 			//console.log(this.isValue);
	 			axios.post(`/v4`,{
	 				num:this.$store.state.num,
	 				password:this.isValue
	 			}).then(res=>{
	 				//console.log(res.data);
	 				this.$router.push('/welcome');
	 			}).catch(err=>{
	 				console.log("请求失败："+err);
	 			})
	 		}
	 		
	 	}
	 }
}	

</script>


<style scoped lang="scss">
	#setpassword{
		.login-account{
			width: 100%;
			.back{
				width: 60px;
				height: 60px;
				line-height: 60px;
				text-align: center;
				position: absolute;
				top: 0;
				right: 0;
				cursor: pointer;
			}
			.login-form{
				width: 80%;
				margin: 86px auto 0;
				.login-header{
					
					padding-bottom: 38px;
					h2{
						font-size: 18px;
						font-weight:normal;
					}
					span{
						font-size: 14px;
						padding-top: 5px;
						color: #666;
					}
				}
				.error{
					width: 100%;
					margin: 0 auto;
					color: #dd2828;
					font-size: 12px;
					margin-bottom: 10px;
					}
				.login-main{
					width: 100%;
					.input-box{
						margin-bottom: 10px;
						box-shadow: 0 3px 5px rgba(0,0,0,.15), 0 -1px 3px rgba(0,0,0,.05);
						height: 60px;
						position: relative;
						.input-item{
							width: 90%;
							margin: 0 auto;
							position: relative;
							label{
								color: #666;
								font-size: 12px;
								width: 80%;
								display: block;
								position: absolute;
								left: 0;
								top: 13px;

							}
							input{
								width: 80%;
								border: none;
								outline: none;
								height: 16px;
								padding-top: 30px;
							}
							span{
								display: block;
								position: absolute;
								top: 0;
								right: -15px;
								width: 40px;
								height: 60px;
								line-height: 60px;
								text-align: center;
								cursor: pointer;
							}
						}
						
					}
					.action1{
						margin-bottom: 15px;
						height: 60px;
						background: #ccc;
						line-height: 60px;
						text-align: center;
						cursor: pointer;
						box-shadow: 0 3px 5px rgba(0,0,0,.15), 0 -1px 3px rgba(0,0,0,.05);
						color: #fff;
						font-size: 21px;
					}
					.action2{
						margin-bottom: 15px;
						height: 60px;
						background: #000;
						line-height: 60px;
						text-align: center;
						cursor: pointer;
						box-shadow: 0 3px 5px rgba(0,0,0,.15), 0 -1px 3px rgba(0,0,0,.05);
						color: #fff;
						font-size: 21px;
					}
					.login-switch{
						a{
							color: #666;
							font-size: 14px;
							display: inline-block;
							cursor: pointer;
						}
						span{
							color: #666;
							font-size: 14px;
						}
					}
				}
			}
			.login-joint{
				margin-top: 160px;
				width: 100%;
				padding-bottom: 50px;
				p{
					width: 50%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					span{
						font-size: 30px;
					}
				}
			}
		}
	}

</style>