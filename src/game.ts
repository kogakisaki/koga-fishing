import { Inventory } from './classes/inventory';
import { Fish, fishMap } from './classes/fish';
import { Bait, baitMap } from './classes/bait';
import { FishingRod, fishingRodMap } from './classes/fishingRod';
import { FishNotFoundError, FishingRodNotFoundError, BaitNotFoundError, BaitInsufficientError } from './classes/errors';
import { Environment, environmentMap } from './types/environment';

export class KogaFishing {
    private playerName: string;
    private money: number;
    private inventory: Inventory;

    constructor(playerName: string, startingMoney: number, initialInventory?: Inventory) {
        this.playerName = playerName;
        this.money = startingMoney;
        this.inventory = initialInventory || new Inventory();
    }

    public catchFish(baitId: number, rodId: number, environmentId: number): Fish | undefined {
        const bait = this.getBait(baitId);
        const rod = this.getFishingRod(rodId);
        const environment = this.getEnvironment(environmentId);

        if (!bait) {
            return undefined;
        }
        if (!rod) {
            return undefined;
        }
        if (!environment) {
            return undefined;
        }

        // Check if the player has the bait
        const hasBait = this.inventory.baits.some(b => b.id === bait.id);
        if (!hasBait) {
            throw new BaitInsufficientError(`Insufficient bait`);
        }

        // Get the rod from the inventory
        const inventoryRod = this.inventory.fishingRods.find(r => r.item.id === rodId);
        if (!inventoryRod || !inventoryRod.durability || !(inventoryRod.item instanceof FishingRod)) {
            throw new FishingRodNotFoundError(`Fishing rod with ID ${rodId} not found in inventory or has no durability.`);
        }

        // Reduce rod durability
        inventoryRod.item.updateDurability(inventoryRod.durability - 1);

        if (inventoryRod.durability <= 0) {
            this.removeItem(rod);
            throw new Error(`Your ${rod.name} broke!`);
        }

        // Logic bắt cá
        const caughtFish = this.determineCaughtFish(bait, rod, environment);

        if (caughtFish) {
            // Remove the bait from the inventory only if a fish is caught
            this.removeItem(bait);
            this.addItem(caughtFish);
            return caughtFish;
        } else {
            return undefined;
        }
    }

    private determineCaughtFish(bait: Bait, rod: FishingRod, environment: Environment): Fish | undefined {
        const possibleFish = Object.values(fishMap).filter(fish => fish.bait === bait.name && environment.fish.includes(fish.id));
        if (possibleFish.length === 0) {
            return undefined;
        }

        const maxRarity = rod.maxRarity;
        const filteredFish = possibleFish.filter(fish => fish.rarity <= maxRarity);

        if (filteredFish.length === 0) {
            return undefined;
        }
        let totalWeight = 0;
        for (const fish of filteredFish) {
            totalWeight += fish.rarity;
        }

        let random = Math.random() * totalWeight;
        for (const fish of filteredFish) {
            random -= fish.rarity;
            if (random <= 0) {
                return fish;
            }
        }

        return undefined;
    }

    // Phương thức lấy thông tin cá theo ID từ fishMap
    public getFish(id: number): Fish {
        const fish = fishMap[id];
        if (!fish) {
            throw new FishNotFoundError(`Fish with ID ${id} not found.`);
        }
        return fish;
    }

    // Phương thức lấy thông tin mồi theo ID từ baitMap
    public getBait(id: number): Bait {
        const bait = baitMap[id];
        if (!bait) {
            throw new BaitNotFoundError(`Bait with ID ${id} not found.`);
        }
        return bait;
    }

    // Phương thức lấy thông tin cần câu theo ID từ fishingRodMap
    public getFishingRod(id: number): FishingRod {
        const rod = fishingRodMap[id];
        if (!rod) {
            throw new FishingRodNotFoundError(`Fishing rod with ID ${id} not found.`);
        }
        return rod;
    }

    public getEnvironment(id: number): Environment {
        const environment = environmentMap[id];
        if (!environment) {
            throw new Error(`Environment with ID ${id} not found.`);
        }
        return environment;
    }

    public addItem(item: Fish | FishingRod | Bait, durability?: number): void {
        this.inventory.addItem(item, durability);
    }

    public removeItem(item: Fish | FishingRod | Bait): void {
        this.inventory.removeItem(item);
    }

    public getInventory(): Inventory {
        return this.inventory;
    }

    public buyFishingRod(rodId: number): void {
        const rod = this.getFishingRod(rodId);
        if (this.money < rod.price) {
            throw new Error("Insufficient funds to buy this rod.");
        }
        this.money -= rod.price;
        this.addItem(rod, rod.durability);
    }

    public buyBait(baitId: number): void {
        const bait = this.getBait(baitId);
         if (this.money < bait.price) {
            throw new Error("Insufficient funds to buy this bait.");
        }
        this.money -= bait.price;
        this.addItem(bait);
    }

    public getMoney(): number {
        return this.money;
    }

    public levelUpInventory(): void {
        this.inventory.levelUp();
    }

    public sellFish(fishId: number, quantity: number): void {
        const fish = this.getFish(fishId);
        const fishInInventory = this.inventory.fish.filter(f => f.id === fishId);

        if (fishInInventory.length < quantity) {
            throw new Error("Not enough fish in inventory to sell.");
        }

        // Tính toán số tiền thu được từ việc bán cá
        const totalPrice = fish.price * quantity;

        // Loại bỏ cá khỏi inventory
        for (let i = 0; i < quantity; i++) {
            this.removeItem(fish);
        }

        // Tăng tiền cho người chơi
        this.money += totalPrice;
    }
} 