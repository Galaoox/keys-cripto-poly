// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13; // version del lenguaje usado

contract TasksContract {

    uint public taskCounter = 0;

    constructor(){
        createTask("Test title", "Test description");
    }

    event TaskCreated( 
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    ); // es un tipo de log que se retorna al terminar una transaccion

    event TaskToggleDone(
        uint256 id,
        bool done
    );

    struct Task { // tipo de dato
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    mapping  (uint256 => Task) public tasks; // estructura de datos parecida al diccionario

    function createTask(string memory _title, string memory _description) public { // al usar memory despues de la definicion del tipo se indica que ese valor no se guardara
        Task memory _task = Task(taskCounter, _title, _description, false, block.timestamp); //block timestamp devuelve la hora del bloque donde se esta ejecutando el smart contract
        tasks[taskCounter] = _task;
        taskCounter++;
        emit TaskCreated(_task.id, _task.title, _task.description, _task.done, _task.createdAt); // ejecuto un evento con el emit
    }

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_task.id, _task.done);
    }

}
