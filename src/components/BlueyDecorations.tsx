type DecorationProps = {
  className?: string
}

export function FluffyCloud({ className = '' }: DecorationProps) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 160 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M35 75C21.1929 75 10 63.8071 10 50C10 38.3752 17.9142 28.5996 28.6946 25.8647C31.5033 13.9189 42.1932 5 55 5C66.1963 5 75.8344 11.8346 79.8055 21.6111C83.8242 16.2905 90.5284 13 98 13C109.845 13 119.552 22.0152 120.785 33.5647C124.966 33.2045 129.213 34.0247 133 36.1082C143.209 41.7251 147.104 54.4925 141.487 64.7015C138.258 70.5701 132.327 74.4539 125.8 75L35 75Z"
        fill="url(#cloudGrad)"
        fillOpacity="0.85"
      />
      <defs>
        <linearGradient id="cloudGrad" x1="80" y1="5" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6F0FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PawPrint({ className = '', color = '#5B93E6' }: DecorationProps & { color?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main pad */}
      <path d="M16 14C11.5 14 8 18 8 22.5C8 25.5 11 28 16 28C21 28 24 25.5 24 22.5C24 18 20.5 14 16 14Z" />
      {/* Toes */}
      <ellipse cx="7.5" cy="11.5" rx="3.2" ry="4.5" transform="rotate(-20 7.5 11.5)" />
      <ellipse cx="13" cy="7.5" rx="3.2" ry="4.8" transform="rotate(-6 13 7.5)" />
      <ellipse cx="19" cy="7.5" rx="3.2" ry="4.8" transform="rotate(6 19 7.5)" />
      <ellipse cx="24.5" cy="11.5" rx="3.2" ry="4.5" transform="rotate(20 24.5 11.5)" />
    </svg>
  )
}

export function SparkleStar({ className = '', color = '#FED766' }: DecorationProps & { color?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

export function KeepyUppyBalloon({
  className = '',
  color = '#FF4D6D',
  shineColor = '#FFA8B8',
}: DecorationProps & { color?: string; shineColor?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 100 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* String */}
      <path
        d="M50 95 Q42 110 54 125 T48 148"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Balloon Knot */}
      <polygon points="46,95 54,95 50,91" fill={color} />
      {/* Balloon Body */}
      <path
        d="M50 10 C22 10 8 32 8 58 C8 84 28 95 50 95 C72 95 92 84 92 58 C92 32 78 10 50 10 Z"
        fill={color}
      />
      {/* Shine Highlight */}
      <path
        d="M26 30 C20 40 20 54 24 64"
        stroke={shineColor}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="34" cy="24" r="3.5" fill={shineColor} opacity="0.85" />
    </svg>
  )
}

export function PartyBunting({ className = '' }: DecorationProps) {
  return (
    <svg
      className={`pointer-events-none select-none w-full ${className}`}
      viewBox="0 0 600 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Sagging string */}
      <path d="M0 8 Q150 24 300 12 T600 8" stroke="#D3E4FF" strokeWidth="2.5" fill="none" />
      {/* Flags */}
      <polygon points="30,11 65,13 47,40" fill="#5B93E6" />
      <polygon points="90,14 125,16 107,43" fill="#F69145" />
      <polygon points="150,16 185,17 167,44" fill="#FED766" />
      <polygon points="210,16 245,15 227,42" fill="#82B5FB" />
      <polygon points="270,13 305,12 287,39" fill="#FFB677" />
      <polygon points="330,11 365,10 347,37" fill="#9DE0AD" />
      <polygon points="390,9 425,8 407,35" fill="#5B93E6" />
      <polygon points="450,8 485,9 467,36" fill="#F69145" />
      <polygon points="510,9 545,8 527,35" fill="#FED766" />
    </svg>
  )
}

