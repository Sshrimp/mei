<template>
	
	<div  id="topnav">
		<div class="list">
			
		<ul :class="changeclass">
			<router-link to= '/index'  tag ='li' class="navitem"  :class = 'add'>推荐</router-link>
			<router-link to= '/silo/crossborder'  tag ='li' class="navitem" :class = 'add'>海外</router-link>
			<router-link to= '/silo/women'  tag ='li' class="navitem" :class = 'add'>女士</router-link>
			<router-link to= '/silo/men'  tag ='li' class="navitem" :class = 'add'>男士</router-link>
			<router-link to= '/silo/cosmetics'  tag ='li' class="navitem" :class = 'add'>美妆</router-link>
			<router-link to= '/silo/lifestyle'  tag ='li' class="navitem" :class = 'add'>家具</router-link>
			<router-link to= '/silo/kids'  tag ='li' class="navitem" :class = 'add'>婴童</router-link>
			<router-link to= '/upcoming'  tag ='li' class="navitem" :class = 'add'>即将上市</router-link>

		</ul>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'topnav',
		data(){
			return{
				isfff:true,

			}
		},
		mounted(){
			let self = this
			addEventListener('scroll', function(){
				if (document.documentElement.scrollTop === 0){
					self.isfff = true
				}else{
					self.isfff = false
				}
			})

			
				// console.log(self.isfff)
		},
		computed:{
			changeclass(){
				if (this.isfff === true) {
					return 'clear navlist'
				}else{
					return 'clear navlistc'
				}
			},
			add(){
				if (this.isfff === true) {
					return ''
				}else{
					return 'add'
				}
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

</script>


<style scoped>


#topnav{
	

}
.navlist{
	width:100%;
	display: inline;
	white-space: nowrap;
	overflow-x:scroll;
	float:left;
	overflow-y:hidden;	
	padding-left: 10px;
	padding-top: 10px;
}

.navlistc{
	width:100%;
	display: inline;
	white-space: nowrap;
	overflow-x:scroll;
	float:left;
	overflow-y:hidden;	
	padding-left: 10px;
	padding-top: 10px;
	background: #fff;
	color:#000;
}
	.clear:after {
		content: '';
		display: block;
		clear: both;
	}
	.navitem{
		display:inline-block;height:30px;padding-left:10px;
		color: #fff;
		font-size: 14px;
		flex: 1;
		padding: 0px 6px;
	}

	.add{
		display:inline-block;height:30px;padding-left:10px;
		color: #000;
		font-size: 14px;
		flex: 1;
		padding: 0px 6px;
	}

	

</style>