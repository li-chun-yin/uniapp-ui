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
		<view class="comment" v-for="(comment, index) in my_comments" :key="'my_comments_' +index">
			<view class="left"><image :src="comment.user_avatar" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ comment.user_nick }}</view>
					<view class="like highlight">
						<view class="num">{{ comment.like_num }}</view>
						<u-icon name="thumb-up" :size="30"></u-icon>
					</view>
				</view>
				<view class="content">
					{{ comment.content }}
					<text class="expand" @tap="doExpandContent(comment)" v-if="comment.need_expand == true">+展开</text>
				</view>
				<view class="bottom">
					{{ comment.createtime|date('yyyy-mm-dd hh:ss') }}
					<view class="reply" @tap="popupCommentFormWin(comment.seq)">回复</view>
				</view>
				<view class="reply-box">
					<view class="item" v-for="(reply, key) in comment.replys" :key="'my_comments_replys_' + key">
						<view class="username">{{ comment.user_nick }}</view>
						<view class="text"><text class="to-user" v-if="reply.parent_seq > 0">@{{reply.to_user}}：</text>{{ reply.content }}</view>
						<view class="bottom">
							{{ comment.createtime|date('yyyy-mm-dd hh:ss') }}
							<view class="reply" @tap="popupCommentFormWin(reply.seq)">回复</view>
						</view>
					</view>
					<view class="all-reply" @tap="'toAllReply'(comment.seq)" v-if="comment.reply_num > comment.replys.length">
						共{{ comment.reply_num }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="comment">热门评论</view>
		<view class="comment" v-for="(comment, index) in hot_comments" :key="'hot_comments_' + index">
			<view class="left"><image :src="comment.user_avatar" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ comment.user_nick }}</view>
					<view class="like highlight">
						<view class="num">{{ comment.like_num }}</view>
						<u-icon name="thumb-up" :size="30"></u-icon>
					</view>
				</view>
				<view class="content">
					{{ comment.content }}
					<text class="expand" @tap="doExpandContent(comment)" v-if="comment.need_expand == true">+展开</text>
				</view>
				<view class="bottom">
					{{ comment.createtime|date('yyyy-mm-dd hh:ss') }}
					<view class="reply" @tap="popupCommentFormWin(comment.seq)">回复</view>
				</view>
				<view class="reply-box">
					<view class="item" v-for="(reply, key) in comment.replys" :key="'hot_comments_reply_' + key">
						<view class="username">{{ comment.user_nick }}</view>
						<view class="text"><text class="to-user" v-if="reply.parent_seq > 0">@{{reply.to_user}}：</text>{{ reply.content }}</view>
						<view class="bottom">
							{{ comment.createtime|date('yyyy-mm-dd hh:ss') }}
							<view class="reply" @tap="popupCommentFormWin(reply.seq)">回复</view>
						</view>
					</view>
					<view class="all-reply" @tap="'toAllReply'(comment.seq)" v-if="comment.reply_num > comment.replys.length">
						共{{ comment.reply_num }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-line margin="60rpx 0"/><!-- The bottom of the page left empty -->
		<view class="reply-from">
			<u-popup v-model="show_comment_form" mode="bottom" safe-area-inset-bottom>
				<view class="wrap">
					<u-form ref="commentForm" :model="comment_form">
						<u-form-item class="reply-input" prop="content">
							<u-input type="textarea" v-model="comment_form.content" maxlength="65535" border />
							<view slot="right">
								<u-button type="primary" plain @tap="doSendComment()" >发送</u-button>
							</view>
						</u-form-item>
					</u-form>
				</view>
			</u-popup>
			<u-button class="reply-btn" @tap="popupCommentFormWin(0)">参与评论</u-button>
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
	createApi as commentCreateApi,
	detailApi as commentDetailApi
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
		popupCommentFormWin(parent_seq) {
			this.show_comment_form = true
			this.comment_form.article_seq = this.article.seq
			this.comment_form.parent_seq = parent_seq
		},
		validate(){
			let verify = false
			this.$refs.commentForm.setRules(this.rules)
			this.$refs.commentForm.validate(valid => {
				verify = valid
			})
			return verify
		},
		doExpandContent(comment) {
			commentDetailApi({
				seq: comment.seq
			}).then(res=>{
				for(let i in res.data ){
					comment[i] = res.data[i]
				}
			})
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
.author-text, createtime-text {
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

.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
			.expand {
				font-size: 22rpx;
				color: #5677fc;
			}
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}

				.text .to-user {
					color: #5677fc;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
