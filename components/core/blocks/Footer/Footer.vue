<template>
  <footer :class="{ 'border-top border-secondary': isCheckoutPage }">
    <div
      class="footer-links flex pt-8 pb-16 px-10 bg-grey-lighter mt-5"
      v-if="!isCheckoutPage"
    >
      <div class="container mx-auto">
        <div class="flex justify-center md:justify-between">
          <div class="flex flex-col w-1/4">

            <div class="">
              <Newsletter />
            </div>

            <div class="flex social-footer mt-12">
              <a
                class="social-icon mr-1 brdr-circle no-underline"
                href="https://www.facebook.com/"
                :aria-label="$t('Go to Facebook')"
              >
                <img src="/assets/icons/social-f.svg" alt="">
              </a>
              <a
                class="social-icon mx-1 brdr-circle no-underline"
                href="https://www.instagram.com"
                :aria-label="$t('Go to Instagram')"
              >
                <img src="/assets/icons/social-i.svg" alt="">
              </a>
              <a
                class="social-icon mx-1 brdr-circle no-underline"
                href="https://www.pinterest.com"
                :aria-label="$t('Go to Pinterest')"
              >
                <img src="/assets/icons/social-p.svg" alt="">
              </a>
              <a
                class="social-icon mx-1 brdr-circle no-underline"
                href="https://www.youtube.com"
                :aria-label="$t('Go to Youtube')"
              >
                <img src="/assets/icons/social-y.svg" alt="">
              </a>
            </div>

          </div>
          <div class="flex w-full lg:w-3/4 justify-around no-mobile">
            <div class="start-md">
              <h4>
                {{ $t('Shop') }}
              </h4>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/c/women-20')" exact>
                  {{ $t('Women fashion') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/c/men-11')" exact>
                  {{ $t("Men's fashion") }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/')" exact>
                  {{ $t('Kidswear') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/')" exact>
                  {{ $t('Home') }}
                </router-link>
              </div>
            </div>
            <div class="start-md">
              <h4>
                {{ $t('Orders') }}
              </h4>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/order-tracking')" exact>
                  {{ $t('Track my order') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/my-account')" exact>
                  {{ $t('My account') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/delivery')" exact>
                  {{ $t('Delivery') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/returns')" exact>
                  {{ $t('Return policy') }}
                </router-link>
              </div>
            </div>
            <div class="start-md">
              <h4>
                {{ $t('Help') }}
              </h4>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/customer-service')" exact>
                  {{ $t('Customer service') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/size-guide')" exact>
                  {{ $t('Size guide') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/contact')" exact>
                  {{ $t('Contact us') }}
                </router-link>
              </div>
            </div>
            <div class="start-md">
              <h4>
                {{ $t('About us') }}
              </h4>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/i/about-us')" exact>
                  {{ $t('About us (Magento CMS)') }}
                </router-link>
              </div>
              <div class="my-6">
                <router-link class="text-grey-dark" :to="localizedRoute('/store-locator')" exact>
                  {{ $t('Store locator') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="flex items-center justify-between py-6">
        <div class="flex w-1/3">
          <span class="text-grey-dark text-sm">© {{ currentYear }} VueVetch</span>

          <router-link class="text-grey-dark ml-8 text-sm" :to="localizedRoute('/terms')" exact>
            {{ $t('Terms') }}
          </router-link>

          <router-link class="text-grey-dark ml-8 text-sm" :to="localizedRoute('/privacy')" exact>
            {{ $t('Privacy') }}
          </router-link>

        </div>

        <div class="flex justify-end w-1/3">
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-visa.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-master-card.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-amex.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-disc.png" alt="">
          </div>
          <div class="footer-pay-item">
            <img src="/assets/icons/pay-paypal.png" alt="">
          </div>
        </div>

      </div>
    </div>

    <!--
    <div class="container mx-auto">
      <div class="flex items-center px-4 bottom-links">
        <div class="w-2/5 sm:w-1/4 cl-tertiary">
          <language-switcher v-if="multistoreEnabled" />
        </div>
        <div class="w-auto sm:w-3/4 flex justify-end">
          <ul class="pl-0 links" data-testid="bottomLinks">
            <li class="inline-flex">
              <router-link
                class="cl-tertiary mr-3 underline"
                to="/legal"
                exact
              >
                {{ $t('Legal notice') }}
              </router-link>
            </li>
            <li class="inline-flex">
              <router-link
                class="cl-tertiary underline"
                to="/privacy"
                exact
              >
                {{ $t('Privacy policy') }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    -->
  </footer>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'

export default {
  mixins: [CurrentPage],
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return this.$store.state.config.storeViews.multistore
    },
    currentYear () {
      return (new Date()).getFullYear()
    }
  },
  components: {
    Newsletter,
    LanguageSwitcher
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

.icon {
  transition: 0.3s all;
}

.social-icon {
  width: 40px;
  height: 40px;
  &:hover,
  &:focus,
  &:active {
    .icon {
      fill: $color-secondary;
    }
  }
}
.links {
  list-style-type: none;
}

.bottom-links {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.underline {
  &:hover {
    color: $color-secondary;
    &:after {
      background-color: $color-secondary;
    }
  }
}
.legal-entity-link {
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
}

.privacy-policy-link {
  text-align: right;
  @media (min-width: 768px) {
    display: none;
  }
}

@media (max-width: 595px) {
  .no-mobile {
    display: none;
  }

  .social {
    margin-top: 0;
  }

  .footer-links {
    padding-bottom: 30px;
  }
}

.footer-pay-item {
  background: #f6f5f5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  text-align: center;
  margin: 0 2.5px;
}

</style>
