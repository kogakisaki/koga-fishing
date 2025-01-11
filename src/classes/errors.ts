export class FishNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FishNotFoundError";
    }
}

export class FishingRodNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FishingRodNotFoundError";
    }
}

export class BaitNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BaitNotFoundError";
    }
}

export class BaitInsufficientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BaitInsufficientError";
    }
} 