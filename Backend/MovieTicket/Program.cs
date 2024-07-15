using Azure.Storage.Blobs;
using BusinessLayer.Implementations;
using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using DataLayer.Repositories;
using Mapper.Implemenations;
using Mapper.Interfaces;
using MovieTicket.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IDataLayerMapper, DataLayerMapper>();
builder.Services.AddScoped<IBusinessLayerMapper, BusinessLayerMapper>();
builder.Services.AddScoped<ILocationRepo, LocationRepo>();
builder.Services.AddScoped<IConnection, Connection>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IMovieRepo, MovieRepo>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IBookingRepo, BookingRepo>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IShowTimeRepo, ShowTimeRepo>();
builder.Services.AddScoped<IShowTimeService, ShowTimeService>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ITokenGenerate, Token>();
builder.Services.AddScoped(u => new BlobServiceClient(
    builder.Configuration.GetValue<string>("BlobConnection")
    ));
builder.Services.AddScoped<IBlobService, BlobService>();
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("ReactCORS", options =>
    {
        options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionHandler>();

app.UseHttpsRedirection();
app.UseCors("ReactCORS");
app.UseAuthorization();

app.MapControllers();

app.Run();
