export class FishingRod {
    id: number;
    name: string;
    maxRarity: number;
    price: number;
    maxDurability: number;
    durability: number;

    constructor(id: number, name: string, maxRarity: number, price: number, maxDurability: number) {
        this.id = id;
        this.name = name;
        this.maxRarity = maxRarity;
        this.price = price;
        this.maxDurability = maxDurability;
        this.durability = maxDurability;
    }

    updateDurability(newDurability: number): void {
        this.durability = newDurability;
    }
}

export const fishingRodMap: { [key: number]: FishingRod } = {
    1: new FishingRod(1, "Bamboo Fishing Rod", 1, 100, 100),
    2: new FishingRod(2, "Composite Fishing Rod", 2, 150, 150),
    3: new FishingRod(3, "Carbon Fiber Fishing Rod", 2, 200, 200),
    4: new FishingRod(4, "Graphite Fishing Rod", 3, 300, 300),
    5: new FishingRod(5, "Ultralight Fishing Rod", 1, 50, 50),
    6: new FishingRod(6, "Medium Fishing Rod", 2, 120, 120),
    7: new FishingRod(7, "Heavy Fishing Rod", 3, 250, 250),
    8: new FishingRod(8, "Professional Fishing Rod", 4, 500, 500),
    9: new FishingRod(9, "Mini Fishing Rod", 1, 30, 30),
    10: new FishingRod(10, "Telescopic Fishing Rod", 2, 100, 100),
    11: new FishingRod(11, "Spinning Rod", 2, 180, 180),
    12: new FishingRod(12, "Casting Rod", 3, 280, 280),
    13: new FishingRod(13, "Jigging Rod", 3, 350, 350),
    14: new FishingRod(14, "Surf Casting Rod", 2, 220, 220),
    15: new FishingRod(15, "Bottom Fishing Rod", 1, 100, 100),
    16: new FishingRod(16, "Float Fishing Rod", 1, 70, 70),
    17: new FishingRod(17, "Hand Fishing Rod", 1, 60, 60),
    18: new FishingRod(18, "Algae Fishing Rod", 1, 40, 40),
    19: new FishingRod(19, "Eel Fishing Rod", 1, 50, 50),
    20: new FishingRod(20, "Perch Fishing Rod", 1, 60, 60),
    21: new FishingRod(21, "Carp Fishing Rod", 2, 100, 100),
    22: new FishingRod(22, "Pangasius Fishing Rod", 1, 80, 80),
    23: new FishingRod(23, "Salmon Fishing Rod", 2, 150, 150),
    24: new FishingRod(24, "Deep Sea Fishing Rod", 3, 300, 300),
    25: new FishingRod(25, "Grouper Fishing Rod", 2, 180, 180),
    26: new FishingRod(26, "Tuna Fishing Rod", 3, 250, 250),
    27: new FishingRod(27, "Shark Fishing Rod", 4, 400, 400),
    28: new FishingRod(28, "Alligator Fishing Rod", 4, 450, 450),
    29: new FishingRod(29, "Whale Fishing Rod", 4, 500, 500),
}; 