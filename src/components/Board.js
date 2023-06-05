import React, { useState, useEffect } from "react";
import createBoard from "../util/createBorad";
import Cell from "../components/Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    //ComponentDidMount
    useEffect(() => {
        //Creating a board
        //Calling the function
        freshBoard();
    }, []);
    //It ensures that the effect is only executed once, during the initial rendering of the component (emptyArray arg).

    const freshBoard = () => {
        const newBoard = createBoard(10, 10, 20);
        setNonMineCount(10 * 10 - 15);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    }

    //On right click / flag cell
    const updateFlag = (e, x, y) => {
        //to not have a dropdown on right click
        e.preventDefault();
        //Deep copy of a state
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
    };

    //On left click / reveal cell
    const revealCell = (x, y) => {
        if(grid[x][y].revealed || gameOver){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if(newRevealedBoard.newNonMinesCount===0) setGameOver(true);
        }
    }

    return (
        <div>
            <p>Minesweeper</p>
            <Timer gameOver={gameOver}/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                }}>
                {gameOver&& <Modal restartGame={restartGame}/>}
            {grid.map((singleRow, index1) => {
                return (
                    <div style={{ display: "flex" }} key={index1}>
                        {singleRow.map((singleBlock, index2) => {
                            return (<Cell
                                details={singleBlock}
                                updateFlag={updateFlag}
                                revealCell={revealCell}
                                key={index2} />
                            );
                        })}
                    </div>
                );
            })}
            </div>
         
        </div>
    );
};

export default Board;