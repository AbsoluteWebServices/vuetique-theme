<template>
  <div class="newsletter py25 px15 bg-cl-secondary">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm start-md">
        <div class="col-md-9 col-xs-12">
          <h4 class="h3 cl-accent leading-normal weight-400 m0">
            {{ $t('Subscribe to the newsletter and receive a coupon for 10% off') }}
          </h4>
        </div>
        <div class="newsletter-button col-md-3 col-xs-12 end-md">
          <button
            @click.native="$bus.$emit('modal-show', 'modal-newsletter')"
            class="btn btn-primary newsletter-btn uppercase mt-3"
            data-testid="openNewsletterButton"
          >
            {{ $t('Subscribe') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonOutline from 'theme/components/theme/ButtonOutline'
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
    ButtonOutline
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
