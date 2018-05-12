<template>
	<div>
		<div class="box-container">
			<input class="seach-input" placeholder="搜索电影/影人" />
			<span class="cancel" @click="cancel()">取消</span>
		</div>
		<div class="tag-container" @click="search($event)">
			<div class="tags">
				<span class="tag-item">经典</span>
				<span class="tag-item">豆瓣高分</span>
				<span class="tag-item">冷门佳片</span>
			</div>
			<div class="tags">
				<span class="tag-item">剧情</span>
				<span class="tag-item">爱情</span>
				<span class="tag-item">喜剧</span>
				<span class="tag-item">科幻</span>
				<span class="tag-item">动作</span>
				<span class="tag-item">悬疑</span>
				<span class="tag-item">治愈</span>
				<span class="tag-item">青春</span>
				<span class="tag-item">文艺</span>
			</div>
			<div class="tags">
				<span class="tag-item">日本</span>
				<span class="tag-item">韩国</span>
			</div>
			<div class="search-history">
				<p>搜索历史</p>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		methods: {
			search(event) {
				var tag = $(event.target).text();
				this.$emit('searchMovie', tag);
			},
			cancel() {
				this.$router.back();
			}
		}
	}
</script>

<style type="text/css">
	.box-container {
		background-color: #42bd56;
		width: 100%;
		height: 2.5rem;
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
	}
	.seach-input {
		height: 2rem;
		background-color: #fff;
		border-radius: 0.5rem;
		flex: 5 1;
		border: 0px;
		color: #ccc;
		padding-left: 1rem
	}
	.cancel {
		color: #fff;
		flex:1;
		text-align: left;
		padding:0px 1rem
	}
	.tag-container {
		display: flex;
		margin: 0 1rem;
		flex-direction: column;
	}
	.tags {
		border-bottom: 1px solid #ccc;
		padding: 0rem 0.5rem 1rem 0.5rem;
		text-align: left;
	}
	.tag-item {
		display: inline-block;
		border: 4px solid #42bd56;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		margin-right: 1rem;
		color: #42bd56;
		font-size: 0.8rem;
		margin-top: 1rem
	}
</style>