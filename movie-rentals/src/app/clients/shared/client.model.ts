export interface Client {
  id: number;
  name: string;
  surname: string;
  rentedMovies: {id:number, movieTitle:string };
}
