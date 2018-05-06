<template>
	<div class="search-container" @click="search()">
		<img class="logo m-r m-l-xs" src="../../assets/img/logo.png">
		<input class="search-input" placeholder="输入电影名称" />
	</div>
</template>

<script>
	export default {
		name: 'search',
		methods: {
			search() {
				this.$router.push({
					'name': 'search'
				})
			}
		}
	}
</script>

<style type="text/css">
	.search-container {
		display: flex;
		width: 100%;
		margin: 30px 30px 0px 30px;
		height: 150px;
	}
	.logo {
		width: 8%;
	}
	.m-r {
		margin-right: 15px;
	}
	.m-l-xs {
		margin-left: 30px;
	}
	.search-input {
		flex: 1;
		background-color: #eee;
		border-radius: 20px;
		line-height: 15px;
		border-width: 0px;
		padding-left: 20px;
		margin-right: 50px;
	}
</style>