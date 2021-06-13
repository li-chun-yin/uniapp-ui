<template>
	<view class="wrap">
    <v-test-ajax-prop v-model="title"></v-test-ajax-prop>
		<view>{{ this.title }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      title: ''
    }
	},
	onLoad(e) {
    setTimeout(()=>{
      this.title = 'on loaded'
    }, 3000)
	},
	onReady(){
	},
	methods:{
	}
};
</script>
