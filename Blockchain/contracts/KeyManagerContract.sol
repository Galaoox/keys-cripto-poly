// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13; // version del lenguaje usado

contract KeyManagerContract {
    constructor() {}

    event KeyCreated(
        uint256 id
    );

    struct Key {
        // tipo de dato
        string title;
        string user;
        string password;
        string note;
    }

    mapping(address => Key[]) internal keys; // estructura de datos parecida al diccionario

    function createKey(
        address entityAddress, Key memory data) public {
        keys[entityAddress].push(data);
        emit KeyCreated(keys[entityAddress].length);
    }

    function getKeys(address entityAddress) public view returns (Key[] memory) {
        return keys[entityAddress];
    }

    function updateKey(address entityAddress, uint rowIndex, Key memory data) public {
        keys[entityAddress][rowIndex] =  data;
    }

    function deleteKey(address entityAddress, uint rowIndex) public {
        keys[entityAddress][rowIndex] = keys[entityAddress][keys[entityAddress].length - 1];
        keys[entityAddress].pop();
    }
    
}
