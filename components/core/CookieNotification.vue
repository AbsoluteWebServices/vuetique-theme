<template>
  <transition name="fade" appear>
    <div class="cookie fixed w-100 bg-primary cl-tertiary" v-if="isOpen">
      <div class="container">
        <div class="p-2">
          <b>
            {{ message }}
          </b>
          <router-link :to="localizedRoute('detailsLink')" :title="detailsLinkText" class="ml-1 align-middle">
            {{ detailsLinkText }}
            <i
              class="material-icons icon cursor-pointer align-middle"
              @click="accept"
              data-testid="moreInfoCookieButton"
            >
              chevron_right
            </i>
          </router-link>
        </div>

        <i
          class="material-icons icon p15 cursor-pointer close-cookie-button"
          @click="accept"
          data-testid="closeCookieButton"
        >
          close
        </i>
      </div>
    </div>
  </transition>
</template>

<script>
import i18n from '@vue-storefront/i18n'
export default {
  props: {
    detailsLinkText: {
      type: String,
      default: i18n.t('See details')
    },
    detailsLink: {
      type: String,
      default: '/privacy'
    },
    message: {
      type: String,
      default: i18n.t('We use cookies to give you the best shopping experience.')
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    accept () {
      this.setVisited()
      this.isOpen = false
    },
    setVisited () {
      this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: true})
    }
  },
  created () {
    this.$store.dispatch('claims/check', {claimCode: 'cookiesAccepted'}).then((cookieClaim) => {
      if (!cookieClaim) {
        this.isOpen = true
        this.$store.dispatch('claims/set', {claimCode: 'cookiesAccepted', value: false})
      } else {
        this.isOpen = !cookieClaim.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon: color(black);
$bg-icon: color(suva-gray);

.cookie {
  z-index: 2;
  bottom: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  font-weight: bold;
  line-height: 35px;

  a,
  a:hover {
    color: #fff;
    font-weight: bold;
  }

  .icon:hover {
    color: #fff;
    background: transparent;
  }

  .close-cookie-button {
    position: absolute;
    right: 20px;
    top: 15px;
  }
}

.icon:hover {
  color: $color-icon;
  background-color: $bg-icon;
}
</style>
