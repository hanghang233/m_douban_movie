<template>
	<div class="title-container">
		<span>{{title}}</span>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			title: {
				type: String
			}
		}
	}
</script>

<style type="text/css">
	.title-container {
		height: 200px;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		color: #555555b5;
		position: absolute;
		z-index: 9999
	}
</style>