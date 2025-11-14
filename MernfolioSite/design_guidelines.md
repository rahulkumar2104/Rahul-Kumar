# Design Guidelines: Rahul Kumar - Full Stack Developer Portfolio

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from modern developer portfolios (Linear, Vercel, GitHub profiles) combined with professional tech company aesthetics. Focus on clean, technical sophistication with strategic visual hierarchy to highlight projects and skills.

## Core Design Principles
1. **Technical Minimalism**: Clean layouts that emphasize content over decoration
2. **Scannable Hierarchy**: Recruiters should find key information within 10 seconds
3. **Project-First**: Work showcases take visual priority
4. **Professional Polish**: University student presenting as industry-ready developer

---

## Typography System

**Primary Font**: Inter (via Google Fonts CDN)
- Headings: 600-700 weight
- Body: 400-500 weight

**Type Scale**:
- Hero Name: text-5xl md:text-6xl lg:text-7xl, font-bold
- Hero Tagline: text-xl md:text-2xl, font-medium
- Section Titles: text-3xl md:text-4xl, font-bold
- Project Titles: text-2xl md:text-3xl, font-semibold
- Subsection Headers: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg
- Captions/Meta: text-sm md:text-base

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Element gaps: gap-6 to gap-12
- Container padding: px-6 md:px-12 lg:px-16

**Grid System**:
- Container: max-w-7xl mx-auto
- Projects Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Skills Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Two-column sections: grid-cols-1 lg:grid-cols-2

---

## Page Structure & Components

### 1. Navigation (Sticky Header)
- Minimal logo/name on left
- Navigation links: About, Projects, Skills, Experience, Contact
- Ghost buttons with smooth scroll behavior
- Transparent background with blur on scroll
- Height: h-16 md:h-20

### 2. Hero Section (80vh)
**Layout**: Single column, centered content with profile photo
- Profile photo: Circular, w-32 h-32 md:w-40 md:h-40, subtle shadow
- Name: Prominent display with gradient text effect
- Title: "Full Stack Developer | MERN Stack Specialist"
- Brief tagline: One-line value proposition
- CTA buttons: "View Projects" (primary), "Download Resume" (secondary) with blur backdrop
- Quick stats bar: "3 Projects • 4★ HackerRank • Published Researcher"
- Social icons: LinkedIn, GitHub (Heroicons, size-6)

### 3. About Section
**Layout**: Two columns (lg), single column (mobile)
- Left: Expanded bio paragraph highlighting journey, passion, current focus
- Right: Quick facts card with education, location, availability status
- Background: Subtle gradient or pattern

### 4. Skills Section
**Layout**: Category-based grid
- Four categories: Languages, Frameworks, Tools, Specializations
- Each skill: Card with icon placeholder, name, proficiency indicator (subtle)
- Grid: 2 columns mobile, 4 columns desktop
- Hover effect: Subtle lift

### 5. Projects Showcase (Primary Focus)
**Layout**: Featured project + grid
- Featured Project (AI Mock Interview): Full-width card with:
  - Large preview image placeholder (16:9 aspect)
  - Detailed description
  - Tech stack badges
  - "Published Research" badge highlight
  - Links: Live Demo, GitHub, Research Paper
  
- Other Projects Grid (2 projects):
  - Card-based layout with preview images
  - Title, description, tech stack
  - GitHub links
  - Hover: Slight scale up

### 6. Experience/Training Timeline
**Layout**: Vertical timeline with cards
- Cipher School internship card with learning outcomes
- Visual timeline connector between items
- Icons for different types (education, internship, achievement)

### 7. Certifications & Achievements
**Layout**: Two-column grid (stacks on mobile)
- Left: Certifications with issuer logos (placeholder)
- Right: Achievements with icons
- Card-based presentation with borders

### 8. Contact Section
**Layout**: Split view (60/40)
- Left: Contact form (Name, Email, Message fields)
  - Input fields: Outlined style, focus states
  - Submit button: Primary CTA style
- Right: Contact information card
  - Email, Phone, Location
  - Social links (large interactive icons)
  - Availability status: "Open to opportunities"

### 9. Footer
- Minimal design
- Copyright, social links
- "Built with MERN Stack" badge
- Quick navigation links

---

## Component Library

**Buttons**:
- Primary: Solid fill, rounded-lg, px-6 py-3, font-medium
- Secondary: Outlined, same dimensions
- Icon buttons: size-10 md:size-12, rounded-full

**Cards**:
- Standard: rounded-xl, border, p-6, shadow-sm
- Hover: shadow-lg transition
- Project cards: rounded-2xl, overflow-hidden

**Badges**:
- Tech stack: rounded-full, px-3 py-1, text-sm, border

**Forms**:
- Inputs: rounded-lg, border, px-4 py-3, focus:ring-2
- Textareas: min-h-32

**Icons**: Heroicons (outline style), size-5 to size-6

---

## Images

**Hero Section**: 
- Profile photo: Professional headshot (circular crop)
- Background: Subtle geometric pattern or gradient (optional decorative element)

**Projects Section**:
- AI Mock Interview: Modern interview setup, AI/tech aesthetic mockup (16:9)
- Movie Box: Netflix-style interface screenshot (16:9)
- Shopping Website: E-commerce dashboard/product grid (16:9)

**About Section**:
- Optional: Workspace/coding setup photo (subtle, not dominant)

---

## Animations
- Scroll-triggered fade-ins for sections (minimal, subtle)
- Smooth scroll for navigation
- Hover transitions on cards (200-300ms)
- NO complex animations, parallax, or scroll-jacking

---

## Responsive Behavior
- Mobile-first approach
- Single column layouts below md breakpoint
- Hamburger menu for mobile navigation
- Touch-friendly tap targets (min 44px)
- Optimized image loading