using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class Movie
    {
        public Guid UID { get; set; }
        public string? Title { get; set; }
        public string? Language { get; set; }
        public string? Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public TimeSpan Duration { get; set; }
        public string? Description { get; set; }
        public int Likes { get; set; }
        public string? Image { get; set; }
        public string? Certification { get; set; }

    }
}
