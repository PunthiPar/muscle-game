/**
 * Muscular Tissues I - Universal Cross-Platform Drag & Drop Engine
 * Supports PC (Mouse), iPad/Tablets, Mobile (Touch), and Stylus via Pointer Events.
 */

// 1. Dataset
const gameLevels = {
  1: {
    title: "Level 1: Organization & Connective Tissue Sheaths",
    instruction: "Differentiate between muscle structural hierarchy and connective tissue layers.",
    categories: [
      { id: "connective", title: "Connective Tissue Layers", color: "#3b82f6" },
      { id: "structure", title: "Structures & Microscopic Parts", color: "#10b981" }
    ],
    items: [
      { id: "i1", text: "Epimysium", category: "connective", desc: "Dense connective tissue sheath surrounding the entire skeletal muscle." },
      { id: "i2", text: "Perimysium", category: "connective", desc: "Connective tissue layer surrounding muscle fiber bundles called fascicles." },
      { id: "i3", text: "Endomysium", category: "connective", desc: "Delicate connective tissue surrounding individual muscle fibers." },
      { id: "i4", text: "Muscle Fiber", category: "structure", desc: "Long, cylindrical, multinucleated muscle cell with peripheral nuclei." },
      { id: "i5", text: "Myofibril", category: "structure", desc: "Elongated contractile thread inside sarcoplasm composed of repeating sarcomeres." },
      { id: "i6", text: "Sarcomere", category: "structure", desc: "Basic functional contractile unit extending from one Z disc to the next Z disc." },
      { id: "i7", text: "Thin Filament (Actin)", category: "structure", desc: "Contractile protein filament associated with regulatory proteins tropomyosin and troponin." },
      { id: "i8", text: "Thick Filament (Myosin)", category: "structure", desc: "Motor protein filament featuring double heads with ATP and actin binding sites." }
    ]
  },
  2: {
    title: "Level 2: Muscle Tissue Types",
    instruction: "Categorize anatomical and functional features into Skeletal, Cardiac, or Smooth Muscle.",
    categories: [
      { id: "skeletal", title: "Skeletal Muscle", color: "#3b82f6" },
      { id: "cardiac", title: "Cardiac Muscle", color: "#ef4444" },
      { id: "smooth", title: "Smooth Muscle", color: "#10b981" }
    ],
    items: [
      { id: "m1", text: "Voluntary control", category: "skeletal", desc: "Controlled consciously via somatic motor neurons." },
      { id: "m2", text: "Multiple peripheral nuclei", category: "skeletal", desc: "Elongated multinucleated cells with nuclei situated close to the sarcolemma." },
      { id: "m3", text: "Intercalated discs", category: "cardiac", desc: "Specialized intercellular junctions containing desmosomes and gap junctions." },
      { id: "m4", text: "Short, branched cells", category: "cardiac", desc: "Striated myocytes that branch and connect end-to-end." },
      { id: "m5", text: "Spindle-shaped, No striations", category: "smooth", desc: "Non-striated, fusiform cells containing a single centrally located nucleus." },
      { id: "m6", text: "Calmodulin as Ca²⁺ sensor", category: "smooth", desc: "Binds Ca²⁺ to initiate contraction instead of troponin." },
      { id: "m7", text: "Caveolae & Dense bodies", category: "smooth", desc: "Membrane invaginations for Ca²⁺ entry and protein anchors functioning like Z discs." },
      { id: "m8", text: "Forms wall of the heart", category: "cardiac", desc: "Forms the myocardium, contracting involuntarily and rhythmically." }
    ]
  },
  3: {
    title: "Level 3: Fiber Types & Clinical Disorders",
    instruction: "Classify muscle fiber characteristics (SO, FG) and clinical neuromuscular conditions.",
    categories: [
      { id: "so_fiber", title: "Slow Oxidative (SO)", color: "#8b5cf6" },
      { id: "fg_fiber", title: "Fast Glycolytic (FG)", color: "#f59e0b" },
      { id: "clinical", title: "Clinical Disorders", color: "#ec4899" }
    ],
    items: [
      { id: "f1", text: "High Myoglobin & Fatigue resistant", category: "so_fiber", desc: "Slow oxidative fibers rich in myoglobin and mitochondria for endurance activities." },
      { id: "f2", text: "High Glycogen & Rapid fatigue", category: "fg_fiber", desc: "Fast glycolytic fibers with high glycogen stores for short, intense power bursts." },
      { id: "f3", text: "Duchenne Muscular Dystrophy (DMD)", category: "clinical", desc: "X-linked disorder caused by dystrophin deficiency, characterized by Gowers sign." },
      { id: "f4", text: "Myasthenia Gravis (MG)", category: "clinical", desc: "Autoimmune disorder with autoantibodies blocking postsynaptic acetylcholine receptors." },
      { id: "f5", text: "Many Mitochondria & Capillaries", category: "so_fiber", desc: "Adapted for aerobic ATP synthesis and sustained muscular endurance." },
      { id: "f6", text: "Largest diameter fibers", category: "fg_fiber", desc: "Generates maximum tension and force but fatigues quickly." }
    ]
  }
};

