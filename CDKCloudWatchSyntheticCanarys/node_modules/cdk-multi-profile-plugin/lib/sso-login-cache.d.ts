export declare class SSOLoginCache {
    private files;
    constructor(ssoCachePath: string);
    getCachedLogin(ssoProfile: Record<string, string>): {
        accessToken: string;
    };
}
