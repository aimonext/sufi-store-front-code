const PRODUCTS = [
  { id:1, name:'Wireless Noise-Cancelling Headphones', category:'Electronics', price:199, oldPrice:249, rating:4.8, reviews:124, badge:'New', img:'/img/prod1_400x400.jpg', specs:{ Brand:'SoundMax', Battery:'30 hours', Connectivity:'Bluetooth 5.3' }, variants:[ {id:'1-b', attr:{Color:'Black'}, price:199, stock:12}, {id:'1-w', attr:{Color:'White'}, price:209, stock:5} ], media:[{type:'image',src:'/img/prod1_400x400.jpg'}] },
  { id:2, name:'Smartphone 128GB', category:'Electronics', price:699, rating:4.7, reviews:89, img:'/img/prod2_400x400.jpg', specs:{ Brand:'Nova', Display:'6.5" AMOLED' }, variants:[ {id:'2-128', attr:{Storage:'128GB'}, price:699, stock:8}, {id:'2-256', attr:{Storage:'256GB'}, price:799, stock:4} ], media:[{type:'image',src:'/img/prod2_400x400.jpg'}] },
  { id:3, name:'Laptop 15" Core i7', category:'Computers', price:1099, oldPrice:1299, rating:4.9, reviews:58, badge:'Bestseller', img:'/img/prod3_400x400.jpg', specs:{ Brand:'TechPro', CPU:'Intel Core i7' }, options:{ RAM:['8GB','16GB','32GB'], Storage:['256GB','512GB'], Processor:['Intel i5','Intel i7','Intel i9'] }, priceStep:25, reviewsList:[{user:'Charlie',rating:5,comment:'Fast and reliable. Battery lasts all day.',date:'Oct 8, 2026'}], questionsList:[{q:'Does it support dual monitors?',a:'Yes, via HDMI and USB-C.'}], faq:[{q:'What OS is pre-installed?',a:'Windows 11 Home.'},{q:'Is the RAM upgradeable?',a:'Yes, up to 64GB.'}], media:[{type:'image',src:'/img/prod3_400x400.jpg'},{type:'image',src:'/img/prod4_400x400.jpg'}], variantImages:{'8GB':'/img/prod4_400x400.jpg'} },
  { id:4, name:'Mechanical Keyboard', category:'Computers', price:89, rating:4.6, reviews:73, img:'/img/prod4_400x400.jpg', specs:{ Brand:'KeyMaster', Switch:'Blue' }, variants:[ {id:'4-bl', attr:{Switch:'Blue'}, price:89, stock:15}, {id:'4-br', attr:{Switch:'Brown'}, price:89, stock:10} ], media:[{type:'image',src:'/img/prod4_400x400.jpg'}] },
  { id:5, name:'Gaming Mouse', category:'Computers', price:49, rating:4.5, reviews:41, badge:'Sale', img:'/img/prod5_400x400.jpg', specs:{ Brand:'PlayGear', DPI:'16000' }, variants:[ {id:'5-b', attr:{Color:'Black'}, price:49, stock:20} ], media:[{type:'image',src:'/img/prod5_400x400.jpg'}] },
  { id:6, name:"Men's Casual T-Shirt", category:'Clothing', price:25, rating:4.4, reviews:210, img:'/img/prod6_400x400.jpg', specs:{ Brand:'UrbanWear', Fabric:'100% Cotton' }, options:{ Color:['Red','Blue','Black','White'], Size:['M','L','XL'] }, priceStep:2, reviewsList:[{user:'Alice',rating:5,comment:'Great fit and fabric. Very comfortable.',date:'Oct 10, 2026'},{user:'Bob',rating:4,comment:'Good quality, slightly large.',date:'Oct 12, 2026'}], questionsList:[{q:'Is this pre-shrunk?',a:'Yes, the fabric is pre-shrunk to minimize shrinkage after washing.'}], faq:[{q:'What is the return policy?',a:'30-day easy returns on all items.'},{q:'How do I wash this?',a:'Machine wash cold, tumble dry low.'}], media:[{type:'image',src:'/img/prod6_400x400.jpg'},{type:'video',src:'/video/sample.mp4'},{type:'image',src:'/img/prod7_400x400.jpg'}], variantImages:{ Red:'/img/prod7_400x400.jpg', Blue:'/img/prod8_400x400.jpg', Black:'/img/prod5_400x400.jpg', White:'/img/prod12_400x400.jpg' } },
  { id:7, name:"Women's Denim Jacket", category:'Clothing', price:79, oldPrice:99, rating:4.7, reviews:67, img:'/img/prod7_400x400.jpg', specs:{ Brand:'DenimCo', Fabric:'Denim' }, variants:[ {id:'7-b-s', attr:{Color:'Blue', Size:'S'}, price:79, stock:5}, {id:'7-b-m', attr:{Color:'Blue', Size:'M'}, price:79, stock:7}, {id:'7-b-l', attr:{Color:'Blue', Size:'L'}, price:79, stock:2} ], media:[{type:'image',src:'/img/prod7_400x400.jpg'}] },
  { id:8, name:'Running Sneakers', category:'Clothing', price:110, rating:4.8, reviews:154, badge:'New', img:'/img/prod8_400x400.jpg', specs:{ Brand:'Stride', Material:'Mesh & Rubber' }, variants:[ {id:'8-w-8', attr:{Color:'White', Size:'8'}, price:110, stock:4}, {id:'8-w-9', attr:{Color:'White', Size:'9'}, price:110, stock:6}, {id:'8-b-8', attr:{Color:'Black', Size:'8'}, price:110, stock:3} ], media:[{type:'image',src:'/img/prod8_400x400.jpg'}] },
  { id:9, name:'Organic Apples (1kg)', category:'Grocery', price:4.99, rating:4.9, reviews:312, img:'/img/prod9_400x400.jpg', specs:{ Weight:'1kg', Organic:'Yes' }, variants:[ {id:'9-1', attr:{Pack:'1kg'}, price:4.99, stock:50} ], media:[{type:'image',src:'/img/prod9_400x400.jpg'}] },
  { id:10, name:'Whole Wheat Bread', category:'Grocery', price:3.49, rating:4.6, reviews:98, img:'/img/prod10_400x400.jpg', specs:{ Weight:'500g' }, variants:[ {id:'10-1', attr:{Pack:'500g'}, price:3.49, stock:40} ], media:[{type:'image',src:'/img/prod10_400x400.jpg'}] },
  { id:11, name:'Olive Oil 1L', category:'Grocery', price:12.99, oldPrice:15.99, rating:4.8, reviews:143, badge:'Sale', img:'/img/prod11_400x400.jpg', specs:{ Volume:'1L', Type:'Extra Virgin' }, variants:[ {id:'11-1', attr:{Volume:'1L'}, price:12.99, stock:25} ], media:[{type:'image',src:'/img/prod11_400x400.jpg'}] },
  { id:12, name:'Stainless Steel Water Bottle', category:'Home', price:24, rating:4.7, reviews:88, img:'/img/prod12_400x400.jpg', specs:{ Capacity:'750ml', Material:'Stainless Steel' }, variants:[ {id:'12-s', attr:{Color:'Silver'}, price:24, stock:18}, {id:'12-b', attr:{Color:'Black'}, price:24, stock:12} ], media:[{type:'image',src:'/img/prod12_400x400.jpg'}] },
  { id:13, name:'LED Desk Lamp', category:'Home', price:39, rating:4.5, reviews:56, img:'/img/prod13_400x400.jpg', specs:{ Power:'12W', Brightness:'5 levels' }, variants:[ {id:'13-w', attr:{Color:'White'}, price:39, stock:14}, {id:'13-b', attr:{Color:'Black'}, price:39, stock:9} ], media:[{type:'image',src:'/img/prod13_400x400.jpg'}] },
  { id:14, name:'Vitamin C Serum', category:'Beauty', price:29, rating:4.8, reviews:176, badge:'Bestseller', img:'/img/prod14_400x400.jpg', specs:{ Volume:'30ml', SkinType:'All' }, variants:[ {id:'14-1', attr:{Size:'30ml'}, price:29, stock:30} ], media:[{type:'image',src:'/img/prod14_400x400.jpg'}] },
  { id:15, name:'Yoga Mat', category:'Sports', price:35, rating:4.6, reviews:92, img:'/img/prod15_400x400.jpg', specs:{ Material:'TPE', Thickness:'6mm' }, variants:[ {id:'15-p', attr:{Color:'Purple'}, price:35, stock:11}, {id:'15-g', attr:{Color:'Green'}, price:35, stock:8} ], media:[{type:'image',src:'/img/prod15_400x400.jpg'}] },
  { id:16, name:'Bluetooth Speaker', category:'Electronics', price:59, oldPrice:79, rating:4.7, reviews:134, img:'/img/prod16_400x400.jpg', specs:{ Battery:'12 hours', Waterproof:'IPX7' }, variants:[ {id:'16-b', attr:{Color:'Black'}, price:59, stock:17}, {id:'16-r', attr:{Color:'Red'}, price:59, stock:6} ], media:[{type:'image',src:'/img/prod16_400x400.jpg'}] },
];

