---
name: Nexus Terminal
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#89ceff'
  on-secondary: '#00344d'
  secondary-container: '#00a2e6'
  on-secondary-container: '#00344e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  headline-md-mobile:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-page: 32px
  container-padding: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for high-stakes administrative oversight, prioritizing maximum information density and rapid cognitive processing. It targets technical administrators and systems engineers who require a "God-view" of complex infrastructures.

The aesthetic is **Cyber-Minimalist**—a synthesis of high-contrast professional utility and futuristic data visualization. It utilizes deep ebony backgrounds to minimize eye strain during long-term monitoring, punctuated by vibrant, neon-inflected accents that signal administrative authority. The interface feels like a high-end command deck: precise, cold, and immensely powerful. It avoids unnecessary decoration, focusing instead on structural integrity, clear hierarchies, and the "Operations Command" heritage of tactical responsiveness.

## Colors

The palette is anchored by a sophisticated **Electric Indigo** (#7C3AED), which serves as the primary administrative accent, distinguishing this environment from standard operational views.

- **Primary (Electric Indigo):** Used for primary actions, active states, and administrative highlights.
- **Secondary (Cyan Pulse):** Used for data visualization, secondary interactive elements, and informational badges.
- **Success/Tertiary (System Green):** Reserved for healthy system states and "Go" signals.
- **Backgrounds:** The primary surface is `#020617` (Deep Space), providing a high-contrast foundation for white text and vibrant accents.
- **Surfaces:** Use `#0F172A` (Midnight) for containers and `#1E293B` (Slate) for elevated hover states.

## Typography

This design system utilizes a dual-font strategy to balance modern elegance with technical precision. 

**Geist** is the headline face, providing a clean, neo-grotesque structure that feels architectural and authoritative. **JetBrains Mono** is the workhorse font for all body text, data points, and code-adjacent labels, reinforcing the "Command Line" heritage and ensuring that numeric data aligns perfectly in tables and logs.

Large displays should use tight letter spacing for a "technical" look, while labels should always be monospaced to ensure visual consistency in data-dense dashboards.

## Layout & Spacing

The layout follows a **Rigid Grid** philosophy. Content is organized into a 12-column system on desktop, optimized for data density and minimizing vertical scrolling. 

- **Grid:** 12-column (Desktop), 8-column (Tablet), 4-column (Mobile).
- **Rhythm:** All spacing is derived from a 4px base unit. 
- **Density:** High. Margins between data cells are kept minimal (4-8px) to maximize the amount of visible information.
- **Responsive:** On mobile, sidebars collapse into a "Command Drawer," and complex tables transition into expandable cards.

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layering** rather than traditional shadows. This maintains a flat, technical aesthetic.

- **Level 0 (Base):** Deep Space (#020617) for the main application background.
- **Level 1 (Surface):** Midnight (#0F172A) for primary containers, sidebar backgrounds, and card bodies.
- **Level 2 (Active/Hover):** Slate (#1E293B) for interactive elements and highlighted rows.
- **Accents:** Use 1px "Inner Glow" borders (Primary color at 20% opacity) for high-priority containers to simulate a backlit glass effect. 
- **Borders:** Subtle 1px borders (#334155) define structure without adding visual noise.

## Shapes

The shape language is **Precision-Cut**. Elements use small, consistent corner radii to suggest a modern, engineered feel without becoming "soft" or consumer-oriented.

- **Standard (Soft):** 0.25rem for buttons, inputs, and small modules.
- **Container (Large):** 0.5rem for main dashboard panels and cards.
- **Interaction:** Hover states should retain the exact roundedness of the parent, often accompanied by a sharp color shift.

## Components

### Buttons
- **Primary:** Solid Electric Indigo with white monospaced text. High contrast, sharp focus states.
- **Ghost:** Transparent background with 1px border. Used for secondary administrative tasks.

### Data Tables
- The core component of the system.
- **Header:** Sticky, with `label-caps` typography and a 1px bottom border.
- **Rows:** Alternating subtle background tints; hover state uses the Secondary Cyan color for a thin left-edge highlight.

### Input Fields
- Dark backgrounds (#020617) with thin borders. 
- Focus state triggers an Electric Indigo glow and a monospaced "CMD_CURSOR" blinking underscore at the end of the text.

### Status Chips
- Small, uppercase labels with a low-opacity background fill and a high-opacity text color.
- **Critical:** Red-tinted with a subtle "Pulse" animation.

### Code Terminals
- Integrated command-line modules within the UI, using JetBrains Mono and a specific `#000000` background to denote "Superuser" input areas.

### Cards
- Use for grouping system metrics. No shadows; use 1px borders and Tonal Level 1 backgrounds.