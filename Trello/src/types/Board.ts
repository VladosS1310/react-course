export interface IBoard {
    id: string;
    name: string;
    desc: string;
    descData?: any;
    closed: boolean;
    idOrganization?: string;
    idEnterprise?: any;
    pinned: boolean;
    url: string;
    shortUrl: string;
}