"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import MainBanner from "@/components/curation/MainBanner";
import Categories from "@/components/curation/Categories";
import TitledProducts from "@/components/curation/TitledProducts";
import ContentContainer from "@/components/layout/ContentContainer";
import { API_BASE_URL } from "@/api/httpClient";
import { displayService } from "@/api/display/displayService";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";

const curationPageKeys = {
  detailByType: (type) => ["curation-pages", type],
};

const EMPTY_IMAGE_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><rect width="440" height="440" fill="%23f8fafc"/></svg>';

const toImageSrc = (storageKey) => {
  if (!storageKey) {
    return EMPTY_IMAGE_SRC;
  }
  if (/^(https?:)?\/\//.test(storageKey) || storageKey.startsWith("data:")) {
    return storageKey;
  }

  const normalizedStorageKey = String(storageKey).replace(/^\/+/, "");
  return `${API_BASE_URL}/files/${normalizedStorageKey}`;
};

const toLinkHref = (link) => {
  if (!link) {
    return "/";
  }
  if (typeof link === "string") {
    return link;
  }
  if (link.type === "CategoryLink" && link.categoryId) {
    return `/category/${link.categoryId}`;
  }
  if (link.type === "BrandLink" && link.brandId) {
    return `/brand/${link.brandId}`;
  }
  if (link.type === "ProductDetailLink" && link.productCode) {
    return `/product/${link.productCode}`;
  }

  return "/";
};

const formatPrice = (price) => {
  if (price === undefined || price === null || price === "") {
    return "";
  }

  return `${Number(price).toLocaleString("ko-KR")}원`;
};

const toMainBannerItems = (detail) =>
  (Array.isArray(detail?.items) ? detail.items : []).map((item) => ({
    title: item.title ?? "",
    subTitle: item.description ?? "",
    link: toLinkHref(item.link),
    imageSrc: toImageSrc(item.imageStorageKey),
  }));

const toCategoryItems = (detail) =>
  (Array.isArray(detail?.items) ? detail.items : []).map((item) => ({
    label: item.name ?? "",
    link: toLinkHref(item.link),
    imageSrc: toImageSrc(item.imageStorageKey),
  }));

const toProductItems = (detail) =>
  (Array.isArray(detail?.products) ? detail.products : []).map((product) => {
    const price = product?.price;

    return {
      brandName: product?.brand?.name ?? "",
      brandLink: toLinkHref(product?.brand?.link),
      name: product?.name ?? "상품",
      price: formatPrice(price),
      finalPrice: formatPrice(price),
      link: toLinkHref(product?.link),
      imageSrc: toImageSrc(product?.imageStorageKey),
      optionNames: Array.isArray(product?.optionNames) ? product.optionNames : [],
    };
  });

const renderCurationContent = (curation) => {
  if (curation.type === "MAIN_BANNER") {
    return <MainBanner items={toMainBannerItems(curation.detail)} />;
  }
  if (curation.type === "CATEGORIES") {
    return <Categories categories={toCategoryItems(curation.detail)} />;
  }
  if (curation.type === "TITLED_PRODUCTS") {
    return (
      <TitledProducts
        title={curation.detail?.title ?? curation.name}
        products={toProductItems(curation.detail)}
      />
    );
  }
  if (curation.type === "CATEGORY_PRODUCTS") {
    return (
      <TitledProducts
        title={curation.detail?.category?.name ?? curation.name}
        products={toProductItems(curation.detail)}
      />
    );
  }

  return null;
};

const renderCuration = (curation) => {
  const content = renderCurationContent(curation);

  if (!content) {
    return null;
  }
  if (curation.type === "MAIN_BANNER") {
    return <Box key={curation.id}>{content}</Box>;
  }

  return (
    <ContentContainer key={curation.id}>
      {content}
    </ContentContainer>
  );
};

const sortCurations = (curations) =>
  [...(Array.isArray(curations) ? curations : [])].sort((first, second) => {
    const orderComparison = (first.sortOrder ?? 0) - (second.sortOrder ?? 0);

    if (orderComparison !== 0) {
      return orderComparison;
    }

    return (first.id ?? 0) - (second.id ?? 0);
  });

export default function MainPage() {
  const curationPageQuery = useQuery({
    queryKey: curationPageKeys.detailByType("MAIN"),
    queryFn: () => displayService.getCurationPageByType("MAIN"),
  });

  const curations = useMemo(
    () => sortCurations(curationPageQuery.data?.curations),
    [curationPageQuery.data]
  );

  if (curationPageQuery.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (curationPageQuery.error) {
    const errorMessage =
      curationPageQuery.error instanceof Error
        ? curationPageQuery.error.message
        : "메인 큐레이션을 불러오지 못했습니다.";

    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <Stack spacing={6} sx={{ width: "100%", overflowX: "hidden" }}>
      {curations.map(renderCuration)}
    </Stack>
  );
}
