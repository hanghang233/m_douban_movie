<template>
	<div class="search-container">
		<img class="logo m-r" src="../../assets/img/logo.png">
		<input class="search-input" placeholder="输入电影名称" />
	</div>
</template>

<script>
	export default {
		name: 'search'
	}
</script>

<style type="text/css">
	.search-container {
		display: flex;
		width: 100%;
	}
	.logo {
		width: 8%;
		height: 8%;
	}
	.m-r {
		margin-right: 15px;
	}
	.search-input {
		flex: 1;
		background-color: #eee;
		border-radius: 20px;
		line-height: 15px;
		border-width: 0px;
		padding-left: 20px;
	}
</style>