# DRL Midsem — Exam Prep Site

An interactive study site for the **Deep Reinforcement Learning** midsem (AIMLCZG512, BITS Pilani WILP). It explains every topic on the past papers — **theory → intuition → numericals** — and gives a fully worked, step-by-step solution to **every question** across all six exam papers.

👉 **Open [`index.html`](index.html)** in a browser to start (needs internet on first load for MathJax equation rendering).

## What's inside

| | |
|---|---|
| **Topics** | RL Fundamentals · Multi-Armed Bandits · MDPs · Dynamic Programming · Monte Carlo |
| **Solved papers** | Dec 2025 · Jan 2024 · Jul 2023 (open book) · Jul 2024 Regular · Jul 2024 Makeup |
| **Interactive tools** | Discounted-return calculator · bandit Q-tracker · ε-greedy exploration analyzer · value-iteration replayer |
| **Cheat-sheet** | Every formula + a table of all verified numerical answers (printable) |

## Features

- **Reveal-able solutions** — attempt each question, then click *Show solution*.
- **Self-test quizzes** on every topic page.
- **Interactive calculators** that reproduce the worked numbers.
- Light/dark theme, sidebar navigation, mobile-friendly, print-friendly cheat-sheet.

## Notes on correctness

- All numerical answers (value iteration, bandit Q-updates, discounted returns, Monte-Carlo averages) were **independently verified in code**; the interactive tools reproduce the same results.
- Diagrams embedded as photos in the source PDFs (wristband MDP, recycling robot, four-box game) were read from the originals and redrawn as clean SVG.
- A few items depend on a student-ID digit (Jul 2023 Q2 init value, Q3's *x*) — these are solved with the standard example and left parameterised.

## Structure

```
index.html                 dashboard
t1..t5-*.html              topic pages
s-*.html                   solved papers
tools.html                 interactive tools
cheatsheet.html            printable reference
assets/style.css           Notion-style theme
assets/app.js              nav, MathJax, reveal/quiz logic
```

## Optional: host it free with GitHub Pages

Settings → Pages → Build from branch → `main` / root. The site will be live at
`https://sanskarmk.github.io/DRL_Midsem/`.