// Expand options-based products into variants (cartesian product)
function cartesian(options) {
  const keys = Object.keys(options);
  if (keys.length === 0) return [{}];
  let result = [{}];
  for (const key of keys) {
    const next = [];
    for (const combo of result) {
      for (const val of options[key]) {
        next.push({ ...combo, [key]: val });
      }
    }
    result = next;
  }
  return result;
}

function expandProduct(p) {
  if (p.variants && p.variants.length) return p;
  if (p.options) {
    const combos = cartesian(p.options);
    const step = p.priceStep || 0;
    p.variants = combos.map((combo, idx) => ({
      id: p.id + '-' + idx,
      attr: combo,
      price: Math.round((p.price + idx * step) * 100) / 100,
      stock: Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 9) + 1,
      image: (p.variantImages && (combo.Color || combo.color)) ? p.variantImages[combo.Color || combo.color] : undefined,
    }));
    // ensure first variant in stock
    if (p.variants.length && p.variants[0].stock === 0) p.variants[0].stock = 1;
  } else {
    p.variants = [{ id: p.id + '-default', attr: {}, price: p.price, stock: 99 }];
  }
  return p;
}

PRODUCTS.forEach(expandProduct);

const CATEGORIES = [
  { name: 'Electronics', img: '/img/catelec_400x400.jpg' },
  { name: 'Computers', img: '/img/catcomp_400x400.jpg' },
  { name: 'Clothing', img: '/img/catcloth_400x400.jpg' },
  { name: 'Grocery', img: '/img/catgro_400x400.jpg' },
  { name: 'Home', img: '/img/cathome_400x400.jpg' },
  { name: 'Beauty', img: '/img/catbeau_400x400.jpg' },
  { name: 'Sports', img: '/img/catsport_400x400.jpg' },
];

