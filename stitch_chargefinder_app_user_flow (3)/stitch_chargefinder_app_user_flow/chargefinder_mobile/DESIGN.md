---
name: Chargefinder Mobile
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#ef9900'
  on-tertiary-container: '#5c3800'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  inline-gutter: 16px
  safe-margin: 20px
---

## Brand & Style

This design system is built for a high-utility, high-trust mobile experience centered around the EV driver's journey. The aesthetic is **Corporate Modern** with a strong leaning toward **Minimalism**, ensuring that critical information (charger availability and speed) is never obscured by decorative elements.

The UI prioritizes "at-a-glance" comprehension. It utilizes a mobile-first, single-column architecture to reduce cognitive load while driving or navigating. The emotional response should be one of reliability and calm efficiency—transforming the potential anxiety of "range awareness" into a streamlined, predictable task. High-quality whitespace and a systematic use of status colors provide a professional environment that feels native to modern smartphone OS standards.

## Colors

The palette is functional rather than decorative, using color as a primary data signal:

- **Primary (#22C55E):** Used exclusively for positive actions and "Available" states. This reinforces the association between the brand and a successful charging outcome.
- **On-Background (#1E293B):** A deep slate used for all primary text and iconography to ensure AAA contrast ratios against the light background.
- **Status Colors:** Amber (#F59E0B) is reserved for "Busy" or "Occupied" states. Red (#EF4444) signifies hardware "Out of Service."
- **Neutral/Surface (#F8FAFC):** A cool-toned white/grey background that reduces glare and provides a clean canvas for the high-contrast status indicators.

## Typography

This design system utilizes **Inter** for its exceptional legibility on mobile screens, particularly in small sizes for technical data. 

- **Hierarchy:** Headlines use tighter letter spacing and heavier weights to stand out against a sea of map data. 
- **Readability:** Body text is optimized for quick scanning; use `body-lg` for station descriptions and `body-sm` for address details. 
- **Meta-data:** `label-sm` is the workhorse for "freshness labels" (e.g., "Updated 5m ago"), providing necessary context without competing with the primary status.

## Layout & Spacing

The layout follows a **Single-Column Fluid** model designed for one-handed mobile use. 

- **Grid:** Content is contained within a 20px safe-margin on both sides.
- **Rhythm:** An 8px linear scale (4, 8, 16, 24, 32) governs all vertical stacking. 
- **Sticky Zones:** Primary actions (e.g., "Start Charge") are always housed in a full-width sticky bottom CTA container, ensuring they are reachable by the thumb regardless of scroll position.
- **Horizontal Scrolling:** Use horizontal overflow only for secondary chips (e.g., time selection) to keep the vertical scan-line clean.

## Elevation & Depth

To maintain a modern, flat aesthetic, depth is primarily communicated through **Tonal Layers** rather than heavy shadows.

- **Level 0 (Background):** The base `#F8FAFC` surface.
- **Level 1 (Cards):** Use pure white backgrounds with a subtle, 1px border (#E2E8F0) to define card boundaries.
- **Level 2 (Sticky Elements):** For sticky headers and bottom buttons, use a light backdrop blur (Glassmorphism) with 95% opacity to indicate the content is passing underneath.
- **Interaction:** A soft, diffused ambient shadow (0px 4px 12px rgba(0,0,0,0.05)) is reserved strictly for the active floating vehicle selection card or the "Start Charge" button to pull it into the foreground.

## Shapes

The shape language is **Rounded**, reflecting the soft edges of modern vehicles and providing a friendly, approachable feel.

- **Standard Elements (0.5rem):** Applies to input fields, list cards, and badges.
- **Large Elements (1rem):** Used for modal sheets and main action containers to provide a distinct structural change.
- **Pill (Full Round):** Used exclusively for status chips (Available/Busy) and "Freshness" labels to distinguish them from interactive buttons.

## Components

- **Sticky Bottom CTA:** Full-width buttons inside a 24px padded container at the screen bottom. Use the Primary color for the "Start" action and high-contrast Slate for "Navigation."
- **Vehicle Cards:** Rectangular cards with an 8px radius featuring a centered SVG icon of the vehicle. Selected states are indicated by a 2px Primary border.
- **Status Badges:** Compact pill-shaped labels. "Available" uses Green background with white text. "Busy" uses Amber. Include the "Updated 3m ago" label in `label-sm` immediately to the right or below the badge.
- **Horizontal Chips:** Used for filtering and time selection. Active chips use the Slate (#1E293B) background; inactive chips use a light grey stroke.
- **Inputs:** Phone and OTP inputs should feature a 1px border that thickens to 2px Primary on focus. Use large, center-aligned text for OTP fields to minimize input error.
- **Lists:** Card-based with 16px internal padding. Every list item must have a clear visual separator (hairline divider) or consistent vertical spacing of 12px.