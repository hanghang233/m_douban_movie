<template>
	<div>
		<reviewtitle :title="title"></reviewtitle>
		<scroll :data="commentList" ref="wrapper" class="comment-wrapper" @scrollToEnd="loadMore()" :pullup="true" :listenScroll="true">
			<div class="comment-content">
				<span class="total">短评{{total}}个</span>
				<paraList :list="commentList" :has-more="hasMore"></paraList>
			</div>
		</scroll>
	</div>
</template>

<script type="text/javascript">
	import reviewtitle from '@/views/movie-detail/reviewTitle'
	import movieListService from '@/service/movie-list.js'
	import scroll from '@/base/scroll/scroll.vue'
	import paraList from '@/views/movie-detail/paraList.vue'
	export default {
		data() {
			return {
				movieDetail: {},
				title: '',
				movieId: '',
				total: 0,
				commentList: [],
				hasMore: true,
				start: 0,
				count: 20,
				loadingData: false, //是否加载完数据
			}
		},
		components: {
			reviewtitle: reviewtitle,
			scroll: scroll,
			paraList: paraList
		},
		methods: {
			getComment() {
				this.loadingData = false;
				var _this = this;
				var data = {
					'id': this.movieId,
					'start': this.start,
					'count': this.count
				}
				movieListService.getCommingList(data).then(function(res){
					_this.commentList = _this.commentList.concat(res.comments);
					_this.total = res.total;
					_this.loadingData = true;
					_this.checkMore(res)
				})
			},
			loadMore() {
				this.start = this.start + this.count;
				//this.getComment();
			},
			checkMore(res) {
				if(this.start + this.count > res.total){
					this.hasMore = false;
				}
			}
		},
		created: function(){
			//获取电影详情
			this.movieId = this.$router.history.current.params.id;
			var _this = this;
			var data = {
				'id': this.movieId
			}
			movieListService.getMovieDetail(data).then(function(res){
				_this.movieDetail = res;
				_this.title = _this.movieDetail.title + '全部短评';
				_this.getComment();
			})
		}
	}
</script>

<style type="text/css">
	.total {
		margin: 40px 50px 80px 50px;
		font-size: 65px;
		color: #555555b5;
		float: left;
	}
	.comment-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.comment-content {
		margin-top: 230px;
		margin-bottom: 500px;
	}
</style>