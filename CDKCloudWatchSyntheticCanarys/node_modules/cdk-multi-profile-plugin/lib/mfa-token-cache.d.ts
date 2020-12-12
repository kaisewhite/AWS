export declare class MfaTokenCache {
    private readonly cache;
    constructor();
    has(mfaSerial: string, token: string): boolean;
    set(mfaSerial: string, token: string): void;
}