export function BaptismDoveAndCross({ className = '' }: DecorationProps) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Radiant Glow */}
      <circle cx="70" cy="70" r="54" fill="#F0F7FF" />
      <circle cx="70" cy="70" r="44" stroke="#D3E4FF" strokeWidth="2" strokeDasharray="4 4" />
      {/* Cross */}
      <rect x="66" y="24" width="8" height="66" rx="4" fill="#5B93E6" />
      <rect x="46" y="42" width="48" height="8" rx="4" fill="#5B93E6" />
      {/* Golden Center Burst */}
      <circle cx="70" cy="46" r="6" fill="#FED766" />
      {/* Dove */}
      <path
        d="M60 88 C60 76 74 68 84 66 C80 76 78 86 96 90 C84 94 72 98 64 104 C64 98 60 92 60 88 Z"
        fill="#FFFFFF"
        stroke="#82B5FB"
        strokeWidth="2"
      />
      {/* Water Drops */}
      <path d="M70 106 C66 112 74 116 70 122 C66 116 74 112 70 106 Z" fill="#82B5FB" />
      <path d="M58 110 C55 114 61 117 58 121 C55 117 61 114 58 110 Z" fill="#FED766" />
      <path d="M82 110 C79 114 85 117 82 121 C79 117 85 114 82 110 Z" fill="#F69145" />
    </svg>
  )
}

export function ChurchChapelIllustration({ className = '' }: DecorationProps) {
  return (
    <svg
      className={`select-none ${className}`}
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cloud Base */}
      <ellipse cx="100" cy="140" rx="80" ry="10" fill="#E8F2FF" />
      {/* Main Church Wall */}
      <rect x="60" y="65" width="80" height="75" rx="8" fill="#FFFFFF" stroke="#5B93E6" strokeWidth="3" />
      {/* Roof / Steeples */}
      <polygon points="100,20 50,65 150,65" fill="#5B93E6" />
      {/* Cross on top */}
      <rect x="98" y="4" width="4" height="20" rx="2" fill="#FED766" />
      <rect x="92" y="10" width="16" height="4" rx="2" fill="#FED766" />
      {/* Bell / Arch Window */}
      <path d="M88 45 A12 12 0 0 1 112 45 V55 H88 Z" fill="#FED766" />
      <circle cx="100" cy="50" r="3" fill="#F69145" />
      {/* Main Arched Church Door */}
      <path d="M85 140 V105 A15 15 0 0 1 115 105 V140 Z" fill="#F69145" stroke="#E8741E" strokeWidth="2" />
      {/* Round Stained Glass Window */}
      <circle cx="100" cy="85" r="12" fill="#82B5FB" stroke="#2D4F7C" strokeWidth="2" />
      <line x1="100" y1="73" x2="100" y2="97" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="88" y1="85" x2="112" y2="85" stroke="#FFFFFF" strokeWidth="2" />
      {/* Side Windows */}
      <path d="M68 115 V98 A4 4 0 0 1 76 98 V115 Z" fill="#E8F2FF" stroke="#5B93E6" strokeWidth="2" />
      <path d="M124 115 V98 A4 4 0 0 1 132 98 V115 Z" fill="#E8F2FF" stroke="#5B93E6" strokeWidth="2" />
    </svg>
  )
}

export function ReceptionPartyIllustration({ className = '' }: DecorationProps) {
  return (
    <svg
      className={`select-none ${className}`}
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Ground cloud */}
      <ellipse cx="100" cy="140" rx="85" ry="10" fill="#FFF4E8" />
      {/* Party Tent / Pavilion */}
      <path d="M40 85 L100 35 L160 85 Z" fill="#F69145" />
      <path d="M60 85 L100 35 L140 85 Z" fill="#FED766" />
      <path d="M80 85 L100 35 L120 85 Z" fill="#FFB677" />
      {/* Tent poles & base */}
      <rect x="45" y="85" width="110" height="55" rx="6" fill="#FFFFFF" stroke="#F69145" strokeWidth="3" />
      {/* Tent Flag */}
      <polygon points="100,22 118,28 100,34" fill="#5B93E6" />
      <line x1="100" y1="20" x2="100" y2="35" stroke="#2D4F7C" strokeWidth="2" />
      {/* Celebration Cake */}
      <rect x="85" y="115" width="30" height="20" rx="3" fill="#FED766" />
      <rect x="90" y="102" width="20" height="13" rx="3" fill="#FFB677" />
      {/* Candle */}
      <rect x="98" y="93" width="4" height="9" fill="#5B93E6" />
      <circle cx="100" cy="90" r="3" fill="#FF4D6D" />
      {/* Balloons floating by */}
      <circle cx="35" cy="50" r="10" fill="#5B93E6" />
      <line x1="35" y1="60" x2="42" y2="90" stroke="#82B5FB" strokeWidth="1.5" />
      <circle cx="165" cy="45" r="11" fill="#FF4D6D" />
      <line x1="165" y1="56" x2="158" y2="90" stroke="#FFA8B8" strokeWidth="1.5" />
    </svg>
  )
}

