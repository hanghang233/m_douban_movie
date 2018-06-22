<template>
	<div>
		<slider :list="showList" :mark="1"></slider>
	</div>
</template>

<script type="text/javascript">
	import slider from '@/common/util/slider'
	import { createMovieList } from '@/common/util/movieList.js'
	import movieListService from '@/service/movie-list.js' 
	export default {
		data() {
			return {
				showStartIndex: 1,
				count: 5,
				showList: [],
				mark: 1
			}
		},
		components: {
			slider: slider
		},
		created() {
			var _this = this;
			var data = {
				'start': this.showStartIndex,
				'count': this.count
			}
			movieListService.getMovieList(data).then(function(res){
				_this.showList = createMovieList(res.subjects);
				
			})
		}
	}
</script>