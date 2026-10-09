# figmaCleaner 🧹

> A lightweight, open-source Figma plugin that automates canvas maintenance, purges invisible layer bloat, and optimizes file performance in one click.

---

## 🌟 Overview

`figmaCleaner` is built for designers and engineers who want clean, performant Figma files without manual layer management. As design systems scale, files accumulate hidden layers, empty frames, and redundant group nesting that slow down canvas rendering engines and create friction during developer handoff.

`figmaCleaner` audits and purges canvas debt across your active page instantly while maintaining non-destructive guardrails.

---

## ✨ Key Features

- **👁️ Remove Hidden Layers:** Scans the active page and purges all layers where `visible = false`.
- **📦 Delete Empty Containers:** Cleans up `FRAME` and `GROUP` nodes that contain zero child elements.
- **🔗 Unwrap Single-Child Groups:** Eliminates redundant group nesting by reparenting single child elements directly to their parent container.
- **🛡️ Defensive UX:** Non-destructive active-page scope guardrails with live execution notifications (`figma.notify`).
- **🎨 Native Aesthetics:** Styled using Figma's official design system tokens, supporting light and dark modes natively.

---

## 🛠️ Tech Stack & Architecture

- **Language:** TypeScript / JavaScript (ES6)
- **UI:** HTML5, CSS3 (Figma Design System CSS Variables)
- **API:** Figma Plugin API (`SceneNode` Tree Traversal)
- **Tooling:** Node.js, `tsc` (TypeScript Compiler)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Figma Desktop App

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/julsoyola/figmaCleaner.git](https://github.com/julsoyola/figmaCleaner.git)
   cd figmaCleaner