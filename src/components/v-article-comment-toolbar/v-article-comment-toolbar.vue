<template>
  <view class="article-comment-toolbar">
		<view class="reply-btn">
			<v-article-comment-form v-model="show_comment_form" :article_seq="article.seq"></v-article-comment-form>
			<button class="button" @click="popupCommentFormWin()">参与评论</button>
		</view>
    <button class="reply-num" plain @click="gotoCommentLists()" v-if="article.comment_num > 0">
      <u-icon name="chat" :size="80"></u-icon>
      <u-badge class="badge" size="mini" :count="article.comment_num" :overflow-count="99" :offset="[0, 10]"></u-badge>
    </button>
    <button class="like" plain @click="doLike()">
      <u-icon name="heart" :size="80"  v-if="!is_like"></u-icon>
      <u-icon name="heart-fill" color="red" :size="80" v-if="is_like"></u-icon>
    </button>
		<button open-type="share" plain class="share" @click="doShare()">
			<u-icon name="share" :size="80"></u-icon>
		</button>
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
			// #ifdef H5
			this.$u.toast('请使用客户端自带的分享功能.')
			// #endif
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
		flex: 1;

		.button {
			color: #999999;
		}

	}

	.reply-num {
		padding:0;
		margin-left: 15rpx;
		padding-right: 15rpx;
		border: 0;
	}

	.like {
		padding:0;
		padding-right: 15rpx;
		border: 0;
	}

	.share {
		padding:0;
		padding-right: 15rpx;
		border: 0;
	}
}

</style>