// 2. Fisher-Yates Shuffle Algorithm
function fisherYatesShuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 3. Game State & Audio Synthesizer
let currentLevel = 1;
let score = 0;
let combo = 0;
let timerInterval = null;
let secondsLeft = 120;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'drag') {
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
  } else if (type === 'shuffle') {
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.setValueAtTime(620, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    osc.start(); osc.stop(audioCtx.currentTime + 0.15);
  } else if (type === 'correct') {
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    osc.start(); osc.stop(audioCtx.currentTime + 0.25);
  } else if (type === 'incorrect') {
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    osc.frequency.setValueAtTime(196, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    osc.start(); osc.stop(audioCtx.currentTime + 0.25);
  }
}

// 4. DOM Elements
const cardPool = document.getElementById('card-pool');
const categoriesContainer = document.getElementById('categories-container');
const timerDisplay = document.getElementById('timer-display');
const scoreDisplay = document.getElementById('score-display');
const comboDisplay = document.getElementById('combo-display');
const instructionText = document.getElementById('instruction-text');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const levelBtns = document.querySelectorAll('.level-btn');

// 5. Universal Pointer Dragging Engine
let activePointerId = null;
let draggedCard = null;
let draggingClone = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function enablePointerDrag(card) {
  card.addEventListener('pointerdown', (e) => {
    // Prevent default selection / page scroll
    e.preventDefault();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    activePointerId = e.pointerId;
    draggedCard = card;

    const rect = card.getBoundingClientRect();
    touchOffsetX = e.clientX - rect.left;
    touchOffsetY = e.clientY - rect.top;

    // Create floating clone
    draggingClone = card.cloneNode(true);
    draggingClone.classList.add('card-dragging-clone');
    draggingClone.style.width = `${rect.width}px`;
    draggingClone.style.left = `${e.clientX - touchOffsetX}px`;
    draggingClone.style.top = `${e.clientY - touchOffsetY}px`;
    document.body.appendChild(draggingClone);

    card.classList.add('ghost-card');
    playSound('drag');

    try { card.setPointerCapture(e.pointerId); } catch(err) {}
  });

  card.addEventListener('pointermove', (e) => {
    if (!draggingClone || e.pointerId !== activePointerId) return;
    e.preventDefault();

    draggingClone.style.left = `${e.clientX - touchOffsetX}px`;
    draggingClone.style.top = `${e.clientY - touchOffsetY}px`;

    // Highlight valid drop zone below pointer
    draggingClone.style.display = 'none';
    const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
    draggingClone.style.display = 'inline-flex';

    const dropZone = elementBelow ? elementBelow.closest('.drop-zone, .card-pool') : null;
    document.querySelectorAll('.drop-zone, .card-pool').forEach(z => z.classList.remove('drag-over'));
    if (dropZone) dropZone.classList.add('drag-over');
  });

  const handlePointerEnd = (e) => {
    if (!draggingClone || e.pointerId !== activePointerId) return;
    e.preventDefault();

    draggingClone.style.display = 'none';
    const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
    const dropZone = elementBelow ? elementBelow.closest('.drop-zone, .card-pool') : null;

    document.querySelectorAll('.drop-zone, .card-pool').forEach(z => z.classList.remove('drag-over'));

    if (dropZone && draggedCard) {
      dropZone.appendChild(draggedCard);
    }

    draggedCard.classList.remove('ghost-card');
    if (draggingClone && draggingClone.parentNode) {
      draggingClone.parentNode.removeChild(draggingClone);
    }

    try { card.releasePointerCapture(e.pointerId); } catch(err) {}

    draggingClone = null;
    draggedCard = null;
    activePointerId = null;
  };

  card.addEventListener('pointerup', handlePointerEnd);
  card.addEventListener('pointercancel', handlePointerEnd);
}

// 6. Level Initializer
function loadLevel(levelNum) {
  currentLevel = levelNum;
  const levelData = gameLevels[levelNum];

  instructionText.textContent = `📌 ${levelData.instruction}`;
  levelBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.level) === levelNum);
  });

  cardPool.innerHTML = '';
  categoriesContainer.innerHTML = '';

  // Randomize Category Order
  const randomizedCategories = fisherYatesShuffle(levelData.categories);
  randomizedCategories.forEach(cat => {
    const col = document.createElement('div');
    col.className = 'category-column';
    col.innerHTML = `
      <div class="category-title" style="background-color: ${cat.color}">${cat.title}</div>
      <div class="drop-zone" data-category="${cat.id}"></div>
    `;
    categoriesContainer.appendChild(col);
  });

  // Randomize Item Cards
  const randomizedItems = fisherYatesShuffle(levelData.items);
  randomizedItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = item.id;
    card.dataset.category = item.category;
    card.dataset.desc = item.desc;
    card.innerHTML = `📄 ${item.text}`;

    enablePointerDrag(card);
    cardPool.appendChild(card);
  });

  resetTimer();
}

