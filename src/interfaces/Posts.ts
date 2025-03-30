/* eslint-disable camelcase */
export interface Posts {
    id: string;
    style: string;
    title: string;
    text: string;
    link?: string;
    linkImage?: string;
    created_at: string;
}

export interface IPostRequest {
    id?: string;
    style: string;
    title: string;
    text: string;
    link: string;
    image: null | File;
}
