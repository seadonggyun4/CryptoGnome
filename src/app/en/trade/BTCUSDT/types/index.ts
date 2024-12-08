export interface SliceSymbolResult {
    base: string | null;
    quote: string | null;
}

export interface Mover {
    symbol: string;
    priceChangePercent: string;
    time?: string;
}