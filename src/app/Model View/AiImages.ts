export interface AiImageResult {
    model: string;
    detection: string;
    isRipe: boolean | null;
    isHealthy: boolean | null;
    isPest: boolean | null;
    actionNeeded: string;
}

export interface AiImage {
    aiImageId: number;
    houseID: number;
    createdAt: string;
    results: AiImageResult[];
    imageUrls: string[];
}

export type AiImagesResponse = AiImage[];