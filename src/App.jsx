import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Instagram, Tiktok, Twitter, X as XIcon, Menu } from 'lucide-react'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#shop', label: 'Shop' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

const backendURL = import.meta.env.VITE_BACKEND_URL || ''

function useFetch(url, fallback = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(!!url)
  useEffect(() => {
    let active = true
    async function run() {
      if (!url) return
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (active) setData(Array.isArray(json) ? json : json?.items || fallback)
      } catch (e) {
        // silent fallback
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => {
      active = false
    }
  }, [url])
  return { data, loading }
}

const SAMPLE_PRODUCTS = [
  {
    title: 'Monochrome Crest Tee',
    description: 'Premium heavyweight cotton, timeless silhouette.',
    price: 45,
    category: 'T-shirt',
    images: ['https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop'],
    colors: ['Black', 'White'],
    sizes: ['S','M','L','XL'],
    featured: true,
  },
  {
    title: 'Urban Halo Hoodie',
    description: 'Fleece-lined comfort with refined minimal branding.',
    price: 89,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1548883354-7622d2d08c47?q=80&w=1400&auto=format&fit=crop'],
    colors: ['Charcoal'],
    sizes: ['S','M','L','XL'],
  },
  {
    title: 'Shadowline Cargo',
    description: 'Tailored cargo fit with matte hardware details.',
    price: 98,
    category: 'Pants',
    images: ['https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1400&auto=format&fit=crop'],
    colors: ['Obsidian'],
    sizes: ['28','30','32','34','36'],
  },
  {
    title: 'Minimal Cap',
    description: 'Structured 6-panel with tonal embroidery.',
    price: 39,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1400&auto=format&fit=crop'],
    colors: ['Black'],
    sizes: ['OS'],
  }
]

const SAMPLE_LOOKBOOK = [
  {
    title: 'Noir Study I',
    image: 'https://images.unsplash.com/photo-1761821170104-ccd3e3e21318?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI3OTMyMDJ8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    season: 'AW',
  },
  {
    title: 'Concrete Poem',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    season: 'SS',
  },
  {
    title: 'Edge Line',
    image: 'https://images.unsplash.com/photo-1694933052046-890d75d31cd9?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxFZGdlJTIwTGluZXxlbnwwfDB8fHwxNzYyNzkzMjAyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    season: 'AW',
  },
]

const SAMPLE_TESTIMONIALS = [
  { name: 'Dimas', quote: 'Rebirth of Street Elegance — potongan dan materialnya berkelas.', rating: 5 },
  { name: 'Alya', quote: 'Where Street Meets Soul. Nyaman dipakai, styling jadi effortless.', rating: 5 },
  { name: 'Raka', quote: 'Redefining Modern Streetwear. Clean, bold, confident.', rating: 5 },
]

function Header({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-widest text-xl sm:text-2xl">RESSURRECCION</a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="uppercase text-xs tracking-wider text-black/70 hover:text-black transition">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={onOpenCart} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-[10px] grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden bg-white border-t border-black/10">
            <div className="max-w-7xl mx-auto px-4 py-3 grid gap-2">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 uppercase text-xs tracking-wider text-black/80 hover:text-black">
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] grid place-items-center bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="uppercase tracking-[0.3em] text-xs text-black/60">
          Rebirth of Street Elegance
        </motion.p>
        <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          Streetwear, Refined.
        </motion.h1>
        <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-black/70">
          Ressurreccion memadukan gaya urban dengan sentuhan elegan. Minimal, tegas, dan berkelas.
        </motion.p>
        <motion.a initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} href="#shop" className="inline-block mt-10 bg-black text-white px-6 py-3 uppercase tracking-wider text-xs rounded hover:bg-neutral-800 transition">
          Shop Now
        </motion.a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Tentang Ressurreccion</h2>
          <p className="mt-6 text-black/70 leading-relaxed">
            "Ressurreccion" berarti kebangkitan — sebuah filosofi tentang berani memulai ulang, membangun kepercayaan diri, dan menemukan wujud terbaik diri. Kami menghadirkan streetwear premium dengan konstruksi rapi, material berkualitas, dan estetika minimal yang bertahan lintas musim.
          </p>
          <ul className="mt-6 space-y-2 text-black/70">
            <li>• Kualitas premium, detail presisi</li>
            <li>• Siluet bersih dengan sentuhan elegan</li>
            <li>• Dirancang untuk mobilitas urban</li>
          </ul>
        </div>
        <div className="aspect-[4/5] bg-neutral-100 overflow-hidden rounded">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop" alt="Model wearing Ressurreccion" />
        </div>
      </div>
    </section>
  )
}

