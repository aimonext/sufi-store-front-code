const PRODUCTS = [
  { id:1, name:'Wireless Noise-Cancelling Headphones', category:'Electronics', price:199, oldPrice:249, rating:4.8, reviews:124, badge:'New', img:'assets/img/prod1_400x400.jpg', specs:{ Brand:'SoundMax', Battery:'30 hours', Connectivity:'Bluetooth 5.3' }, variants:[ {id:'1-b', attr:{Color:'Black'}, price:199, stock:12}, {id:'1-w', attr:{Color:'White'}, price:209, stock:5} ] },
  { id:2, name:'Smartphone 128GB', category:'Electronics', price:699, rating:4.7, reviews:89, img:'assets/img/prod2_400x400.jpg', specs:{ Brand:'Nova', Display:'6.5" AMOLED' }, variants:[ {id:'2-128', attr:{Storage:'128GB'}, price:699, stock:8}, {id:'2-256', attr:{Storage:'256GB'}, price:799, stock:4} ] },
  { id:3, name:'Laptop 15" Core i7', category:'Computers', price:1099, oldPrice:1299, rating:4.9, reviews:58, badge:'Bestseller', img:'assets/img/prod3_400x400.jpg', specs:{ Brand:'TechPro', CPU:'Intel Core i7' }, options:{ RAM:['8GB','16GB','32GB'], Storage:['256GB','512GB'], Processor:['Intel i5','Intel i7','Intel i9'] }, priceStep:25, reviewsList:[ {user:'Charlie', rating:5, comment:'Fast and reliable. Battery lasts all day.', date:'Oct 8, 2026'} ], questionsList:[ {q:'Does it support dual monitors?', a:'Yes, via HDMI and USB-C.'} ], faq:[ {q:'What OS is pre-installed?', a:'Windows 11 Home.'}, {q:'Is the RAM upgradeable?', a:'Yes, up to 64GB.'} ], media:[ {type:'image', src:'assets/img/prod3_400x400.jpg'}, {type:'image', src:'assets/img/prod4_400x400.jpg'} ], variantImages:{ Silver:'assets/img/prod4_400x400.jpg', 'Space Gray':'assets/img/prod5_400x400.jpg' } },
  { id:4, name:'Mechanical Keyboard', category:'Computers', price:89, rating:4.6, reviews:73, img:'assets/img/prod4_400x400.jpg', specs:{ Brand:'KeyMaster', Switch:'Blue' }, variants:[ {id:'4-bl', attr:{Switch:'Blue'}, price:89, stock:15}, {id:'4-br', attr:{Switch:'Brown'}, price:89, stock:10} ] },
  { id:5, name:'Gaming Mouse', category:'Computers', price:49, rating:4.5, reviews:41, badge:'Sale', img:'assets/img/prod5_400x400.jpg', specs:{ Brand:'PlayGear', DPI:'16000' }, variants:[ {id:'5-b', attr:{Color:'Black'}, price:49, stock:20} ] },
  { id:6, name:"Men's Casual T-Shirt", category:'Clothing', price:25, rating:4.4, reviews:210, img:'assets/img/prod6_400x400.jpg', specs:{ Brand:'UrbanWear', Fabric:'100% Cotton' }, options:{ Color:['Red','Blue','Black','White'], Size:['M','L','XL'] }, priceStep:2, reviewsList:[ {user:'Alice', rating:5, comment:'Great fit and fabric. Very comfortable.', date:'Oct 10, 2026'}, {user:'Bob', rating:4, comment:'Good quality, slightly large.', date:'Oct 12, 2026'} ], questionsList:[ {q:'Is this pre-shrunk?', a:'Yes, the fabric is pre-shrunk to minimize shrinkage after washing.'} ], faq:[ {q:'What is the return policy?', a:'30-day easy returns on all items.'}, {q:'How do I wash this?', a:'Machine wash cold, tumble dry low.'} ], media:[ {type:'image', src:'assets/img/prod6_400x400.jpg'}, {type:'video', src:'assets/video/sample.mp4'}, {type:'image', src:'assets/img/prod7_400x400.jpg'} ], variantImages:{ Red:'assets/img/prod7_400x400.jpg', Blue:'assets/img/prod8_400x400.jpg', Black:'assets/img/prod5_400x400.jpg', White:'assets/img/prod12_400x400.jpg' } },
  { id:7, name:"Women's Denim Jacket", category:'Clothing', price:79, oldPrice:99, rating:4.7, reviews:67, img:'assets/img/prod7_400x400.jpg', specs:{ Brand:'DenimCo', Fabric:'Denim' }, variants:[ {id:'7-b-s', attr:{Color:'Blue', Size:'S'}, price:79, stock:5}, {id:'7-b-m', attr:{Color:'Blue', Size:'M'}, price:79, stock:7}, {id:'7-b-l', attr:{Color:'Blue', Size:'L'}, price:79, stock:2} ] },
  { id:8, name:'Running Sneakers', category:'Clothing', price:110, rating:4.8, reviews:154, badge:'New', img:'assets/img/prod8_400x400.jpg', specs:{ Brand:'Stride', Material:'Mesh & Rubber' }, variants:[ {id:'8-w-8', attr:{Color:'White', Size:'8'}, price:110, stock:4}, {id:'8-w-9', attr:{Color:'White', Size:'9'}, price:110, stock:6}, {id:'8-b-8', attr:{Color:'Black', Size:'8'}, price:110, stock:3} ] },
  { id:9, name:'Organic Apples (1kg)', category:'Grocery', price:4.99, rating:4.9, reviews:312, img:'assets/img/prod9_400x400.jpg', specs:{ Weight:'1kg', Organic:'Yes' }, variants:[ {id:'9-1', attr:{Pack:'1kg'}, price:4.99, stock:50} ] },
  { id:10, name:'Whole Wheat Bread', category:'Grocery', price:3.49, rating:4.6, reviews:98, img:'assets/img/prod10_400x400.jpg', specs:{ Weight:'500g' }, variants:[ {id:'10-1', attr:{Pack:'500g'}, price:3.49, stock:40} ] },
  { id:11, name:'Olive Oil 1L', category:'Grocery', price:12.99, oldPrice:15.99, rating:4.8, reviews:143, badge:'Sale', img:'assets/img/prod11_400x400.jpg', specs:{ Volume:'1L', Type:'Extra Virgin' }, variants:[ {id:'11-1', attr:{Volume:'1L'}, price:12.99, stock:25} ] },
  { id:12, name:'Stainless Steel Water Bottle', category:'Home', price:24, rating:4.7, reviews:88, img:'assets/img/prod12_400x400.jpg', specs:{ Capacity:'750ml', Material:'Stainless Steel' }, variants:[ {id:'12-s', attr:{Color:'Silver'}, price:24, stock:18}, {id:'12-b', attr:{Color:'Black'}, price:24, stock:12} ] },
  { id:13, name:'LED Desk Lamp', category:'Home', price:39, rating:4.5, reviews:56, img:'assets/img/prod13_400x400.jpg', specs:{ Power:'12W', Brightness:'5 levels' }, variants:[ {id:'13-w', attr:{Color:'White'}, price:39, stock:14}, {id:'13-b', attr:{Color:'Black'}, price:39, stock:9} ] },
  { id:14, name:'Vitamin C Serum', category:'Beauty', price:29, rating:4.8, reviews:176, badge:'Bestseller', img:'assets/img/prod14_400x400.jpg', specs:{ Volume:'30ml', SkinType:'All' }, variants:[ {id:'14-1', attr:{Size:'30ml'}, price:29, stock:30} ] },
  { id:15, name:'Yoga Mat', category:'Sports', price:35, rating:4.6, reviews:92, img:'assets/img/prod15_400x400.jpg', specs:{ Material:'TPE', Thickness:'6mm' }, variants:[ {id:'15-p', attr:{Color:'Purple'}, price:35, stock:11}, {id:'15-g', attr:{Color:'Green'}, price:35, stock:8} ] },
  { id:16, name:'Bluetooth Speaker', category:'Electronics', price:59, oldPrice:79, rating:4.7, reviews:134, img:'assets/img/prod16_400x400.jpg', specs:{ Battery:'12 hours', Waterproof:'IPX7' }, variants:[ {id:'16-b', attr:{Color:'Black'}, price:59, stock:17}, {id:'16-r', attr:{Color:'Red'}, price:59, stock:6} ] },
];
PRODUCTS.forEach(expandProduct);

