export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
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
  __v?: number;
}