function getProduct(id) { return PRODUCTS.find(p => p.id === parseInt(id)); }
function relatedProducts(p) { if (!p) return []; return PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4); }
function formatPrice(n) { return '$' + Number(n).toFixed(2); }

export const STORES = {
  localhost: {
    slug: 'lumen',
    storeName: 'Lumen',
    domain: 'localhost',
    heroEyebrow: 'Spring 2026',
    heroTitle: 'Objects made to be kept.',
    heroSubtitle: 'Small-batch goods for everyday rituals. Sourced responsibly, built to last.',
    categories: [
      { name: 'Electronics', img: '/img/catelec_400x400.jpg' },
      { name: 'Computers', img: '/img/catcomp_400x400.jpg' },
      { name: 'Clothing', img: '/img/catcloth_400x400.jpg' },
      { name: 'Grocery', img: '/img/catgro_400x400.jpg' },
      { name: 'Home', img: '/img/cathome_400x400.jpg' },
      { name: 'Beauty', img: '/img/catbeau_400x400.jpg' },
      { name: 'Sports', img: '/img/catsport_400x400.jpg' },
    ],
    products: PRODUCTS,
    contact: { email: 'hello@lumen.store', phone: '+1 (555) 012-3456', address: '123 Market St, San Francisco, CA' },
    privacy: `# Privacy Policy

We respect your privacy. This policy explains how we collect, use, and protect your personal information when you shop with us.

## Information we collect

We collect information you provide at checkout (name, email, address) and browsing data to improve your experience.

## How we use it

Your information is used to process orders, provide support, and send updates you opt into. We never sell your data.

## Cookies

We use cookies to remember your cart and preferences. You can disable cookies in your browser settings.

## Contact

Questions? Reach us at privacy@lumen.store.`,
    terms: `# Terms & Conditions

By using this store, you agree to the following terms.

## Orders

All orders are subject to availability. We reserve the right to cancel orders in case of pricing errors.

## Shipping

Shipping times are estimates and may vary. Free shipping applies to orders over $50.

## Returns

Items may be returned within 30 days in original condition. Refunds are issued to the original payment method.

## Liability

We are not liable for indirect or consequential damages arising from use of our products.`,
  },
  'store1.com': {
    slug: 'store1',
    storeName: 'Store One',
    domain: 'store1.com',
    heroEyebrow: 'Welcome',
    heroTitle: 'Store One Collection',
    heroSubtitle: 'Quality products for everyone.',
    categories: [
      { name: 'Electronics', img: '/img/catelec_400x400.jpg' },
      { name: 'Home', img: '/img/cathome_400x400.jpg' },
    ],
    products: PRODUCTS.filter(p => p.category === 'Electronics' || p.category === 'Home'),
    contact: { email: 'hello@store1.com', phone: '+1 (555) 999-0000', address: '456 Commerce Ave, New York, NY' },
    privacy: `# Privacy Policy\\n\\nWelcome to Store One. We respect your privacy.`,
    terms: `# Terms & Conditions\\n\\nBy using Store One, you agree to our terms.`,
  },
};

export function getStoreByHost(host) {
  const h = (host || '').split(':')[0].toLowerCase();
  return STORES[h] || STORES.localhost;
}