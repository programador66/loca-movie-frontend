import { IOmdbMovies } from "../utils/movies";
import { IClient } from "./ClientService";
import { IUser } from "./UserService";

export enum Status {
    'ALUGADO',
    'ENTREGUE'
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

    getRentMovie() {
        return Promise.resolve(this.data);
    }

    registerRentMovie(newUser: IRentMovie) {
        try {            
            this.data.push(newUser);
            localStorage.setItem('userData', JSON.stringify(this.data));
            return {
                response: 201,
                data: newUser
            }
        } catch (error) {
            return error
        }
    }

}

export default new RentMovieService();