# Hero Layout & Bilingual i18n Implementation Guide

This document records the architectural decisions, root-cause geometry analysis, and implementation details for the **Hero Workstation Layout** and the **Bilingual Language Switcher (`English` / `हिन्दी`)** on the JeevDristi POCT website (`sicklesense`).

---

## 1. The 16:9 Fullscreen Hero Layout Challenge

### Initial Problem Statement
On 16:9 fullscreen displays (e.g. standard 1920×1080 desktop/laptop screens), the main hero heading *"Clarity at the point of care."* was overlapping with the physical POCT device box and upright test tube in the background image.

### Mathematical Root-Cause Analysis
1. **Asset Geometry Mismatch**:
   - The original background asset `poct-hero-workstation.webp` had dimensions **1024×1102** (an aspect ratio of **0.93:1**, nearly square/portrait).
   - The hero section was configured to span full width using `size-full object-cover object-bottom`.
2. **The Scaling Cascade**:
   - To cover a **1920px** wide screen, CSS scaled the 1024px image by a factor of:
     $$\text{Scale} = \frac{1920}{1024} \approx 1.875$$
   - Consequently, the rendered height of the image was forced to:
     $$\text{Rendered Height} = 1102 \times 1.875 \approx 2066\text{ px}$$
3. **The Viewport Clipping Dilemma**:
   - A standard 1080p monitor provides roughly **920px–960px** of actual browser viewport height (accounting for Windows taskbars, browser navigation bars, tabs, and the site header).
   - In the image, the vertical distance from the top of the test tube ($y \approx 490\text{ px}$) to the desk surface ($y \approx 980\text{ px}$) is:
     $$(980 - 490) \times 1.875 = 490 \times 1.875 \approx 918\text{ px}$$
   - **The physical hardware alone (device + tube + desk) occupied 918px of vertical height!**
4. **Why Both CSS Extremes Failed**:
   - **Extreme A (`object-bottom`)**: Anchoring to the bottom pushed the bottom of the image to 960px. The test tube was pushed up to $960 - 918 = 42\text{ px}$ from the top, colliding squarely with the H1 headline. The ~900px of empty wall space at the top of the image was pushed off-screen into negative space.
   - **Extreme B (`object-top` or `object-[50%_20%]`)**: Aligning to the top wall preserved the empty space for the text, but the remaining 1600px was pushed down below the bottom of the viewport, completely hiding the POCT box, phone, and desk below the fold.

---

## 2. The Solution: Native 16:9 Panoramic Asset & Focal Tuning

### Step 1: Native 16:9 Panoramic Widescreen Asset
Rather than stretching a 0.93:1 portrait image across a 16:9 screen, we created a native **16:9 panoramic workstation background** (`1920×1072`):
- **Center ($x \approx 460\text{ px}$ to $1460\text{ px}$)**: Preserves the authentic IIT Bhilai POCT testing unit, upright test tube with blood sample, and companion smartphone running the JeevDristi app on its metallic stand.
- **Left & Right Flanks**: Seamlessly expands the clinic desk surface, laboratory glassware, micropipettes, diagnostic tubes, and clinical laptop.
- **Top 50% ($y = 0\text{ px}$ to $530\text{ px}$)**: Generous, soft, airy clinical laboratory wall space engineered specifically for high-contrast headline and button typography.
- **Bottom 50% ($y = 530\text{ px}$ to $1072\text{ px}$)**: The grounded medical workstation resting on the desk.

Assets generated and optimized:
- `src/assets/poct-hero-workstation.webp`: Full 1920×1072 high-quality WebP.
- `src/assets/poct-hero-workstation-640.webp`: Responsive mobile-optimized 640×357 WebP.

