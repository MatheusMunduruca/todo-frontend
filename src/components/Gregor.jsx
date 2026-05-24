import styles from './Gregor.module.css'

export default function Gregor({ mood = 'idle' }) {
  return (
    <div className={`${styles.gregorWrap} ${styles[mood]}`}>
      <svg viewBox="0 0 420 540" xmlns="http://www.w3.org/2000/svg" className={styles.gregor}>
        <defs>
          <linearGradient id="skinG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E9B891" />
            <stop offset="100%" stopColor="#B07A55" />
          </linearGradient>
          <linearGradient id="noseG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D89878" />
            <stop offset="100%" stopColor="#9B5535" />
          </linearGradient>
          <linearGradient id="beardG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F2EAD8" />
            <stop offset="60%" stopColor="#D9C8A8" />
            <stop offset="100%" stopColor="#9C8868" />
          </linearGradient>
          <linearGradient id="hairG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8DCB8" />
            <stop offset="100%" stopColor="#9C8868" />
          </linearGradient>
          <linearGradient id="tunicG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B1A1A" />
            <stop offset="100%" stopColor="#4A0808" />
          </linearGradient>
          <linearGradient id="vestG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6B4B2A" />
            <stop offset="100%" stopColor="#3A260F" />
          </linearGradient>
          <linearGradient id="mugG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9B7B4E" />
            <stop offset="100%" stopColor="#4F3A20" />
          </linearGradient>
          <linearGradient id="pipeG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5A3D20" />
            <stop offset="100%" stopColor="#2C1810" />
          </linearGradient>
          <radialGradient id="cheekG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D85A30" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D85A30" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="smokeG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8E0D0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E8E0D0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* === BODY / TUNIC === */}
        <path d="M 55 410 Q 210 365 365 410 L 385 540 L 35 540 Z" fill="url(#tunicG)" stroke="#2C0404" strokeWidth="2" />

        {/* Tunic collar opening */}
        <path d="M 175 380 L 200 410 L 225 380 Z" fill="#3A0606" />

        {/* === LEATHER VEST === */}
        <path d="M 95 395 Q 110 380 145 380 L 145 540 L 75 540 L 65 415 Z" fill="url(#vestG)" stroke="#1F1208" strokeWidth="1.5" />
        <path d="M 325 395 Q 310 380 275 380 L 275 540 L 345 540 L 355 415 Z" fill="url(#vestG)" stroke="#1F1208" strokeWidth="1.5" />

        {/* Vest buckles */}
        <rect x="98" y="430" width="14" height="9" rx="1.5" fill="#C9A227" stroke="#5A3D20" strokeWidth="1" />
        <rect x="98" y="470" width="14" height="9" rx="1.5" fill="#C9A227" stroke="#5A3D20" strokeWidth="1" />
        <rect x="308" y="430" width="14" height="9" rx="1.5" fill="#C9A227" stroke="#5A3D20" strokeWidth="1" />
        <rect x="308" y="470" width="14" height="9" rx="1.5" fill="#C9A227" stroke="#5A3D20" strokeWidth="1" />

        {/* === ARMS === */}
        <ellipse cx="105" cy="425" rx="42" ry="65" fill="url(#skinG)" transform="rotate(15 105 425)" />
        <ellipse cx="315" cy="425" rx="42" ry="65" fill="url(#skinG)" transform="rotate(-15 315 425)" />

        {/* Arm hair */}
        <g stroke="#3D2410" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
          <path d="M 78 410 L 73 402" />
          <path d="M 88 430 L 83 422" />
          <path d="M 100 415 L 95 407" />
          <path d="M 112 442 L 107 434" />
          <path d="M 122 425 L 117 417" />
          <path d="M 88 450 L 83 442" />
          <path d="M 105 462 L 100 454" />
          <path d="M 128 445 L 123 437" />
        </g>
        <g stroke="#3D2410" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
          <path d="M 342 410 L 347 402" />
          <path d="M 332 430 L 337 422" />
          <path d="M 320 415 L 325 407" />
          <path d="M 308 442 L 313 434" />
          <path d="M 298 425 L 303 417" />
          <path d="M 332 450 L 337 442" />
          <path d="M 315 462 L 320 454" />
          <path d="M 292 445 L 297 437" />
        </g>

        {/* === MUG === */}
        <path d="M 155 395 L 245 395 L 250 490 L 150 490 Z" fill="url(#mugG)" stroke="#1F1208" strokeWidth="2.5" />
        {/* Mug bands */}
        <rect x="148" y="418" width="104" height="6" fill="#3A260F" stroke="#1F1208" strokeWidth="0.8" />
        <rect x="148" y="462" width="104" height="6" fill="#3A260F" stroke="#1F1208" strokeWidth="0.8" />
        {/* Vertical wood lines */}
        <line x1="175" y1="397" x2="173" y2="488" stroke="#3A260F" strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="395" x2="200" y2="490" stroke="#3A260F" strokeWidth="1" opacity="0.5" />
        <line x1="225" y1="397" x2="227" y2="488" stroke="#3A260F" strokeWidth="1" opacity="0.5" />
        {/* Foam */}
        <ellipse cx="200" cy="395" rx="48" ry="11" fill="#F8F2E0" />
        <ellipse cx="183" cy="389" rx="10" ry="7" fill="#FFFFFF" />
        <ellipse cx="208" cy="386" rx="8" ry="6" fill="#FFFFFF" />
        <ellipse cx="222" cy="392" rx="6" ry="4" fill="#FFFFFF" />
        {/* Handle */}
        <path d="M 250 412 Q 285 422 285 445 Q 285 470 250 480" fill="none" stroke="url(#mugG)" strokeWidth="15" strokeLinecap="round" />

        {/* Hands */}
        <ellipse cx="148" cy="445" rx="22" ry="18" fill="url(#skinG)" stroke="#7A4A30" strokeWidth="1" />
        <ellipse cx="305" cy="410" rx="22" ry="18" fill="url(#skinG)" stroke="#7A4A30" strokeWidth="1" />

        {/* Cloth */}
        <path d="M 252 392 Q 305 372 330 396 Q 322 422 295 422 Q 268 425 252 412 Z" fill="#F0E6CC" stroke="#B8A578" strokeWidth="1.2" />
        <path d="M 265 397 L 285 410" stroke="#B8A578" strokeWidth="1" />
        <path d="M 278 392 L 298 405" stroke="#B8A578" strokeWidth="1" />
        <path d="M 258 405 L 278 415" stroke="#B8A578" strokeWidth="1" />

        {/* Neck */}
        <rect x="178" y="320" width="44" height="60" fill="url(#skinG)" />
        <ellipse cx="200" cy="378" rx="24" ry="6" fill="#7A4A30" opacity="0.5" />

        {/* === HEAD === */}
        <ellipse cx="200" cy="215" rx="110" ry="120" fill="url(#skinG)" />

        {/* Bald top shading */}
        <ellipse cx="200" cy="120" rx="78" ry="35" fill="#CB9670" opacity="0.55" />
        <ellipse cx="180" cy="105" rx="25" ry="10" fill="#F5C9A7" opacity="0.4" />

        {/* === MOHAWK TUFT === */}
        <path d="M 175 110 Q 200 75 225 110 Q 218 90 200 80 Q 182 90 175 110 Z" fill="url(#hairG)" stroke="#7A6840" strokeWidth="1" />
        <path d="M 188 95 L 195 70" stroke="#9C8868" strokeWidth="1.5" />
        <path d="M 205 95 L 212 70" stroke="#9C8868" strokeWidth="1.5" />
        <path d="M 198 105 L 203 75" stroke="#7A6840" strokeWidth="1" />

        {/* Side patches of hair above ears */}
        <path d="M 92 175 Q 90 145 105 130 Q 122 145 118 195 Z" fill="url(#hairG)" />
        <path d="M 308 175 Q 310 145 295 130 Q 278 145 282 195 Z" fill="url(#hairG)" />

        {/* Ears */}
        <ellipse cx="95" cy="215" rx="15" ry="24" fill="url(#skinG)" />
        <ellipse cx="305" cy="215" rx="15" ry="24" fill="url(#skinG)" />
        <path d="M 92 208 Q 100 220 92 232" fill="none" stroke="#7A4A30" strokeWidth="1.5" />
        <path d="M 308 208 Q 300 220 308 232" fill="none" stroke="#7A4A30" strokeWidth="1.5" />
        {/* Earring on left ear */}
        <circle cx="95" cy="236" r="3" fill="#C9A227" stroke="#5A3D20" strokeWidth="0.8" />

        {/* Forehead wrinkles */}
        <path d="M 155 155 Q 200 148 245 155" fill="none" stroke="#9C6A45" strokeWidth="1.2" opacity="0.5" />
        <path d="M 160 168 Q 200 162 240 168" fill="none" stroke="#9C6A45" strokeWidth="1.2" opacity="0.5" />

        {/* Eyebrows (thick, bushy, white) */}
        <path d="M 138 188 Q 168 175 198 192 Q 168 184 138 195 Z" fill="#F2EAD8" stroke="#9C8868" strokeWidth="0.8" />
        <path d="M 202 192 Q 232 175 262 188 Q 232 184 202 195 Z" fill="#F2EAD8" stroke="#9C8868" strokeWidth="0.8" />

        {/* Eye sockets (slight shadow) */}
        <ellipse cx="170" cy="218" rx="22" ry="15" fill="#9C6A45" opacity="0.35" />
        <ellipse cx="230" cy="218" rx="22" ry="15" fill="#9C6A45" opacity="0.35" />

        {/* Eyes (whites) */}
        <ellipse cx="170" cy="218" rx="13" ry="10" fill="#F5F0E8" />
        <ellipse cx="230" cy="218" rx="13" ry="10" fill="#F5F0E8" />

        {/* Pupils (looking to viewer's right - side glance) */}
        <ellipse cx="178" cy="220" rx="7" ry="9" fill="#3D2A1A" />
        <ellipse cx="238" cy="220" rx="7" ry="9" fill="#3D2A1A" />
        {/* Pupil details */}
        <circle cx="178" cy="220" r="3" fill="#1A0F08" />
        <circle cx="238" cy="220" r="3" fill="#1A0F08" />
        {/* Eye highlights */}
        <circle cx="180" cy="217" r="2" fill="#FFFFFF" />
        <circle cx="240" cy="217" r="2" fill="#FFFFFF" />

        {/* Cheeks (rosy from drink) */}
        <ellipse cx="130" cy="270" rx="28" ry="18" fill="url(#cheekG)" />
        <ellipse cx="270" cy="270" rx="28" ry="18" fill="url(#cheekG)" />

        {/* === NOSE === */}
        <ellipse cx="200" cy="262" rx="36" ry="48" fill="url(#noseG)" />
        <ellipse cx="186" cy="240" rx="13" ry="22" fill="#F5C9A7" opacity="0.5" />
        <ellipse cx="186" cy="290" rx="7" ry="5" fill="#3D1A0A" opacity="0.6" />
        <ellipse cx="214" cy="290" rx="7" ry="5" fill="#3D1A0A" opacity="0.6" />
        <ellipse cx="200" cy="303" rx="32" ry="9" fill="#7A4A30" opacity="0.4" />

        {/* === MUSTACHE === */}
        <path d="M 125 300
                 Q 155 320 185 312
                 Q 200 308 215 312
                 Q 245 320 275 300
                 Q 280 330 248 332
                 L 152 332
                 Q 120 330 125 300 Z"
              fill="url(#beardG)" stroke="#9C8868" strokeWidth="1" />

        {/* === BEARD (long, flowing white) === */}
        <path d="M 105 305
                 Q 88 335 88 370
                 Q 86 410 100 440
                 Q 115 470 145 478
                 Q 175 488 200 485
                 Q 225 488 255 478
                 Q 285 470 300 440
                 Q 314 410 312 370
                 Q 312 335 295 305
                 Q 265 325 230 325
                 Q 200 330 170 325
                 Q 135 325 105 305 Z"
              fill="url(#beardG)" stroke="#9C8868" strokeWidth="1.5" />

        {/* Beard strand details (waves) */}
        <g stroke="#9C8868" strokeWidth="1" strokeLinecap="round" opacity="0.6" fill="none">
          <path d="M 118 330 Q 110 370 122 415 Q 130 455 138 478" />
          <path d="M 140 322 Q 134 365 142 412 Q 152 458 162 485" />
          <path d="M 165 330 Q 162 380 168 425 Q 175 465 182 488" />
          <path d="M 200 332 Q 200 385 200 435 Q 200 470 200 487" />
          <path d="M 235 330 Q 238 380 232 425 Q 225 465 218 488" />
          <path d="M 260 322 Q 266 365 258 412 Q 248 458 238 485" />
          <path d="M 282 330 Q 290 370 278 415 Q 270 455 262 478" />
        </g>

        {/* Beard highlights (slight golden tint at edges) */}
        <g stroke="#E8DCB8" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" fill="none">
          <path d="M 128 340 Q 124 380 134 425" />
          <path d="M 215 340 Q 218 385 212 430" />
          <path d="M 272 340 Q 276 380 266 425" />
        </g>

        {/* === PIPE === */}
        {/* Pipe stem (going right from beard area) */}
        <path d="M 200 300 L 295 282" stroke="url(#pipeG)" strokeWidth="6" strokeLinecap="round" />
        {/* Pipe bowl */}
        <ellipse cx="300" cy="282" rx="14" ry="18" fill="url(#pipeG)" stroke="#1A0F08" strokeWidth="1.5" />
        <ellipse cx="300" cy="276" rx="10" ry="4" fill="#2C1810" />
        {/* Glowing ember */}
        <ellipse cx="300" cy="276" rx="6" ry="2" fill="#FF6B1A" />
        <ellipse cx="300" cy="276" rx="3" ry="1.5" fill="#FFD700" />

        {/* === SMOKE === */}
        <g className={styles.smoke}>
          <circle cx="305" cy="255" r="10" fill="url(#smokeG)" />
          <circle cx="315" cy="232" r="14" fill="url(#smokeG)" />
          <circle cx="305" cy="205" r="18" fill="url(#smokeG)" />
          <circle cx="320" cy="175" r="22" fill="url(#smokeG)" />
        </g>
      </svg>
    </div>
  )
}
