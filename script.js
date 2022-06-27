const N = 4;
const M = 4;
const lineCount=(N*(M-1))+(M*(N-1))

let turn = "R";
let selectedLines = [];
let RedScore=0
let BlueScore=0

const hoverClasses = {R: "hover-red", B: "hover-blue"};
const bgClasses = {R: "bg-red", B: "bg-blue"};

const playersTurnText = (turn) =>
    `It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
    line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
    const gameGridContainer = document.getElementsByClassName(
        "game-grid-container"
    )[0];

    const rows = Array(N)
        .fill(0)
        .map((_, i) => i);
    const cols = Array(M)
        .fill(0)
        .map((_, i) => i);

    rows.forEach((row) => {
        cols.forEach((col) => {
            const dot = document.createElement("div");
            dot.setAttribute("class", "dot");

            const hLine = document.createElement("div");
            hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
            hLine.setAttribute("id", `h-${row}-${col}`);
            hLine.addEventListener("click", handleLineClick);

            gameGridContainer.appendChild(dot);
            if (col < M - 1) gameGridContainer.appendChild(hLine);
        });

        if (row < N - 1) {
            cols.forEach((col) => {
                const vLine = document.createElement("div");
                vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
                vLine.setAttribute("id", `v-${row}-${col}`);
                vLine.addEventListener("click", handleLineClick);

                const box = document.createElement("div");
                box.setAttribute("class", "box");
                box.setAttribute("id", `box-${row}-${col}`);

                gameGridContainer.appendChild(vLine);
                if (col < M - 1) gameGridContainer.appendChild(box);
            });
        }
    });

    document.getElementById("game-status").innerHTML = playersTurnText(turn);
    const Box=document.getElementsByClassName("box")
    console.log(Box.length)
};

const changeTurn = () => {
    const nextTurn = turn === "R" ? "B" : "R";

    const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

    lines.forEach((l) => {
        //if line was not already selected, change it's hover color according to the next turn
        if (!isLineSelected(l)) {
            l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
        }
    });
    turn = nextTurn;
    document.getElementById("game-status").innerHTML = playersTurnText(turn);

};

const handleLineClick = (e) => {
    const lineId = e.target.id;
    const selectedLine = document.getElementById(lineId);

    if (isLineSelected(selectedLine)) {
        //if line was already selected, return
        return;
    }

    selectedLines = [...selectedLines, lineId];

    colorLine(selectedLine);
    colorBox(lineId)
    if(selectedLines.length===lineCount){
        endGame()
    }
    // changeTurn();
};

const colorLine = (selectedLine) => {
    selectedLine.classList.remove(hoverClasses[turn]);
    selectedLine.classList.add(bgClasses[turn]);
};
const colorBox = (lineId) => {
    const lineIdInfo = lineId.split("-")
    let rowIndex = +lineIdInfo[1]
    let colIndex = +lineIdInfo[2]
    let isBoxFull=false
    if (lineIdInfo[0] === "v") {
        if (colIndex > 0) {
            let line1 = `v-${rowIndex}-${colIndex - 1}`
            let line2 = `h-${rowIndex}-${colIndex - 1}`
            let line3 = `h-${rowIndex + 1}-${colIndex - 1}`
            const selectBox = document.getElementById(`box-${rowIndex}-${colIndex - 1}`)
            if (hasColor(line1) && hasColor(line2) && hasColor(line3)) {
                selectBox.classList.add(bgClasses[turn]);
                if (turn==="R") RedScore++
                else BlueScore++
                isBoxFull=true

            }
        }  if (colIndex < M - 1) {
            let line1 = `v-${rowIndex}-${colIndex + 1}`
            let line2 = `h-${rowIndex}-${colIndex}`
            let line3 = `h-${rowIndex + 1}-${colIndex}`
            const selectBox = document.getElementById(`box-${rowIndex}-${colIndex}`)
            if (hasColor(line1) && hasColor(line2) && hasColor(line3)) {
                selectBox.classList.add(bgClasses[turn]);
                if (turn==="R") RedScore++
                else BlueScore++
                isBoxFull=true


            }

        }
    } else {
        if (rowIndex > 0) {
            let line1 = `h-${rowIndex - 1}-${colIndex}`
            let line2 = `v-${rowIndex - 1}-${colIndex}`
            let line3 = `v-${rowIndex - 1}-${colIndex + 1}`
            const selectBox = document.getElementById(`box-${rowIndex - 1}-${colIndex}`)
            if (hasColor(line1) && hasColor(line2) && hasColor(line3)) {
                selectBox.classList.add(bgClasses[turn]);
                isBoxFull=true
                if (turn==="R") RedScore++
                else BlueScore++


            }

        }  if (rowIndex < N - 1) {
            let line1 = `h-${rowIndex + 1}-${colIndex}`
            let line2 = `v-${rowIndex}-${colIndex}`
            let line3 = `v-${rowIndex}-${colIndex + 1}`
            const selectBox = document.getElementById(`box-${rowIndex}-${colIndex}`)
            if (hasColor(line1) && hasColor(line2) && hasColor(line3)) {
                selectBox.classList.add(bgClasses[turn]);
                isBoxFull=true
                if (turn==="R") RedScore++
                else BlueScore++
            }


        }
    }
    if(!isBoxFull) changeTurn();

        }
const hasColor = (lineId) => {
    const line = document.getElementById(lineId);
    if ((line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B))) {
        return true
    } else {
        return false
    }

}
const endGame = () => {
    if (RedScore>BlueScore) document.getElementById("game-status").innerHTML ="won Red";
    else if(RedScore<BlueScore) document.getElementById("game-status").innerHTML ="won Blue";
    else document.getElementById("game-status").innerHTML ="The match is equal!";
}

createGameGrid();
