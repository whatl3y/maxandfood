<template lang="pug">
  a.oauth-login-button.d-flex.flex-row.align-items-center.justify-content-center(
    v-if="map"
    :class="map.mainClass"
    :href="map.link")
    i(:class="map.deviconClass")
    div Authenticate with {{ map.text }}
</template>

<script>
import { vendorClass } from '../helpers/Icons'

export default {
  props: {
    type: { type: String },
    href: { type: String, default: null },
  },

  computed: {
    map() {
      const defMap = this.typeMap[this.type]
      return this.href ? { ...defMap, link: this.href } : defMap
    },
  },

  data() {
    return {
      typeMap: {
        docusign: {
          deviconClass: vendorClass('docusign'),
          link: '/auth/docusign',
          mainClass: 'docusign',
          text: 'Docusign',
        },

        github: {
          deviconClass: vendorClass('github'),
          link: '/auth/github',
          mainClass: 'github',
          text: 'Github',
        },

        google: {
          deviconClass: vendorClass('google'),
          link: '/auth/google',
          mainClass: 'google',
          text: 'Google',
        },

        intuit: {
          deviconClass: vendorClass('intuit'),
          link: '/auth/intuit',
          mainClass: 'intuit',
          text: 'Intuit',
        },

        o365: {
          deviconClass: vendorClass('o365'),
          link: '/auth/o365',
          mainClass: 'o365',
          text: 'O365',
        },

        okta: {
          deviconClass: vendorClass('okta'),
          link: '/auth/okta',
          mainClass: 'okta',
          text: 'okta',
        },
      },
    }
  },
}
</script>

<style lang="scss">
.oauth-login-button {
  padding: 10px;
  margin: 10px 0px;
  border: 1px solid;
  border-radius: 3px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }

  > i {
    margin-right: 5px;
  }

  &.docusign {
    background: rgb(255, 206, 0);
    border-color: rgb(255, 206, 0);
    color: #000000;
  }

  &.github {
    background: #24292e;
    border-color: #ccc;
    color: #fff;
  }

  &.google {
    background: #d14836;
    border-color: #f00;
    color: #fff;
  }

  &.intuit {
    background: #24a205;
    border-color: #070;
    color: #fff;
  }

  &.o365 {
    background: #009ee9;
    border-color: #0069d0;
    color: #fff;
  }

  &.okta {
    background: #007dc1;
    border-color: #007dc1;
    color: #fff;
  }
}
</style>
