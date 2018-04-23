<template>
	<div class="star" :class="starType">
		<span v-for="item in starClasses" class="star-item" :class="item"></span>
		<span>{{starTotal}}分</span>
	</div>
</template>

<script>
	var LENGTH = 5;
	var CLS_ON = 'on';
	var CLS_HALF = 'half';
	var CLS_OFF = 'off';
	export default {
		props: {
			starTotal: {
				type: Number,
				default: 0
			},
			size: {
				type: Number,
				default: 24
			},
			needStar: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			normalizaScore() {
				var star = this.starTotal.toString().length;
				if(star.length < 0){
					return '${star}.0'
				}else{
					return star
				}
			},
			starClasses() {
				var result  = [];
				var score = Math.floor(this.starTotal) / 2;
				var hasHalf = score % 1 !== 0;
				var integer = Math.floor(score);
				for(var i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasHalf){
					result.push(CLS_HALF);
				}
				while(result.length < LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style type="text/css">
	.star {
		text-align: left;
	}
	.star-24 .star-item {
		width: 70px;
		height: 70px;
		display: inline-block;
		margin-right: 20px;
	}
	.star-24 .half {
		background: url('star24_half@2x.png') no-repeat center;
	}
	.star-24 .on {
		background: url('star24_on@2x.png') no-repeat center;
	}
	.star-24 .off {
		background: url('star24_off@2x.png') no-repeat center;
	}
	.star-36 .star-item {
		width: 70px;
		height: 70px;
		display: inline-block;
	}
	.star-36 .half {
		background: url('star36_on@2x.png') no-repeat center;
	}
	.star-36 .on {
		background: url('star36_on@2x.png') no-repeat center;
	}
	.star-36 .off {
		background: url('star36_off@2x.png') no-repeat center;
	}
</style>