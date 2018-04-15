<template>
	<div class="movie-list-content-container">
		<ul class="movie-list-container">
			<li v-for="item in movieList">
				<img :src="getImages(item.images.small)" style="width: 90px;height: 130px" />
				<div class="movie-info">
					<p class="movie-title text-80">{{item.title}}</p>
					<p class="movie-star text-60">{{item.rating.average}}</p>
					<p class="movie-director text-60">导演：{{item.directors.name}}</p>
					<p class="movie-actors text-60">主演：<span v-for="actor in item.casts">{{actor.name}}/</span></p>
					<p class="collect_count text-60">{{item.collect_count}}人看过</p>
				</div>  
			</li> 
			<li><loadMore :has-more="hasMore"></loadMore></li>
		</ul>
	</div>
</template>

<script>
	import loadMore from '@/base/loadMore/loadMore.vue'
	export default {
		props: {
			movieList: {
				type: Array,
				default: []
			},
			hasMore: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			getImages(url) {
				if(url){
					let _u = url.substring( 7 );
        			return 'https://images.weserv.nl/?url=' + _u;
				}
			}
		},
		components: {
			loadMore: loadMore
		}
	}
</script>

<style>
	.movie-list-container {
		list-style-type: none;
		padding-left: 0px;
		margin-bottom: 700px;
	}
	.movie-list-container li{
		display: flex;
		margin-bottom: 50px;
		width: 100%;
	}
	.movie-list-content-container {
		position: relative;
		overflow: hidden;
	}
</style>