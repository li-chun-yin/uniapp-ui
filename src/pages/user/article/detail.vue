<template>
	<view class="wrap">
		<u-navbar>
      <view slot="right">
				<u-button type="primary" plain size="mini" shape="circle" @click="gotoEdit" :custom-style="{marginRight: '30rpx'}">
					<u-icon name="edit-pen"></u-icon>编辑
				</u-button>
			</view>
    </u-navbar>
		<v-article-detail :request="request"></v-article-detail>
	</view>
</template>

<script>
export default {
	data() {
		return {
			request: {
				seq: 0
			}
		}
	},
	onLoad(e) {
		this.request = e
	},
	methods:{
		gotoEdit(){
			this.$u.route('/pages/user/article/form', {
				seq: this.request.seq
			})
		}
	}
};
</script>

<style scoped lang="scss">

</style>
