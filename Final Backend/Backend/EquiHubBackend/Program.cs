// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// };
// using EquiHubBackend.Models;
// using EquiHubBackend.Services;
// var builder = WebApplication.CreateBuilder(args);
 
// // Register services
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// builder.Services.AddSingleton<FinnhubService>();
// builder.Services.AddSingleton<VestingService>();
 
// var app = builder.Build();
// if (app.Environment.IsDevelopment())
// {
//     app.UseDeveloperExceptionPage();
// }
// app.UseSwagger();
// app.UseSwaggerUI();
 
// app.UseAuthorization();
// app.MapControllers();
// app.Run();
using EquiHubBackend.Services;
using EquiHubBackend.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
 
var builder = WebApplication.CreateBuilder(args);
 
// 1) Register controllers + NewtonsoftJson (if needed)
builder.Services.AddControllers()
       .AddNewtonsoftJson();
 
// 2) Enable Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
// 3) Register FinnhubService as a typed client
builder.Services.AddHttpClient<FinnhubService>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["MockApi:BaseUrl"]);
// e.g. "https://localhost:5070"
});  // <-- registers IHttpClientFactory + HttpClient for FinnhubService :contentReference[oaicite:4]{index=4}
 
// 4) Register your VestingService (scoped or transient)
builder.Services.AddScoped<VestingService>();
 builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
 if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EquiHubBackend API V1");
        c.RoutePrefix = string.Empty; // Access Swagger at http://localhost:5001
    });
}

// 5) Middleware pipeline
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowFrontend");
//app.UseHttpsRedirection();
app.MapControllers();
app.Run();