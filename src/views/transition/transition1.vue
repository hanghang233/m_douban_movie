<template>
	<div class="transition-container">
		<button class="btn-transition" @click="push()">{{text}}</button>
		<transition name="fade">
			<div v-show="show" class="menu">
				<div class="small-ball-1 small-ball">1</div>
				<div class="small-ball-2 small-ball">2</div>
				<div class="small-ball-3 small-ball">3</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {
			push() {
				this.show = !this.show;
			}
		},
		computed: {
			text() {
				return this.show ? '开': '关'
			}
		}
	}
</script>

<style type="text/css" lang="less">
	.transition-container {
		display: flex;
		height: 10rem;
		align-items: center;
		justify-content: center;
		.btn-transition {
			display: inline-block;
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			background-color: red;
			border: none;
			color: #fff;
			font-size: 1.2rem;
			outline: none;
			position: absolute;
			z-index: 999
		}
		.menu {
			position: fixed;
            right: 2rem;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            transition: all 1.5s ease-in
		}
		.small-ball {
			display: inline-block;
			width: 2rem;
			height: 2rem;
			background-color: pink;
			border-radius: 50%;
			line-height: 2rem;
			transition: all .4s;
			position: absolute;
			transition: all 1s;
		}
		.fade-enter-active {
			.small-ball-1 {
				transition-delay: .3s
			}
			.small-ball-2 {
				transition-delay: .2s
			}
			.small-ball-3 {
				transition-delay: .1s
			}
		}
		.fade-enter, .fade-leave-active{
			.small-ball-1 {
				transform: translate3d(2rem, 0.5rem, 0rem);
				transition-delay: .1s
			}
			.small-ball-2 {
				transform: translate3d(0rem, 1.5rem, 0rem);
				transition-delay: .2s
			}
			.small-ball-3 {
				transform: translate3d(2.3rem, 2.5rem, 0rem);
				transition-delay: .3s
			}
		}
		.small-ball-1 {
			top: 0.5rem;
			right: 2rem;
		}
		.small-ball-2 {
			top: 1.5rem;
		}
		.small-ball-3 {
			top: 2.3rem;
			right: 2.5rem
		}
	}
</style>