export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface RespuestaSubidaBucket {
  ok: boolean;
  img: Image;
}

export interface Pais {
  id?: string;
  name?: string;
  aplha2?: string;
  alpha3?: string;
}

export interface Post {
  bucket?: Bucket;
  _id?: string;
  mensaje?: Mensaje;
  coords?: string;
  usuario?: Usuario;
  created?: string;
  __v?: number;
}

export interface Mensaje {
  texto?: string;
  idioma?: string;
}

export interface Bucket {
  imgs?: Image[];
  _id?: string;
  created?: string;
  __v?: number;
}

export interface Detections {
  adult?: Likelihood;
  spoof?: Likelihood;
  medical?: Likelihood;
  violence?: Likelihood;
  racy?: Likelihood;
}

export enum Likelihood {
  UNKOWN = 'UNKOWN',
  VERY_UNLIKELY = 'VERY_UNLIKELY',
  UNLIKELY = 'UNLIKELY',
  POSSIBLE = 'POSSIBLE',
  LIKELY = 'LIKELY',
  VERY_LIKELY = 'VERY_LIKELY'
}

export interface Image {
  detections?: Detections;
  img?: string;
  _id?: string;
  created?: string;
  __v?: number;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  nickname?: string;
  password?: string;
  config?: config;
  __v?: number;
}

export interface config {
  pais?: string;
  idioma?: string;
}

export interface tempImage {
  path?: string;
  subido?: boolean;
}