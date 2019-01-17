<template>
  <div class="mb-8">
    <!-- My newsletter header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('My newsletter') }}
        </h2>
      </div>
      <div class="col-12 sm:col-6">
        <div class="leading-loose flex md:justify-end" v-if="!isEdited">
          <a href="#" class="text-grey flex" @click.prevent="edit">
            <span class="pr-1">
              {{ $t('Edit newsletter preferences') }}
            </span>
            <i class="material-icons">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My newsletter body (both modes) -->
    <div class="row">
      <div class="col-12">
        <h4>
          {{ $t('General agreement') }}
        </h4>
      </div>

      <base-checkbox
        class="col-12 mb-6"
        id="generalAgreement"
        v-model="user.isSubscribed"
        @click="isEdited ? user.isSubscribed = !user.isSubscribed : null"
        :disabled="!isEdited"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-12" v-if="isEdited">
        <hr class="border-t mt-4 mb-10">
      </div>

      <div class="col-12" v-if="isEdited">
        <div class="inline-block mr-5">
          <button-full @click.native="updateNewsletter">
            {{ $t('Update my preferences') }}
          </button-full>
        </div>

        <a href="#" @click="exitSection" class="inline-block text-grey-dark bg-grey-lighter py-2 px-3">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MyNewsletter from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyNewsletter'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  data () {
    return {
      isEdited: false
    }
  },
  methods: {
    exitSection () {
      this.isEdited = false
    },
    edit () {
      this.isEdited = true
    }
  },
  mixins: [MyNewsletter]
}
</script>