function load(key, fallback){ try { return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)); } catch(e){ return fallback; } }
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }



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
      image: (p.variantImages && combo.Color) ? p.variantImages[combo.Color] : (p.variantImages && combo.color ? p.variantImages[combo.color] : undefined),
    }));
  } else {
    p.variants = [{ id: p.id + '-default', attr: {}, price: p.price, stock: 99 }];
  }
  return p;
}

document.addEventListener('alpine:init', () => {
  Alpine.data('store', () => ({
    config: {
      storeName: 'Lumen',
      heroEyebrow: 'Spring 2026',
      heroTitle: 'Objects made to be kept.',
      heroSubtitle: 'Small-batch goods for everyday rituals. Sourced responsibly, built to last.',
      heroImage: 'assets/img/hero_900x1125.jpg',
      storyEyebrow: 'Our story',
      storyTitle: 'Made by hands, for hands.',
      storyText: 'We partner with small workshops to bring you pieces that carry the marks of their makers.',
    },
    mobileOpen: false,
    query: '',
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    query: '',
    heroIndex: 0,
    heroSlides: [
      { eyebrow:'Spring 2026', title:'Objects made to be kept.', subtitle:'Small-batch goods for everyday rituals. Sourced responsibly, built to last.', image:'assets/img/hero1_600x750.jpg', cta:'Shop the collection', link:'#products' },
      { eyebrow:'New arrivals', title:'Fresh from the studio.', subtitle:'Handcrafted ceramics and textiles just landed.', image:'assets/img/hero2_600x750.jpg', cta:'Explore new', link:'shop.html' },
      { eyebrow:'Limited edition', title:'One of a kind.', subtitle:'Numbered pieces from our maker partners.', image:'assets/img/hero3_600x750.jpg', cta:'View collection', link:'shop.html' },
    ],
    activeCat: 'all',
    wishlist: load('wishlist', []),
    cart: load('cart', []),
    email: '',
    subscribing: false,
    subscribed: false,
    toast: '',
    categories: [
      { name: 'Electronics', img: 'assets/img/catelec_400x400.jpg' },
      { name: 'Computers', img: 'assets/img/catcomp_400x400.jpg' },
      { name: 'Clothing', img: 'assets/img/catcloth_400x400.jpg' },
      { name: 'Grocery', img: 'assets/img/catgro_400x400.jpg' },
      { name: 'Home', img: 'assets/img/cathome_400x400.jpg' },
      { name: 'Beauty', img: 'assets/img/catbeau_400x400.jpg' },
      { name: 'Sports', img: 'assets/img/catsport_400x400.jpg' },
    ],
    get categoryNames(){ return [...new Set(PRODUCTS.map(p=>p.category))]; },
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      this.$watch('cart', v => save('cart', v));
      this.$watch('wishlist', v => save('wishlist', v));
      if(this.heroSlides.length > 1){
        this._heroTimer = setInterval(() => { this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length; }, 5000);
      }
    },
    nextHero(){ this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length; },
    prevHero(){ this.heroIndex = (this.heroIndex - 1 + this.heroSlides.length) % this.heroSlides.length; },
    featuredProduct(){ return PRODUCTS[0]; },
    filteredProducts(){
      let list = PRODUCTS;
      if(this.activeCat !== 'all') list = list.filter(p=>p.category===this.activeCat);
      if(this.query.trim()){
        const q = this.query.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      return list;
    },
    isWished(id){ return this.wishlist.some(x=>x.id===id); },
    toggleWish(p){
      const i = this.wishlist.findIndex(x=>x.id===p.id);
      if(i>-1) this.wishlist.splice(i,1);
      else this.wishlist.push({id:p.id,name:p.name,price:p.price,img:p.img,category:p.category});
    },
    addToCart(p){
      const v = (p.variants && p.variants.length) ? p.variants[0] : { id: p.id+'-default', attr:{}, price: p.price, stock: 99 };
      const ex = this.cart.find(i=>i.id===p.id && i.variantId===v.id);
      if(ex) ex.qty++; else this.cart.push({id:p.id,name:p.name,price:v.price,img:p.img,qty:1,variantId:v.id,variant:v.attr,stock:v.stock});
      this.toast = p.name + ' added to cart';
      clearTimeout(this._t); this._t = setTimeout(()=>this.toast='',2000);
    },
    inc(id){ const i=this.cart.find(x=>x.id===id); if(i) i.qty++; },
    dec(id){ const i=this.cart.find(x=>x.id===id); if(i){ i.qty--; if(i.qty<=0) this.removeItem(id);} },
    removeItem(id){ this.cart = this.cart.filter(x=>x.id!==id); },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    cartTotal(){ return this.cart.reduce((s,i)=>s+i.price*i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
    async subscribe(){
      this.subscribing = true;
      await new Promise(r=>setTimeout(r,900));
      this.subscribing = false;
      this.subscribed = true;
    }
  }));

  Alpine.data('cartPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      this.$watch('cart', v => save('cart', v));
      this.$watch('wishlist', v => save('wishlist', v));
    },
    inc(id){ const i=this.cart.find(x=>x.id===id); if(i) i.qty++; },
    dec(id){ const i=this.cart.find(x=>x.id===id); if(i){ i.qty--; if(i.qty<=0) this.removeItem(id);} },
    removeItem(id){ this.cart = this.cart.filter(x=>x.id!==id); },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    cartTotal(){ return this.cart.reduce((s,i)=>s+i.price*i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('wishlistPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      this.$watch('cart', v => save('cart', v));
      this.$watch('wishlist', v => save('wishlist', v));
    },
    remove(id){ this.wishlist = this.wishlist.filter(x=>x.id!==id); },
    moveToCart(p){
      const ex = this.cart.find(i=>i.id===p.id);
      if(ex) ex.qty++; else this.cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1});
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('checkoutPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    placing: false,
    success: false,
    form: { email:'', firstName:'', lastName:'', address:'', city:'', zip:'', card:'', expiry:'', cvc:'' },
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    cartTotal(){ return this.cart.reduce((s,i)=>s+i.price*i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
    async placeOrder(){
      if(this.cart.length===0) return;
      this.placing = true;
      await new Promise(r=>setTimeout(r,1200));
      const order = {
        id: 'ORD-' + Date.now().toString(36).toUpperCase(),
        date: new Date().toLocaleDateString(),
        items: this.cart.map(i=>({id:i.id,name:i.name,price:i.price,img:i.img,qty:i.qty})),
        subtotal: this.cartTotal(),
        shipping: 5,
        total: this.cartTotal()+5,
        status: 'Processing',
      };
      const orders = load('orders', []);
      orders.unshift(order);
      save('orders', orders);
      this.placing = false;
      this.success = true;
      localStorage.removeItem('cart');
      this.cart = [];
    }
  }));

  Alpine.data('ordersPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    orders: load('orders', []),
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      if(this.orders.length === 0){
        const sample = {
          id: 'ORD-DEMO123',
          date: new Date().toLocaleDateString(),
          items: [
            { id: PRODUCTS[0].id, name: PRODUCTS[0].name, price: PRODUCTS[0].price, img: PRODUCTS[0].img, qty: 1, variant: (PRODUCTS[0].variants && PRODUCTS[0].variants[0].attr) || {} },
            { id: PRODUCTS[5].id, name: PRODUCTS[5].name, price: PRODUCTS[5].price, img: PRODUCTS[5].img, qty: 2, variant: (PRODUCTS[5].variants && PRODUCTS[5].variants[0].attr) || {} },
            { id: PRODUCTS[8].id, name: PRODUCTS[8].name, price: PRODUCTS[8].price, img: PRODUCTS[8].img, qty: 3, variant: (PRODUCTS[8].variants && PRODUCTS[8].variants[0].attr) || {} },
          ],
          subtotal: PRODUCTS[0].price + PRODUCTS[5].price*2 + PRODUCTS[8].price*3,
          shipping: 5,
          total: PRODUCTS[0].price + PRODUCTS[5].price*2 + PRODUCTS[8].price*3 + 5,
          status: 'Shipped',
          shippingAddress: '123 Market St, San Francisco, CA 94103',
          paymentMethod: 'Visa ending in 4242',
          trackingNumber: 'TRK987654321',
        };
        this.orders = [sample];
        save('orders', this.orders);
      }
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('productPage', () => {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id'));
    const product = PRODUCTS.find(p=>p.id===id) || null;
    const firstV = (product && product.variants && product.variants.length) ? (product.variants.find(v=> (v.stock||0)>0) || product.variants[0]) : null;
    return {
      product,
      qty: 1,
      mediaIndex: 0,
      selectedAttrs: firstV ? { ...firstV.attr } : {},
      cart: load('cart', []),
      wishlist: load('wishlist', []),
      dark: localStorage.getItem('dark') === 'true',
      mobileOpen: false,
      userOpen: false,
      query: '',
      activeTab: 'reviews',
      reviews: [],
      newReview: { rating: 5, comment: '' },
      questions: [],
      newQuestion: '',
      faq: [],
      init(){
        if(this.dark) document.documentElement.classList.add('dark');
        this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
        this.$watch('cart', v => save('cart', v));
        this.$watch('wishlist', v => save('wishlist', v));
        if(this.product) document.title = this.product.name + ' — Store';
        const storedReviews = load('reviews_' + this.product.id, []);
        this.reviews = [...(this.product.reviewsList || []), ...storedReviews];
        const storedQs = load('questions_' + this.product.id, []);
        this.questions = [...(this.product.questionsList || []), ...storedQs];
        this.faq = this.product.faq || [];
      },
      addReview(){
        if(!this.newReview.comment.trim()) return;
        const r = { user:'You', rating: parseInt(this.newReview.rating), comment: this.newReview.comment, date: new Date().toLocaleDateString() };
        this.reviews.unshift(r);
        const stored = load('reviews_' + this.product.id, []);
        stored.unshift(r);
        save('reviews_' + this.product.id, stored);
        this.newReview = { rating: 5, comment: '' };
      },
      askQuestion(){
        if(!this.newQuestion.trim()) return;
        const q = { q: this.newQuestion, a: 'Thanks for your question! We\'ll answer soon.' };
        this.questions.unshift(q);
        const stored = load('questions_' + this.product.id, []);
        stored.unshift(q);
        save('questions_' + this.product.id, stored);
        this.newQuestion = '';
      },
      get selectedVariant(){
        if(!this.product || !this.product.variants) return null;
        return this.product.variants.find(v => Object.keys(this.selectedAttrs).every(k => v.attr[k]===this.selectedAttrs[k])) || this.product.variants[0];
      },
      get mediaList(){
        if(!this.product) return [];
        const list = (this.product.media && this.product.media.length) ? [...this.product.media] : [{ type:'image', src: this.product.img }];
        const v = this.selectedVariant;
        if(v && v.image && !list.some(m => m.src === v.image)) list.push({ type:'image', src: v.image });
        return list;
      },
      get variantKeys(){
        if(!this.product || !this.product.variants) return [];
        const keys = new Set();
        this.product.variants.forEach(v => Object.keys(v.attr||{}).forEach(k=>keys.add(k)));
        return [...keys];
      },
      variantValues(key){
        if(!this.product || !this.product.variants) return [];
        return [...new Set(this.product.variants.map(v => v.attr[key]).filter(x=>x!==undefined))];
      },
      selectAttr(key, value){
        if(!this.isOptionAvailable(key, value)) return;
        this.selectedAttrs = { ...this.selectedAttrs, [key]: value };
        const v = this.selectedVariant;
        if(v) this.selectedAttrs = { ...v.attr };
        const list = this.mediaList;
        if(v && v.image){
          const idx = list.findIndex(m => m.src === v.image);
          this.mediaIndex = idx >= 0 ? idx : 0;
        } else {
          this.mediaIndex = 0;
        }
      },
      isOptionAvailable(key, value){
        if(!this.product || !this.product.variants) return true;
        return this.product.variants.some(v => (v.stock||0) > 0 && v.attr[key] === value && Object.keys(this.selectedAttrs).every(k => k === key || v.attr[k] === this.selectedAttrs[k]));
      },
      isWished(){ return this.wishlist.some(x=>x.id===this.product.id); },
      toggleWish(){
        const i = this.wishlist.findIndex(x=>x.id===this.product.id);
        if(i>-1) this.wishlist.splice(i,1);
        else this.wishlist.push({id:this.product.id,name:this.product.name,price:this.product.price,img:this.product.img,category:this.product.category});
      },
      addToCart(){
        const v = this.selectedVariant || { id: this.product.id+'-default', attr:{}, price: this.product.price, stock: 99 };
        const ex = this.cart.find(i=>i.id===this.product.id && i.variantId===v.id);
        if(ex) ex.qty += this.qty; else this.cart.push({id:this.product.id,name:this.product.name,price:v.price,img:this.product.img,qty:this.qty,variantId:v.id,variant:v.attr,stock:v.stock});
      },
      related(){ if(!this.product) return []; return PRODUCTS.filter(p=>p.category===this.product.category && p.id!==this.product.id).slice(0,4); },
      cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
      wishlistCount(){ return this.wishlist.length; },
    };
  });

  Alpine.data('shopPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    query: '',
    userOpen: false,
    query: '', activeCat: 'all', maxPrice: 2000, sort: 'featured',
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      this.$watch('cart', v => save('cart', v));
      this.$watch('wishlist', v => save('wishlist', v));
    },
    get categoryNames(){ return [...new Set(PRODUCTS.map(p=>p.category))]; },
    filteredProducts(){
      let list = PRODUCTS.filter(p=>p.price<=this.maxPrice);
      if(this.activeCat !== 'all') list = list.filter(p=>p.category===this.activeCat);
      if(this.query.trim()){
        const q = this.query.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      if(this.sort==='price-asc') list.sort((a,b)=>a.price-b.price);
      if(this.sort==='price-desc') list.sort((a,b)=>b.price-a.price);
      if(this.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
      return list;
    },
    addToCart(p){
      const v = (p.variants && p.variants.length) ? p.variants[0] : { id: p.id+'-default', attr:{}, price: p.price, stock: 99 };
      const ex = this.cart.find(i=>i.id===p.id && i.variantId===v.id);
      if(ex) ex.qty++; else this.cart.push({id:p.id,name:p.name,price:v.price,img:p.img,qty:1,variantId:v.id,variant:v.attr,stock:v.stock});
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('aboutPage', () => ({
    cart: load('cart', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    userOpen: false,
    query: '',
    mobileOpen: false,
    query: '',
    userOpen: false,
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return 0; },
  }));

  Alpine.store('notifications', {
    items: load('notifications', [
      { id:1, title:'Welcome to Lumen', body:'Thanks for visiting our store. Enjoy free shipping on orders over $50.', date:'Today', read:false },
      { id:2, title:'Order shipped', body:'Your recent order has been shipped and is on its way.', date:'Yesterday', read:false },
      { id:3, title:'New arrivals', body:'Fresh ceramics just dropped. Take a look.', date:'2 days ago', read:true },
    ]),
    unreadCount(){ return this.items.filter(n=>!n.read).length; },
    markAllRead(){ this.items.forEach(n=>n.read=true); save('notifications', this.items); },
    remove(id){ this.items = this.items.filter(n=>n.id!==id); save('notifications', this.items); },
    clear(){ this.items=[]; save('notifications', []); },
  });

  Alpine.data('trackPage', () => ({
    cart: load('cart', []),
    wishlist: load('wishlist', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    userOpen: false,
    query: '',
    code: '',
    error: '',
    order: null,
    statuses: ['Processing', 'Shipped', 'Delivered'],
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
      const params = new URLSearchParams(location.search);
      if(load('orders', []).length === 0){
        const sample = {
          id: 'ORD-DEMO123',
          date: new Date().toLocaleDateString(),
          items: [
            { id: PRODUCTS[0].id, name: PRODUCTS[0].name, price: PRODUCTS[0].price, img: PRODUCTS[0].img, qty: 1, variant: (PRODUCTS[0].variants && PRODUCTS[0].variants[0].attr) || {} },
            { id: PRODUCTS[5].id, name: PRODUCTS[5].name, price: PRODUCTS[5].price, img: PRODUCTS[5].img, qty: 2, variant: (PRODUCTS[5].variants && PRODUCTS[5].variants[0].attr) || {} },
            { id: PRODUCTS[8].id, name: PRODUCTS[8].name, price: PRODUCTS[8].price, img: PRODUCTS[8].img, qty: 3, variant: (PRODUCTS[8].variants && PRODUCTS[8].variants[0].attr) || {} },
          ],
          subtotal: PRODUCTS[0].price + PRODUCTS[5].price*2 + PRODUCTS[8].price*3,
          shipping: 5,
          total: PRODUCTS[0].price + PRODUCTS[5].price*2 + PRODUCTS[8].price*3 + 5,
          status: 'Shipped',
          shippingAddress: '123 Market St, San Francisco, CA 94103',
          paymentMethod: 'Visa ending in 4242',
          trackingNumber: 'TRK987654321',
        };
        save('orders', [sample]);
      }
      const c = params.get('code');
      if(c){ this.code = c; this.track(); }
      else { this.code = 'ORD-DEMO123'; this.track(); }
    },
    track(){
      this.error = '';
      this.order = null;
      const orders = load('orders', []);
      const found = orders.find(o => o.id === this.code.trim());
      if(!found){ this.error = 'Order not found. Check the code and try again.'; return; }
      this.order = found;
    },
    stepIndex(){
      if(!this.order) return 0;
      const idx = this.statuses.indexOf(this.order.status);
      return idx >= 0 ? idx : 0;
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('contactPage', () => ({
    cart: load('cart', []),
    dark: localStorage.getItem('dark') === 'true',
    mobileOpen: false,
    userOpen: false,
    query: '',
    mobileOpen: false,
    query: '',
    userOpen: false,
    sending: false,
    sent: false,
    form: { name:'', email:'', subject:'', message:'' },
    init(){
      if(this.dark) document.documentElement.classList.add('dark');
      this.$watch('dark', v => { localStorage.setItem('dark', v); document.documentElement.classList.toggle('dark', v); });
    },
    async submit(){
      this.sending = true;
      await new Promise(r=>setTimeout(r,900));
      this.sending = false;
      this.sent = true;
      this.form = { name:'', email:'', subject:'', message:'' };
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return 0; },
  }));
});