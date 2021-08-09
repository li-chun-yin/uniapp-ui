<template>
  <view class="wrap">
		<view class="comment" v-if="my_comments.length">我的评论</view>
		<v-article-comment-lists :comments="my_comments"></v-article-comment-lists>
		
		<view class="comment">热门评论</view>
		<v-article-comment-lists :comments="hot_comments"></v-article-comment-lists>

		<view class="comment">最近评论</view>
		<v-article-comment-lists :comments="latest_comments"></v-article-comment-lists>

		<view class="popup-from">
			<v-article-comment-form v-model="show_comment_form" :article_seq="article_seq"></v-article-comment-form>
			<u-button class="button" type="info" @click="popupCommentFormWin()">来来来，说两句吧</u-button>
		</view>
  </view>
</template>

<script>
import { indexApi as commentIndexApi } from '@/api/article-comment'

export default {
	data() {
		return {
      request: {},
			article_seq: 0,
			hot_comments: [],
			hot_limit: 5,
			latest_comments: [],
			latest_page: 1,
			latest_limit: 20,
      latest_next: false,
			my_comments: [],
			show_comment_form: false
		}
	},
	onLoad(e) {
		this.request = e
    this.article_seq = this.request.seq
		this.loadData()
	},
	methods:{
		loadData(){
      this.loadMyComments()
      this.loadHotComments()
      this.loadLatestComments()
		},
    onReachBottom(e){
      if(this.latest_next){
        this.latest_page++
        this.loadLatestComments()
      }
    },
    loadMyComments() {
			commentIndexApi({
				article_seq: this.article_seq,
				request_type: 'MY_COMMENT',
				order_seq: 'ASC',
				page: 1,
				limit: 9999999999 // 需要所有自己发布的评论
			}).then(res => {
				this.my_comments	= res.data.items
			})
    },
    loadHotComments() {
			commentIndexApi({
				article_seq: this.article_seq,
				order_hot: 'DESC',
				page: 1,
				limit: this.hot_limit
			}).then(res => {
				this.hot_comments	= res.data.items
			})
    },
		loadLatestComments() {
      this.latest_next = false
      commentIndexApi({
				article_seq: this.article_seq,
				order_seq: 'DESC',
				page: this.latest_page,
				limit: this.latest_limit // 需要所有自己发布的评论
			}).then(res => {
				this.latest_comments	= this.latest_comments.concat(res.data.items)
        if(res.data.items.length == this.latest_limit){
          this.latest_next = true
        }
			})
		},
		popupCommentFormWin() {
			this.show_comment_form = true
		}
	}
};
</script>

<style scoped lang="scss">

.popup-from {
	position: fixed;
	bottom:10rpx;
	left:0;
	background: #FFFFFF;
	width: 100%;
	display:flex;
	display:-webkit-flex;
	padding: 15rpx;

	.button {
		flex: 1;
	}
}

</style>