### Step 2: Fine-Tuned Vertical Rhythm in `Hero.tsx`
With a native 16:9 background, the browser no longer needs to scale up the height:
- Hero section set to `min-h-[calc(100vh-4rem)]` for an edge-to-edge product landing feel.
- Image sized with `size-full object-cover object-bottom`.
- Top padding set to `pt-3 sm:pt-5 md:pt-7`.
- Spacing between the badge, H1, description, CTA buttons, and diagnostic highlights ribbon tuned so the highlights ribbon ends with comfortable breathing room (~40px) above the test tube cap.
- Real 1920×1080 headless Chrome screenshots verified that all elements (heading, copy, buttons, highlights, test tube, box, phone stand, and table) are simultaneously and fully visible with zero overlap.

---

## 3. Bilingual Localization (i18n) Architecture

### Target Locales
1. **English (India)** (`en-IN`) — Default locale.
2. **हिन्दी** (`hi`) — Complete Devanagari translation for clinical operators, healthcare workers, and regional field deployment.

### Module Structure: `src/lib/i18n.tsx`
- **Context & Hook**: Provides `useLanguage()` returning `{ locale, setLocale, t, isHindi }`.
- **Persistence**: Remembers user preference in `localStorage` under `sicklesense_locale`.
- **DOM Integration**: Dynamically updates `<html lang="...">` on locale change for proper screen-reader pronunciation and styling.
- **Font Fallbacks**: Configured in `src/index.css`:
  ```css
  --font-sans: "Lexend", "Noto Sans Devanagari", "Nirmala UI", sans-serif;
  ```

### Direct Segmented Control: `src/components/LanguageSwitcher.tsx`
- **Why Dropdown Was Avoided**: Dropdown menus for a two-language toggle add unnecessary interaction cost (2 clicks instead of 1) and are prone to nested event-handler clipping in headless UI libraries.
- **Segmented Control Design**:
  - Displays `[ 🌐 English | हिन्दी ]` directly in the navigation bar.
  - One-click instantaneous switching via direct React click handlers:
    ```tsx
    <button type="button" onClick={() => setLocale('en-IN')}>English</button>
    <button type="button" onClick={() => setLocale('hi')}>हिन्दी</button>
    ```
  - Active button highlighted with `bg-background text-primary shadow-xs font-semibold`.
  - Available in desktop header, mobile top bar, and mobile navigation sheet drawer.

### Translated Sections
All public user-facing surfaces are localized:
1. **Brand**: Title, subtitle ("सिकलसेंस पीओसीटी"), and logos.
2. **Navigation**: Links (Overview, Showcase, Workflow, Tech Specs, Results, Downloads), portal button, download CTA.
3. **Hero**: Innovation badge, two-line heading ("जाँच स्थल पर सटीक स्पष्टता"), value proposition description, dynamic APK version button, portal CTA, and 4 highlight metric cards.
4. **Showcase**: All hardware & software feature cards, badges, and bullet descriptions.
5. **Project Overview**: Mission statement, institutional attribution, and core clinical pillars.
6. **Workflow**: Step-by-step diagnostic journey (Sample Collection, Dark Chamber Assay, AI Cell Morphology, Instant Diagnostic Report).
7. **Tech Specs**: Optical, AI compute, connectivity, battery, and physical dimensions specifications.
8. **Phone Results Promo**: WebUSB offline companion data bridge callout.
9. **Release Downloads**: APK, box firmware, and workstation software release metadata.
10. **Footer**: Navigation anchors, copyright, and disclaimer.

---

## 4. Verification & Testing

1. **Unit Tests**:
   - `tests/i18n.test.ts`: Verifies locale keys, structure symmetry between `en-IN` and `hi`, dynamic helper formatters (`downloadApk(version)`), and workflow step counts.
   - Ran with `bun test` (11 tests pass).
2. **Linter & Typecheck**:
   - `bun run lint` (0 errors).
   - `bun run build` (`tsc -b && vite build` completes cleanly in ~300ms).
3. **Browser Visual Verification**:
   - Headless Chrome at 1920×1080 resolution verified zero collision between text and hardware.
