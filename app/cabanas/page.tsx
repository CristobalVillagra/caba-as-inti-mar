'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Accessibility, ArrowLeft, ArrowUpRight, Bath, BedDouble, Check, ChevronLeft, ChevronRight, CookingPot, House, MapPin, Users, X } from 'lucide-react'
import { BookingDialog, type CabinTypeId } from '@/components/booking-dialog'

const photos = [
  { src: '/images/inti/inti-exterior.jpg', alt: 'Cabaña Inti y su acceso adaptado' },
  { src: '/images/inti/inti-tinaja.jpg', alt: 'Tinaja privada de la cabaña Inti' },
  { src: '/images/inti/inti-quincho.jpg', alt: 'Terraza exterior con tinaja' },
  { src: '/images/inti/inti-estar.jpg', alt: 'Estar acogedor de la cabaña' },
  { src: '/images/inti/inti-cocina.jpg', alt: 'Cocina equipada y comedor' },
  { src: '/images/inti/inti-habitacion-bano.jpg', alt: 'Dormitorio con baño cercano' },
  { src: '/images/inti/inti-acceso-quincho.jpg', alt: 'Quincho, tinaja y acceso exterior' },
  { src: '/images/inti/inti-dormitorio.jpg', alt: 'Dormitorio matrimonial' },
  { src: '/images/inti/inti-bano.jpg', alt: 'Baño adaptado con barras de apoyo' },
  { src: '/images/inti/inti-bano-lavamanos.jpg', alt: 'Lavamanos y espacio de circulación del baño' },
  { src: '/images/inti/inti-dormitorio-2.jpg', alt: 'Vista del dormitorio de la suite' },
]

const traditionalPhotos = [
  { src: '/images/tradicional/tradicional-01.jpg', alt: 'Cocina equipada con refrigerador, encimera y lavaplatos' },
  { src: '/images/tradicional/tradicional-02.jpg', alt: 'Comedor y cocina integrados de la cabaña tradicional' },
  { src: '/images/tradicional/tradicional-03.jpg', alt: 'Vista amplia del comedor y cocina' },
  { src: '/images/tradicional/tradicional-04.jpg', alt: 'Dormitorio con camas individuales' },
  { src: '/images/tradicional/tradicional-05.jpg', alt: 'Dormitorio matrimonial' },
  { src: '/images/tradicional/tradicional-06.jpg', alt: 'Baño privado con ducha y tina' },
  { src: '/images/tradicional/tradicional-07.jpg', alt: 'Comedor de madera y cocina' },
  { src: '/images/tradicional/tradicional-08.jpg', alt: 'Cocina equipada con refrigerador y cocina a gas' },
  { src: '/images/tradicional/tradicional-09.jpg', alt: 'Estar, comedor y cocina de la cabaña' },
  { src: '/images/tradicional/tradicional-10.jpg', alt: 'Baño privado con tina y ducha' },
  { src: '/images/tradicional/tradicional-11.jpg', alt: 'Dormitorio con cama individual y clóset' },
  { src: '/images/tradicional/tradicional-12.jpg', alt: 'Dormitorio con cama individual' },
]

const tranquilPhotos = [
  { src: '/images/espacios-tranquilos/espacios-tranquilos-01.jpg', alt: 'Resbalín de madera en el jardín de las cabañas' },
  { src: '/images/espacios-tranquilos/espacios-tranquilos-02.jpg', alt: 'Juegos de madera y jardín exterior' },
  { src: '/images/espacios-tranquilos/espacios-tranquilos-03.jpg', alt: 'Área verde con juegos para disfrutar al aire libre' },
  { src: '/images/espacios-tranquilos/espacios-tranquilos-04.jpg', alt: 'Balancín de madera junto al jardín' },
]

const whatsappUrl = 'https://wa.me/56961683507?text=Hola%2C%20quiero%20consultar%20por%20una%20caba%C3%B1a%2C%20sus%20tarifas%20y%20valores%20promocionales%20en%20Inti%20Mar.'

