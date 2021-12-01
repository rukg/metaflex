export interface ArweaveData {
    name: string;
    symbol: string;
    description: string;
    image: string;
    attributes: Attribute[];
}

export interface Attribute {
    trait_type: string;
    value: string;
    display_type: string;
}
