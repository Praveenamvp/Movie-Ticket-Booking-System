using Mapper.Interfaces;
using Models.Entity;
using Models.Models;
using Models.View;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Mapper.Implemenations
{
    public class DataLayerMapper : IDataLayerMapper
    {
        public async Task<Location> FetchLocationsAndMap(DataRow row)
        {
            Location location = new Location();
            location.UID = new Guid(row[0].ToString());
            location.Name = new string(row[1].ToString());
            location.ParentLocationID = row[2] != DBNull.Value ? new Guid(row[2].ToString()) : (Guid?)null;
            return location;
        }

        public async Task<Movie> FetchMovieAndMap(DataRow row)
        {
            Movie movie = new Movie();
            movie.UID = Guid.Parse(row[0].ToString());
            movie.Title = row[1].ToString();
            movie.Language = row[2].ToString();
            movie.Genre = row[3].ToString();
            movie.ReleaseDate = DateTime.Parse(row[4].ToString());
            movie.Duration = TimeSpan.Parse(row[5].ToString());
            movie.Description = row[6].ToString();
            movie.Likes = int.Parse(row[7].ToString());
            movie.Image = row[8].ToString();
            movie.Certification = row[9].ToString();

            return movie;
        }

        public async Task<ShowTimeView> FetchShowTimeView(DataRow row)
        {
            ShowTimeView showTimeView = new ShowTimeView();
            showTimeView.StartTime = DateTime.Parse(row[0].ToString());
            showTimeView.MovieID = Guid.Parse(row[1].ToString()); 
            showTimeView.UID = Guid.Parse(row[2].ToString());
            showTimeView.AvailableSeats = int.Parse(row[3].ToString());
            showTimeView.LocationName = row[4].ToString();
            return showTimeView;
        }

        public async Task<UserDetails> FetchUserDetails(DataRow row)
        {
            UserDetails userDetails = new UserDetails();
            userDetails.UID = Guid.Parse( row[0].ToString());

            userDetails.UserName = row[1].ToString();
            userDetails.Email= row[2].ToString();
            userDetails.PhoneNumber = row[3].ToString();
            userDetails.PasswordKey = (byte[])row[4];
            userDetails.PasswordHash = (byte[])row[5];

            return userDetails;


        }
    }



}
