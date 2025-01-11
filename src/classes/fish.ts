export class Fish {
    id: number;
    name: string;
    rarity: number;
    bait: string;
    environment: number;
    price: number;

    constructor(id: number, name: string, rarity: number, bait: string, environment: number, price: number) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.bait = bait;
        this.environment = environment;
        this.price = price;
    }
}

export const fishMap: { [key: number]: Fish } = {
    1: new Fish(1, "Small Bass", 1, "Worm", 1, 20),
    2: new Fish(2, "Medium Bass", 2, "Shrimp", 1, 40),
    3: new Fish(3, "Large Bass", 3, "Live Bait", 1, 80),
    4: new Fish(4, "Small Trout", 1, "Corn", 1, 25),
    5: new Fish(5, "Medium Trout", 2, "Minnow", 1, 50),
    6: new Fish(6, "Small Salmon", 1, "Worm", 2, 30),
    7: new Fish(7, "Medium Salmon", 2, "Shrimp", 2, 60),
    8: new Fish(8, "Large Salmon", 3, "Live Bait", 2, 100),
    9: new Fish(9, "Small Catfish", 1, "Corn", 2, 15),
    10: new Fish(10, "Medium Catfish", 2, "Minnow", 2, 35),
    11: new Fish(11, "Small Tuna", 1, "Plankton", 3, 40),
    12: new Fish(12, "Medium Tuna", 2, "Fly", 3, 70),
    13: new Fish(13, "Large Tuna", 3, "Large Fish", 3, 120),
    14: new Fish(14, "Small Mackerel", 1, "Flakes", 3, 10),
    15: new Fish(15, "Medium Mackerel", 2, "Meat", 3, 20),
    16: new Fish(16, "Rare Fish", 4, "Krill", 3, 200),
    17: new Fish(17, "Swordfish", 4, "Small Fish", 3, 250),
    18: new Fish(18, "Marlin", 4, "Squid", 3, 300),
    19: new Fish(19, "Stingray", 3, "Shrimp", 3, 90),
    20: new Fish(20, "Clownfish", 1, "Plankton", 3, 15),
    21: new Fish(21, "Octopus", 2, "Crab", 3, 45),
    22: new Fish(22, "Lobster", 3, "Small Fish", 3, 110),
    23: new Fish(23, "Crab", 1, "Worm", 3, 10),
    24: new Fish(24, "Shrimp", 1, "Plankton", 3, 5),
    25: new Fish(25, "Squid", 2, "Small Fish", 3, 30),
    26: new Fish(26, "Jellyfish", 1, "Plankton", 3, 8),
    27: new Fish(27, "Pufferfish", 2, "Shrimp", 3, 35),
    28: new Fish(28, "Sea Turtle", 3, "Algae", 3, 100),
    29: new Fish(29, "Starfish", 1, "Plankton", 3, 7),
    30: new Fish(30, "Sea Cucumber", 1, "Algae", 3, 6),
    31: new Fish(31, "Sea Urchin", 2, "Algae", 3, 25),
    32: new Fish(32, "Whale", 4, "Krill", 3, 500),
    33: new Fish(33, "Dolphin", 3, "Small Fish", 3, 150),
    34: new Fish(34, "Barracuda", 2, "Small Fish", 3, 60),
    35: new Fish(35, "Mackerel", 1, "Shrimp", 3, 12),
    36: new Fish(36, "Herring", 1, "Plankton", 3, 9),
    37: new Fish(37, "Cod", 1, "Small Fish", 3, 18),
    38: new Fish(38, "Halibut", 2, "Squid", 3, 40),
    39: new Fish(39, "Flounder", 1, "Worm", 3, 14),
    40: new Fish(40, "Ray", 2, "Shrimp", 3, 30),
    41: new Fish(41, "Trout", 1, "Fly", 2, 22),
    42: new Fish(42, "Bass", 1, "Minnow", 1, 28),
    43: new Fish(43, "Pike", 2, "Small Fish", 1, 55),
    44: new Fish(44, "Muskellunge", 3, "Large Fish", 1, 130),
    45: new Fish(45, "Gar", 2, "Meat", 2, 45),
    46: new Fish(46, "Paddlefish", 3, "Plankton", 2, 110),
    47: new Fish(47, "Catfish", 1, "Worm", 2, 17),
    48: new Fish(48, "Crappie", 1, "Minnow", 1, 20),
    49: new Fish(49, "Sunfish", 1, "Worm", 4, 13),
    50: new Fish(50, "Bluegill", 1, "Worm", 4, 11),
};

// Tạo một hàm để lấy tên cá từ ID
export const getFishNameById = (id: number): string | undefined => {
    const fish = fishMap[id];
    return fish ? fish.name : undefined;
}; 