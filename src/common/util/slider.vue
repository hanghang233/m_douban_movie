<template>
	<div>
		<transition-group tag="ul" name="fade" class="slider-contianer">
			<li v-for="(item, index) in list" :key="index" v-show="index == mark">
				<img :src="item.image" />
			</li>
		</transition-group>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			list: {
				type: Array,
			},
		},
		data() {
			return {
				mark: 0
			}
		},
		methods: {
			autoPlay() {
				if(this.mark == 4){
					this.mark = 0;
				}else {
					this.mark++;
				}
			},
			play() {
				setInterval(this.autoPlay, 2500);
			}
		},
		created() {
			this.play()
		}
	}
</script>

<style type="text/css" lang="less">
	.slider-contianer {
		list-style-type: none;
		display: flex;
		width: 100%;
		padding-left: 0px;
		li {
			position: absolute;
			width: 100%;
			img {
				width: 100%;
				height: 15rem;
			}
		}
	}
	.fade-enter-active {  
	    transform: translateX(0);  
	    transition: all 1.5s ease;  
	  }  
	.fade-leave-active {  
	    transform: translateX(-100%);  
	    transition: all 1.5s ease;  
	  }  
	.fade-enter {  
	    transform: translateX(100%);  
	 }  
	.fade-leave {  
	    transform: translateX(0);  
	  }  
</style>