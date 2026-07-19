'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CategoryProductBrowser from './_components/CategoryProductBrowser'

function CategoryContent() {
  const searchParams = useSearchParams()

  return <CategoryProductBrowser selectedCategoryId={searchParams.get('id')} />
}

export default function CategoryPage() {
  return (
    <Suspense fallback={null}>
      <CategoryContent />
    </Suspense>
  )
}
