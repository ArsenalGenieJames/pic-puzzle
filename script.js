const puzzle = document.getElementById("puzzle");
let tiles = [];
let imageUrl = 'img/honney.jpg'; // Default image
let currentInstructor = "Honey Belle Bontuyan"; // Default matches the default image
let moveCount = 0; // Track moves
let bestMoves = Infinity; // Track best number of moves

function selectImage(src) {
  imageUrl = src;
  // Set instructor name based on src
  if (src.includes("ell.jpg")) currentInstructor = "Elleiell Balisi";
  else if (src.includes("honney.jpg")) currentInstructor = "Honey Belle Bontuyan";
  else if (src.includes("lara.jpg")) currentInstructor = "Lara Elika Montecillo";
  else if (src.includes("rochelle.jpg")) currentInstructor = "Rochel Mae Nazareno";
  moveCount = 0;
  updateMoveDisplay();
  createTiles();
  shuffle();
  // Update the reference image
  const ref = document.getElementById('reference-image');
  ref.style.backgroundImage = `url(${src})`;
  ref.style.backgroundSize = 'cover';
  ref.style.backgroundPosition = 'center';
}

function createTiles() {
  tiles = [...Array(8).keys()].map(i => i + 1); // 1 to 8
  tiles.push(0); // 0 = empty space
  render();
}

function render() {
  puzzle.innerHTML = '';
  tiles.forEach((val, idx) => {
    const tile = document.createElement('div');
    tile.className = 'tile border border-gray-300';
    if (val !== 0) {
      const row = Math.floor((val - 1) / 3);
      const col = (val - 1) % 3;
      tile.style.backgroundImage = `url(${imageUrl})`;
      // Get puzzle container dimensions
      const puzzleWidth = puzzle.offsetWidth;
      const puzzleHeight = puzzle.offsetHeight;
      // Calculate tile size based on puzzle dimensions
      const tileWidth = puzzleWidth / 3;
      const tileHeight = puzzleHeight / 3;
      // Set tile dimensions
      tile.style.width = `${tileWidth}px`;
      tile.style.height = `${tileHeight}px`;
      // Set background size to match puzzle dimensions
      tile.style.backgroundSize = `${puzzleWidth}px ${puzzleHeight}px`;
      // Calculate background position
      tile.style.backgroundPosition = `-${col * tileWidth}px -${row * tileHeight}px`;
    } else {
      tile.style.backgroundColor = 'white';
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
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  render();
}

function checkWin() {
  const isSolved = tiles.slice(0, 8).every((val, i) => val === i + 1);
  if (isSolved && tiles[8] === 0) {
    if (moveCount < bestMoves) {
      bestMoves = moveCount;
    }
    setTimeout(() => {
      // Create and show modal dynamically since it's not in HTML
      const modal = document.createElement('div');
      modal.id = 'solvedModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'bg-white p-8 rounded-lg shadow-xl';
      
      const title = document.createElement('h2');
      title.id = 'solvedTitle';
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
    }, 200);
  }
}

function updateMoveDisplay() {
  const moveDisplay = document.getElementById('moveDisplay');
  moveDisplay.textContent = `Moves: ${moveCount}${bestMoves < Infinity ? ` | Best: ${bestMoves}` : ''}`;
}

// Set the default puzzle and reference image on page load
createTiles();
shuffle();
const ref = document.getElementById('reference-image');
ref.style.backgroundImage = `url(${imageUrl})`;
ref.style.backgroundSize = 'cover';
ref.style.backgroundPosition = 'center';
updateMoveDisplay();