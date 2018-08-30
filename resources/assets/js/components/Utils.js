import React from 'react';
import namor from 'namor';

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }

    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();

    return {
        firstName: namor.generate({
            words: 1,
            numbers: 0,
            manly: false
        }),
        lastName: namor.generate({
            words: 1,
            numbers: 0,
            manly: false
        }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status: statusChance > 0.66 ? "relationship" : statusChance > 0.33 ? "complicated" : "single"
    };
};


export function makeData(len = 1000) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}
