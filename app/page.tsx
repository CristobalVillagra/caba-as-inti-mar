'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight, CalendarDays, Camera, ChevronDown, ChevronLeft, ChevronRight, MapPin, Menu,
  Trees, Waves, X,
} from 'lucide-react'
import { BookingDialog, type CabinTypeId } from '@/components/booking-dialog'

const images = {
  logo: '/images/logo-inti-mar-original.jpg',
  lounge: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L9CIqlU0V0mgkRSBlxgHQf1KGkjhyH.png',
  cabin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tgHgvtx9A9O1oK209WEnW9Vase4DWX.png',
  bathroom: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8ybrTzm9IsbhDETO2b7Qdsv9mImfQC.png',
  bahia1: '/images/hero-costa-1.png',
  bahia2: '/images/hero-costa-2.png',
  entrada: '/images/hero-fachada.png',
}

const slides = [
  { src: images.bahia1, alt: 'Bahía, playa y bosque del litoral central', tag: 'Bahía y playa', title: 'El mar como punto de partida.' },
  { src: images.bahia2, alt: 'Vista amplia de la bahía en El Quisco', tag: 'Costa y arena', title: 'Camina hasta encontrar tu orilla.' },
  { src: images.entrada, alt: 'Fachada y acceso de Cabañas Inti Mar', tag: 'Bienvenida', title: 'Tu descanso comienza aquí.' },
]

const coastPhotos = [
  { src: '/images/costa-rollo/costa-acantilado.jpg', alt: 'Sendero costero entre acantilados, vegetación y mar' },
  { src: '/images/costa-rollo/pradera-el-quisco.jpg', alt: 'Pradera de flores amarillas y casas de El Quisco' },
  { src: '/images/costa-rollo/roca-costera.jpg', alt: 'Formación rocosa frente al océano' },
  { src: '/images/costa-rollo/roquerios-y-oleaje.jpg', alt: 'Oleaje y roqueríos del litoral central' },
  { src: '/images/costa-rollo/jardin-con-vista-al-mar.jpg', alt: 'Jardín florido con vista al océano' },
  { src: '/images/costa-rollo/gruta-costera.jpg', alt: 'Gruta junto al paseo costero de El Quisco' },
  { src: '/images/costa-rollo/panoramica-playa.jpg', alt: 'Vista panorámica de la playa de El Quisco' },
]

const instagramUrl = 'https://instagram.com/cabanasintimar_quisco'
const mapsUrl = 'https://maps.app.goo.gl/Ye5rdj3BPsQdEvxK7'
const mapsEmbedUrl = 'https://www.google.com/maps?q=Caba%C3%B1as+Inti+Mar,+El+Quisco,+Chile&output=embed'
const whatsappUrl = 'https://wa.me/56961683507?text=Hola%2C%20quiero%20consultar%20por%20una%20caba%C3%B1a%2C%20sus%20tarifas%20y%20valores%20promocionales%20en%20Inti%20Mar.'

function PhotoRollCarousel() {
  const [activePhoto, setActivePhoto] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActivePhoto(current => (current + 1) % coastPhotos.length), 3000)
    return () => window.clearInterval(timer)
  }, [paused])

  const move = (direction: number) => setActivePhoto(current => (current + direction + coastPhotos.length) % coastPhotos.length)

  return (
    <div className="photo-roll" role="region" aria-roledescription="carrusel" aria-label="Fotos de la costa de El Quisco" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}>
      <div className="photo-roll-stage">
        {coastPhotos.map((photo, index) => {
          const relative = (index - activePhoto + coastPhotos.length) % coastPhotos.length
          const offset = relative > coastPhotos.length / 2 ? relative - coastPhotos.length : relative
          const scale = offset === 0 ? 1 : Math.abs(offset) === 1 ? .76 : Math.abs(offset) === 2 ? .58 : .46
          const brightness = offset === 0 ? 1.08 : Math.abs(offset) === 1 ? .62 : .4
          const opacity = Math.abs(offset) === 3 ? 0 : Math.abs(offset) === 2 ? .48 : 1
          return (
            <figure className={`photo-roll-card ${offset === 0 ? 'photo-roll-active' : 'photo-roll-side'}`} key={photo.src} aria-hidden={offset !== 0} style={{ transform: `translate(calc(-50% + ${offset * 31}vw), -50%) scale(${scale})`, filter: `brightness(${brightness})`, opacity, zIndex: Math.max(0, 3 - Math.abs(offset)) }}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 88vw, 62vw" priority={index === 0} />
              {offset === 0 && <figcaption>{photo.alt}</figcaption>}
            </figure>
          )
        })}
        <button className="photo-roll-arrow photo-roll-prev" onClick={() => move(-1)} aria-label="Ver foto anterior"><ChevronLeft size={22} /></button>
        <button className="photo-roll-arrow photo-roll-next" onClick={() => move(1)} aria-label="Ver foto siguiente"><ChevronRight size={22} /></button>
      </div>
      <div className="photo-roll-footer">
        <div className="photo-roll-dots" aria-label="Elegir foto">
          {coastPhotos.map((photo, index) => <button key={photo.src} className={index === activePhoto ? 'active' : ''} onClick={() => setActivePhoto(index)} aria-label={`Mostrar ${photo.alt}`} aria-current={index === activePhoto} />)}
        </div>
        <span>LA COSTA DE EL QUISCO, A TU RITMO</span>
      </div>
    </div>
  )
}

