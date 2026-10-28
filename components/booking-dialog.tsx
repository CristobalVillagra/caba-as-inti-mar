'use client'

import { useState } from 'react'
import { ArrowUpRight, Minus, Plus, X } from 'lucide-react'

export const cabinTypes = [
  { id: 'tradicional', label: 'Cabaña tradicional', capacity: 4 },
  { id: 'tinaja', label: 'Cabaña para 2 con tinaja', capacity: 2 },
  { id: 'dos', label: 'Cabaña para 2', capacity: 2 },
] as const

export type CabinTypeId = typeof cabinTypes[number]['id']

export function BookingDialog({
  onClose,
  initialCabin = 'tradicional',
}: {
  onClose: () => void
  initialCabin?: CabinTypeId
}) {
  const [nights, setNights] = useState(2)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [entryDate, setEntryDate] = useState('')
  const [exitDate, setExitDate] = useState('')
  const [cabinId, setCabinId] = useState<CabinTypeId>(initialCabin)
  const selectedCabin = cabinTypes.find(cabin => cabin.id === cabinId) ?? cabinTypes[0]
  const guests = adults + children
  const adjustCabin = (id: CabinTypeId) => {
    const nextCabin = cabinTypes.find(cabin => cabin.id === id) ?? cabinTypes[0]
    const nextAdults = Math.min(adults, nextCabin.capacity)
    setCabinId(id)
    setAdults(nextAdults)
    setChildren(Math.min(children, nextCabin.capacity - nextAdults))
  }
  const updateGuestCount = (kind: 'adults' | 'children', delta: number) => {
    if (kind === 'adults') setAdults(value => Math.max(1, Math.min(selectedCabin.capacity - children, value + delta)))
    else setChildren(value => Math.max(0, Math.min(selectedCabin.capacity - adults, value + delta)))
  }
  const message = `Hola, quiero reservar la ${selectedCabin.label} para ${nights} noches, ${adults} adultos y ${children} niños${entryDate ? `, desde el ${entryDate}` : ''}${exitDate ? ` hasta el ${exitDate}` : ''}.`
  const whatsappUrl = `https://wa.me/56961683507?text=${encodeURIComponent(message)}`

  return (
    <div className="booking-overlay" role="dialog" aria-modal="true" aria-label="Reservar una cabaña">
      <div className="booking-widget">
        <div className="booking-widget-head">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" /> Reserva tu cabaña</span>
            <h3>Arma tu descanso</h3>
          </div>
          <button className="close-booking" onClick={onClose} aria-label="Cerrar reserva"><X size={18} /></button>
        </div>
        <div className="booking-fields">
          <label>Entrada<input type="date" value={entryDate} onChange={event => setEntryDate(event.target.value)} /></label>
          <label>Salida<input type="date" value={exitDate} onChange={event => setExitDate(event.target.value)} /></label>
        </div>
        <label className="cabin-select">Tipo de cabaña
          <select value={cabinId} onChange={event => adjustCabin(event.target.value as CabinTypeId)}>
            {cabinTypes.map(cabin => <option key={cabin.id} value={cabin.id}>{cabin.label}</option>)}
          </select>
        </label>
        <div className="booking-stepper">
          <span>Noches</span>
          <div>
            <button onClick={() => setNights(value => Math.max(1, value - 1))} aria-label="Disminuir noches" disabled={nights <= 1}><Minus size={15} /></button>
            <strong>{nights}</strong>
            <button onClick={() => setNights(value => value + 1)} aria-label="Aumentar noches"><Plus size={15} /></button>
          </div>
        </div>
        <div className="booking-stepper">
          <span>Adultos</span>
          <div>
            <button onClick={() => updateGuestCount('adults', -1)} aria-label="Disminuir adultos" disabled={adults <= 1}><Minus size={15} /></button>
            <strong>{adults}</strong>
            <button onClick={() => updateGuestCount('adults', 1)} aria-label="Aumentar adultos" disabled={guests >= selectedCabin.capacity}><Plus size={15} /></button>
          </div>
        </div>
        <div className="booking-stepper">
          <span>Niños</span>
          <div>
            <button onClick={() => updateGuestCount('children', -1)} aria-label="Disminuir niños" disabled={children <= 0}><Minus size={15} /></button>
            <strong>{children}</strong>
            <button onClick={() => updateGuestCount('children', 1)} aria-label="Aumentar niños" disabled={guests >= selectedCabin.capacity}><Plus size={15} /></button>
          </div>
        </div>
        <small className="guest-limit">Máximo {selectedCabin.capacity} {selectedCabin.capacity === 1 ? 'persona' : 'personas'} para esta cabaña.</small>
        <div className="booking-total">
          <span>Tarifas según temporada</span>
          <small>{nights} noches · {adults} adultos · {children} niños</small>
        </div>
        <a className="button button-primary full-button" href={whatsappUrl} target="_blank" rel="noreferrer">Continuar por WhatsApp <ArrowUpRight size={16} /></a>
      </div>
      <button className="overlay-close" onClick={onClose} aria-label="Cerrar ventana de reserva"><X size={22} /></button>
    </div>
  )
}
