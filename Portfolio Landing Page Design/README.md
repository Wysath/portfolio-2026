# 🚀 Portfolio 2026

> **Creative Developer & UI Designer Portfolio**

**Auteur** : Louna Petitfils  
**Formation** : M1 Lead Developer Front-End — ECV Bordeaux  
**Date** : Janvier 2026

---

## 📦 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
- npm ou yarn

### Étapes

```bash
# 1. Cloner le projet
git clone <url-du-repo>

# 2. Accéder au dossier
cd portfolio-2026

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Scripts disponibles

 `npm run dev` | Lance le serveur de développement |
 `npm run build` | Build de production |
 `npm run preview` | Prévisualisation du build |

---

## ✨ Fonctionnalités

-  **Preloader** — Animation multilingue avec progression
-  **Transitions de page** — Effet clip-path fluide
-  **Text reveals** — Animations de texte au scroll
-  **Animations au scroll** — ScrollTrigger GSAP
-  **Section pin** — Sticky scroll avec parallax
-  **Scroll horizontal** — Section projets défilante
-  **Slider fullscreen** — Carousel GSAP avec drag/swipe
-  **Smooth scroll** — Lenis intégré
-  **Custom cursor** — Curseur avec trail et états multiples
-  **Grilles interactives** — Animation Awwwards refaite

---

## 🛠️ Stack technique

 **Framework** | React + TypeScript |
 **Build** | Vite |
 **Animations** | GSAP + ScrollTrigger |
 **Transitions** | Framer Motion |
 **Smooth Scroll** | Lenis |
 **Styling** | Tailwind CSS |
 **Routing** | React Router |

---

## 🎨 Sources & Inspirations

### Preloader
- [Dennis Snellenberg](https://dennissnellenberg.com/)

### Transitions de page
- [Lusion](https://lusion.co/)
- [Monopo London](https://monopo.london/)

### Text reveals
- [Obys Agency](https://obys.agency/)
- [Aristide Benoist](https://aristidebenoist.com/)

### Custom Cursor
- [14islands](https://14islands.com/)
- [Dogstudio](https://dogstudio.co/)

### Scroll horizontal
- [Locomotive](https://locomotive.ca/)
- [Resn](https://resn.co.nz/)

### Slider fullscreen
- [Aristide Benoist](https://aristidebenoist.com/)
- [Lusion](https://lusion.co/)

### Split screen / Pin
- [Fantasy](https://fantasy.co/)
- [Obys Agency](https://obys.agency/)

### Smooth scroll
- [Lenis by Studio Freight](https://lenis.studiofreight.com/)

---

## Animation Awwwards refaite

> **Source** : [Eszter Bial — About](https://eszterbial.com/about)

Grilles interactives avec petites cases cliquables, refaites sur ma page `/about` avec GSAP :


 `SubdivisionGrid` | Subdivision récursive au clic | `stagger` grid + `back.out` |
 `MorphologyGrid` | Morphing de formes | `elastic.out` |
 `ElevationGrid` | Barres d'élévation aléatoires | `power2.inOut` |

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── CustomCursor.tsx      # Curseur personnalisé
│   ├── Navigation.tsx        # Navigation principale
│   ├── Preloader.tsx         # Preloader animé
│   └── interactions/         # Grilles interactives (Awwwards)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── sections/
│   ├── HeroSection.tsx       # Hero avec text reveals
│   ├── HorizontalScrollSection.tsx
│   ├── SplitScreenSection.tsx
│   └── WebGLSlider.tsx       # Slider fullscreen
└── App.tsx                   # Routes + Lenis + transitions
```

---

## 📝 License

Projet réalisé dans le cadre du module GSAP — ECV Bordeaux 2026

---

<p align="center">
  <strong>Louna Petitfils</strong> · 2026
</p>