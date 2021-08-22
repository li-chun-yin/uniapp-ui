<template>
  <view class="wrap">
		<view class="comment">评论</view>
		<v-article-comment-lists :comments="[comment]"></v-article-comment-lists>

		<view class="comment">回复</view>
		<v-article-comment-lists :comments="replys"></v-article-comment-lists>
  </view>
</template>

<script>
import {
	indexApi as commentIndexApi,
	detailApi as commentDetailApi
} from '@/api/article-comment'

export default {
	data() {
		return {
      request: {
				seq: 0
			},
			comment: {},
			replys: [],
			reply_page: 1,
			reply_limit: 20,
			reply_next: false,
			popup_form: {
				show: false,
				article_seq: 0,
				parent_seq: 0
			}
		}
	},
	onLoad(e) {
		this.request = e
		this.loadData()
	},
	methods:{
		loadData(){
      commentDetailApi({
				seq: this.request.seq
			}).then(res=>{
				this.comment = res.data
	      this.loadReplys()
			})
		},
    onReachBottom(e){
      if(this.reply_next){
        this.reply_page++
        this.loadReplys()
      }
    },
		loadReplys() {
      this.reply_next = false
      commentIndexApi({
				root_seq: this.comment.seq,
				request_type: 'REPLY',
				order_seq: 'ASC',
				page: this.reply_page,
				limit: this.reply_limit // 需要所有自己发布的评论
			}).then(res => {
				this.replys	= this.replys.concat(res.data.items)
        if(res.data.items.length == this.reply_limit){
          this.reply_next = true
        }
			})
		},
		popupFormFormWin(comment) {
			this.popup_form.article_seq = comment.article_seq
			this.popup_form.parent_seq = comment.seq
			this.popup_form.show = true
		}
	}
};
</script>

<style scoped lang="scss">

</style>