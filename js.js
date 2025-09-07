let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let turnO = true; // Player O starts
let newGameBtn = document.querySelector('#new-btn');//for start new game
let msgContainer = document.querySelector('.msg-container');//show winner msg container
let msg = document.querySelector('#msg');//for display complete msg in the conatiner

//declare win patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
//every box par event listener add kia hai 
boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {//agar tarno ki turn hai to 
            box.innerText = 'O';
            box.style.color = 'green';
            turnO = false;
        } else {//other wise
            box.innerText = 'X';
            box.style.color = 'black';
            turnO = true;
        }
        box.disabled = true;//box disabled after display data 
        checkWinner();//check winner conditions from above 
    });
});


const checkWinner = () => {
    let hasWin = false;/* abhi tak koi ne jeeta hai esliye false hai .hasWin ka kaam hai game mein kisi ek player ki jeet ko track karna.
     Jab koi player jeet jaata hai, toh hasWin ko true setkiya jaata hai .*/
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    if (!hasWin) {/*Agar koi player jeet nahi paata aur sabhi boxes fill ho jaati hain, toh hasWin ke value ko check kiya jaata hai. Agar hasWin
    abhi bhe false hai, toh game ko draw ghoshit kiya jaata hai aur message "Match Drawn" dikhaaya jaata hai.*/
        const allBoxes = [...boxes].every((box) => box.innerText !== "");
        if (allBoxes) {
            msgContainer.classList.remove('hide');
            msg.innerText = 'Match Drawn';
        }
    }
};

const disableBoxes = () => {/*function create taaki agar winner mil gya hai to baaki ke boxes ko disable kar do*/
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {/*winner  ka message show karega*/
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();//after showing winner boxes again disabled
};
const enableBoxes = () => {/*function create taaki reset game par click karne pr all buttons enable ho jaaye*/
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};
/*add a event listner to reset button and new game button*/
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
