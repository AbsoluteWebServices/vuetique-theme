<template>
  <form class="custom-options mt-5">
    <div v-for="option in product.custom_options" :key="('customOption_' + option.option_id)">
      <div class="custom-option mb-4">
        <h4 class="mb-2">{{ option.title }}</h4>
        <input
          class="w-full border border-solid border-grey text-sm text-grey px-3 h-10 bg-white outline-none focus:text-grey-dark"
          v-if="option.type === 'field'"
          type="text"
          :name="('customOption_' + option.option_id)"
          focus
          v-model="inputValues[('customOption_' + option.option_id)]"
          :placeholder="option.title"
          @change="optionChanged(option)">
        <div class="checkbox-wrap" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'radio' || option.type === 'select'">
          <input
            @change="optionChanged(option, opval)"
            type="radio"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="inputValues[('customOption_' + option.option_id)]"
          ><label class="pl-3 lh-5 h4 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
        <div class="checkbox-wrap" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'checkbox'">
          <input
            @change="optionChanged(option, opval)"
            type="checkbox"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="inputValues[('customOption_' + option.option_id)]"
          ><label class="pl-3 lh-5 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
        <span class="error" v-if="validation.results[('customOption_' + option.option_id)].error">{{ validation.results[('customOption_' + option.option_id)].message }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import { ProductCustomOptions } from '@vue-storefront/core/modules/catalog/components/ProductCustomOptions.ts'

export default {
  mixins: [ProductCustomOptions]
}
</script>
