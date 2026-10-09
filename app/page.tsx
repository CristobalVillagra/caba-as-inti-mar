'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Accessibility, ArrowUpRight, Bath, BedDouble, CalendarDays, Camera, Check,
  ChevronDown, ChevronLeft, ChevronRight, MapPin, Menu, Minus, Plus,
  ShowerHead, Trees, Waves, X,
} from 'lucide-react'

const images = {
  logo: '/images/logo-inti-mar.png',
  lounge: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L9CIqlU0V0mgkRSBlxgHQf1KGkjhyH.png',
  cabin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tgHgvtx9A9O1oK209WEnW9Vase4DWX.png',
  bathroom: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8ybrTzm9IsbhDETO2b7Qdsv9mImfQC.png',
  coast: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lNa3m4hhIj93rNuoatuhF7ckZXmDkC.png',
  rock: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ee4L4YBJhUl23nHc8YiVChMeLwPTKf.png',
  bahia1: '/images/hero-costa-1.png',
  bahia2: '/images/hero-costa-2.png',
  entrada: '/images/hero-fachada.png',
}

const slides = [
  { src: images.bahia1, alt: 'Bahía, playa y bosque del litoral central', tag: '01 · Bahía y playa', title: 'El mar como punto de partida.' },
  { src: images.bahia2, alt: 'Vista amplia de la bahía en El Quisco', tag: '02 · Costa y arena', title: 'Camina hasta encontrar tu orilla.' },
  { src: images.entrada, alt: 'Fachada y acceso de Cabañas Inti Mar', tag: '03 · Bienvenida', title: 'Tu descanso comienza aquí.' },
]

const bookingUrl = 'https://www.booking.com/hotel/cl/inti-mar.es.html'
const instagramUrl = 'https://instagram.com/cabanasintimar_quisco'
const mapsUrl = 'https://maps.app.goo.gl/Ye5rdj3BPsQdEvxK7'
const mapsEmbedUrl = 'https://www.google.com/maps?q=Caba%C3%B1as+Inti+Mar,+El+Quisco,+Chile&output=embed'
const whatsappUrl = 'https://wa.me/56995439583?text=Hola%2C%20quiero%20consultar%20por%20una%20cabaña%20en%20Inti%20Mar.'

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
}

