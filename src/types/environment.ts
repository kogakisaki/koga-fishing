export interface Environment {
    id: number;
    name: string;
    fish: number[];
}

export const environmentMap: { [key: number]: Environment } = {
    1: { id: 1, name: "Lake", fish: [1, 2, 3, 4, 5, 42, 43, 44, 48] },
    2: { id: 2, name: "River", fish: [6, 7, 8, 9, 10, 41, 45, 46, 47] },
    3: { id: 3, name: "Ocean", fish: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
    4: { id: 4, name: "Pond", fish: [49, 50, 1, 3, 5, 7, 9] },
    5: { id: 5, name: "Swamp", fish: [2, 4, 6, 8, 10] },
    6: { id: 6, name: "Coral Reef", fish: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 35, 36, 37, 38, 39, 40] },
    7: { id: 7, name: "Deep Sea", fish: [11, 12, 13, 16, 17, 18, 32, 33, 34] },
    8: { id: 8, name: "Mountain Stream", fish: [41, 42, 43, 44, 45, 46, 47, 48] },
    9: { id: 9, name: "Mangrove", fish: [1, 2, 3, 6, 7, 8, 49, 50] },
    10: { id: 10, name: "Arctic", fish: [32, 33, 34, 35, 36, 37, 38, 39, 40] },
}; 