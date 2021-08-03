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
		<view class="reply">
			<u-form :model="form" ref="uForm">
				<u-form-item>
					<u-input type="text" placeholder="请输入验证码" />
					<view slot="right">
						<u-button>发送</u-button>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="comment">热门评论</view>
		<view class="comment" v-for="(comment, index) in comments" :key="comment.seq">
			<view class="left"><image :src="comment.user_avatar" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ comment.user_nick }}</view>
					<view class="like highlight">
						<view class="num">{{ comment.like_num }}</view>
						<u-icon name="thumb-up" :size="30" color="#9a9a9a"></u-icon>
					</view>
				</view>
				<view class="content">{{ comment.content }}</view>
				<view class="reply-box">
					<view class="item" v-for="(reply, key) in comment.replys" :key="reply.seq">
						<view class="username">{{ comment.user_nick }}</view>
						<view class="text">{{ reply.content }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="comment.reply_num > comment.replys.length">
						共{{ comment.reply_num }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ comment.createtime|date('yyyy-mm-dd hh:ss') }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { detailApi } from '@/api/article'
import { indexApi as commentIndexApi } from '@/api/article-comment'

export default {
	data() {
		return {
			request: {},
			article: {},
			comments: [],
			comment_num: 5
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
				this.loadComments()
			})
		},
		loadComments(){
			commentIndexApi({
				article_seq: this.article.seq,
				page: 1,
				limit: this.comment_num
			}).then(res => {
				this.comments	= res.data.items
			})
		}
	}
};
</script>

<style scoped lang="scss">
.author-text, createtime-text {
	padding: 0 10rpx;
}

.reply {
	position: fixed;
	bottom:0;
	left:0;
	background: #FFFFFF;
	width: 100%;
	border: 1px #ccc solid;
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
