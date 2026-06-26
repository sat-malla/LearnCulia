import React from "react";
import Svg, {
  Circle,
  Ellipse,
  Path,
  Rect,
  G,
  ClipPath,
  Defs,
  Text as SvgText,
} from "react-native-svg";

const SHIRT_COLORS = {
  green: "#6bffc6",
  red:   "#ff4d4d",
  blue:  "#2f96fd",
};

const SKIN_TONES = {
  light:       { face: "#f5cba7" },
  mediumLight: { face: "#d4956a" },
  medium:      { face: "#b06040" },
  mediumDark:  { face: "#7d4535" },
  dark:        { face: "#4a2820" },
  deep:        { face: "#2c1810" },
};

const HAIR = "#2d2f45";
const CIRCLE_BG = "#f4f4f8";
const CIRCLE_STROKE = "#c8c8d8";
const HAT_COLOR = "#1aada8";
const HAT_BRIM = "#d8d8d8";
const GLASSES = "#111";

const VB = 400;
const CX = 200;
const CY = 200;
const CR = 190;

// Generates a 5-point star path centered at (cx, cy) with outer radius r
function starPath(cx, cy, r, points = 5) {
  const inner = r * 0.45;
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const angle = i * step - Math.PI / 2;
    const radius = i % 2 === 0 ? r : inner;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    d += (i === 0 ? "M" : "L") + ` ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

export default function AvatarSVG({
  gender = "male",
  shirtColor = "green",
  skinTone = "mediumDark",
  glasses = false,
  partyHat = false,
  gamesCompleted = 0,
  size = 400,
}) {
  const shirt = SHIRT_COLORS[shirtColor] || SHIRT_COLORS.green;
  const skin = SKIN_TONES[skinTone] || SKIN_TONES.mediumDark;
  const isFemale = gender === "female";

  // Head center and size — everything is anchored to these
  const headCX = 200;
  const headCY = 210;
  const headRX = 54;
  const headRY = 60;

  // Hat brim sits on top of head
  const hatBrimY = headCY - headRY + 8; // slightly into the hair
  const hatTipY = hatBrimY - 120;
  const hatBrimRX = 42;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${VB} ${VB}`}>
      <Defs>
        <ClipPath id="circleClip">
          <Circle cx={CX} cy={CY} r={CR} />
        </ClipPath>
      </Defs>

      {/* Background */}
      <Circle cx={CX} cy={CY} r={CR} fill={CIRCLE_BG} stroke={CIRCLE_STROKE} strokeWidth="2" />

      <G clipPath="url(#circleClip)">

        {/* ── SHIRT ── */}
        <Path
          d={isFemale
            ? "M 40 400 Q 55 305 135 278 Q 165 268 200 265 Q 235 268 265 278 Q 345 305 360 400 Z"
            : "M 55 400 Q 68 312 140 282 Q 168 272 200 270 Q 232 272 260 282 Q 332 312 345 400 Z"
          }
          fill={shirt}
        />

        {/* ── FEMALE PONYTAIL (behind everything) ── */}
        {isFemale && (
          <Path
            d="M 178 185 Q 148 200 132 240 Q 118 280 120 340 Q 122 375 130 400 L 148 400 Q 142 370 142 335 Q 140 278 156 240 Q 168 210 182 200 Z"
            fill={HAIR}
          />
        )}

        {/* ── NECK ── */}
        <Path
          d={`M ${headCX - 18} ${headCY + headRY - 10} Q ${headCX - 18} ${headCY + headRY + 28} ${headCX} ${headCY + headRY + 32} Q ${headCX + 18} ${headCY + headRY + 28} ${headCX + 18} ${headCY + headRY - 10} Z`}
          fill={skin.face}
        />

        {/* ── PARTY HAT CONE (rendered before head so brim sits on top) ── */}
        {partyHat && (
          <G>
            <Path
              d={`M ${headCX} ${hatTipY} L ${headCX - hatBrimRX} ${hatBrimY} L ${headCX + hatBrimRX} ${hatBrimY} Z`}
              fill={HAT_COLOR}
            />
            {/* Dots */}
            <Circle cx={headCX} cy={hatTipY + 48} r={8} fill="white" opacity="0.9" />
            <Circle cx={headCX - 18} cy={hatTipY + 72} r={6} fill="white" opacity="0.9" />
            <Circle cx={headCX + 18} cy={hatTipY + 72} r={6} fill="white" opacity="0.9" />
            <Circle cx={headCX} cy={hatTipY + 24} r={5} fill="white" opacity="0.9" />
            {/* Tip pom */}
            <Circle cx={headCX} cy={hatTipY} r={7} fill="white" />
          </G>
        )}

        {/* ── HEAD ── */}
        <Ellipse cx={headCX} cy={headCY} rx={headRX} ry={headRY} fill={skin.face} />

        {/* ── MALE HAIR CAP ── */}
        {!isFemale && (
          <Path
            d={`M ${headCX - headRX} ${headCY}
                Q ${headCX - headRX} ${headCY - headRY - 10} ${headCX} ${headCY - headRY - 8}
                Q ${headCX + headRX} ${headCY - headRY - 10} ${headCX + headRX} ${headCY}
                Q ${headCX + headRX - 4} ${headCY - 20} ${headCX + headRX - 14} ${headCY - 28}
                Q ${headCX + 20} ${headCY - headRY + 4} ${headCX} ${headCY - headRY + 2}
                Q ${headCX - 20} ${headCY - headRY + 4} ${headCX - headRX + 14} ${headCY - 28}
                Q ${headCX - headRX + 4} ${headCY - 20} ${headCX - headRX} ${headCY} Z`}
            fill={HAIR}
          />
        )}

        {/* ── FEMALE HAIR FRONT CAP ── */}
        {isFemale && (
          <Path
            d={`M ${headCX - headRX} ${headCY + 5}
                Q ${headCX - headRX - 2} ${headCY - headRY - 8} ${headCX} ${headCY - headRY - 10}
                Q ${headCX + headRX + 2} ${headCY - headRY - 8} ${headCX + headRX} ${headCY + 5}
                Q ${headCX + headRX - 8} ${headCY - 15} ${headCX + headRX - 20} ${headCY - 25}
                Q ${headCX + 16} ${headCY - headRY + 6} ${headCX} ${headCY - headRY + 4}
                Q ${headCX - 16} ${headCY - headRY + 6} ${headCX - headRX + 20} ${headCY - 25}
                Q ${headCX - headRX + 8} ${headCY - 15} ${headCX - headRX} ${headCY + 5} Z`}
            fill={HAIR}
          />
        )}

        {/* ── HAT BRIM (on top of hair) ── */}
        {partyHat && (
          <Ellipse
            cx={headCX}
            cy={hatBrimY}
            rx={hatBrimRX}
            ry={11}
            fill={HAT_BRIM}
          />
        )}

        {/* ── GLASSES ── */}
        {glasses && (
          <G>
            {/* Left lens */}
            <Rect x={158} y={headCY - 8} width={38} height={24} rx={5} fill={GLASSES} />
            {/* Right lens */}
            <Rect x={204} y={headCY - 8} width={38} height={24} rx={5} fill={GLASSES} />
            {/* Bridge */}
            <Rect x={196} y={headCY - 1} width={8} height={5} fill={GLASSES} />
            {/* Left arm */}
            <Rect x={146} y={headCY - 2} width={12} height={5} rx={2} fill={GLASSES} />
            {/* Right arm */}
            <Rect x={242} y={headCY - 2} width={12} height={5} rx={2} fill={GLASSES} />
          </G>
        )}

      </G>

      {/* Circle border on top */}
      <Circle cx={CX} cy={CY} r={CR} fill="none" stroke={CIRCLE_STROKE} strokeWidth="2" />

      {/* ── GAMES BADGE (avatar's top-left = screen's top-right of circle) ── */}
      {gamesCompleted > 0 && (
        <G>
          {/* Outer ring */}
          <Circle cx={CX + CR - 22} cy={CY - CR + 22} r={28} fill="white" />
          {/* Filled badge */}
          <Circle cx={CX + CR - 22} cy={CY - CR + 22} r={23} fill="#f4c430" />
          {/* Star icon — 5-point star drawn as a path */}
          <Path
            d={starPath(CX + CR - 22, CY - CR + 22, 11, 5)}
            fill="#c8860a"
          />
          {/* Number */}
          <SvgText
            x={CX + CR - 22}
            y={CY - CR + 22 + 5}
            fontSize="14"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
          >
            {gamesCompleted}
          </SvgText>
        </G>
      )}
    </Svg>
  );
}
