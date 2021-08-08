<template>
	<view class="wrap">
		<u-navbar :title="article.title"></u-navbar>
		<view class="content">
			<view class="uni-title uni-h1 u-line-1 u-text-center"><text>{{article.title}}</text></view>
			<u-gap height="10" bg-color="#DDD" margin-top="10" margin-bottom="10"></u-gap>
			<u-parse :html="article.content"></u-parse>
			<view class="u-line-1 u-light-color">
				<text class="author-text" >作者:{{article.author}}</text>
				<text class="createtime-text">日期:{{article.createtime|date('yyyy-mm-dd hh:ss')}}</text>
			</view>
		</view>
		
		<view class="comment" v-if="my_comments.length">我的评论</view>
		<v-article-comment-lists :comments="my_comments" @on-reply="popupCommentFormWin"></v-article-comment-lists>
		
		<view class="comment">热门评论</view>
		<v-article-comment-lists :comments="hot_comments" @on-reply="popupCommentFormWin"></v-article-comment-lists>

		<u-line margin="60rpx 0"/><!-- The bottom of the page left empty -->
		<v-article-comment-toolbar :article="article"></v-article-comment-toolbar>
	</view>
</template>

<script>
import { detailApi } from '@/api/article'
import { infoApi } from '@/api/user'
import { indexApi as commentIndexApi } from '@/api/article-comment'

export default {
	data() {
		return {
			user: {},
			request: {},
			article: {},
			hot_comments: [],
			hot_limit: 5,
			my_comments: []
		}
	},
	onShow() {
		this.loadUserInfo()
	},
	onLoad(e) {
		this.request = e
		this.loadData()
	},
	methods:{
		loadData(){
			detailApi(this.request).then(res => {
				this.article = res.data
				this.loadComments()
			})
		},
		loadUserInfo() {
			infoApi().then(res => {
				console.log('USER-CENTER LoadData:', res)
				this.user = res.data
			})
		},
		loadComments() {
			commentIndexApi({
				article_seq: this.article.seq,
				page: 1,
				limit: this.hot_limit
			}).then(res => {
				this.hot_comments	= res.data.items
			})
			commentIndexApi({
				article_seq: this.article.seq,
				request_type: 'MY_COMMENT',
				page: 1,
				limit: 9999999999 // 需要所有自己发布的评论
			}).then(res => {
				this.my_comments	= res.data.items
			})
		}		
	}
};
</script>

<style scoped lang="scss">

.author-text, .createtime-text {
	padding: 0 10rpx;
}

</style>
