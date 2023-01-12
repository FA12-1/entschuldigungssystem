export interface IAPIMetadata {
    buildNumber: number;
    apiName: string;
    requirements: {
        minSimpleAPIBuild: number;
        maxSimpleAPIBuild?: number;
        dependencies?: {apiName: string, minBuildNumber: number, maxBuildNumber?: number}[] 
    }
}