export interface Director {
  id?: string;
  name: string;
  nationality: string;
}

export interface Movie {
  id?: string;
  title: string;
  director?: Director;
}

export interface Review {
  id?: string;
  comment: string;
  date: Date;
  rating: number;
  user?: User;
}

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface AllModelLists {
  directors?: Director[];
  movies?: Movie[];
  reviews?: Review[];
  users?: User[];
}

