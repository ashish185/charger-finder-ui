---
name: Operations Command
colors:
  surface: '#0b141c'
  surface-dim: '#0b141c'
  surface-bright: '#313a43'
  surface-container-lowest: '#060f16'
  surface-container-low: '#141c24'
  surface-container: '#182028'
  surface-container-high: '#222b33'
  surface-container-highest: '#2d363e'
  on-surface: '#dae3ee'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#dae3ee'
  inverse-on-surface: '#29313a'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#53e076'
  primary: '#53e076'
  on-primary: '#003914'
  primary-container: '#1db954'
  on-primary-container: '#004118'
  inverse-primary: '#006e2d'
  secondary: '#c3c6cf'
  on-secondary: '#2d3137'
  secondary-container: '#454950'
  on-secondary-container: '#b5b8c1'
  tertiary: '#c1c7d0'
  on-tertiary: '#2b3138'
  tertiary-container: '#9ba1aa'
  on-tertiary-container: '#32383f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72fe8f'
  primary-fixed-dim: '#53e076'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#dfe2eb'
  secondary-fixed-dim: '#c3c6cf'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474e'
  tertiary-fixed: '#dde3ec'
  tertiary-fixed-dim: '#c1c7d0'
  on-tertiary-fixed: '#161c23'
  on-tertiary-fixed-variant: '#41474f'
  background: '#0b141c'
  on-background: '#dae3ee'
  surface-variant: '#2d363e'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 16px
  gutter: 12px
---

## Brand & Style

This design system is engineered for high-stakes infrastructure management and real-time operational oversight. It transitions from a consumer-facing aesthetic to a professional, high-density dashboard environment tailored for Charge Point Operators (CPOs).

The style is **Corporate Modern** with a focus on functional clarity and data density. It utilizes a deep, monochromatic foundation to reduce eye strain during long monitoring sessions, punctuated by high-contrast status indicators. The aesthetic is precise, systematic, and authoritative, evoking a sense of "Mission Control" through rigorous grid alignment and a restrained but meaningful use of color.

## Colors

The palette is optimized for an operational "Dark Mode" environment. 

- **Primary Green:** Darkened from the consumer version to a professional forest-tech green (#1DB954). It is used exclusively for actionable states and "online" health indicators.
- **Surface & Background:** The foundation uses a deep obsidian (#010409) to provide maximum contrast for data visualizations. Layered surfaces use a slightly lighter navy-grey (#0D1117) to create subtle depth.
- **Functional Accents:** Status colors (Success, Warning, Error) are desaturated but high-luminance to ensure they stand out against the dark background without causing visual vibration.
- **Neutral/Text:** High-quality grays provide a clear hierarchy for metadata and secondary labels.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic, utilitarian feel. 

- **Weight Scaling:** Headlines use Semibold (600) and Bold (700) weights to anchor the page layout. 
- **Data Readability:** Body text is kept at a comfortable 14px-16px range. A secondary monospaced font is introduced for technical IDs, charging speeds, and timestamps to ensure character alignment in tabular data.
- **Hierarchy:** Uppercase labels with slight letter spacing are used for section headers and table headers to distinguish them from interactive data points.

## Layout & Spacing

The layout employs a **Fluid Grid** with a strict 8px baseline rhythm. 

- **Density:** Padding is tighter than the consumer version to allow more information to be visible on a single screen. 
- **Structure:** On mobile, a 4-column grid is used with 16px side margins. 
- **Vertical Rhythm:** Elements are stacked using increments of 8px (8, 16, 24, 32) to maintain a rigid, professional structure suitable for data-heavy dashboards.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** rather than heavy shadows to maintain a sleek, technical appearance.

- **Level 0 (Background):** Solid #010409.
- **Level 1 (Card/Surface):** Solid #0D1117.
- **Level 2 (Active/Hover):** Solid #161B22.
- **Borders:** Low-contrast outlines using #30363D are the primary method for defining element boundaries. 
- **Shadows:** Only used on floating modals or dropdowns. These should be "Dark Ambient" shadows: sharp, low-spread, and high-opacity to prevent a "soft" consumer look.

## Shapes

The design system uses a **Rounded** (Level 2) shape language, consistent with the 8px rounding philosophy (ROUND_EIGHT).

- **Standard Elements:** Buttons, input fields, and cards utilize a 0.5rem (8px) corner radius.
- **Large Containers:** Modals and large feature cards utilize a 1rem (16px) radius.
- **Micro-elements:** Status badges and tags may use a pill-shape (full rounding) to differentiate them from interactive buttons.

## Components

- **Buttons:** Primary buttons use the deep green background with white text. Secondary buttons use a transparent background with a #30363D border. State changes (hover/active) are indicated by subtle lightening of the background color.
- **Input Fields:** Dark background (#0D1117) with a subtle border. Focus state is indicated by a primary green border and a 1px glow.
- **Cards:** Used to group telemetry data. They feature no shadows, only a 1px border (#30363D). 
- **Status Chips:** Small, high-contrast badges used for "Available," "Charging," or "Fault." These use a background tint of the status color with a high-luminance text color for legibility.
- **Data Tables:** High-density rows with 1px bottom dividers. Alternate row stripping is avoided in favor of hover highlighting.
- **Telemetry Indicators:** Small sparklines or progress bars using the primary green to show real-time load or health.