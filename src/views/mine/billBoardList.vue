<template>
	<div>
		<h3 class="text-left m-t-none">{{title}}</h3>
		<ul class="bill-container">
			<li v-for="(item, index) in list">
				<p class="bill-index">{{index + 1}}</p>
				<img v-if="item.images || item.subject" :src="getImage(item)" />
				<div class="bill-box">
					<p>{{item.title}}</p>
					<star v-if="item.rating" :star-total="item.rating.average" :need-rate-tag="false" :watched-total="item.collect_count" :need-watched="true"></star>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import star from '@/base/star/star.vue'
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			list: {
				type: Array,
				required: true
			},
		},
		methods: {
			getImage(item) {
				if(item.subject) {
					var url = item.subject.images.small;
				}else if(item.images){
					var url = item.images.small;
				}
				var _u = url.substring(7);
				return 'https://images.weserv.nl/?url=' + _u;
			}
		},
		components: {
			star,
		}
	}
</script>

<style type="text/css" lang="less">
	.text-left {
		text-align: left;
	}
	.m-t-none {
		margin-top: 0px;
	}
	.bill-container {
		list-style-type: none;
		padding-left: 0px;
		display: flex;
		flex-direction: column;
		li {
			display: flex;
			margin-bottom: 0.5rem;
			img {
				width: 15%;
				height: 100%;
				border-radius: 0.5rem;
			}
			p {
				margin-top: 0px;
				margin-bottom: 0px;
			}
			.bill-index {
				font-weight: 900;
				margin-right: 1rem;
			}
			.bill-box {
				flex: 1;
				align-items: flex-start;
				display: flex;
				flex-direction: column;
				margin-left: 1rem;
				border-bottom: 0.1rem solid #ddd;
				justify-content: space-around;
				padding-bottom: 1rem;
			}
		}
	}
</style>