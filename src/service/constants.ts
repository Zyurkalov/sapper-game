const TIME_MODIFICATOR = 1.5;
const SCORE_MODIFICATOR = 0.5;
const BOMBS_MODIFICATOR = 1.5;
const NEIGHBOR_MODIFICATOR = 0.3;

// const DEFAULT_WINNERS = [
//     { id: 1, place: 1, name: "Elon Musk", score: 10 },
//     { id: 2, place: 2, name: "CHEBURNATOR", score: 9 },
//     { id: 3, place: 3, name: "IP", score: 8 },
//     { id: 4, place: 4, name: "PlotoyadniiKeksik", score: 7 },
//     { id: 5, place: 5, name: "max_666", score: 6 },
//     { id: 6, place: 6, name: "I_M_M_O_R_T_A_L", score: 5 },
//     { id: 7, place: 7, name: "CHEBURNATOR", score: 4 },
//     { id: 8, place: 8, name: "max_666", score: 3 },
//     { id: 9, place: 9, name: "PlotoyadniiKeksik", score: 2 },
//     { id: 10, place: 10, name: "max_666", score: 1 },
// ];
const DEFAULT_WINNERS = [
    { id: 0, name: "Elon Musk", score: 10 },
    { id: 1, name: "CHEBURNATOR", score: 9 },
    { id: 2, name: "IP", score: 8 },
    { id: 3, name: "PlotoyadniiKeksik", score: 7 },
    { id: 4, name: "max_666", score: 6 },
    { id: 5, name: "I_M_M_O_R_T_A_L", score: 5 },
    { id: 6, name: "CHEBURNATOR", score: 4 },
    { id: 7, name: "max_666", score: 3 },
    { id: 8, name: "PlotoyadniiKeksik", score: 2 },
    { id: 9, name: "max_666", score: 1 },
];

const MIN_ROWANDCOLUMNS = 8;
const MAX_ROWANDCOLUMNS = 100;
const MAX_BOMBS = 2000;

export {
    TIME_MODIFICATOR,
    SCORE_MODIFICATOR,
    DEFAULT_WINNERS,
    MIN_ROWANDCOLUMNS,
    MAX_ROWANDCOLUMNS,
    MAX_BOMBS,
    BOMBS_MODIFICATOR,
    NEIGHBOR_MODIFICATOR,
};
