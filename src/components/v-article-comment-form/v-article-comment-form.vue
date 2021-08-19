<template>
  <u-popup v-model="show" mode="bottom" @close="$emit('input', show)" safe-area-inset-bottom>
    <view class="wrap">
      <u-form ref="commentForm" :model="comment_form">
        <u-form-item class="reply-input" prop="content">
          <u-input type="textarea" v-model="comment_form.content" maxlength="65535" border />
          <view slot="right">
            <u-button type="primary" plain @click="doSendComment()" >发送</u-button>
          </view>
        </u-form-item>
      </u-form>
    </view>
  </u-popup>
</template>

<script>
import { createApi } from '@/api/article-comment'

const init_comment_form = {
	article_seq: 0,
	parent_seq: 0,
	content: ''
}
export default {
  name: 'v-article-comment-form',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    article_seq: {
      default: "0"
    },
    parent_seq: {
      default: "0"
    }
  },
	watch: {
		value(nVal, oVal) {
			console.log('watch value', nVal, oVal)
			this.show = nVal
		}
	},
	data() {
		return {
			show: false,
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
	methods:{
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
      this.comment_form.article_seq = this.article_seq
      this.comment_form.parent_seq = this.parent_seq
			createApi(this.comment_form).then(res=>{
				console.log(res)
				this.show = false
				this.$emit('send-comment', this.comment_form)
				this.comment_form	= Object.assign({}, init_comment_form)
				this.$u.toast('评论成功')
			})
		}
	}
};
</script>

<style scoped lang="scss">

</style>