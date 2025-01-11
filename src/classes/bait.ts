export class Bait {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

export const baitMap: { [key: number]: Bait } = {
    1: new Bait(1, "Worm", 10),
    2: new Bait(2, "Shrimp", 20),
    3: new Bait(3, "Corn", 15),
    4: new Bait(4, "Minnow", 25),
    5: new Bait(5, "Plankton", 30),
    6: new Bait(6, "Fly", 35),
    7: new Bait(7, "Live Bait", 40),
    8: new Bait(8, "Large Fish", 50),
    9: new Bait(9, "Flakes", 5),
    10: new Bait(10, "Meat", 45),
    11: new Bait(11, "Krill", 55),
    12: new Bait(12, "Squid", 60),
    13: new Bait(13, "Crab", 65),
    14: new Bait(14, "Algae", 70),
    15: new Bait(15, "Small Fish", 75),
};

export const getBaitNameById = (id: number): string | undefined => {
    const bait = baitMap[id];
    return bait ? bait.name : undefined;
}; 