<template>
  <div class="categories">
    <h4>
      {{ $t('Filter by categories') }}
    </h4>

    <div class="flex flex-wrap">
      <button-full
        v-for="category in categories"
        :key="category.category_id"
        class="mr-1 mb-1"
        :class="{ 'btn-primary': value.includes(category.category_id) }"
        type="button"
        @click.native="toggleCategory(category)"
      >
        {{ category.name }}
      </button-full>
    </div>
  </div>
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull'
export default {
  components: {
    ButtonFull
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toggleCategory (category) {
      const isSelected = this.value.includes(category.category_id)
      if (isSelected) {
        this.$emit('input', this.value.filter(categoryId => categoryId !== category.category_id))
      } else {
        this.$emit('input', [...this.value, category.category_id])
      }
    }
  }
}
</script>
