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
		<view class="reply-from">
			<v-article-comment-form v-model="show_comment_form" :article_seq="article.seq" parent_seq="0"></v-article-comment-form>
			<u-button class="reply-btn" @tap="popupCommentFormWin()">参与评论</u-button>
			<u-button class="reply-num">
				<u-icon name="chat" size="60"></u-icon>
				<u-badge class="badge" size="mini" :count="article.comment_num" show-zero :overflow-count="99" :offset="[0,0]"></u-badge>
			</u-button>
			<u-button class="like">
				<u-icon name="heart" size="60" @tap="doLike()"></u-icon>
			</u-button>
			<u-button class="share">
				<u-icon name="share" size="60" @tap="doShare()"></u-icon>
			</u-button>
		</view>
	</view>
</template>

<script>
import { detailApi } from '@/api/article'
import { infoApi } from '@/api/user'
import { 
	indexApi as commentIndexApi,
	createApi as commentCreateApi
} from '@/api/article-comment'

const init_comment_form = {
	article_seq: 0,
	parent_seq: 0,
	content: ''
}
export default {
	data() {
		return {
			user: {},
			request: {},
			article: {},
			hot_comments: [],
			hot_limit: 5,
			my_comments: [],
			show_comment_form: false,
			comment_form: Object.assign({}, init_comment_form),
			rules: {
				content: [{
					required: true,
					type: 'string',
					message: '请输入评论内容'
				}]
			}
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
		},
		popupCommentFormWin() {
			this.show_comment_form = true
			console.log(this.comment_form)
		},
		validate(){
			let verify = false
			this.$refs.commentForm.setRules(this.rules)
			this.$refs.commentForm.validate(valid => {
				verify = valid
			})
			return verify
		},
		doSendComment() {
			if(this.validate() == false){
				return false
			}
			commentCreateApi(this.comment_form).then(res=>{
				console.log(res)
				this.show_comment_form = false
				this.comment_form	= Object.assign({}, init_comment_form)
				this.$u.toast('评论成功')
			})
		},
		doLike() {
			this.$u.toast('喜欢功能正在开发.')
		},
		doShare() {
			this.$u.toast('请使用客户端自带的分享功能.')
		}
	}
};
</script>

<style scoped lang="scss">

.author-text, .createtime-text {
	padding: 0 10rpx;
}

.reply-from {
	position: fixed;
	bottom:0;
	left:0;
	background: #FFFFFF;
	width: 100%;
	display:flex;
	display:-webkit-flex;
	padding: 35rpx;

	.reply-btn {
		background: #f3f4f6;
		color: #606266;
		flex: 1;
	}

	.reply-num {
		margin-left: 10rpx;
		padding: 0 10rpx;
	}

	.reply-num:after {
		border: 0;
	}

	.like {
		padding: 0 10rpx;
	}

	.like:after {
		border: 0;
	}

	.share {
		padding: 0 10rpx;
	}

	.share:after {
		border: 0;
	}
}

</style>
