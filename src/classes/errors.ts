/**
 * Error thrown when a fish is not found.
 */
export class FishNotFoundError extends Error {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "FishNotFoundError";
    }
}

/**
 * Error thrown when a fishing rod is not found.
 */
export class FishingRodNotFoundError extends Error {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "FishingRodNotFoundError";
    }
}

/**
 * Error thrown when a bait is not found.
 */
export class BaitNotFoundError extends Error {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "BaitNotFoundError";
    }
}

/**
 * Error thrown when there is insufficient bait.
 */
export class BaitInsufficientError extends Error {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "BaitInsufficientError";
    }
} 