function BookingCart({ onClose }: { onClose: () => void }) {
  const [nights, setNights] = useState(2)
  const [guests, setGuests] = useState(2)
  const [tinaja, setTinaja] = useState(false)
  return (
    <div className="booking-widget">
      <div className="booking-widget-head">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" /> Reserva tu cabaña</span>
          <h3>Arma tu descanso</h3>
        </div>
        <button className="close-booking" onClick={onClose} aria-label="Cerrar reserva"><X size={18} /></button>
      </div>
      <div className="booking-fields">
        <label>Entrada<input type="date" defaultValue="2026-10-10" /></label>
        <label>Salida<input type="date" defaultValue="2026-10-12" /></label>
      </div>
      <label className="cabin-select">Tipo de cabaña
        <select>
          <option>Cabaña tradicional</option>
          <option>Cabaña con tinaja (adaptada)</option>
        </select>
      </label>
      <label className="check-option">
        <input type="checkbox" checked={tinaja} onChange={e => setTinaja(e.target.checked)} /> Agregar tinaja privada <span>+$25.000 / noche</span>
      </label>
      <div className="booking-stepper">
        <span>Noches</span>
        <div>
          <button onClick={() => setNights(Math.max(1, nights - 1))} aria-label="Disminuir noches"><Minus size={15} /></button>
          <strong>{nights}</strong>
          <button onClick={() => setNights(nights + 1)} aria-label="Aumentar noches"><Plus size={15} /></button>
        </div>
      </div>
      <div className="booking-stepper">
        <span>Huéspedes</span>
        <div>
          <button onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Disminuir huéspedes"><Minus size={15} /></button>
          <strong>{guests}</strong>
          <button onClick={() => setGuests(Math.min(8, guests + 1))} aria-label="Aumentar huéspedes"><Plus size={15} /></button>
        </div>
      </div>
      <div className="booking-total">
        <span>Desde <b>${((65000 + (tinaja ? 25000 : 0)) * nights).toLocaleString('es-CL')}</b></span>
        <small>por {nights} noches · {guests} huéspedes</small>
      </div>
      <a className="button button-primary full-button" href={bookingUrl} target="_blank" rel="noreferrer">Consultar disponibilidad <ArrowUpRight size={16} /></a>
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
          <a href="#cabanas" onClick={() => setMenuOpen(false)}>Cabañas</a>
          <a href="#entorno" onClick={() => setMenuOpen(false)}>Qué visitar</a>
          <a href="#ubicacion" onClick={() => setMenuOpen(false)}>Ubicación</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
        </nav>
        <button className="header-cta" onClick={() => setBookingOpen(true)}>Reservar <ArrowUpRight size={16} /></button>
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
          <Pill><Waves size={15} /> Un refugio junto al mar</Pill>
          <h1>Respira.<br /><em>Estás en Inti Mar.</em></h1>
          <p>Una pausa sencilla y luminosa en El Quisco, para volver a lo esencial.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => setBookingOpen(true)}>Ver disponibilidad <ArrowUpRight size={17} /></button>
            <a className="text-link light-link" href="#entorno">Descubre el entorno <ChevronDown size={17} /></a>
          </div>
        </div>
        <div className="hero-controls">
          <button onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Foto anterior"><ChevronLeft size={17} /></button>
          <span>{String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Foto siguiente"><ChevronRight size={17} /></button>
        </div>
        <div className="hero-dots" aria-label="Seleccionar imagen">
          {slides.map((item, i) => (
            <button key={item.src} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Ver ${item.tag}`} />
          ))}
        </div>
        <div className="hero-note"><span>El Quisco · Chile</span><span>Pacífico central</span></div>
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
          <a className="value" href="#cabanas">
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
          <p>Haz clic en una foto para ver todas las ventajas del entorno de Inti Mar.</p>
        </div>
        <div className="places-grid">
          <a className="place place-large" href="#exterior" aria-label="Ver ventajas del exterior">
            <Image src={images.rock} alt="Mirador rocoso de El Quisco" fill sizes="50vw" />
            <div><span>01 · A pie</span><h3>Miradores de la costa</h3><p>Rocas, horizonte abierto y atardeceres a pocos minutos.</p></div>
          </a>
          <a className="place" href="#exterior" aria-label="Ver ventajas del exterior">
            <Image src={images.coast} alt="Playa y sendero costero" fill sizes="30vw" />
            <div><span>02 · Caminata</span><h3>Playas y caletas</h3><p>Recorre la costa y encuentra tu rincón favorito.</p></div>
          </a>
          <article className="place place-note">
            <Waves size={28} />
            <h3>Todo queda cerca</h3>
            <p>Una base tranquila para conocer El Quisco, Algarrobo y el litoral central.</p>
            <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">Ver en Maps <ArrowUpRight size={16} /></a>
          </article>
        </div>
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
          <div className="rating"><strong>9.8</strong><span>Excelente en Booking.com<small>Basado en reseñas de huéspedes</small></span></div>
        </div>
        <div className="review-grid">
          {reviews.map(quote => (
            <article className="review-card" key={quote}>
              <div className="stars">★★★★★</div>
              <p>&ldquo;{quote}&rdquo;</p>
              <footer>Huésped verificado — Booking.com</footer>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-cta">
        <div className="sun-mark">✳</div>
        <div className="eyebrow centered"><span className="eyebrow-line" /> Tu descanso comienza aquí <span className="eyebrow-line" /></div>
        <h2>Reserva tu descanso<br /><em>en el litoral.</em></h2>
        <p>Elige tus fechas y ven a vivir unos días de calma junto al mar.</p>
        <div className="cta-actions">
          <a className="button button-wood" href={bookingUrl} target="_blank" rel="noreferrer"><CalendarDays size={17} /> Reservar en Booking <ArrowUpRight size={17} /></a>
          <a className="button button-ghost" href={whatsappUrl} target="_blank" rel="noreferrer">Escribir por WhatsApp +56995439583</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <Image src={images.logo} alt="Logo Cabañas Inti Mar" width={92} height={68} />
          <p>Un lugar para volver a ti.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explora</span>
            <a href="#experiencia">Quiénes somos</a>
            <a href="#cabanas">Las cabañas</a>
            <a href="#entorno">Qué visitar</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
          <div>
            <span>Conecta</span>
            <a href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={15} /> @cabanasintimar</a>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Booking.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Inti Mar · Desarrollado por <a href="https://aintegration.cl" target="_blank" rel="noreferrer">aintegration.cl</a></span>
          <span>El Quisco, Chile</span>
        </div>
      </footer>

      {bookingOpen && (
        <div className="booking-overlay" role="dialog" aria-modal="true" aria-label="Reservar una cabaña">
          <BookingCart onClose={() => setBookingOpen(false)} />
          <button className="overlay-close" onClick={() => setBookingOpen(false)} aria-label="Cerrar ventana de reserva"><X size={22} /></button>
        </div>
      )}
    </main>
  )
}
