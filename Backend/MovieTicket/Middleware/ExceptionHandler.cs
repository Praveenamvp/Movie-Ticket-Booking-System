
using Models.DTOs;
using System.Net;

namespace MovieTicket.Middleware
{
    public class ExceptionHandler
    {
        private readonly ILogger<ExceptionHandler> _logger;
        private readonly RequestDelegate _requestDelegate;
        ErrorDTO error;
        public ExceptionHandler(ILogger<ExceptionHandler> logger, RequestDelegate requestDelegate)
        {
            _logger= logger;
            _requestDelegate= requestDelegate;
            error = new ErrorDTO();

        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _requestDelegate(httpContext);
            }
           
            catch (NullReferenceException ex)
            {
                MiddlewareResponse(ex.Message, httpContext, (int)HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {
                MiddlewareResponse(ex.Message, httpContext, (int)HttpStatusCode.InternalServerError);
            }
        }
        private HttpContext MiddlewareResponse(string message, HttpContext httpContext, int statusCode)
        {
            var guid = Guid.NewGuid();
            _logger.LogError($"{guid} : {message}");
            httpContext.Response.StatusCode = statusCode;
            httpContext.Response.ContentType = "application/json";
            error.UID = guid;
            error.Message = message;
            httpContext.Response.WriteAsJsonAsync(error);
            return httpContext;
        }
    }
}
