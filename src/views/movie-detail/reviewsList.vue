<template>
	<div>
		<ul class="review-content">
			<li v-for="(item, index) in list" v-if="index <= 5">
				<p class="review-title">{{item.title}}</p>
				<div class="review-info1">
					<img :src="getAvatar(item.author.avatar)" class="user-avatar">
					<span class="m-l">{{item.author.name}}</span>
					<star class="m-l" :star-total="item.rating.value" :need-average="false"></star>
				</div>
				<div class="review-info2">
					{{item.summary}}
				</div>
			</li>
		</ul>
		<div class="all-para-count" v-if="count" @click="goList()">全部影评{{count}}个</div>
	</div>
</template>

<script type="text/javascript">
	import star from '@/base/star/star.vue'
	export default {
		props: {
			list: {
				type: Array
			},
			count: {
				type: Number,
				default: 0
			},
			movieId: {
				type: String
			}
		},
		methods: {
			getAvatar(url) {
				var _u = url.substring(7);
        		return 'https://images.weserv.nl/?url=' + _u;
			},
			goList() {
				this.$router.push({
					path: '/moviedetail/${this.movieId}/reviews' 
				})
			}
		},
		components: {
			star: star
		}
	}
</script>

<style type="text/css">
	.user-avatar {
		border-radius: 50%;
		width: 160px;
	}
	.review-content {
		list-style-type: none;
		text-align: left;
		padding: 0 70px;
	}
	.review-title {
		margin-bottom: 50px;
	}
	.review-content li {
		margin-bottom: 100px;
	}
	.review-info1 {
		display: flex;
		align-items: center;
		font-size: 60px;
		color: #555555b5;
	}
	.m-l {
		margin-left: 50px
	}
	.review-info2 {
		font-size: 60px;
		margin-top: 30px;
		color: #555555b5;
	}
	.all-para-count {
		color: #42bd56;
		margin: 50px 0px;
	}
</style>