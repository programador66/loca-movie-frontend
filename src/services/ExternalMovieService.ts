import axios, { Axios } from 'axios';

class ExternalMovieService {
    private api: Axios;

    constructor() {
      const api = axios.create({
        baseURL: `https:///www.omdbapi.com/`,
      });
      this.api = api;
    }

    async searchMovie(movieName: string) {
      const response = await this.api.get(`?t=${movieName}&apikey=9b1ad736`);
      return response;
    }

}
export default new ExternalMovieService();