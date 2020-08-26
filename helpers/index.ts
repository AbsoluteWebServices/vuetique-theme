import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function getTopLevelCategories (categoryList) {
  // Display only the root level (level = 1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
  const categoryLevel = config.entities.category.categoriesDynamicPrefetchLevel >= 0
    ? config.entities.category.categoriesDynamicPrefetchLevel
    : 2

  return categoryList.filter(
    category => category.level === categoryLevel && category.is_active && category.children_count > 0
  )
}

export function getPathForStaticPage (path: string) {
  const { storeCode } = currentStoreView()
  const isStoreCodeEquals = storeCode === config.defaultStoreCode

  return isStoreCodeEquals ? `/i${path}` : path
}
