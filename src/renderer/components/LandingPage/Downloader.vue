<template>
    <div>
        <h1 class="title">Downloader</h1>
        <b-form>
            <b-form-group description="Paste link here">
                <b-form-input v-model="form.url">
                </b-form-input>
            </b-form-group>
            <button type="button" class="btn btn-primary" data-style="expand-right" id="js-btn-get-info"
                    v-on:click="getInfo">
                <span class="ladda-label">Get Info</span>
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
      getInfo: function () {
        console.log(this.form.url)
      }
    }
  }
</script>

<style scoped>

</style>
