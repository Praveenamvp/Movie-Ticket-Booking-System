import axios from "axios";

class MovieService{
  http=axios.create({
    baseURL:"https://localhost:7016/api/Movie"
})  
   
async fetchMovieDetails(uid:string){
  const response = await this.http.get(`/MovieDetails?uid=${uid}`);
  
  return  response.data;
  
     
}
async fetchMovieDetailsByLocation(uid:string){
  const response = await this.http.get(`?uid=${uid}`);
  return  response.data;
   
}

async fetchAllLanguages(){
  const response = await this.http.get("/GetAllLanguages");
  return  response.data;
 
}
async fetchAllGenres(){
  const response = await this.http.get("/GetAllGenre");
  return  response.data;
}
}
  export default new MovieService();