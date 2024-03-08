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
            const verifyIsClientRentedMovie = this.data
            .find(rent => rent.clientRegister.id === newRentMovie.clientRegister.id && rent.status === Status.ALUGADO);

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

    deliveryMovie(id: string = '') {
        try {            
        
            const findClient = this.data.find(rent => rent.id === id);
            if (!findClient) {
                return {
                    response: 404,
                    msg: 'Rent not found'
                }
            }
            
            findClient.status = Status.ENTREGUE;
            localStorage.setItem('rentMovieData', JSON.stringify(this.data));

            return {
                response: 200,
                data: findClient
            }
        } catch (error) {
            return error
        }
    }

}

export default new RentMovieService();