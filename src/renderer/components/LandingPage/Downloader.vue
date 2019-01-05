<template>
    <div>
        <h1 class="title">Downloader</h1>
        <b-form>
            <b-form-group description="Paste link here">
                <b-form-input v-model="form.url">
                </b-form-input>
            </b-form-group>
            <button type="button" class="btn btn-primary" data-style="expand-right" id="js-btn-get-info"
                    v-on:click="getVideoInfo">
                <span class="ladda-label">Get Video Info</span>
            </button>
        </b-form>
    </div>
</template>

<script>
  export default {
    name: 'Downloader',
    data () {
      return {
        form: {
          url: ''
        }
      }
    },
    methods: {
      getVideoInfo: function () {
        const validateUrl = url => /^(?:https?:\/\/)?(w{3})?\.?youtube\.com/.test(url)
        if (!validateUrl(this.form.url)) {
          this.$Swal({
            title: 'Please enter a valid Youtube URL',
            type: 'error',
            position: 'top-end'
          })
        } else {
          const youtubeUrl = this.form.url
          const videoId = youtubeUrl.split('?')[1].match(/v=([^&]+)/)[1]
          this.$http({
            method: 'POST',
            url: 'http://localhost:12345/api/get-video-info',
            data: {
              video_id: videoId
            }
          }).then(res => {
            let data = res.data.data
            let videos = data.videos
            console.log(videos)
          }).catch(e => {
            this.$Swal({
              title: e.message,
              type: 'error'
            })
          })
          console.log(videoId)
        }
      }
    }
  }
</script>

<style scoped>

</style>
