import { Inventory } from './classes/inventory';
import { Fish, fishMap } from './classes/fish';
import { Bait, baitMap } from './classes/bait';
import { FishingRod, fishingRodMap } from './classes/fishingRod';
import { FishNotFoundError, FishingRodNotFoundError, BaitNotFoundError, BaitInsufficientError } from './classes/errors';
import { Environment, environmentMap } from './types/environment';

/**
 * Represents the main game class for Koga Fishing.
 */
export class KogaFishing {
    private playerName: string;
    private money: number;
    private inventory: Inventory;

    /**
     * @param {string} playerName - The name of the player.
     * @param {number} startingMoney - The starting amount of money for the player.
     * @param {Inventory} [initialInventory] - The initial inventory for the player.
     */
    constructor(playerName: string, startingMoney: number, initialInventory?: Inventory) {
        this.playerName = playerName;
        this.money = startingMoney;
        this.inventory = initialInventory || new Inventory();
    }

    /**
     * Attempts to catch a fish.
     * @param {number} baitId - The ID of the bait to use.
     * @param {number} rodId - The ID of the fishing rod to use.
     * @param {number} environmentId - The ID of the environment to fish in.
     * @returns {Fish | undefined} The caught fish, or undefined if no fish was caught.
     * @throws {BaitInsufficientError} If the player does not have the required bait.
     * @throws {FishingRodNotFoundError} If the player does not have the required fishing rod or it has no durability.
     * @throws {Error} If the fishing rod breaks.
     */
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

        const hasBait = this.inventory.baits.some(b => b.id === bait.id);
        if (!hasBait) {
            throw new BaitInsufficientError(`Insufficient bait`);
        }

        const inventoryRod = this.inventory.fishingRods.find(r => r.item.id === rodId);
        if (!inventoryRod || !inventoryRod.durability || !(inventoryRod.item instanceof FishingRod)) {
            throw new FishingRodNotFoundError(`Fishing rod with ID ${rodId} not found in inventory or has no durability.`);
        }

        inventoryRod.item.updateDurability(inventoryRod.durability - 1);

        if (inventoryRod.durability <= 0) {
            this.removeItem(rod);
            throw new Error(`Your ${rod.name} broke!`);
        }

        const caughtFish = this.determineCaughtFish(bait, rod, environment);

        if (caughtFish) {
            this.removeItem(bait);
            this.addItem(caughtFish);
            return caughtFish;
        } else {
            return undefined;
        }
    }

    /**
     * Determines the fish that is caught based on the bait, rod, and environment.
     * @param {Bait} bait - The bait used.
     * @param {FishingRod} rod - The fishing rod used.
     * @param {Environment} environment - The environment fished in.
     * @returns {Fish | undefined} The caught fish, or undefined if no fish was caught.
     */
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

    /**
     * Retrieves a fish by its ID.
     * @param {number} id - The ID of the fish.
     * @returns {Fish} The fish object.
     * @throws {FishNotFoundError} If the fish is not found.
     */
    public getFish(id: number): Fish {
        const fish = fishMap[id];
        if (!fish) {
            throw new FishNotFoundError(`Fish with ID ${id} not found.`);
        }
        return fish;
    }

    /**
     * Retrieves a bait by its ID.
     * @param {number} id - The ID of the bait.
     * @returns {Bait} The bait object.
     * @throws {BaitNotFoundError} If the bait is not found.
     */
    public getBait(id: number): Bait {
        const bait = baitMap[id];
        if (!bait) {
            throw new BaitNotFoundError(`Bait with ID ${id} not found.`);
        }
        return bait;
    }

    /**
     * Retrieves a fishing rod by its ID.
     * @param {number} id - The ID of the fishing rod.
     * @returns {FishingRod} The fishing rod object.
     * @throws {FishingRodNotFoundError} If the fishing rod is not found.
     */
    public getFishingRod(id: number): FishingRod {
        const rod = fishingRodMap[id];
        if (!rod) {
            throw new FishingRodNotFoundError(`Fishing rod with ID ${id} not found.`);
        }
        return rod;
    }

    /**
     * Retrieves an environment by its ID.
     * @param {number} id - The ID of the environment.
     * @returns {Environment} The environment object.
     * @throws {Error} If the environment is not found.
     */
    public getEnvironment(id: number): Environment {
        const environment = environmentMap[id];
        if (!environment) {
            throw new Error(`Environment with ID ${id} not found.`);
        }
        return environment;
    }

    /**
     * Adds an item to the player's inventory.
     * @param {Fish | FishingRod | Bait} item - The item to add.
     * @param {number} [durability] - The durability of the item, if it's a fishing rod.
     */
    public addItem(item: Fish | FishingRod | Bait, durability?: number): void {
        this.inventory.addItem(item, durability);
    }

    /**
     * Removes an item from the player's inventory.
     * @param {Fish | FishingRod | Bait} item - The item to remove.
     */
    public removeItem(item: Fish | FishingRod | Bait): void {
        this.inventory.removeItem(item);
    }

    /**
     * Gets the player's inventory.
     * @returns {Inventory} The player's inventory.
     */
    public getInventory(): Inventory {
        return this.inventory;
    }

    /**
     * Allows the player to buy a fishing rod.
     * @param {number} rodId - The ID of the fishing rod to buy.
     * @throws {Error} If the player has insufficient funds.
     */
    public buyFishingRod(rodId: number): void {
        const rod = this.getFishingRod(rodId);
        if (this.money < rod.price) {
            throw new Error("Insufficient funds to buy this rod.");
        }
        this.money -= rod.price;
        this.addItem(rod, rod.durability);
    }

    /**
     * Allows the player to buy bait.
     * @param {number} baitId - The ID of the bait to buy.
     * @throws {Error} If the player has insufficient funds.
     */
    public buyBait(baitId: number): void {
        const bait = this.getBait(baitId);
         if (this.money < bait.price) {
            throw new Error("Insufficient funds to buy this bait.");
        }
        this.money -= bait.price;
        this.addItem(bait);
    }

    /**
     * Gets the player's current amount of money.
     * @returns {number} The player's money.
     */
    public getMoney(): number {
        return this.money;
    }

    /**
     * Levels up the player's inventory.
     */
    public levelUpInventory(): void {
        this.inventory.levelUp();
    }

    /**
     * Allows the player to sell fish.
     * @param {number} fishId - The ID of the fish to sell.
     * @param {number} quantity - The quantity of fish to sell.
     * @throws {Error} If the player does not have enough fish in their inventory.
     */
    public sellFish(fishId: number, quantity: number): void {
        const fish = this.getFish(fishId);
        const fishInInventory = this.inventory.fish.filter(f => f.id === fishId);

        if (fishInInventory.length < quantity) {
            throw new Error("Not enough fish in inventory to sell.");
        }

        const totalPrice = fish.price * quantity;

        for (let i = 0; i < quantity; i++) {
            this.removeItem(fish);
        }

        this.money += totalPrice;
    }
} 