const PRODUCTS = [
  { id:1, name:'Wireless Noise-Cancelling Headphones', category:'Electronics', price:199, oldPrice:249, rating:4.8, reviews:124, badge:'New', img:'https://picsum.photos/seed/prod1/600/600' },
  { id:2, name:'Smartphone 128GB', category:'Electronics', price:699, rating:4.7, reviews:89, img:'https://picsum.photos/seed/prod2/600/600' },
  { id:3, name:'Laptop 15" Core i7', category:'Computers', price:1099, oldPrice:1299, rating:4.9, reviews:58, badge:'Bestseller', img:'https://picsum.photos/seed/prod3/600/600' },
  { id:4, name:'Mechanical Keyboard', category:'Computers', price:89, rating:4.6, reviews:73, img:'https://picsum.photos/seed/prod4/600/600' },
  { id:5, name:'Gaming Mouse', category:'Computers', price:49, rating:4.5, reviews:41, badge:'Sale', img:'https://picsum.photos/seed/prod5/600/600' },
  { id:6, name:'Men\'s Casual T-Shirt', category:'Clothing', price:25, rating:4.4, reviews:210, img:'https://picsum.photos/seed/prod6/600/600' },
  { id:7, name:'Women\'s Denim Jacket', category:'Clothing', price:79, oldPrice:99, rating:4.7, reviews:67, img:'https://picsum.photos/seed/prod7/600/600' },
  { id:8, name:'Running Sneakers', category:'Clothing', price:110, rating:4.8, reviews:154, badge:'New', img:'https://picsum.photos/seed/prod8/600/600' },
  { id:9, name:'Organic Apples (1kg)', category:'Grocery', price:4.99, rating:4.9, reviews:312, img:'https://picsum.photos/seed/prod9/600/600' },
  { id:10, name:'Whole Wheat Bread', category:'Grocery', price:3.49, rating:4.6, reviews:98, img:'https://picsum.photos/seed/prod10/600/600' },
  { id:11, name:'Olive Oil 1L', category:'Grocery', price:12.99, oldPrice:15.99, rating:4.8, reviews:143, badge:'Sale', img:'https://picsum.photos/seed/prod11/600/600' },
  { id:12, name:'Stainless Steel Water Bottle', category:'Home', price:24, rating:4.7, reviews:88, img:'https://picsum.photos/seed/prod12/600/600' },
  { id:13, name:'LED Desk Lamp', category:'Home', price:39, rating:4.5, reviews:56, img:'https://picsum.photos/seed/prod13/600/600' },
  { id:14, name:'Vitamin C Serum', category:'Beauty', price:29, rating:4.8, reviews:176, badge:'Bestseller', img:'https://picsum.photos/seed/prod14/600/600' },
  { id:15, name:'Yoga Mat', category:'Sports', price:35, rating:4.6, reviews:92, img:'https://picsum.photos/seed/prod15/600/600' },
  { id:16, name:'Bluetooth Speaker', category:'Electronics', price:59, oldPrice:79, rating:4.7, reviews:134, img:'https://picsum.photos/seed/prod16/600/600' },
];

function load(key, fallback){ try { return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)); } catch(e){ return fallback; } }
function save(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

document.addEventListener('alpine:init', () => {
  Alpine.data('store', () => ({
    config: {
      storeName: 'Lumen',
      heroEyebrow: 'Spring 2026',
      heroTitle: 'Objects made to be kept.',
      heroSubtitle: 'Small-batch goods for everyday rituals. Sourced responsibly, built to last.',
      heroImage: 'https://picsum.photos/seed/hero/900/1125',
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
      { eyebrow:'Spring 2026', title:'Objects made to be kept.', subtitle:'Small-batch goods for everyday rituals. Sourced responsibly, built to last.', image:'https://picsum.photos/seed/hero1/900/1125', cta:'Shop the collection', link:'#products' },
      { eyebrow:'New arrivals', title:'Fresh from the studio.', subtitle:'Handcrafted ceramics and textiles just landed.', image:'https://picsum.photos/seed/hero2/900/1125', cta:'Explore new', link:'shop.html' },
      { eyebrow:'Limited edition', title:'One of a kind.', subtitle:'Numbered pieces from our maker partners.', image:'https://picsum.photos/seed/hero3/900/1125', cta:'View collection', link:'shop.html' },
    ],
    activeCat: 'all',
    wishlist: load('wishlist', []),
    cart: load('cart', []),
    email: '',
    subscribing: false,
    subscribed: false,
    toast: '',
    categories: [
      { name: 'Electronics', img: 'https://picsum.photos/seed/catelec/600/600' },
      { name: 'Computers', img: 'https://picsum.photos/seed/catcomp/600/600' },
      { name: 'Clothing', img: 'https://picsum.photos/seed/catcloth/600/600' },
      { name: 'Grocery', img: 'https://picsum.photos/seed/catgro/600/600' },
      { name: 'Home', img: 'https://picsum.photos/seed/cathome/600/600' },
      { name: 'Beauty', img: 'https://picsum.photos/seed/catbeau/600/600' },
      { name: 'Sports', img: 'https://picsum.photos/seed/catsport/600/600' },
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
      const ex = this.cart.find(i=>i.id===p.id);
      if(ex) ex.qty++; else this.cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1});
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
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('productPage', () => {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id'));
    const product = PRODUCTS.find(p=>p.id===id) || null;
    return {
      product,
      qty: 1,
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
        if(this.product) document.title = this.product.name + ' — Store';
      },
      isWished(){ return this.wishlist.some(x=>x.id===this.product.id); },
      toggleWish(){
        const i = this.wishlist.findIndex(x=>x.id===this.product.id);
        if(i>-1) this.wishlist.splice(i,1);
        else this.wishlist.push({id:this.product.id,name:this.product.name,price:this.product.price,img:this.product.img,category:this.product.category});
      },
      addToCart(){
        const ex = this.cart.find(i=>i.id===this.product.id);
        if(ex) ex.qty += this.qty; else this.cart.push({id:this.product.id,name:this.product.name,price:this.product.price,img:this.product.img,qty:this.qty});
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
      const ex = this.cart.find(i=>i.id===p.id);
      if(ex) ex.qty++; else this.cart.push({id:p.id,name:p.name,price:p.price,img:p.img,qty:1});
    },
    cartCount(){ return this.cart.reduce((s,i)=>s+i.qty,0); },
    wishlistCount(){ return this.wishlist.length; },
  }));

  Alpine.data('aboutPage', () => ({
    cart: load('cart', []),
    dark: localStorage.getItem('dark') === 'true',
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

  Alpine.data('contactPage', () => ({
    cart: load('cart', []),
    dark: localStorage.getItem('dark') === 'true',
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