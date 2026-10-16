# 💪 Muscular Tissues I - Interactive Learning Game

An interactive, web-based drag-and-drop classification game built to help students review and master key concepts from the **Muscular Tissues I** lecture.

---

## 🌟 Features

- **Multi-Level Progressive Gameplay:**
  - **Level 1: Organization & Connective Tissue Sheaths** (Epimysium, Perimysium, Endomysium, Sarcomere, Filaments)
  - **Level 2: Muscle Tissue Types** (Skeletal, Cardiac, and Smooth Muscle characteristics)
  - **Level 3: Fiber Types & Clinical Disorders** (Slow Oxidative, Fast Glycolytic, DMD, Myasthenia Gravis)
- **True Randomization Engine:** Employs the **Fisher-Yates Shuffle Algorithm** to randomize card sequences and category positions on every restart or shuffle button click.
- **Cross-Platform Touch & Mouse Support:** Smooth drag-and-drop experience on desktop computers, laptops, tablets, and smartphones.
- **Synthesized Audio Effects:** Powered by the **Web Audio API** for responsive sound effects (drag, shuffle, correct, and incorrect actions) without requiring external audio files.
- **Detailed Lecture Review:** Displays item-by-item feedback along with explanations derived from lecture materials upon answer submission.
- **Gamification Mechanics:** Features countdown timers, active combos, real-time score tracking, and star ratings.

---

## 📁 Project Structure

```text
muscle-tissue-game/
├── index.html     # Game HTML structure and modal dialogs
├── style.css      # Glassmorphism styling, responsive layout, and animations
├── script.js      # Game engine, Fisher-Yates shuffle, drag-and-drop logic, sound synth
└── README.md      # Project documentation