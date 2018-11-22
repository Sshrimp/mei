<template>
	<div id="cosmetics">
		美妆
		<router-link  to='/brand' tag ='div' class = 'brand'>
			此处头部品牌，to应写成 ‘/brand/+id’即可跳转,点击页面任何一处进入次级页面时都应该对store中navshow 进行操作 变成false，点击返回再次操作变为true
		</router-link>

		<router-link  to='/filterlist' tag ='div' class = 'brand'>
			此处中间部分小图，to应该写成'/filterlist'  另外注意本次所有get请求需要传值，另行研究
		</router-link>

		<router-link  to='/productlist' tag ='div' class = 'brand'>
			此处底部，to应该写成'/productlist'  另外注意本次所有get请求需要传值，另行研究,此处需要懒加载
		</router-link>


	</div>

</template>


<script>
	export default{
		name:'cosmetics'
	}

</script>

<style>
	#cosmetics{
		margin-top: 40px
	}
	.brand{
		background: red;
		margin-top: 10px;
	}


</style>