# 🎈 Bluey-Themed Online Christening Invitation

An interactive, responsive, animated Christening & Dedication website themed around **Bluey & Friends**, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

---

## ✨ Features

- **Interactive 3D Envelope Intro**:
  - Bluey pastel envelope with floating clouds and balloons
  - Animated Keepy Uppy balloon seal button with popping sound effect & confetti
  - 3D flap unfolding and rising invitation card transition
- **Complete Christening Storytelling & Sections**:
  - **Save the Date & Hero Presentation**: Baby photo frame, parents' welcome, quick action buttons.
  - **Live Countdown Timer**: Real-time days, hours, minutes, seconds countdown + Google Calendar / `.ics` download buttons.
  - **Keepy Uppy Minigame**: Interactive floating balloon clicker with bouncy physics, score counter, and confetti milestones!
  - **Spiritual Blessing & Scripture**: Holy dedication verse (*James 1:17*), baptismal dove & cross illustration, and devotional note.
  - **Beloved Godparents (Ninongs & Ninangs)**: Dedicated grid honoring Godparents with honorary titles and paw badges.
  - **Locations & Venues**: Church Ceremony & Reception Pavilion with direct Google Maps navigation buttons.
  - **Event Schedule / Timeline**: Step-by-step visual schedule with cartoon icons.
  - **Precious Moments Memory Album**: Polaroid-style photo cards with interactive popup modal.
  - **Bluey Color Palette & Attire Guide**: Swatches for Bluey Sky, Bingo Peach, Buttercup Yellow, Sweet Mint, and Cloud White.
  - **Wishing Well / Digital Piggy Bank**: Heartfelt gift note with 1-click copy account details.
  - **Interactive RSVP Form**: Full form with guest counts (Adults & Kids), High Chair options, dietary notes, and blessing message.
  - **Floating Music Player**: Vinyl toggle with now-playing toasts, playlist controls, and built-in Web Audio synthesis fallback.
  - **Playful Bluey Footer**: Farewell note with character illustrations, paw print signatures, and back-to-top button.

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📝 Customizing Event Details

All event data (Baby's name, parents, godparents, date, venues, map links, gifts, color palette, RSVP endpoint) can be easily edited in one central file:
[`src/data/invitationData.ts`](./src/data/invitationData.ts)
