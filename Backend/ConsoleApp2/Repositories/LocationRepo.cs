using DataLayer.Interfaces;
using Models.Models;
using System.Data.SqlClient;
using System.Data;
using Mapper.Interfaces;

namespace DataLayer.Repositories
{
    public class LocationRepo : ILocationRepo
    {
        private readonly IDataLayerMapper _dataLayerMapper;
        private readonly IConnection _connection;

        public LocationRepo(IDataLayerMapper dataLayerMapper, IConnection connection)
        {
            _dataLayerMapper = dataLayerMapper;
            _connection = connection;
        }
        

       
            public async Task<List<Location>> GetAll()
            {
                SqlDataAdapter adapter = new SqlDataAdapter("GetAllLocation", _connection.GetConnection());
                adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
                DataSet set = new DataSet();
                adapter.Fill(set);
                List<Location> locations = new List<Location>();
                foreach (DataRow row in set.Tables[0].Rows)
                {
                    locations.Add(await _dataLayerMapper.FetchLocationsAndMap(row));
                }
                return locations;
            }

        
    }
}
