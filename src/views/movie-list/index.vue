<template>
	<div id="movieList">
		<search></search>
		<ul class="movie-nav">
			<li :class="{'movie-nav-active': isNavActive('0')}" @click="changeMovieNav('0')">正在上映</li>
			<li :class="{'movie-nav-active': isNavActive('1')}" @click="changeMovieNav('1')">即将上映</li>
		</ul>
		<div v-if="nowIndexNav == 0">这里是正在上映页面</div>
		<div v-if="nowIndexNav == 1">这里是即将上映页面</div>
	</div>
</template>

<script>
	import search from '@/components/search/search.vue'
	export default {
		name: 'movieList',
		data() {
			return {
				'nowIndexNav': 0
			}
		},
		methods: {
			changeMovieNav(index) {
				this.nowIndexNav = index;
			},
			isNavActive(index) {
				return this.nowIndexNav == index;
			}
		},
		components: {
			search: search
		}
	}
</script>

<style type="text/css">
	#movieList {
		color: #777;
	}
	.movie-nav {
		display: inline-block;
		list-style-type: none;
		display: flex;
		font-size: 70px;
		padding: 0px;
		margin: 0px;
	}
	.movie-nav li {
		flex: 1;
		padding: 40px 0px;
	}
	.movie-nav-active {
		border-bottom: 10px solid #42bd56;
		color: #42bd56;
	}
</style>
