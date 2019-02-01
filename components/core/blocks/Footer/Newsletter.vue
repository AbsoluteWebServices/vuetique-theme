<template>
  <div class="newsletter">
    <h3 class="mb-4 text-center lg:text-left">
      {{ $t('Subscribe to the newsletter and receive a coupon for 10% off') }}
    </h3>
    <div class="newsletter-button">
      <button-full
        class="btn-primary newsletter-btn w-full"
        @click.native="$bus.$emit('modal-show', 'modal-newsletter')"
        data-testid="openNewsletterButton"
      >
        {{ $t('Subscribe') }}
      </button-full>
    </div>
  </div>
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull'
import { mapState } from 'vuex'

export default {
  name: 'Newsletter',
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup,
      isSubscribed: state => state.mailchimp.isSubscribed
    })
  },
  methods: {
    newsletterClick () {
      this.$store.commit('ui/setNewsletterPopup', !this.isOpen)
    }
  },
  components: {
    ButtonFull
  }
}
</script>

<style scoped>

  .newsletter-btn {
    padding-left: 52px;
    padding-right: 52px;
  }

  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
