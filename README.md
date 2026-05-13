# StackU Academy

Cinematic multi-page landing site for a premium finance education product. The redesign turns the original static brochure into a product-style website with generated hero imagery, scroll-reveal motion, interactive track selection, pricing toggles, a validated lead form, and Playwright coverage.

## Live Demo

[Open the website](https://alinayevstropova.github.io/Education/)

## What Changed

- Repositioned the brand from a generic finance course site into `StackU Academy`
- Added four generated cinematic image assets under `images/cinematic-*.png`
- Rebuilt the homepage as a premium product journey: hero, proof band, story chapters, curriculum, track lab, pricing, testimonials, FAQ, and application CTA
- Redesigned About, Pricing, Insights, and Contact pages to match the new visual system
- Added accessible mobile navigation, reduced-motion handling, form validation, and local success feedback
- Added Playwright tests for core product flows and responsive behavior

## Tech Stack

- HTML
- CSS
- JavaScript
- Playwright
- GitHub Pages

## Local Workflow

```bash
npm install
npm run dev
npm test
```

The dev server runs at `http://127.0.0.1:4173`.

## Test Coverage

The Playwright suite checks:

- Homepage product story and generated hero asset
- Horizontal overflow on desktop and mobile
- Interactive learning track switcher
- Pricing billing mode toggle
- Lead form validation and success state
- Mobile navigation open and close behavior

## Quality Workflow

The project is prepared for GitHub Actions with a Playwright QA job that runs
browser regression tests on pull requests and pushes to `main`.

## Portfolio Note

This project now demonstrates visual design judgment, static-site architecture, responsive UI implementation, and automated browser testing. It is still a static GitHub Pages project, so no backend data is submitted from the forms.
