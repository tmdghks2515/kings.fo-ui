"use client";

import MainDisplayMainBanner from "@/app/(main)/_components/MainDisplayMainBanner";
import MainDisplayCategory from "@/app/(main)/_components/MainDisplayCategory";
import MainDIsplayProductSwiper from "@/app/(main)/_components/MainDIsplayProductSwiper";
import { Stack } from "@mui/material";

const bigSwiperItems = [
  {
    title: "Summer Collection",
    subTitle: "Front Office main banner mock 01",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%231d4ed8"/></linearGradient></defs><rect width="1200" height="720" fill="url(%23g1)"/><circle cx="980" cy="170" r="150" fill="rgba(255,255,255,0.14)"/><circle cx="1080" cy="600" r="220" fill="rgba(255,255,255,0.1)"/></svg>',
  },
  {
    title: "Limited Promotion",
    subTitle: "Front Office main banner mock 02",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%231e293b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient></defs><rect width="1200" height="720" fill="url(%23g2)"/><rect x="780" y="90" width="260" height="260" rx="32" fill="rgba(255,255,255,0.12)"/><rect x="920" y="360" width="180" height="180" rx="28" fill="rgba(255,255,255,0.08)"/></svg>',
  },
  {
    title: "New Arrival",
    subTitle: "Front Office main banner mock 03",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%23047857"/></linearGradient></defs><rect width="1200" height="720" fill="url(%23g3)"/><path d="M760 520 C860 360 980 360 1120 520" stroke="rgba(255,255,255,0.18)" stroke-width="72" fill="none" stroke-linecap="round"/><circle cx="930" cy="220" r="110" fill="rgba(255,255,255,0.12)"/></svg>',
  },
];

const categoryItems = [
  {
    label: "영양,안티에이징",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="72" y="34" width="36" height="16" rx="8" fill="%23f3f4f6"/><rect x="66" y="48" width="48" height="82" rx="10" fill="%23ffd84d"/><rect x="76" y="56" width="28" height="46" rx="4" fill="%23fff7cc"/><rect x="78" y="23" width="24" height="28" rx="12" fill="%23ffffff"/><rect x="72" y="32" width="36" height="16" rx="8" fill="%23d1d5db"/><text x="90" y="81" text-anchor="middle" font-size="9" fill="%23555">CNP</text></svg>',
  },
  {
    label: "더마케어",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="74" y="22" width="10" height="28" rx="3" fill="%23111827"/><rect x="96" y="22" width="10" height="28" rx="3" fill="%23111827"/><rect x="68" y="48" width="44" height="90" rx="8" fill="url(%23g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%2328a0ff"/><stop offset="100%" stop-color="%230a43b8"/></linearGradient></defs><rect x="78" y="60" width="24" height="38" rx="4" fill="rgba(255,255,255,0.18)"/><text x="90" y="85" text-anchor="middle" font-size="9" fill="%23fff">CNP</text></svg>',
  },
  {
    label: "트러블진정",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="72" y="34" width="36" height="14" rx="7" fill="%23f3f4f6"/><rect x="68" y="46" width="44" height="88" rx="10" fill="%23ffffff" stroke="%23e5e7eb"/><rect x="78" y="62" width="24" height="30" rx="3" fill="%23d9f99d"/><text x="90" y="84" text-anchor="middle" font-size="9" fill="%234b5563">CNP</text></svg>',
  },
  {
    label: "수분,보습",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><ellipse cx="90" cy="64" rx="34" ry="14" fill="%23ffffff" stroke="%23e5e7eb"/><rect x="56" y="62" width="68" height="44" rx="10" fill="url(%23g)"/><ellipse cx="90" cy="106" rx="34" ry="12" fill="%2334d399"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="%23a7f3d0"/><stop offset="100%" stop-color="%235eead4"/></linearGradient></defs><text x="90" y="84" text-anchor="middle" font-size="9" fill="%23ffffff">CNP</text></svg>',
  },
  {
    label: "모공,각질",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="76" y="24" width="28" height="20" rx="3" fill="%23d1d5db"/><rect x="70" y="42" width="40" height="92" rx="8" fill="%23ffffff" stroke="%23d1d5db"/><rect x="79" y="58" width="22" height="52" rx="4" fill="%23f3f4f6"/><text x="90" y="86" text-anchor="middle" font-size="9" fill="%234b5563">CNP</text></svg>',
  },
  {
    label: "클렌징",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="78" y="22" width="24" height="18" rx="4" fill="%23ffffff" stroke="%23e5e7eb"/><rect x="72" y="40" width="36" height="98" rx="8" fill="%23ffffff" stroke="%23e5e7eb"/><rect x="76" y="60" width="28" height="18" rx="3" fill="%23f3f4f6"/><text x="90" y="89" text-anchor="middle" font-size="9" fill="%234b5563">CNP</text></svg>',
  },
  {
    label: "선케어",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><path d="M70 40 h40 l-8 92 h-24 z" fill="%23fff1a8" stroke="%23f3e08d"/><rect x="76" y="44" width="28" height="18" rx="3" fill="%23ffef9c"/><rect x="78" y="78" width="24" height="22" rx="3" fill="%23ffe06b"/><text x="90" y="92" text-anchor="middle" font-size="9" fill="%234b5563">CNP</text></svg>',
  },
  {
    label: "남성케어",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" fill="none"/><rect x="78" y="28" width="24" height="18" rx="4" fill="%231f2937"/><rect x="72" y="44" width="36" height="92" rx="8" fill="%23374151"/><rect x="78" y="64" width="24" height="28" rx="4" fill="%234b5563"/><text x="90" y="89" text-anchor="middle" font-size="9" fill="%23d1d5db">CNP</text></svg>',
  },
];

