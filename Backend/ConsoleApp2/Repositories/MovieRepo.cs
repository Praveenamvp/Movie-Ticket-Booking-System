using DataLayer.Interfaces;
using Models.Models;
using System.Data.SqlClient;
using System.Data;
using Mapper.Interfaces;
using Models.View;

namespace DataLayer.Repositories
{
    public class MovieRepo : IMovieRepo
    {
        private readonly IDataLayerMapper _dataLayerMapper;
        private readonly IConnection _connection;

        public MovieRepo(IDataLayerMapper dataLayerMapper, IConnection connection)
        {
            _dataLayerMapper = dataLayerMapper;
            _connection = connection;
        }

        public async Task<Movie> Get(Guid id)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("GetMovieDetails", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.Add("@UID", SqlDbType.UniqueIdentifier).Value = id;
            DataSet set = new DataSet();
            adapter.Fill(set);
            Movie movies = new Movie();
            DataRow row = set.Tables[0].Rows[0];
            return await _dataLayerMapper.FetchMovieAndMap(row);
        }

        public async Task<List<GenreView>> GetAllGenre()
        {
            SqlDataAdapter adapter = new SqlDataAdapter("GetAllGenre", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<GenreView> genres = new List<GenreView>();
            foreach (DataRow row in table.Rows)
            {
                GenreView genreView = new GenreView();
                genreView.name = row[0].ToString();
                genres.Add(genreView);
            }
            return genres;
        }

        public async Task<List<LanguageView>> GetAllLanguages()
        {
            SqlDataAdapter adapter=new SqlDataAdapter("GetAllLanguages",_connection.GetConnection());
            adapter.SelectCommand.CommandType= System.Data.CommandType.StoredProcedure;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<LanguageView> languages = new List<LanguageView>();
            foreach (DataRow row in table.Rows)
            {
                LanguageView locationView = new LanguageView();
                locationView.language = row[0].ToString();
                 languages.Add(locationView);
            }
            return languages;
        }

        public async Task<List<Movie>> GetMovieDetails(Guid id)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("GetMoviesInLocation", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.Add("@LocationUID", SqlDbType.UniqueIdentifier).Value = id;
            DataSet set = new DataSet();
            adapter.Fill(set);
            List<Movie> movies = new List<Movie>();
            foreach (DataRow row in set.Tables[0].Rows)
            {
                movies.Add(await _dataLayerMapper.FetchMovieAndMap(row));
            }
            return movies;
        }

       
    }
}