function shuffleCurrentPool() {
  playSound('shuffle');
  const cardsInPool = Array.from(cardPool.querySelectorAll('.card'));
  if (cardsInPool.length === 0) return;

  const shuffledCards = fisherYatesShuffle(cardsInPool);
  shuffledCards.forEach(card => {
    card.classList.add('shuffling');
    cardPool.appendChild(card);
    setTimeout(() => card.classList.remove('shuffling'), 350);
  });
}

// 7. Timer Engine
function resetTimer() {
  clearInterval(timerInterval);
  secondsLeft = 120;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswers();
      alert("⏰ Time's up! Answers have been automatically submitted.");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

// 8. Answer Checking
function checkAnswers() {
  clearInterval(timerInterval);
  const currentItems = gameLevels[currentLevel].items;
  let levelScore = 0;
  combo = 0;

  const expList = document.getElementById('explanation-list');
  expList.innerHTML = '';

  currentItems.forEach(itemData => {
    const cardEl = document.getElementById(itemData.id);
    const parentZone = cardEl ? cardEl.parentElement : null;
    const userCategory = parentZone ? parentZone.dataset.category : null;

    if (cardEl) {
      cardEl.classList.remove('correct-card', 'incorrect-card');
    }

    const isCorrect = userCategory === itemData.category;

    if (isCorrect) {
      levelScore++;
      combo++;
      if (cardEl) cardEl.classList.add('correct-card');
    } else {
      if (cardEl) cardEl.classList.add('incorrect-card');
    }

    const expItem = document.createElement('div');
    expItem.className = `exp-item ${isCorrect ? 'correct' : 'incorrect'}`;
    expItem.innerHTML = `
      <div class="exp-item-title">${isCorrect ? '✅' : '❌'} ${itemData.text}</div>
      <div class="exp-item-desc">${itemData.desc}</div>
    `;
    expList.appendChild(expItem);
  });

  if (levelScore === currentItems.length) {
    playSound('correct');
  } else {
    playSound('incorrect');
  }

  score += levelScore * 10 + combo * 2;
  scoreDisplay.textContent = score;
  comboDisplay.textContent = `x${combo}`;

  showModal(levelScore, currentItems.length);
}

function showModal(userScore, maxScore) {
  const modal = document.getElementById('result-modal');
  const finalScoreText = document.getElementById('final-score-text');
  const timeUsedText = document.getElementById('time-used-text');
  const starsDisplay = document.getElementById('stars-display');

  finalScoreText.textContent = `Your Score: ${userScore} / ${maxScore}`;
  timeUsedText.textContent = `Time Remaining: ${timerDisplay.textContent}`;

  const ratio = userScore / maxScore;
  if (ratio === 1) starsDisplay.textContent = '⭐⭐⭐ (Perfect!)';
  else if (ratio >= 0.6) starsDisplay.textContent = '⭐⭐ (Passed!)';
  else starsDisplay.textContent = '⭐ (Keep Practicing!)';

  modal.classList.remove('hidden');
}

// 9. Listeners
levelBtns.forEach(btn => {
  btn.addEventListener('click', () => loadLevel(parseInt(btn.dataset.level)));
});

submitBtn.addEventListener('click', checkAnswers);
resetBtn.addEventListener('click', () => loadLevel(currentLevel));
shuffleBtn.addEventListener('click', shuffleCurrentPool);

document.getElementById('close-modal-btn').addEventListener('click', () => {
  document.getElementById('result-modal').classList.add('hidden');
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('result-modal').classList.add('hidden');
});

document.getElementById('next-level-btn').addEventListener('click', () => {
  document.getElementById('result-modal').classList.add('hidden');
  if (currentLevel < 3) {
    loadLevel(currentLevel + 1);
  } else {
    alert('🎉 Congratulations! You completed all levels!');
    loadLevel(1);
  }
});

// Start Game
loadLevel(1);