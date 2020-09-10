<template lang="pug">
  dropzone(
    :id="`file-uploader-${_uid}`"
    :ref="`file-uploader-${_uid}`"
    :options="finalOptions"
    @vdropzone-processing="fileProcessing"
    @vdropzone-success="successAddedFile")
</template>

<script>
export default {
  props: {
    url: { type: String, default: null },
    options: { type: Object, default: null },
    size: { type: String, default: null },
  },

  computed: {
    finalOptions() {
      return {
        url: this.url || '/upload/image',
        maxFilesize: 20480, // 20GB
        parallelUploads: 4,
        thumbnailHeight: 80,
        thumbnailWidth: 80,
        timeout: 600000, // 600s, 10min
        ...this.options,
      }
    },
  },

  methods: {
    fileProcessing(...args) {
      this.$emit('processing', args)
    },

    // errorAddingFile(...args) {
    //   this.$emit('error', args)
    // },

    successAddedFile(...args) {
      this.$emit('added', args)
      this.$refs[`file-uploader-${this._uid}`].dropzone.removeAllFiles()
    },
  },
}
</script>

<style lang="scss">
.dropzone {
  border-style: dashed !important;

  &.small-dropzone {
    font-size: 0.8em;
    min-height: 55px;
    padding: 6px;

    .dz-message {
      margin: 0.8em 0;
    }

    .dz-preview {
      max-height: 55px !important;
      min-height: 55px !important;
      max-width: 55px !important;
      margin: 4px;

      .dz-details {
        font-size: 0.8em;
        line-height: inherit;
        max-height: 55px;
        padding: 0.5em;

        .dz-size {
          font-size: 8px;
        }
      }

      .dz-error-mark,
      .dz-success-mark {
        top: 0%;
      }

      .dz-progress {
        width: 40px;
        left: 85%;
        top: 50%;
      }

      .dz-image {
        max-height: 55px !important;
        max-width: 55px !important;
      }
    }
  }
}
</style>
