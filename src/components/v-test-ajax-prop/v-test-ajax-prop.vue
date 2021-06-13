<template>
	<view class='v-wrapper'>
    <input v-model="content" type="text" placeholder="请输入" />
	</view>
</template>

<script>
	export default {
		name: 'v-test-ajax-prop',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				content: ''
			}
		},
		watch: {
			title(nVal, oVal) {
				this.content = nVal;
			},
			content() {
				console.log('watch content', this.content)
				this.$emit('input', this.content)
			}
		}
	}
</script>
