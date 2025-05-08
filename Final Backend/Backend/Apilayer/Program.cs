// // var builder = WebApplication.CreateBuilder(args);

// // // Add services to the container.
// // // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// // builder.Services.AddEndpointsApiExplorer();
// // builder.Services.AddSwaggerGen();

// // var app = builder.Build();

// // // Configure the HTTP request pipeline.
// // if (app.Environment.IsDevelopment())
// // {
// //     app.UseSwagger();
// //     app.UseSwaggerUI();
// // }

// // app.UseHttpsRedirection();

// // var summaries = new[]
// // {
// //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// // };

// // app.MapGet("/weatherforecast", () =>
// // {
// //     var forecast =  Enumerable.Range(1, 5).Select(index =>
// //         new WeatherForecast
// //         (
// //             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
// //             Random.Shared.Next(-20, 55),
// //             summaries[Random.Shared.Next(summaries.Length)]
// //         ))
// //         .ToArray();
// //     return forecast;
// // })
// // .WithName("GetWeatherForecast")
// // .WithOpenApi();

// // app.Run();

// // record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// // {
// //     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// // }
//   using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Logging;
// using ExternalApiMock.Services;
// using ExternalApiMock.Models;
 
// namespace ExternalApiMock.Controllers;
 
// [ApiController]
// [Route("api/[controller]")]
// public class ExternalApiController : ControllerBase
// {
//     private readonly IExternalApiService _apiService;
//     private readonly ILogger<ExternalApiController> _logger;
 
//     public ExternalApiController(IExternalApiService apiService, ILogger<ExternalApiController> logger)
//     {
//         _apiService = apiService;
//         _logger = logger;
//     }
 
//     /// <summary>
//     /// Get real‑time stock quote for the given symbol.
//     /// </summary>
//     /// <param name="symbol">Stock symbol (e.g., SCHW, AAPL)</param>
//     [HttpGet("quote")]
//     public async Task<IActionResult> GetQuote([FromQuery] string symbol)
//     {
//         if (string.IsNullOrWhiteSpace(symbol))
//             return BadRequest("The 'symbol' query parameter is required.");
 
//         try
//         {
//             var quote = await _apiService.GetQuoteAsync(symbol);
//             if (quote == null)
//                 return NotFound($"No data found for symbol '{symbol}'.");
//             return Ok(quote);
//         }
//         catch
//         {
//             _logger.LogError("Failed to retrieve quote for {Symbol}", symbol);
//             return StatusCode(500, "An error occurred while fetching the quote.");
//         }
//     }
// }
 
// using ExternalApiMock.Services;
 
// var builder = WebApplication.CreateBuilder(args);
 
// // Logging
// builder.Logging.ClearProviders();
// builder.Logging.AddConsole();
 
// // Configuration binding is automatic
 
// // Register services
// builder.Services.AddHttpClient<ExternalApiService>();
// builder.Services.AddScoped<IExternalApiService, ExternalApiService>();
 
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen(c =>
// {
//     var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
//     c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
// });
 
// var app = builder.Build();
 
// // Swagger
// if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "External API Layer V1");
//         c.RoutePrefix = string.Empty;
//     });
// }
 
// app.UseAuthorization();
// app.MapControllers();
// app.Run();
 
 using FinhubApiLayer.Models;
using FinhubApiLayer.Services;
 
var builder = WebApplication.CreateBuilder(args);
 
// Configure services
builder.Services.AddControllers();
builder.Services.AddHttpClient<FinnhubService>();
builder.Services.Configure<FinnhubSettings>(builder.Configuration.GetSection("FinnhubSettings"));
 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
var app = builder.Build();
 
// Enable middleware
if (app.Environment.IsDevelopment())
{
        app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Finnhub API Layer V1");
        c.RoutePrefix = string.Empty;
    });
}
 
app.UseAuthorization();
app.MapControllers();
app.Run();