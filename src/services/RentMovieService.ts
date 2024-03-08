import { IOmdbMovies } from "../utils/movies";
import { IClient } from "./ClientService";
import { IUser } from "./UserService";

export enum Status {
    ALUGADO = 'ALUGADO' ,
    ENTREGUE = 'ENTREGUE',
}

export interface IRentMovie {
    id: string;
    date_location: Date;
    date_delivery?: Date;
    status: Status;
    createdAt: Date;
    updatedAt: Date | null;
    movieRented: IOmdbMovies;
    clientRegister: IClient;
    rentedBy: IUser;
}

class RentMovieService {
    
    private rentMovieDataJson = localStorage.getItem('rentMovieData');
    private data: IRentMovie[] = this.rentMovieDataJson ?  JSON.parse(this.rentMovieDataJson) : [];

    getRentMovie(): Promise<IRentMovie[] | []> {
        return Promise.resolve(this.data);
    }

    registerRentMovie(newRentMovie: IRentMovie) {
        try {            
            const verifyIsClientRentedMovie = this.data.find(client => client.clientRegister.id === newRentMovie.clientRegister.id);
            if (verifyIsClientRentedMovie) {
                return {
                    response: 400,
                    msg: 'Customer has already rented a movie'
                }
            }
            
            this.data.push(newRentMovie);
            localStorage.setItem('rentMovieData', JSON.stringify(this.data));

            return {
                response: 201,
                data: newRentMovie
            }
        } catch (error) {
            return error
        }
    }

}

export default new RentMovieService();