export function BlueyCharacterSilhouette({ className = '' }: DecorationProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Cute Bluey Ears and Celebration Silhouette SVG */}
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Bluey Head & Body Silhouette */}
        <g>
          {/* Left Ear */}
          <path d="M42 38 L30 10 C38 6 52 14 54 26 Z" fill="#2D4F7C" />
          <path d="M40 32 L34 14 C38 12 46 16 48 24 Z" fill="#FED766" />
          {/* Right Ear */}
          <path d="M78 26 C80 14 94 6 102 10 L90 38 Z" fill="#2D4F7C" />
          <path d="M84 24 C86 16 94 12 98 14 L92 32 Z" fill="#FED766" />
          {/* Head & Body */}
          <rect x="36" y="24" width="60" height="75" rx="24" fill="#5B93E6" />
          {/* Eye patches */}
          <rect x="39" y="32" width="24" height="28" rx="12" fill="#2D4F7C" />
          <rect x="69" y="32" width="24" height="28" rx="12" fill="#82B5FB" />
          {/* Eyes */}
          <circle cx="51" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="53" cy="46" r="3" fill="#1E3557" />
          <circle cx="81" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="79" cy="46" r="3" fill="#1E3557" />
          {/* Snout */}
          <ellipse cx="66" cy="62" rx="16" ry="12" fill="#FED766" />
          <ellipse cx="66" cy="56" rx="6" ry="4" fill="#1E3557" />
          {/* Sweet Smile */}
          <path d="M60 66 Q66 72 72 66" stroke="#1E3557" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Tummy patch */}
          <ellipse cx="66" cy="85" rx="16" ry="12" fill="#82B5FB" />
        </g>
        {/* Bingo Peek Silhouette on right */}
        <g transform="translate(68, 18) scale(0.72)">
          {/* Left Ear */}
          <path d="M42 38 L30 10 C38 6 52 14 54 26 Z" fill="#D46B18" />
          <path d="M40 32 L34 14 C38 12 46 16 48 24 Z" fill="#FED766" />
          {/* Right Ear */}
          <path d="M78 26 C80 14 94 6 102 10 L90 38 Z" fill="#D46B18" />
          <path d="M84 24 C86 16 94 12 98 14 L92 32 Z" fill="#FED766" />
          {/* Head & Body */}
          <rect x="36" y="24" width="60" height="75" rx="24" fill="#F69145" />
          {/* Eye patches */}
          <rect x="39" y="32" width="24" height="28" rx="12" fill="#FFB677" />
          <rect x="69" y="32" width="24" height="28" rx="12" fill="#D46B18" />
          {/* Eyes */}
          <circle cx="51" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="53" cy="46" r="3" fill="#1E3557" />
          <circle cx="81" cy="46" r="6" fill="#FFFFFF" />
          <circle cx="79" cy="46" r="3" fill="#1E3557" />
          {/* Snout */}
          <ellipse cx="66" cy="62" rx="16" ry="12" fill="#FED766" />
          <ellipse cx="66" cy="56" rx="6" ry="4" fill="#1E3557" />
          <path d="M60 66 Q66 72 72 66" stroke="#1E3557" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  )
}
