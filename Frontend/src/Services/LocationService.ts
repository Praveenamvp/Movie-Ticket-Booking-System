import axios from 'axios'
class LocationService{
    http=axios.create({
        baseURL: "https://localhost:7016/api/"
    })
    async fetchAllLocations(){
        const response = await this.http.get("/Location/AllLocations");
        return  response.data;
    }
    
}

export default new LocationService();