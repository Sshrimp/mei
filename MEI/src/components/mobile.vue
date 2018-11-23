<template>
	<div id="mobile">
		<div class="login-account">
			<div class="back">叉</div>
			<div class="login-form">
				<div class="login-header">
					<h2>登录/注册</h2>
					<span>注册即送2600元新人红包</span>
				</div>
				<p class="error" v-show="isShow">您输入的手机号格式有误！</p>
				<div class="login-main">
					<div class="input-box">
						<div class="input-item">
							<label v-show="isShoe">手机号</label>
							<input type="text" placeholder="手机号">
							<span>叉</span>
						</div>	
					</div>
					<div class="action"> --> </div>
					<div class="login-switch">
						<a href="">切换密码登录</a>
						<span> -> </span>
					</div>
				</div>
			</div>
			<div class="login-joint">
				<p>
					<span class="iconfont icon-changyonglogo25"></span>
					<span class="iconfont icon-zhifubao"></span>
					<span class="iconfont icon-xinlang"></span>
				</p>
			</div>
		</div>
	</div>
</template>


<script>
import axios from "axios";


export default{
	name:'mobile',
	data(){
		return{
			isShow:false,
			isShoe:false
		}
	},
	 mounted(){
	 	this.$store.state.navshow = false;

	 	axios.get(`/appapi/customer/getRegisterTips`).then(res=>{
	 		console.log(res.data);
	 		this.title = res.data.tips
	 	})
	 }
}	

</script>


<style scoped lang="scss">
	#mobile{
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
				margin: 60px auto 0;
				.login-header{
					
					padding-bottom: 32px;
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
					width: 80%;
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
					.action{
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