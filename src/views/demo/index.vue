<template>
	<div>
		<input v-demo="color" />
		<button @click="change()">change</button>
	</div>
</template>

<script type="text/javascript">
	export default  {
		data() {
			return {
				color: {
					text: '#ccc'
				}
			}
		},
		methods: {
			change() {
				this.color.text = '#42bd56'
			}
		},
		directives: {
			demo : {
				inserted: function(el){
					console.log('inserted');
				},
				bind: function(el, binding, nodename){
					console.log('el:' + el);
					console.log('binding:' + binding.value.text);
					console.log('nodename:' + nodename);
					el.style = 'color: ' + binding.value.text
				},
				update: function(el, binding, nodename){ //自定义属性用在对象上，对象内部属性变化的时候触发update
					console.log('update');
					console.log('update color: ' + binding.value.text);
					el.style = 'color: ' + binding.value.text
				},
				componentUpdated: function(){
					console.log('componentUpdated');
				},
				unbind: function(el, binding, nodename){
					console.log('unbind');
				}
			}
		}
	}
</script>