# PICPUZ: Instructor Puzzle Challenge

## Introduction
PICPUZ is an interactive image puzzle game where players solve jumbled photos of their CCS instructors. The app is built for entertainment and recognition, allowing students to familiarize themselves with their instructors in a fun and challenging way.

## Objectives
- Create an enjoyable game that sharpens problem-solving skills
- Promote instructor familiarity and engagement through gamification 
- Develop a responsive and interactive app using modern frontend tools
- Practice implementing logic-based challenges in JavaScript

## Tools Used
- HTML – Structure of the web page
- CSS / TailwindCSS – Styling and layout
- JavaScript – Game logic and DOM manipulation
- Flowbite – For UI components
- VS Code – Code editor
- Local Assets – Instructor images

## Features
- 🧩 Interactive 3x3 Puzzle Grid
- 🔁 Shuffle Button to start a new game
- 🖼️ Reference Image Preview
- 👨‍🏫 Instructor Selector Dropdown
- 📊 Move Counter and Best Move Tracker
- 🎉 Winning Modal Popup with results

## 🎮 Game Mechanics

### 🔹 1. Objective
* Reconstruct a scrambled image of a CCS instructor by rearranging tiles
* Complete the puzzle in the fewest possible moves to beat your high score!

### 🔹 2. How to Play

1. **Select an Instructor**
   * Use the dropdown to pick an image of your instructor

2. **View the Reference**
   * The image on the right shows the correct version of the puzzle

3. **Shuffle the Puzzle**
   * Click the "Shuffle" button to start a new game
   * The puzzle will randomize into a solvable layout

4. **Move the Tiles**
   * Click on any tile adjacent to the blank space to slide it into the empty spot
   * The goal is to arrange all tiles in correct order to form the full image

5. **Track Your Progress**
   * Your current number of moves is displayed at the top
   * If you complete the puzzle, your best move count will be recorded (for that session)

6. **Win Condition**
   * Once all tiles are in the correct order and the blank tile is in the last position, the game checks for a win
   * A modal popup appears saying "Congrats!" and shows your move stats

### 🔹 3. Rules
* Only tiles directly next to the blank space can be moved
* Puzzle will only shuffle to solvable configurations
* No time limit – but less moves = better flex 😎

### 🔹 4. Scoring
* 📊 **Moves Count** – Tracks how many moves you've made
* 🏅 **Best Score** – Shows your best number of moves for the session

### 🔹 5. Tips
* Focus on solving row by row or column by column
* Visualize the final image using the reference
* Practice makes perfect – try different strategies to reduce your moves

## Function-by-Function Explanation
### selectImage(src)
- Called when a user selects a different instructor image
- Updates the puzzle image and instructor name
- Resets the game state (moves, tiles)
- Displays the reference image on the right

### createTiles()
- Initializes the tile array [1, 2, ..., 8, 0]
- 0 represents the blank tile
- Calls render() to draw the puzzle on screen

### render()
- Builds and draws tiles based on the tiles[] array
- Calculates tile dimensions based on container size
- Tiles use CSS background-position to show part of the image
- Adds click event for each tile to handle movement

### move(index)
- Moves a tile if it's next to the empty space
- Swaps the clicked tile with the empty one
- Updates move count
- Calls render() and checkWin()

### shuffle()
- Randomizes tiles in a solvable way
- Uses Fisher-Yates shuffle to mix tiles[]
- Ensures puzzle is solvable before starting
- Resets the move counter and re-renders puzzle

## Recommendations
- Add a timer to increase competitiveness
- Allow a 4x4 mode for advanced players
- Add sound effects or background music
- Store best scores in local storage for persistence
- Make it mobile-friendly with drag gestures




