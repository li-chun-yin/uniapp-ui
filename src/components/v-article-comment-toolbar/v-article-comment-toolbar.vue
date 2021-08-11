<template>
  <view class="article-comment-toolbar">
    <v-article-comment-form v-model="show_comment_form" :article_seq="article.seq"></v-article-comment-form>
    <u-button class="reply-btn" @click="popupCommentFormWin()">参与评论</u-button>
    <u-button class="reply-num" @click="gotoCommentLists()" v-if="article.comment_num > 0">
      <u-icon name="chat" size="60"></u-icon>
      <u-badge class="badge" size="mini" :count="article.comment_num" :overflow-count="99" :offset="[0,0]"></u-badge>
    </u-button>
    <u-button class="like" @click="doLike()">
      <u-icon name="heart" size="60"  v-if="!is_like"></u-icon>
      <u-icon name="heart-fill" color="red" size="60" v-if="is_like"></u-icon>
    </u-button>
    <u-button class="share" @click="doShare()">
      <u-icon name="share" size="60"></u-icon>
    </u-button>
	</view>
</template>

<script>
import { likeApi } from '@/api/article'

export default {
	name: 'v-article-comment-toolbar',
  props: {
    article: {
      type: Object,
      default: {
        seq: 0,
        comment_num: 0,
		is_like: false
      }
    }
  },
	data() {
		return {
			show_comment_form: false,
			is_like: false
		}
	},
	onLoad(e) {
		this.is_like = this.article.is_like
	},
	methods:{
		popupCommentFormWin() {
			this.show_comment_form = true
		},
		gotoCommentLists() {
			console.log('gotoCommentLists')
			this.$u.route('/pages/article-comment/index', {
				seq: this.article.seq
			})
		},
		doLike() {
			likeApi(this.article).then(res => {
				this.is_like = !this.is_like;
			})
		},
		doShare() {
			this.$u.toast('请使用客户端自带的分享功能.')
		}
	}
};
</script>

<style scoped lang="scss">

.article-comment-toolbar {
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