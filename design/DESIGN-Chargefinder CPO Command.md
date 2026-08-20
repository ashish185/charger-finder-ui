---
name: Chargefinder CPO Command
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
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#1e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#35260c'
  on-tertiary-container: '#a38c6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#fadfb8'
  tertiary-fixed-dim: '#ddc39d'
  on-tertiary-fixed: '#271902'
  on-tertiary-fixed-variant: '#564427'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-margin: 32px
  gutter: 24px
  sidebar-width: 260px
  card-padding: 20px
  table-cell-padding: 12px 16px
---

## Brand & Style
This design system is engineered for the high-stakes environment of Charge Point Operator (CPO) management. It prioritizes **accountability, efficiency, and professional trust**. 

The aesthetic is **Corporate Modern with a focus on Information Density**. It leverages a "Work-State" philosophy where visual flair is secondary to data legibility and system status clarity. The interface utilizes a structured, tiered surface system to organize complex operational data without overwhelming the user. 

Key attributes:
- **Utilitarian Precision:** Every pixel serves a functional purpose in monitoring infrastructure.
- **High Information Density:** Optimized for desktop displays to minimize scrolling and maximize situational awareness.
- **Status-First Hierarchy:** Critical system alerts and "Trust Scores" are the highest points of visual interest.

## Colors
The palette is anchored in a professional navy/slate foundation to establish a sense of stability and authority. 

- **Primary & Secondary:** Used for the core application framework, sidebar navigation, and primary headers. These deep tones provide a neutral backdrop that allows status colors to pop.
- **Status Accents:** Success, Warning, and Danger colors are used strictly for system health indicators, uptime metrics, and actionable alerts. They must maintain a high contrast ratio against both the background and their respective text labels.
- **Surface Tones:** A range of cool grays (#f1f5f9 to #f8fafc) is used to differentiate between the global background and individual data containers.

## Typography
The system uses **Inter** exclusively to ensure maximum legibility across dense data tables and technical dashboards.

- **Data Density:** `body-sm` and `data-mono` are the workhorse sizes for table rows and technical specifications.
- **Hierarchy:** Use `label-caps` for table headers and small section titles to provide clear categorization without occupying significant vertical space.
- **Readability:** For numerical data (latencies, power output, revenue), ensure the use of tabular lining figures if available in the implementation to maintain vertical alignment in lists.

## Layout & Spacing
The layout follows a **Desktop-First, Sidebar-Led** model.

- **Global Framework:** A fixed left-hand sidebar contains primary navigation. The main content area uses a fluid grid with a maximum content width of 1600px to prevent excessive line lengths on ultra-wide monitors.
- **Card-Based Summaries:** Top-level metrics (Total Uptime, Active Sessions, Trust Score) are housed in cards at the top of the viewport.
- **The 4px Grid:** All spacing (padding, margins, component heights) should be increments of 4px to maintain a tight, mathematical rhythm suitable for a back-office tool.
- **Responsive Behavior:** On smaller desktop screens (under 1280px), the sidebar may collapse into an icon-only rail to prioritize the central data table.

## Elevation & Depth
This design system uses **Tonal Layers and Low-Contrast Outlines** rather than heavy shadows to maintain a clean, "pro" appearance.

- **Level 0 (Background):** #f8fafc. The primary canvas for the application.
- **Level 1 (Cards/Containers):** White (#ffffff) with a 1px border (#e2e8f0). This is the standard container for all data.
- **Level 2 (Modals/Overlays):** White with a soft, diffused shadow (0 10px 15px -3px rgba(0,0,0,0.1)) to indicate temporary interaction states.
- **Active States:** Subtle inset shadows or 2px primary-colored borders are used to denote focused inputs or selected navigation items.

## Shapes
The shape language is **Soft (0.25rem)**, reflecting a serious and structured environment. 

- **Standard Elements:** Buttons, input fields, and tags use the base 4px (0.25rem) radius.
- **Large Containers:** Dashboard cards and summary modules use the `rounded-lg` (8px) setting to provide a slight visual distinction from individual interactive components.
- **Status Gauges:** Trust score gauges and circular status indicators are the only exceptions, utilizing full pill/circle rounding to contrast against the otherwise rectilinear grid.

## Components
Consistent implementation of these core components ensures the portal remains intuitive for operators.

- **Data Tables:** Headers must support "Sort" indicators. Row heights are compact (48px). Hover states on rows should use a subtle tint (#f1f5f9).
- **Status Toggles:** Large, unambiguous switches. Use Success (#22c55e) for 'Active' and Neutral Gray (#cbd5e1) for 'Inactive'. Label the state clearly next to the toggle (e.g., "LIVE").
- **Acknowledgement Banners:** Used for system alerts. These span the full width of the content area, using background tints of the status colors (e.g., light red for Danger) with bold icons.
- **Trust Score Gauges:** Semi-circular progress bars that visualize a 0-100 score. The color of the bar must dynamically change based on the score threshold (Danger < 70, Warning 70-85, Success > 85).
- **Primary Buttons:** High-contrast navy (#1e293b) with white text. 
- **Input Fields:** Professional 1px bordered boxes with clear, floating labels or persistent top-aligned labels for rapid form completion.