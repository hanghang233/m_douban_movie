<template>
	<div id="app">
		<keep-alive exclude="search">
			<router-view/>
		</keep-alive>
		<tab></tab>
	</div>
</template>

<script>
import tab from './components/tab/tab.vue'
export default {
	name: 'App',
	components: {
		tab: tab
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
</style>