const productItems = [
  {
    brand: "Hanyul",
    name: "[Olive Young Only] Young Mugwort Soothing Cream Set",
    discountRate: "30%",
    price: "38,000 KRW",
    finalPrice: "26,600 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><defs><linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23a7f3d0"/><stop offset="100%" stop-color="%2393c5fd"/></linearGradient></defs><rect width="440" height="440" fill="url(%23bg1)"/><rect x="210" y="90" width="150" height="200" rx="8" fill="%23d9f99d" opacity="0.55"/><rect x="232" y="112" width="110" height="160" rx="6" fill="%23ffffff" opacity="0.95"/><circle cx="120" cy="300" r="66" fill="%2399f6e4"/><rect x="80" y="192" width="46" height="110" rx="8" fill="%23f5f5dc"/><rect x="150" y="255" width="96" height="70" rx="35" fill="%235f9ea0"/></svg>',
  },
  {
    brand: "Vitalbeautie",
    name: "[Special Set] Meta Green Cleansing Diet Pack",
    discountRate: "50%",
    price: "25,000 KRW",
    finalPrice: "12,500 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><rect width="440" height="440" fill="%23f8fafc"/><rect x="135" y="90" width="140" height="220" rx="8" fill="%2316a34a"/><rect x="110" y="130" width="40" height="170" rx="4" fill="%2322c55e"/><rect x="170" y="120" width="70" height="140" rx="4" fill="%2386efac"/><path d="M228 145 C195 175 188 210 214 255" stroke="%23dcfce7" stroke-width="12" fill="none" stroke-linecap="round"/></svg>',
  },
  {
    brand: "Vitalbeautie",
    name: "[Only] Myoungjak 26 Days Intensive Set",
    discountRate: "30%",
    price: "57,000 KRW",
    finalPrice: "39,900 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><defs><linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23d9f99d"/><stop offset="100%" stop-color="%23bfdbfe"/></linearGradient></defs><rect width="440" height="440" fill="url(%23bg3)"/><rect x="70" y="110" width="110" height="70" rx="6" fill="%23f5deb3"/><rect x="210" y="126" width="120" height="110" rx="6" fill="%23fde047"/><rect x="120" y="240" width="26" height="94" rx="6" fill="%231f2937"/><rect x="170" y="226" width="26" height="108" rx="6" fill="%234b5563"/><rect x="228" y="256" width="30" height="78" rx="6" fill="%23111827"/></svg>',
  },
  {
    brand: "Vitalbeautie",
    name: "[Special Set] Meta Green Calorie Cut Duo",
    discountRate: "50%",
    price: "25,000 KRW",
    finalPrice: "12,500 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><rect width="440" height="440" fill="%23f8fafc"/><rect x="136" y="98" width="62" height="190" rx="6" fill="%2316a34a"/><rect x="200" y="86" width="86" height="208" rx="8" fill="%2315803d"/><path d="M244 118 C211 146 201 188 236 250" stroke="%23dcfce7" stroke-width="12" fill="none" stroke-linecap="round"/></svg>',
  },
  {
    brand: "Hera",
    name: "[Super Mario Galaxy] Black Cushion Makeup Kit",
    discountRate: "10%",
    price: "112,000 KRW",
    finalPrice: "100,800 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><defs><linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23e0f2fe"/><stop offset="100%" stop-color="%2393c5fd"/></linearGradient></defs><rect width="440" height="440" fill="url(%23bg5)"/><path d="M108 108 L204 96 L260 176 L164 194 Z" fill="%23ffffff"/><rect x="84" y="166" width="26" height="130" rx="8" fill="%23ef4444"/><circle cx="230" cy="284" r="40" fill="%23111827"/><circle cx="230" cy="284" r="22" fill="%23f5d0a9"/><rect x="280" y="244" width="88" height="62" rx="8" fill="%230f172a"/></svg>',
  },
  {
    brand: "Vitalbeautie",
    name: "[Premium Line] Superbiotics Daily Care",
    discountRate: "15%",
    price: "49,000 KRW",
    finalPrice: "41,650 KRW",
    link: "/",
    imageSrc:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440" viewBox="0 0 440 440"><rect width="440" height="440" fill="%23f8fafc"/><rect x="60" y="220" width="90" height="100" rx="12" fill="%23ede9fe"/><rect x="168" y="116" width="188" height="188" rx="8" fill="%23ffffff" stroke="%23d1d5db"/><ellipse cx="304" cy="264" rx="30" ry="14" fill="%23fef3c7" transform="rotate(-25 304 264)"/></svg>',
  },
];

export default function MainPage() {
  return (
    <Stack spacing={6}>
      <MainDisplayMainBanner items={bigSwiperItems} />
      <MainDisplayCategory categories={categoryItems} />
      <MainDIsplayProductSwiper
        title="Trending Products"
        products={productItems}
      />
    </Stack>
  );
}
