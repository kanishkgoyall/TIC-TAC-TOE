let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true; 
let count=0; //to track draw

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetgame= () => {
    turn0=true;
    count=0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) =>  {
    box.addEventListener("click",()=> {
        if (turn0===true){     //player O turn
            box.innerText='O';
            turn0=false;
        }else{                 //player X turn
            box.innerText='X';
            turn0=true;
        }
        box.disabled=true;
        count++;
        let iswinner=checkWinner();

        if (count===9 && !iswinner){
            gamedraw();
        }
    });
});

const gamedraw=()=> {
    msg.innerText="Game's Draw";
    msgcontainer.classList.remove("hide");
}

const disableboxes=()=> {
    for (let box of boxes){
        box.disabled=true;
    }
};


const enableboxes=() => {
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=> {
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const checkWinner = () => {
    for (let pattern of winpatterns){
        let pos1val= boxes[pattern[0]].innerText;
        let pos2val= boxes[pattern[1]].innerText;
        let pos3val= boxes[pattern[2]].innerText;
        if (pos1val !="" && pos2val !="" && pos3val !="" ){
            if (pos1val === pos2val && pos2val===pos3val){
                showWinner(pos1val);
            }
        }
    }
};


newgamebtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);
