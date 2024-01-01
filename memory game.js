const imagePaths = ["o.svg", "z.svg", "a.svg", "N.svg", "9.svg"];
  const sequenceToWin = ["o.svg", "z.svg", "a.svg", "N.svg", "9.svg"];
  let nameSequence = [];
  let currentSequence = [];
  let currentSequenceIndex = 0;
  let score = 0;
  let gameStarted = false;

  function createCard(imagePath) {
    const button = document.createElement("button");
    button.classList.add("card");
    button.setAttribute("data-image", imagePath);
    button.onclick = () => handleCardClick(imagePath, button);
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = imagePath;
    img.width = 200; 
    img.height = 200; 
    button.appendChild(img);
    return button;
  }

  function renderGame() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";

    for (const imagePath of currentSequence) {
      const card = createCard(imagePath);
      gameContainer.appendChild(card);
    }

    document.getElementById("score").textContent = `Score: ${score}`;
  }
 
  function startGame() {
    currentSequenceIndex = 0;
    score = 0;
    gameStarted = true;
    nameSequence = shuffleArray(imagePaths.slice());
    currentSequence = nameSequence.slice(0, 5);
    renderGame();
    
    setTimeout(() => {
      const buttons = document.querySelectorAll('.svg-container button');
      buttons.forEach(button => {
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
        button.style.transition = 'none';
      });
    }, 2000); 
  }

  function restartGame() {
    currentSequenceIndex = 0;
    score = 0;
    gameStarted = false;
    renderGame();
  }

  function handleCardClick(clickedImagePath, button) {
    if (!gameStarted) 
      return; 

    if (clickedImagePath === sequenceToWin[currentSequenceIndex]) {
      score += 20;
      currentSequenceIndex++;

      if (currentSequenceIndex === sequenceToWin.length) {
        alert("Congratulations! You completed the sequence.");
        startGame();
      } else {
        renderGame();
      }
    } else {
      alert("Game over! Wrong attempt.");
      startGame();
    }

    const otherButtons = document.querySelectorAll('.svg-container button:not([data-image="' + clickedImagePath + '"])');
    otherButtons.forEach(otherButton => {
      otherButton.style.backgroundColor = 'black';
      otherButton.style.color = 'black';
      otherButton.style.transition = 'background-color 0.5s, color 0.5s';
    });
  }

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  startGame();