export default function CabanasPage() {
  const [kind, setKind] = useState<'tradicional' | 'tinaja' | 'dos'>('tinaja')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [activeGallery, setActiveGallery] = useState<'inti' | 'tradicional' | 'tranquilos'>('inti')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingType, setBookingType] = useState<CabinTypeId>('tinaja')
  const isInti = kind === 'tinaja'
  const isTraditional = kind === 'tradicional'

  const galleryPhotos = activeGallery === 'tradicional' ? traditionalPhotos : activeGallery === 'tranquilos' ? tranquilPhotos : photos
  const openPhoto = (gallery: 'inti' | 'tradicional' | 'tranquilos', index: number) => { setActiveGallery(gallery); setActivePhoto(index) }
  const selectedPhotos = isTraditional ? traditionalPhotos : tranquilPhotos
  const selectedGallery = isTraditional ? 'tradicional' : 'tranquilos'
  const movePhoto = (direction: number) => setActivePhoto(index => index === null ? null : (index + direction + galleryPhotos.length) % galleryPhotos.length)

  return (
    <main className="cabins-page">
      <header className="site-header cabins-header">
        <Link href="/" className="brand" aria-label="Volver al inicio de Inti Mar"><Image src="/images/logo-inti-mar-original.jpg" alt="Logo Cabañas Inti Mar" width={116} height={86} className="brand-logo" priority /></Link>
        <nav className="nav cabins-nav" aria-label="Navegación principal">
          <Link href="/">Inicio</Link><a href="#tipos">Cabañas</a><a href="#tarifas">Tarifas</a><Link href="/#entorno">Qué visitar</Link><Link href="/#ubicacion">Ubicación</Link>
        </nav>
        <button className="header-cta" onClick={() => { setBookingType(kind); setBookingOpen(true) }}>Reservar <ArrowUpRight size={15} /></button>
      </header>

      <section className="cabins-hero">
        <div className="cabins-hero-photo"><Image src={isInti ? photos[0].src : '/images/cabana-tradicional.png'} alt={isInti ? photos[0].alt : 'Cabaña tradicional de Inti Mar'} fill priority sizes="100vw" /></div>
        <div className="cabins-hero-overlay" />
        <div className="cabins-hero-copy">
          <Link className="back-link" href="/"><ArrowLeft size={15} /> Volver al inicio</Link>
          <span className="cabins-kicker"><span /> EL QUISCO · LITORAL CENTRAL</span>
          <h1>Un lugar para<br /><em>quedarte.</em></h1>
          <p>Conoce nuestras cabañas y encuentra el espacio que mejor acompaña tu descanso junto al mar.</p>
          <a href="#tipos" className="cabins-scroll">DESCUBRE LAS CABAÑAS <span>↓</span></a>
        </div>
      </section>

      <section className="cabin-showcase" id="tipos">
        <div className="cabin-showcase-head">
          <div><div className="eyebrow"><span className="eyebrow-line" /> DESCANSO A TU MANERA</div><h2>Tres formas de<br /><em>sentirse en casa.</em></h2></div>
          <p>Espacios tranquilos, limpios y cuidados en cada detalle de higiene, con certificación de control de plagas. Cerca de la costa, elige una cabaña para imaginar tu próxima pausa.</p>
        </div>

        <div className="cabin-type-tabs" role="tablist" aria-label="Tipo de cabaña">
          <button role="tab" aria-selected={isTraditional} className={isTraditional ? 'selected' : ''} onClick={() => setKind('tradicional')}><span>01</span> Cabaña tradicional <ArrowUpRight size={15} /></button>
          <button role="tab" aria-selected={isInti} className={isInti ? 'selected' : ''} onClick={() => setKind('tinaja')}><span>02</span> Cabaña para 2 con tinaja <ArrowUpRight size={15} /></button>
          <button role="tab" aria-selected={kind === 'dos'} className={kind === 'dos' ? 'selected' : ''} onClick={() => setKind('dos')}><span>03</span> Espacios tranquilos <ArrowUpRight size={15} /></button>
        </div>

        {isInti ? <article className="cabin-feature" role="tabpanel" key="inti">
          <div className="cabin-feature-gallery">
            <button className="cabin-main-photo" onClick={() => setActivePhoto(0)} aria-label="Ampliar foto de la cabaña Inti">
              <Image src={photos[0].src} alt={photos[0].alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
              <span className="photo-counter"><span>01</span> / {String(photos.length).padStart(2, '0')} <ArrowUpRight size={14} /></span>
            </button>
            <div className="cabin-photo-stack">
              {[1, 4].map(index => <button key={index} onClick={() => setActivePhoto(index)} aria-label={`Ampliar foto: ${photos[index].alt}`}><Image src={photos[index].src} alt={photos[index].alt} fill sizes="(max-width: 800px) 50vw, 28vw" /></button>)}
              <button className="more-photos" onClick={() => setActivePhoto(0)}><span>+{photos.length - 3}</span><small>VER TODAS LAS FOTOS</small></button>
            </div>
          </div>
          <div className="cabin-feature-info">
            <div className="cabin-title-row"><span className="cabin-number">01 / SUITE</span><span className="availability-dot">DISPONIBLE PARA 2</span></div>
            <h3>Inti <em>Suite.</em></h3>
            <p className="cabin-lead">Una suite acogedora, pensada para descansar en pareja con comodidad y autonomía.</p>
            <div className="cabin-specs"><span><Users size={16} /> 2 personas</span><span><BedDouble size={16} /> Dormitorio privado</span><span><Bath size={16} /> Baño adaptado</span></div>
            <div className="cabin-divider" />
            <h4>Hecha para disfrutar sin apuro.</h4>
            <p className="cabin-description">Inti Suite combina espacios cálidos de madera con circulación accesible. La entrada, el dormitorio y el baño están adaptados para silla de ruedas. Afuera, el quincho privado y la tinaja invitan a alargar la tarde.</p>
            <ul className="cabin-includes">
              <li><Check size={15} /> Acceso, habitación y baño adaptados</li>
              <li><Check size={15} /> Quincho privado con parrilla</li>
              <li><Check size={15} /> Tinaja privada para disfrutar</li>
              <li><Check size={15} /> Cocina equipada y baño privado</li>
            </ul>
            <button className="button button-primary cabin-book-button" onClick={() => { setBookingType('tinaja'); setBookingOpen(true) }}>Reservar esta cabaña <ArrowUpRight size={16} /></button>
            <div className="cabin-amenities-note"><Accessibility size={17} /> Espacios pensados para moverse con mayor comodidad</div>
          </div>
        </article> : <article className="cabin-feature traditional-feature" role="tabpanel" key={kind}>
          {isTraditional || kind === 'dos' ? <div className={`cabin-feature-gallery traditional-gallery ${kind === 'dos' ? 'tranquil-gallery' : ''}`}>
            <button className="cabin-main-photo" onClick={() => openPhoto(selectedGallery, 0)} aria-label={`Ampliar foto de ${isTraditional ? 'la cabaña tradicional' : 'Espacios tranquilos'}`}>
              <Image src={selectedPhotos[0].src} alt={selectedPhotos[0].alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
              <span className="photo-counter"><span>01</span> / {String(selectedPhotos.length).padStart(2, '0')} <ArrowUpRight size={14} /></span>
            </button>
            <div className="cabin-photo-stack">
              {[1, 2].map(index => <button key={index} onClick={() => openPhoto(selectedGallery, index)} aria-label={`Ampliar foto: ${selectedPhotos[index].alt}`}><Image src={selectedPhotos[index].src} alt={selectedPhotos[index].alt} fill sizes="(max-width: 800px) 50vw, 28vw" /></button>)}
              <button className="more-photos" onClick={() => openPhoto(selectedGallery, 0)}><span>+{selectedPhotos.length - 3}</span><small>VER TODAS LAS FOTOS</small></button>
            </div>
          </div> : <div className="traditional-image"><Image src="/images/cabana-tradicional.png" alt="Interior de una cabaña de Inti Mar" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>}
          <div className="cabin-feature-info">
            <div className="cabin-title-row"><span className="cabin-number">{isTraditional ? '01 / FAMILIAR' : '03 / PARA DOS'}</span><span className="availability-dot">{isTraditional ? 'HASTA 8 PERSONAS' : 'HASTA 2 PERSONAS'}</span></div>
            <h3>{isTraditional ? <>Cabaña <em>tradicional.</em></> : <><em>Espacios tranquilos.</em></>}</h3>
            <p className="cabin-lead">{isTraditional ? 'Un espacio sencillo, cálido y limpio para disfrutar en familia, con cuidado en cada detalle de higiene y certificación de control de plagas.' : 'Un espacio acogedor para una estadía tranquila en pareja, con rincones exteriores para disfrutar con calma.'}</p>
            <div className="cabin-specs"><span><Users size={16} /> {isTraditional ? 'Hasta 8 personas' : '2 personas'}</span><span><House size={16} /> Construcción en madera</span><span><CookingPot size={16} /> Cocina equipada</span></div>
            <div className="cabin-divider" />
            <h4>{isTraditional ? 'Tu base para explorar la costa.' : 'Aire libre para disfrutar.'}</h4>
            <p className="cabin-description">{isTraditional ? 'Nuestras cabañas tradicionales ofrecen un ambiente tranquilo, terraza con vista al jardín y espacios listos para compartir. Cada espacio se mantiene limpio y cuidamos los detalles de higiene; contamos con certificación de control de plagas. Además, tiene cocina equipada, baño privado y TV.' : 'El jardín ofrece espacios abiertos y juegos de madera para disfrutar al aire libre durante tu estadía.'}</p>
            <ul className="cabin-includes"><li><Check size={15} /> Cocina equipada</li><li><Check size={15} /> Baño privado y TV</li><li><Check size={15} /> Terraza con vista al jardín</li></ul>
            <button className="button button-primary cabin-book-button" onClick={() => { setBookingType(isTraditional ? 'tradicional' : 'dos'); setBookingOpen(true) }}>Reservar esta cabaña <ArrowUpRight size={16} /></button>
          </div>
        </article>}
      </section>

      <section className="season-rates" id="tarifas">
        <div className="eyebrow"><span className="eyebrow-line" /> PLANIFICA TU ESTADÍA</div>
        <div className="rates-heading"><h2>Tarifas para cada<br /><em>momento del año.</em></h2><p>Los valores de cada temporada están por definir por Inti Mar. Escríbenos y te ayudaremos a elegir las fechas ideales.</p></div>
        <div className="rates-table" role="table" aria-label="Tarifas por cabaña y temporada">
          <div className="rates-row rates-header" role="row"><span role="columnheader">Tipo de cabaña</span><span role="columnheader">Temporada alta</span><span role="columnheader">Temporada media</span><span role="columnheader">Temporada baja</span></div>
          {['Cabaña tradicional', 'Cabaña para 2 con tinaja', 'Cabaña para 2'].map(name => <div className="rates-row" role="row" key={name}><strong role="rowheader">{name}</strong><span>Por definir</span><span>Por definir</span><span>Por definir</span></div>)}
        </div>
        <div className="promo-callout"><div><span>¿BUSCAS UNA OFERTA?</span><p>Para más información sobre valores promocionales, contáctanos por WhatsApp.</p></div><a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-primary">Consultar por WhatsApp <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="cabin-closing"><div className="closing-sun">✳</div><p>EL QUISCO · CHILE</p><h2>La pausa que<br /><em>estabas buscando.</em></h2><button onClick={() => { setBookingType(kind); setBookingOpen(true) }} className="button button-wood">Reservar cabaña <ArrowUpRight size={16} /></button><Link href="/" className="closing-home"><MapPin size={14} /> Conoce Inti Mar</Link></section>

      <footer className="footer cabin-footer">
        <div className="footer-brand"><Link href="/" aria-label="Volver al inicio" className="footer-logo-link"><Image src="/images/logo-inti-mar-original.jpg" alt="Logo Cabañas Inti Mar" width={142} height={106} className="footer-logo" /></Link><p>Un lugar para volver a ti.</p></div>
        <div className="footer-links"><div><span>Explora</span><Link href="/">Inicio</Link><a href="#tipos">Las cabañas</a><Link href="/#ubicacion">Ubicación</Link></div><div><span>Conecta</span><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +56 9 6168 3507 <ArrowUpRight size={14} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 Inti Mar · El Quisco, Chile</span><Link href="/">Volver al inicio</Link></div>
      </footer>

      {bookingOpen && <BookingDialog initialCabin={bookingType} onClose={() => setBookingOpen(false)} />}

      {activePhoto !== null && <div className="cabin-lightbox" role="dialog" aria-modal="true" aria-label={`Galería de fotos de ${activeGallery === 'tradicional' ? 'la cabaña tradicional' : activeGallery === 'tranquilos' ? 'Espacios tranquilos' : 'Inti Suite'}`} onKeyDown={event => { if (event.key === 'Escape') setActivePhoto(null); if (event.key === 'ArrowRight') movePhoto(1); if (event.key === 'ArrowLeft') movePhoto(-1) }}>
        <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Cerrar galería"><X /></button>
        <button className="lightbox-arrow prev" onClick={() => movePhoto(-1)} aria-label="Foto anterior"><ChevronLeft /></button>
        <figure><div className="lightbox-image"><Image src={galleryPhotos[activePhoto].src} alt={galleryPhotos[activePhoto].alt} fill sizes="90vw" priority /></div><figcaption>{galleryPhotos[activePhoto].alt}<span>{String(activePhoto + 1).padStart(2, '0')} / {String(galleryPhotos.length).padStart(2, '0')}</span></figcaption></figure>
        <button className="lightbox-arrow next" onClick={() => movePhoto(1)} aria-label="Foto siguiente"><ChevronRight /></button>
      </div>}
    </main>
  )
}
