document.addEventListener("DOMContentLoaded", function () {
  const puzzle = document.getElementById("puzzle");
  let tiles = [];
  let imageUrl = './img/biniaiah.jpg'; // Default image
  let currentInstructor = "Honey Belle Bontuyan";
  let moveCount = 0;
  let bestMoves = Infinity;

  const ref = document.getElementById('reference-image');
  const instructorNameEl = document.getElementById('instructor-name');

  const instructors = {
    "ell.jpg": "Elleiell Balisi",
    "honney.jpg": "Honey Belle Bontuyan",
    "lara.jpg": "Lara Elika Montecillo",
    "rochelle.jpg": "Rochel Mae Nazareno",
    "biniaiah.jpg": "Aiah Arceta",
  };

  window.selectImage = function (src) {
    imageUrl = src;
    for (const key in instructors) {
      if (src.includes(key)) {
        currentInstructor = instructors[key];
        break;
      }
    }

    moveCount = 0;
    updateMoveDisplay();
    createTiles();
    shuffle();

    ref.style.backgroundImage = `url(${src})`;
    ref.style.backgroundSize = 'cover';
    ref.style.backgroundPosition = 'center';
    instructorNameEl.textContent = currentInstructor;
  };

  function createTiles() {
    tiles = Array.from({ length: 8 }, (_, i) => i + 1).concat(0);
    render();
  }

  function render() {
    puzzle.innerHTML = '';
    const puzzleWidth = puzzle.offsetWidth;
    const puzzleHeight = puzzle.offsetHeight;
    const tileWidth = puzzleWidth / 3;
    const tileHeight = puzzleHeight / 3;

    tiles.forEach((val, idx) => {
      const tile = document.createElement('div');
      tile.className = 'tile border border-gray-300';

      if (val !== 0) {
        const row = Math.floor((val - 1) / 3);
        const col = (val - 1) % 3;
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundSize = `${puzzleWidth}px ${puzzleHeight}px`;
        tile.style.backgroundPosition = `-${col * tileWidth}px -${row * tileHeight}px`;
      } else {
        tile.style.backgroundColor = 'white';
        tile.style.width = `${tileWidth}px`;
        tile.style.height = `${tileHeight}px`;
      }

      tile.onclick = () => move(idx);
      puzzle.appendChild(tile);
    });
  }

  function move(index) {
    const empty = tiles.indexOf(0);
    if (isAdjacent(index, empty)) {
      [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
      moveCount++;
      updateMoveDisplay();
      render();
      checkWin();
    }
  }

  function isAdjacent(i1, i2) {
    const r1 = Math.floor(i1 / 3), c1 = i1 % 3;
    const r2 = Math.floor(i2 / 3), c2 = i2 % 3;
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
  }

  function shuffle() {
    moveCount = 0;
    updateMoveDisplay();
    do {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    } while (!isSolvable(tiles)); // Ensure puzzle is solvable
    render();
  }

  function isSolvable(array) {
    let invCount = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 9; j++) {
        if (array[i] && array[j] && array[i] > array[j]) {
          invCount++;
        }
      }
    }
    return invCount % 2 === 0;
  }

  function checkWin() {
    const isSolved = tiles.slice(0, 8).every((val, i) => val === i + 1) && tiles[8] === 0;
    if (isSolved) {
      if (moveCount < bestMoves) bestMoves = moveCount;
      setTimeout(() => showModal(), 200);
    }
  }

  function showModal() {
    const modal = document.createElement('div');
    modal.id = 'solvedModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-8 rounded-lg shadow-xl';

    const title = document.createElement('h2');
    title.className = 'text-xl font-bold mb-4';
    title.textContent = `Congrats you solved the image of ${currentInstructor}!!!`;

    const moveInfo = document.createElement('p');
    moveInfo.className = 'mb-4';
    moveInfo.textContent = `You solved it in ${moveCount} moves! Best: ${bestMoves} moves`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => document.body.removeChild(modal);

    modalContent.appendChild(title);
    modalContent.appendChild(moveInfo);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  function updateMoveDisplay() {
    const moveDisplay = document.getElementById('movesDisplay');
    moveDisplay.textContent = `Moves: ${moveCount}${bestMoves < Infinity ? ` | Best: ${bestMoves}` : ''}`;
  }

  document.getElementById('shuffle').onclick = shuffle;

  document.getElementById('reset')?.addEventListener('click', () => {
    createTiles();
    shuffle();
  });

  // Initial setup
  createTiles();
  shuffle();
  ref.style.backgroundImage = `url(${imageUrl})`;
  ref.style.backgroundSize = 'cover';
  ref.style.backgroundPosition = 'center';
  instructorNameEl.textContent = currentInstructor;
  updateMoveDisplay();
});
