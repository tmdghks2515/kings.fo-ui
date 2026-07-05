'use client'

import { useParams } from 'next/navigation'
import CategoryProductBrowser from '../_components/CategoryProductBrowser'

export default function CategoryProductsPage() {
  const params = useParams()

  return <CategoryProductBrowser selectedCategoryId={params?.id} />
}
