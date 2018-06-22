<template>
	<div id="app">
		<slot>
			<keep-alive exclude="search">
				<transition :name="transitionName">
					<router-view class="router" />
				</transition>
			</keep-alive>
			<tab></tab>
		</slot>
	</div>
</template>

<script>
import tab from './components/tab/tab.vue'
export default {
	name: 'App',
	data() {
		return {
			transitionName: 'slider-right'
		}
	},
	components: {
		tab: tab
	},
	watch: {
		'$route' (to, from) {
			var isBack = this.$router.isBack;
			if(isBack){
				this.transitionName = 'slider-right';
			}else {
				this.transitionName = 'slider-left';
			}
			this.$router.isBack = !isBack;
		}
	},
	created() {
		console.log(this.loadFlag);
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	overflow: hidden;
}
.router {
	position: absolute;
	width: 100%;
	transition: all .2s ease;
	height: 100%;
}
.slide-left-enter, .slider-right-leave-active {
	opacity: 0;
	transform: translate(5rem, 0);
}
.slider-left-leave-active, .slide-right-enter {
	opacity: 0;
	transform: translate(-5rem, 0);
}
</style>
