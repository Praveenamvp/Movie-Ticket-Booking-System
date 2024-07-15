using DataLayer.Interfaces;
using Models.Models;
using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mapper.Interfaces;
using System.Reflection.Emit;
using Mapper.Implemenations;
using Models.Entity;

namespace DataLayer.Repositories
{
    public class ShowTimeRepo : IShowTimeRepo
    {
        private readonly IConnection _connection;
        private readonly IDataLayerMapper _dataLayerMapper;
        SqlConnection conn;

        public ShowTimeRepo( IConnection connection,IDataLayerMapper dataLayerMapper)
        {
            _connection = connection;
            _dataLayerMapper= dataLayerMapper;
            conn = new SqlConnection(@"Data Source=KANINI-LTP-625\SQLEXPRESS;Integrated Security=true;Initial Catalog=MovieTicket");

        }
        public async Task<List<DateView>> GetAllDates(Guid id)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("FetchShowDatesByMovieId", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.Add("@MovieId", SqlDbType.UniqueIdentifier).Value = id;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<DateView> dates = new List<DateView>();
            foreach (DataRow row in table.Rows)
            {
                DateView dateView = new DateView();
                dateView.date = (DateTime)row[0];
                dates.Add(dateView);
            }
            return dates;
        }

        public async Task<List<ShowTimeView>> GetAllShowTImeByMoveiDate(MovieDateRequest movieDateRequest)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("GetShowTimeDetails", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.Add("@MovieId", SqlDbType.UniqueIdentifier).Value = movieDateRequest.MovieUID;
            adapter.SelectCommand.Parameters.Add("@Date", SqlDbType.Date).Value = movieDateRequest.date;

            DataSet dataSet = new DataSet();
            adapter.Fill(dataSet);

            List<ShowTimeView> showTimeViews = new List<ShowTimeView>();
            foreach (DataRow row in dataSet.Tables[0].Rows)
            {
                showTimeViews.Add(await _dataLayerMapper.FetchShowTimeView(row));
            }

            return showTimeViews;
        }

        public async Task<List<SeatDetails>> GetSeatDetails(Guid id)
        {
            SqlDataAdapter adapter = new SqlDataAdapter("FetchSeatDetailsByShowTimeID", _connection.GetConnection());
            adapter.SelectCommand.CommandType = System.Data.CommandType.StoredProcedure;
            adapter.SelectCommand.Parameters.Add("@ShowTimeID", SqlDbType.UniqueIdentifier).Value = id;
            DataTable table = new DataTable();
            adapter.Fill(table);
            List<SeatDetails> seatDetails = new List<SeatDetails>();
            foreach (DataRow row in table.Rows)
            {
                SeatDetails seat = new SeatDetails();
                seat.UID = new Guid(row[0].ToString());
                seat.ShowTimeID= new Guid(row[1].ToString());
                seat.SeatNumber= int.Parse(row[2].ToString());
                seat.IsAvailable = bool.Parse(row[3].ToString());
                seatDetails.Add(seat);
            }
            return seatDetails;
        }

        public async Task<bool> UpdateAvailableSeats(UpdateShowTimeRequest updateShowTimeRequest)
        {
            SqlCommand command = null;
            command = new SqlCommand("UpdateAvailableSeats", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@seats", updateShowTimeRequest.seats);
            command.Parameters.AddWithValue("@showTimeId", updateShowTimeRequest.showTimeId);
            conn.Open();
            var result = command.ExecuteNonQuery();
            conn.Close();
            if (result!=0)
            {
                return true;
            }
            return false;
        }
    }
}
