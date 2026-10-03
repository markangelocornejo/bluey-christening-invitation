import { invitationData } from '../data/invitationData'

export function getGoogleCalendarUrl(): string {
  const { baby, event } = invitationData
  const title = encodeURIComponent(`${baby.fullName}'s Christening & Dedication`)
  const details = encodeURIComponent(
    `Join us in celebrating ${baby.fullName}'s Christening!\n\n` +
    `Ceremony: ${event.ceremony.venue} (${event.ceremony.time})\n` +
    `Reception: ${event.reception.venue} (${event.reception.time})\n\n` +
    `Theme: Bluey & Friends Celebration!`
  )
  const location = encodeURIComponent(`${event.ceremony.venue}, ${event.ceremony.address}`)

  // Start & End in YYYYMMDDTHHMMSSZ format
  // 2026-11-15T10:00:00+08:00
  const start = '20261115T020000Z'
  const end = '20261115T080000Z'

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`
}

export function downloadIcsFile() {
  const { baby, event } = invitationData
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bluey Christening Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:' + `${baby.fullName}'s Christening & Dedication`,
    'DESCRIPTION:' + `Join us in celebrating ${baby.fullName}'s Christening! Ceremony at ${event.ceremony.venue} followed by reception at ${event.reception.venue}.`,
    'LOCATION:' + `${event.ceremony.venue}, ${event.ceremony.address}`,
    'DTSTART:20261115T020000Z',
    'DTEND:20261115T080000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${baby.nickname.toLowerCase()}-christening.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
