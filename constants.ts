import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "رولكس أويستر بربتشوال - إصدار ليلي",
    price: 45250,
    category: "ساعات",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews_count: 120,
    isTrending: true,
    isNew: true,
    description: "ساعة يد فاخرة بتصميم كلاسيكي عصري، تناسب كل المناسبات. مقاومة للماء وزجاج ضد الخدش."
  },
  {
    id: 2,
    name: "حقيبة جلد إيطالي فاخر - جملي",
    price: 2850,
    category: "حقائب",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    reviews_count: 85,
    isNew: true,
    description: "شنطة مصنوعة يدوياً من أجود أنواع الجلود، تكفي لكل أغراضك وتزيدك أناقة."
  },
  {
    id: 3,
    name: "نظارة راي بان أفياتور كلاسيك",
    price: 850,
    category: "اكسسوارات",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    reviews_count: 40,
    description: "حماية كاملة من الشمس مع ستايل ما يقدم."
  },
  {
    id: 4,
    name: "عطر العود الملكي - خلطة خاصة",
    price: 600,
    category: "عطور",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    reviews_count: 230,
    isTrending: true,
    description: "ريحة تثبت وتجمل، مزيج من العود والورد الطائفي."
  },
  {
    id: 5,
    name: "حذاء سنيكرز أبيض عصري",
    price: 599,
    category: "أحذية",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    reviews_count: 150,
    description: "خفيف ومريح للمشي والجري، تصميم عصري يناسب الثوب والبدلة."
  },
  {
    id: 6,
    name: "سوار ذهب عيار 18 - تصميم الماس",
    price: 3500,
    category: "مجوهرات",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    rating: 5.0,
    reviews_count: 60,
    isNew: true,
    description: "لمسة نعومة وفخامة لمعصمك، ذهب عيار 18."
  },
  {
    id: 7,
    name: "عطر توم فورد بلاك أوركيد",
    price: 950,
    category: "عطور",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    reviews_count: 312,
    description: "عطر جذاب وساحر للمناسبات الخاصة."
  },
  {
    id: 8,
    name: "محفظة جلد رجالية - بني غامق",
    price: 350,
    category: "اكسسوارات",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
    rating: 4.4,
    reviews_count: 45,
    isTrending: true,
    description: "جلد طبيعي 100%، عملية وصغيرة الحجم."
  },
];

export const CATEGORIES = [
  { id: 1, name: "ساعات", icon: "Watch" },
  { id: 2, name: "عطور", icon: "Spray" },
  { id: 3, name: "حقائب", icon: "ShoppingBag" },
  { id: 4, name: "أحذية", icon: "Footprints" },
  { id: 5, name: "مجوهرات", icon: "Gem" },
];

export const RECENT_SEARCHES = ["ساعة رجالي", "عطر صيفي", "هدايا تخرج"];