<template>
  <view>  
    <view class="comment" v-for="(comment, index) in comments" :key="'comments' + index">
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
  </view>
</template>

<script>
import { detailApi as commentDetailApi } from '@/api/article-comment'

export default {
	name: 'v-article-comment-lists',
	props: {
		comments: {
				type: Array,
				default: []
		}
	},
	methods:{
		popupCommentFormWin(parent_seq) {
			this.$emit('on-reply', parent_seq)
		},
		toAllReply() {
			console.log(4545)
		},
		doExpandContent(comment) {
			commentDetailApi({
				seq: comment.seq
			}).then(res=>{
				for(let i in res.data ){
					comment[i] = res.data[i]
				}
			})
		}
	}
};
</script>

<style scoped lang="scss">

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