const reviews = [
  'Un lugar muy grato para compartir en familia: acogedor, limpio y bien equipado, con muy buena ubicación.',
  'La cabaña estaba impecable y muy bien equipada. Tranquilo, cómodo, y el anfitrión siempre pendiente de todo.',
  'Lugar tranquilo, bonito y con todas las comodidades. Lo recomendamos sin dudarlo para volver en familia.',
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingType, setBookingType] = useState<CabinTypeId>('tradicional')
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0]?.clientX - touchStartX.current
    if (Math.abs(deltaX) > 45) setSlide(current => (current + (deltaX < 0 ? 1 : -1) + slides.length) % slides.length)
    touchStartX.current = null
  }

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % slides.length), 5200)
    return () => clearInterval(timer)
  }, [])


  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Cabañas Inti Mar, inicio">
          <Image src={images.logo} alt="Logo Cabañas Inti Mar" width={116} height={86} className="brand-logo" priority />
        </a>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Quiénes somos</a>
          <a href="/cabanas" onClick={() => setMenuOpen(false)}>Cabañas</a>
          <a href="#entorno" onClick={() => setMenuOpen(false)}>Qué visitar</a>
          <a href="#ubicacion" onClick={() => setMenuOpen(false)}>Ubicación</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
        </nav>
        <button className="header-cta" onClick={() => { setBookingType('tradicional'); setBookingOpen(true) }}>Reservar <ArrowUpRight size={16} /></button>
        <button className="menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} id="inicio">
        {slides.map((item, i) => (
          <Image key={item.src} src={item.src} alt={item.alt} fill priority={i === 0} className={`hero-image ${i === slide ? 'hero-image-active' : ''}`} sizes="100vw" />
        ))}
        <div className="hero-shade" />
        <div className="hero-slide-caption" key={slide}>
          <span>{slides[slide].tag}</span>
          <strong>{slides[slide].title}</strong>
        </div>
        <div className="hero-content">
          <h1>Respira.<br /><em>Estás en Inti Mar.</em></h1>
          <p>Una pausa sencilla y luminosa en El Quisco, para volver a lo esencial.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => { setBookingType('tradicional'); setBookingOpen(true) }}>Ver disponibilidad <ArrowUpRight size={17} /></button>
            <a className="text-link light-link" href="#entorno">Descubre el entorno <ChevronDown size={17} /></a>
          </div>
        </div>
        <div className="hero-dots" aria-label="Seleccionar imagen">
          {slides.map((item, i) => (
            <button key={item.src} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Ver ${item.tag}`} />
          ))}
        </div>
        <div className="hero-note"><span>El Quisco · Chile</span><span>Litoral central</span></div>
      </section>

      {/* ===== Quiénes somos + ventajas + actividades (sección combinada) ===== */}
      <section className="intro section-pad" id="experiencia">
        <div className="eyebrow"><span className="eyebrow-line" /> La calma tiene un lugar</div>
        <div className="intro-grid">
          <h2>Un rincón tranquilo,<br /><em>a cuadras del mar.</em></h2>
          <div className="intro-copy">
            <p>Inti Mar nació como un proyecto familiar en El Quisco: cinco cabañas de construcción tradicional en madera, rodeadas de jardín, pensadas para quienes buscan un descanso genuino más que una fiesta. Nada de ruido ni aglomeración — solo el clima costero, tiempo en familia y la playa a un paseo corto.</p>
            <p>Cada cabaña cuenta con cocina equipada, baño privado, TV y terraza con vista al jardín. Atendemos personalmente cada reserva, para que la única decisión difícil sea a qué playa ir primero.</p>
          </div>
        </div>

        <div className="values-grid">
          <a className="value" href="/cabanas">
            <span className="value-icon"><Waves size={21} /></span>
            <div><h3>5 Cabañas disponibles</h3><p>Conoce las ventajas de cada una.</p></div>
          </a>
          <a className="value" href="#entorno">
            <span className="value-icon"><MapPin size={20} /></span>
            <div><h3>12 min 🚶 a la playa</h3><p>Mira las fotos del entorno.</p></div>
          </a>
          <a className="value" href="#actividades">
            <span className="value-icon"><Trees size={20} /></span>
            <div><h3>Jardín, juegos y quincho</h3><p>Espacios para disfrutar juntos.</p></div>
          </a>
        </div>

        <div className="activities-block" id="actividades">
          <div className="eyebrow"><span className="eyebrow-line" /> Tiempo para jugar</div>
          <h3 className="activities-title">Momentos que se quedan en familia.</h3>
          <p className="activities-copy">Mientras los niños juegan, tú bajas el ritmo. En Inti Mar hay espacios para compartir sin salir de casa.</p>
          <div className="amenity-list light">
            <div><span>01</span><strong>Juegos infantiles</strong><p>Un rincón seguro para imaginar y jugar.</p></div>
            <div><span>02</span><strong>Quincho familiar</strong><p>Parrilla y mesa para celebrar juntos.</p></div>
            <div><span>03</span><strong>Jardín tranquilo</strong><p>Espacio verde para leer, conversar y descansar.</p></div>
          </div>
        </div>
      </section>

      {/* ===== Entorno: cada foto lleva a "ventajas del exterior" ===== */}
      <section className="entorno section-pad" id="entorno">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> Una ubicación para explorar</div>
            <h2>Miradores, caminatas<br /><em>y mar abierto.</em></h2>
          </div>
          <p>Una mirada al litoral que rodea Inti Mar: miradores, senderos y mar abierto.</p>
        </div>
        <PhotoRollCarousel />
        <div className="coast-map-link"><Waves size={18} /><span>Una base tranquila para conocer El Quisco, Algarrobo y el litoral central.</span><a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">Ver en Maps <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="location section-pad" id="ubicacion">
        <div className="location-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Ven a respirar</div>
          <h2>La costa<br /><em>te espera.</em></h2>
          <p>Estamos en El Quisco, cerca de playas, miradores y atardeceres que no necesitan filtro.</p>
          <a className="button button-primary" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> Abrir ubicación en Google Maps <ArrowUpRight size={17} /></a>
        </div>
        <div className="map-embed">
          <iframe src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Cabañas Inti Mar en el mapa" allowFullScreen />
        </div>
      </section>

      <section className="reviews section-pad" id="opiniones">
        <div className="reviews-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> Lo que dicen nuestros huéspedes</div>
          <h2>Familias que ya<br /><em>encontraron su calma.</em></h2>
          <div className="rating"><strong>9.8</strong><span>Excelente valoración<small>Opiniones de huéspedes</small></span></div>
        </div>
        <div className="review-grid">
          {reviews.map(quote => (
            <article className="review-card" key={quote}>
              <div className="stars">★★★★★</div>
              <p>&ldquo;{quote}&rdquo;</p>
              <footer>Huésped de Inti Mar</footer>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-cta">
        <div className="sun-mark">✳</div>
        <div className="eyebrow centered"><span className="eyebrow-line" /> Tu descanso comienza aquí <span className="eyebrow-line" /></div>
        <h2>Reserva tu descanso<br /><em>en el litoral.</em></h2>
        <p>Elige tus fechas y ven a vivir unos días de calma junto al mar.</p>
        <p className="promo-copy">Para más información sobre valores promocionales, contáctanos por WhatsApp.</p>
        <div className="cta-actions">
          <button className="button button-wood" onClick={() => { setBookingType('tradicional'); setBookingOpen(true) }}><CalendarDays size={17} /> Reservar en el sitio <ArrowUpRight size={17} /></button>
          <a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">Escribir por WhatsApp +56 9 6168 3507</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <a href="#inicio" aria-label="Volver al inicio" className="footer-logo-link"><Image src={images.logo} alt="Logo Cabañas Inti Mar" width={142} height={106} className="footer-logo" /></a>
          <p>Un lugar para volver a ti.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explora</span>
            <a href="#experiencia">Quiénes somos</a>
            <a href="/cabanas">Las cabañas</a>
            <a href="#entorno">Qué visitar</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
          <div>
            <span>Conecta</span>
            <a href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={15} /> @cabanasintimar</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +56 9 6168 3507</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Inti Mar · Desarrollado por <a href="https://aintegration.cl" target="_blank" rel="noreferrer">aintegration.cl</a></span>
          <span>El Quisco, Chile</span>
        </div>
      </footer>

      {bookingOpen && <BookingDialog initialCabin={bookingType} onClose={() => setBookingOpen(false)} />}
    </main>
  )
}
