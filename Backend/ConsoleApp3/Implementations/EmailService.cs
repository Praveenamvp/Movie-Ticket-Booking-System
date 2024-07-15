using BusinessLayer.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using Models.Entity;
using Models.Request;
using Models.View;


namespace BusinessLayer.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IMovieService _movieService;
        private readonly IUserService _userService;

        public EmailService(IConfiguration configuration,IMovieService movieService,IUserService userService)
        {
            _configuration = configuration;
            _movieService=movieService;
            _userService= userService;
        }
        public async Task<bool> SendEmail(BookingRequest bookingRequest)
        {
            var emailModel = new Email();
            var  result = await _userService.Get(bookingRequest.UserUID);
            emailModel.ToEmail = result.Email;
            emailModel.Subject = "Your Tickets";
            emailModel.Content = await EmailStringBody(bookingRequest);
            var emailMessage = new MimeMessage();
            var from = _configuration["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Book My Movie", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.ToEmail, emailModel.ToEmail));
            emailMessage.Subject = emailModel.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailModel.Content)
            };
            var client = new SmtpClient();
            try
            {
                client.Connect(_configuration["EmailSettings:SmtpServer"], 25, SecureSocketOptions.StartTls);
                client.Authenticate(_configuration["EmailSettings:From"], _configuration["EmailSettings:Password"]);
                client.Send(emailMessage);
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
        public async Task<string> EmailStringBody(BookingRequest bookingRequest)
        {
            MovieView movieDetails = await _movieService.GetAllMoviesDetailsByMovieUid(bookingRequest.MovieID);
            return $@"<div style="" background-color: #f2f2f2; padding: 20px;"">
        <h1 style=""color: green; text-align: center;"">Your Booking is Confirmed</h1>
        <div style=""text-align: center;"">
        <h1 style=""color: #333; font-size: 24px; margin-bottom: 5px;"">{movieDetails.Title}({movieDetails.Certification})</h1>
        <h2 style=""color: #555; font-size: 18px; margin-top: 5px;"">{bookingRequest.BookingDate}</h2>
        </div>
        </div>";

        }
        //public async Task<bool> SendEmailData(BookingRequest bookingRequest)
        //{
        //    var emailModel = new Email();
        //    emailModel.ToEmail = bookingRequest.Email;
        //    emailModel.Subject = "Your Tickets";
        //    emailModel.Content = await EmailStringBody(bookingRequest);
        //    MailMessage mailMessage = new MailMessage();
        //    var from = _configuration["EmailSettings:From"];

        //    mailMessage.From= new MailAddress("praveenamurugan28@gmail.com");
        //    mailMessage.To.Add (bookingRequest.Email);
        //    mailMessage.Subject= bookingRe
        //    mailMessage.Body
        //    mailMessage.IsBodyHtml = true;
        //    try
        //    {

        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //    finally
        //    {
               
        //    }
        //}
    }
}
