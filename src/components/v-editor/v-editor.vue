/**
 * @example <v-editor placeholder="请输入内容" v-model="form.content"></v-editor>
 */
<template>
	<view class="v-container">
		<view class="v-page-body">
			<view class='v-wrapper'>
				<view class='v-toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
					<view :class="formats.bold ? 'ql-active' : ''" class="v-iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="v-iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="v-iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="v-iconfont icon-zitishanchuxian" data-name="strike"></view>
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="v-iconfont icon-zuoduiqi" data-name="align"
					 data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="v-iconfont icon-juzhongduiqi" data-name="align"
					 data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="v-iconfont icon-youduiqi" data-name="align"
					 data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="v-iconfont icon-zuoyouduiqi" data-name="align"
					 data-value="justify"></view>
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="v-iconfont icon-line-height" data-name="lineHeight"
					 data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="v-iconfont icon-Character-Spacing" data-name="letterSpacing"
					 data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="v-iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
					 data-value="20px"></view>
					<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="v-iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom"
					 data-value="20px"></view>
					<view class="v-iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="v-iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="v-iconfont icon-fontsize" data-name="fontSize"
					 data-value="24px"></view>

					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="v-iconfont icon-text_color" data-name="color"
					 data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="v-iconfont icon-fontbgcolor"
					 data-name="backgroundColor" data-value="#00ff00"></view>

					<view class="v-iconfont icon-date" @tap="insertDate"></view>
					<view class="v-iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="v-iconfont icon-youxupailie" data-name="list"
					data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="v-iconfont icon-wuxupailie" data-name="list"
					 data-value="bullet"></view>
					<view class="v-iconfont icon-undo" @tap="undo"></view>
					<view class="v-iconfont icon-redo" @tap="redo"></view>

					<view class="v-iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="v-iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="v-iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="v-iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="v-iconfont icon-format-header-1" data-name="header"
					 :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="v-iconfont icon-zitixiabiao" data-name="script"
					 data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="v-iconfont icon-zitishangbiao" data-name="script"
					 data-value="super"></view>
					<view class="v-iconfont icon-shanchu" @tap="clear"></view>
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="v-iconfont icon-direction-rtl" data-name="direction"
					 data-value="rtl"></view>

				</view>

				<view class="v-editor-wrapper">
					<editor  class="v-ql-container"
						:id="name"
						:placeholder="placeholder"
						:show-img-size="show_img_size"
						:show-img-toolbar="show_img_toolbar"
						:show-img-resize="show_img_resize"
						:read-only="read_only"
						@statuschange="onStatusChange"
						@ready="onEditorReady"
						@focus="onFocus"
						@blur="onBlur"
						@input="onInput"
					></editor>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'v-editor',
		props: {
			value: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: 'v' + Math.random().toString(36).substr(2)
			},
			placeholder: {
        type: String,
        default: ''
      },
			read_only: {
        type: Boolean,
        default: false
      },
			show_img_size: {
        type: Boolean,
        default: true
      },
			show_img_toolbar: {
        type: Boolean,
        default: true
      },
			show_img_resize: {
        type: Boolean,
        default: true
      },
      upload_url: {
        type: String,
        default: '/'
      },
	  upload_header: {
        type: Object,
        default: undefined
      }
		},
		data() {
			return {
				formats: {},
        content: '',
        focus_count: 0
			}
		},
    watch: {
			value(nVal, oVal) {
        console.log('watch value', nVal, oVal)
        if(this.content == '' && this.focus_count == 0){
          this.content = nVal
          this.editorContentReady()
        }
			}
		},
		methods: {
      editorContentReady(){
        uni.createSelectorQuery().select('#' + this.name).context((res) => {
          console.log(this.content)
          this.editorCtx = res.context
          this.editorCtx.setContents({
            html: this.content
          })
        }).exec()
        this.$emit("ready")
      },
			onEditorReady() {
        this.editorContentReady()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
				this.$emit("blur", e)
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
            console.log('insert Image:', res)
            uni.uploadFile({
              url: this.upload_url,
			        header: this.upload_header,
              file: res.tempFiles[0],
              filePath: res.tempFilePaths[0],
              name: "file",
              success: (e) => {
                const res = JSON.parse(e.data)
                console.log('parse res', res)
                this.editorCtx.insertImage({
    							src: res.data.url,
    							alt: '图像',
    							success: function() {
    								console.log('insert image success')
    							}
    						})
              }
            })
					}
				})
			},
			onFocus(e){
        this.focus_count++
				this.$emit("focus", e)
			},
			onBlur(e){
				this.$emit("blur", e)
			},
			onInput(e){
				this.$emit('input', e.detail.html)
			}
		}
	}
</script>

<style>
	@import "./v-editor-icon.css";

	.v-page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}

	.v-wrapper {
		height: 100%;
	}

	.v-editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.v-iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.v-toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}


	.v-ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.v-ql-active {
		color: #06c;
	}
</style>
