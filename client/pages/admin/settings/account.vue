<template lang="pug">
  v-card.mx-auto(max-width="600")
    v-card-text
      v-text-field(
        v-model='accountName'
        light
        prepend-icon='mdi-account-box'
        label='Account Name')

      v-text-field(
        v-model='accountDomain'
        light
        prepend-icon='mdi-dns'
        label='Account Domain'
        suffix='.maxandfood.com')

      div.form-group.mt-5
        label Account Images
        div.mb-3
          small
            | These images will show up in the corners of the screen
            | on any page for users who access your blog through your
            | unique URL.
        file-uploader(
          :options="{ acceptedFiles: 'image/*' }"
          @added="addImage")
        v-row(dense justify="center")
          v-col(cols="6" md="3" v-for="(img, ind) in accountImages" :key="`img-${ind}`")
            v-card(:elevation="1")
              v-img(:src="`${s3BucketUrl}/${img.imageName}`")
              v-card-actions.flex-column
                v-switch.mt-0(
                  :input-value="img.isEnabled"
                  @change="changeImg(ind, 'isEnabled', ...arguments)"
                  label="Enabled?")
                v-select.pt-0(
                  dense
                  label="Screen Position"
                  :value="img.position"
                  @change="changeImg(ind, 'position', ...arguments)"
                  :items="imagePositions")
                //- v-btn(color="red" fab dark small @click="removeImage(ind)")
                //-   v-icon mdi-close

      v-btn.mt-5(
        large
        :block="true"
        color="success"
        @click="saveAccount") Save
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'

export default Vue.extend({
  async middleware({ store }: Context) {
    await store.dispatch('getAccount')
  },

  data() {
    return {
      imagePositions: ['topleft', 'topright', 'bottomleft', 'bottomright'],
    }
  },

  computed: {
    ...mapState(['account', 's3BucketUrl']),

    accountImages: {
      get() {
        return this.$store.state.accountImages
      },

      set(allImgs) {
        this.$store.commit('SET_ACCOUNT_IMAGES', allImgs)
      },
    },

    accountDomain: {
      get() {
        return this.$store.state.account.domainName
      },

      set(newVal: string) {
        this.$store.commit('SET_ACCOUNT_FIELD', {
          key: 'domainName',
          value: newVal,
        })
      },
    },

    accountName: {
      get() {
        return this.$store.state.account.name
      },

      set(newVal: string) {
        this.$store.commit('SET_ACCOUNT_FIELD', { key: 'name', value: newVal })
      },
    },
  },

  methods: {
    async saveAccount() {
      try {
        // console.log('ACCOUNT', this.account, this.accountImages)
        await this.$axios.$post('/api/1.0/accounts/save', {
          account: this.account,
          images: this.accountImages,
        })
        this.$store.commit(
          'SET_SNACKBAR_TEXT',
          `Successfully saved account info!`
        )
      } catch (err) {
        const baseErr =
          err.response &&
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.message
        this.$store.commit('SET_SNACKBAR_TEXT', baseErr)
      }
    },

    changeImg(index, key, value) {
      const updatedImg = { ...this.accountImages[index], [key]: value }
      this.accountImages[index] = updatedImg
      this.accountImages = [...this.accountImages]
    },

    addImage([_, { imageNameOptimized }]) {
      this.accountImages = this.accountImages.concat([
        {
          imageName: imageNameOptimized,
          isEnabled: true,
          position: 'bottomright',
        },
      ])
    },
  },
})
</script>
