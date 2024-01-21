const PlayerList = [];
const playerList = document.getElementById("player-list");

function addPlayer(event) {
  event.preventDefault();

  const fName = document.getElementById("firstName").value;
  const lName = document.getElementById("lastName").value;
  const cName = document.getElementById("country").value;
  const score = document.getElementById("score").value;

  if (fName === "" || lName === "" || cName === "" || score === "") {
    showAlert("All fields must be filled out.");
    return;
  }
  const dateObj = new Date();
  const dayOfWeek = dateObj
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase();
  const date = dateObj.getDate();
  const month = dateObj
    .toLocaleString("en-us", { month: "long" })
    .toLowerCase();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString().toLowerCase();

  const playerData = {
    fName: fName,
    lName: lName,
    cName: cName,
    score: Number(score),
    detailsOfDay: `${dayOfWeek}, ${date} ${month} ${year} ${time}`,
  };

  PlayerList.push(playerData);
  sortPlayerList();
  renderPlayerList();
}

function showAlert(message) {
  const alertElement = document.getElementById("alert");
  alertElement.innerText = message;
  alertElement.style.display = "block";

  setTimeout(() => {
    alertElement.style.display = "none";
  }, 2000);
}

function increaseScoreHandler(idx) {
  PlayerList[idx].score += 5;
  sortPlayerList();
  renderPlayerList();
}

function decreaseScoreHandler(idx) {
  PlayerList[idx].score -= 5;
  sortPlayerList();
  renderPlayerList();
}

function deleteBtnHandler(idx) {
  PlayerList.splice(idx, 1);
  sortPlayerList();
  renderPlayerList();
}

function sortPlayerList() {
  PlayerList.sort((player1, player2) => player2.score - player1.score);
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.innerText = text;
  button.setAttribute("onClick", onClick);
  return button;
}

function renderPlayerList() {
  playerList.innerHTML = "";

  PlayerList.forEach((player, idx) => {
    const liEle = document.createElement("li");
    if (idx === PlayerList.length - 1) {
      liEle.classList.add("list-animation");
    }

    const nameContent = document.createElement("span");
    const detailsOfDay = document.createElement("span");

    nameContent.classList.add("name");
    detailsOfDay.classList.add("details");

    nameContent.innerText = ` ${player.fName} ${player.lName}`;
    detailsOfDay.innerText = player.detailsOfDay;

    nameContent.appendChild(document.createElement("br"));
    nameContent.appendChild(detailsOfDay);

    const countryContent = document.createElement("span");
    const currentScore = document.createElement("span");

    const deccScore = createButton("-5", `decreaseScoreHandler(${idx})`);
    const incScore = createButton("+5", `increaseScoreHandler(${idx})`);
    const deletBtn = createButton("X", `deleteBtnHandler(${idx})`);

    currentScore.classList.add("score");
    deletBtn.classList.add("delete-btn");

    currentScore.innerText = ` ${player.score}`;
    countryContent.classList.add("country");
    countryContent.innerText = `${player.cName}`;

    if (countryContent.innerText.toLowerCase() === "india") {
      countryContent.style.color = "#ff9933";
      countryContent.style.borderColor = "#138808";
    }

    liEle.append(
      nameContent,
      countryContent,
      currentScore,
      deletBtn,
      deccScore,
      incScore
    );
    playerList.append(liEle);
  });
}

renderPlayerList();
