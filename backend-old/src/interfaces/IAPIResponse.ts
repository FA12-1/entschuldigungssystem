export interface IAPIResponse {
    header: {
        success: boolean;
        message: string;
    }
    data: any;
}