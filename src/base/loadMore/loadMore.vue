<template>
	<div class="loadmore">
		<div class="hasmore" v-if="hasMore">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div v-if="!hasMore">
			<span>没有更多了....</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			hasMore: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style type="text/css">
	.loadmore {
		width: 100%;
		height: 60px;
		margin: 0 auto;
		text-align: center;
		padding-bottom: 10px
	}
	.loadmore .full {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
	.loadmore .hasmore {
		height: 100%;
		text-align: center;
	}
	.loadmore .hasmore span:nth-child(1) {
		animation-delay: 0.2s
	}
	.loadmore .hasmore span {
		display: inline-block;
		width: 100px;
		height: 100%;
		margin-right: 5px;
		background-color: #90ee90;
		animation: load 2.04s ease infinite
	}
	@keyframes load {
		form {
			opacity: 1;
     		transform: scale(1.2)
		}
		to {
			opacity: .2;
      		transform: scale(.2)
		}
	}
</style>