function ProductCard({ item, onAdd }) {
  const img = item?.images?.[0]
  return (
    <motion.div layout className="group border border-black/10 rounded-lg overflow-hidden bg-white">
      <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
        <img src={img} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm">${item.price}</p>
        </div>
        <p className="mt-1 text-sm text-black/60 line-clamp-2">{item.description}</p>
        <button onClick={() => onAdd(item)} className="mt-4 w-full bg-black text-white py-2 text-xs uppercase tracking-wider rounded hover:bg-neutral-800">
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

function Shop({ onAdd }) {
  const { data: products } = useFetch(backendURL ? `${backendURL}/api/products` : '', SAMPLE_PRODUCTS)
  const categories = ['All', 'T-shirt', 'Outerwear', 'Pants', 'Accessories']
  const [active, setActive] = useState('All')
  const filtered = useMemo(() => products.filter(p => active === 'All' || p.category === active), [products, active])

  return (
    <section id="shop" className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Koleksi</h2>
            <p className="mt-2 text-black/60">Premium streetwear: T-shirt, Outerwear, Pants, Accessories</p>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-3 py-2 text-xs uppercase tracking-wider rounded border ${active === c ? 'bg-black text-white border-black' : 'border-black/10 text-black/70 hover:text-black'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <ProductCard key={item.title + i} item={item} onAdd={onAdd} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Lookbook() {
  const { data } = useFetch(backendURL ? `${backendURL}/api/lookbook` : '', SAMPLE_LOOKBOOK)
  const items = data?.length ? data : SAMPLE_LOOKBOOK
  return (
    <section id="lookbook" className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Lookbook</h2>
          <p className="text-black/60">Editorial dengan tone artistik dan moody</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((lb, i) => (
            <div key={i} className="group overflow-hidden rounded border border-black/10">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
                <img src={lb.image} alt={lb.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="font-medium">{lb.title}</p>
                <span className="text-xs text-black/60">{lb.season}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const { data } = useFetch(backendURL ? `${backendURL}/api/testimonials` : '', SAMPLE_TESTIMONIALS)
  const items = data?.length ? data : SAMPLE_TESTIMONIALS
  return (
    <section id="reviews" className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Testimoni</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="border border-black/10 rounded p-6 bg-white">
              <p className="text-black/80">“{t.quote}”</p>
              <p className="mt-4 text-sm text-black/60">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('')
  async function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
    }
    try {
      if (!backendURL) throw new Error('No backend URL')
      const res = await fetch(`${backendURL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Terima kasih! Pesanmu sudah kami terima.')
      e.currentTarget.reset()
    } catch {
      setStatus('Tidak dapat mengirim saat ini. Coba lagi nanti.')
    }
  }
  return (
    <section id="contact" className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Kontak</h2>
          <p className="mt-4 text-black/70">Kolaborasi, pertanyaan produk, atau kemitraan — kami siap berbicara.</p>
          <div className="mt-6 flex items-center gap-4 text-black/70">
            <a className="inline-flex items-center gap-2 hover:text-black" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4"/> Instagram</a>
            <a className="inline-flex items-center gap-2 hover:text-black" href="https://tiktok.com" target="_blank" rel="noreferrer"><Tiktok className="h-4 w-4"/> TikTok</a>
            <a className="inline-flex items-center gap-2 hover:text-black" href="https://x.com" target="_blank" rel="noreferrer"><Twitter className="h-4 w-4"/> X</a>
          </div>
          <p className="mt-6 text-sm text-black/60">Email bisnis: hello@ressurreccion.co</p>
        </div>
        <form onSubmit={submit} className="border border-black/10 rounded p-6 bg-white">
          <div className="grid gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-black/60">Nama</label>
              <input name="name" required className="mt-1 w-full border border-black/10 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-black/60">Email</label>
              <input type="email" name="email" required className="mt-1 w-full border border-black/10 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-black/60">Pesan</label>
              <textarea name="message" rows="4" required className="mt-1 w-full border border-black/10 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <button className="mt-2 bg-black text-white px-6 py-3 uppercase tracking-wider text-xs rounded hover:bg-neutral-800">Kirim</button>
            {status && <p className="text-sm text-black/60">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-black/60">© {new Date().getFullYear()} Ressurreccion. All Rights Reserved.</p>
        <div className="flex items-center gap-4 text-black/70">
          <a className="hover:text-black" href="mailto:hello@ressurreccion.co">hello@ressurreccion.co</a>
          <a className="hover:text-black" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4"/></a>
          <a className="hover:text-black" href="https://tiktok.com" target="_blank" rel="noreferrer"><Tiktok className="h-4 w-4"/></a>
          <a className="hover:text-black" href="https://x.com" target="_blank" rel="noreferrer"><Twitter className="h-4 w-4"/></a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const total = cart.reduce((s, i) => s + (i.price || 0), 0)

  function addToCart(item) {
    setCart((c) => [...c, item])
    setCartOpen(true)
  }
  function removeFromCart(idx) {
    setCart((c) => c.filter((_, i) => i !== idx))
  }

  useEffect(() => {
    const handler = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Shop onAdd={addToCart} />
        <Lookbook />
        <Reviews />
        <Contact />
      </main>
      <Footer />

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.aside initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ type: 'tween', duration: 0.25 }} className="fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white shadow-2xl z-[60] border-l border-black/10">
            <div className="h-16 px-4 border-b border-black/10 flex items-center justify-between">
              <p className="font-semibold tracking-wide">Cart</p>
              <button onClick={() => setCartOpen(false)} className="text-black/70 hover:text-black"><XIcon className="h-5 w-5"/></button>
            </div>
            <div className="p-4 h-[calc(100%-8rem)] overflow-auto">
              {cart.length === 0 ? (
                <p className="text-sm text-black/60">Your cart is empty.</p>
              ) : (
                <div className="grid gap-3">
                  {cart.map((it, idx) => (
                    <div key={idx} className="flex gap-3 border border-black/10 rounded p-3">
                      <div className="h-16 w-16 bg-neutral-100 overflow-hidden rounded">
                        <img src={it.images?.[0]} alt={it.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{it.title}</p>
                        <p className="text-xs text-black/60">${it.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-xs text-black/60 hover:text-black">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="h-16 px-4 border-t border-black/10 flex items-center justify-between">
              <p className="font-medium">Total</p>
              <p className="font-semibold">${total.toFixed(2)}</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </div>
  )
}
