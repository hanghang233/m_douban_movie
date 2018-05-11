<template>
	<div class="movie-list-content-container">
		<ul class="movie-list-container">
			<li v-for="(movie, index) in movieList" @click="selectMovie(movie)">
				<span class="movie-date" v-if="needDate && !dateEqual(index) && movieType == '1'">{{movie.date}}</span>
				<div class="movie-info-continer">
					<img  v-lazy="movie.image" style="width: 90px;height: 130px" />
					<div class="movie-info">
						<p class="movie-title text-80">{{movie.title}}</p>
						<!-- <p class="movie-star text-60">{{movie.rating}}</p> -->
						<star :star-total="movie.rating" :need-star="movieType == '0'"></star>
						<p class="movie-director text-60">导演：{{movie.director}}</p>
						<p class="movie-actors text-60">主演：
							<span v-for="(actor, index2) in movie.casts">{{actor.name}}
								<span v-if="index2 != (movie.casts.length - 1)">/</span>
							</span>
						</p>
						<p class="collect_count text-60" ng-if="movie.collectCount">{{movie.collectCount}}人看过</p>
					</div>  
				</div>
			</li> 
			<li><loadMore :has-more="hasMore"></loadMore></li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	import loadMore from '@/base/loadMore/loadMore.vue'
	import star from '@/base/star/star.vue'
	export default {
		props: {
			movieList: {
				type: Array,
				default: []
			},
			hasMore: {
				type: Boolean,
				default: true
			},
			needDate: {
				type: Boolean,
				default: false
			},
			movieType: {
				type: String,
				default: '0',
			}
		},
		methods: {
			dateEqual(index) {
				//划分日期分组
				if(index === 0){
					return false;
				}
				return this.movieList[index].date === this.movieList[index - 1].date
			},
			//选择电影
			selectMovie(movie) {
				this.$emit('selectMovie', movie);
			}
		},
		components: {
			loadMore: loadMore,
			star: star
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
		flex-direction: column;
	}
	.movie-list-content-container {
		position: relative;
		overflow: hidden;
	}
	.movie-info-continer {
		display: flex;
		flex-direction: row;
		padding: 0px 40px;
	}
	.movie-date {
		background-color: #F8F8F8;
		padding: 40px;
		text-align: left;
	}
</style>