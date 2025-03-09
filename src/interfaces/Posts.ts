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

// "id": "1e676832-3be5-4495-b141-91c566938387",
// "style": "carrousel",
// "title": "Post 1",
// "text": "Virga vinitor via adeptio viriliter cum amplexus celer. Debitis dolores commodi cornu quaerat cunae copiose deficio. Contabesco caritas temperantia aegre auditor.\nCreptio defungo aeternus. Ventus conqueror volo aspicio abscido aeger comprehendo tero. Talis brevis bibo armarium comburo conventus clibanus debeo tunc copia.\nEt demonstro voveo cognatus deprecator. Ago absque armarium tametsi blandior acceptus repudiandae uxor carus ab. Impedit coadunatio vestigium tunc vox decumbo usus corrumpo pauci vix.",
// "link": "https://polijunior.com.br/",
// "image": null,
// "created_at": "2025-02-12T01:11:20.286Z",
// "linkImage": "Post sem imagem"
