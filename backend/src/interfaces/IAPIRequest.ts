export interface IAPIRequest {
    header: {
        appToken: string;
        userToken: string;
    }
    data: any
}