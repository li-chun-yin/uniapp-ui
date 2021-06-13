<template>
	<view class="wrap">
		<u-navbar :title="article.title">
			<view slot="right">
				<u-button type="primary" size="medium" :plain="true" @tap="gotoEdit">编辑</u-button>
			</view>
		</u-navbar>
		<view class="content">
			<view class="uni-title uni-h1 u-line-1 u-text-center"><text>{{article.title}}</text></view>
			<u-gap height="10" bg-color="#DDD" margin-top="10" margin-bottom="10"></u-gap>
			<u-parse :html="article.content"></u-parse>
			<view class="u-line-1 u-light-color">
				<text class="author-text" >作者:{{article.author}}</text>
				<text class="createtime-text">日期:{{article.createtime|date('yyyy-mm-dd hh:ss')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { detailApi } from '@/api/article'
export default {
	data() {
		return {
			request: {},
			article: {}
		}
	},
	onLoad(e) {
		this.request = e
		this.loadData()
	},
	methods:{
		loadData(){
			detailApi(this.request).then(res => {
				this.article = res.data
			})
		},
		gotoEdit(){
			this.$u.route('/pages/user/article/form', {
				seq: this.article.seq
			})
		}
	}
};
</script>

<style scoped lang="scss">
	.author-text, createtime-text {
		padding: 0 10rpx;
	}
</style>
