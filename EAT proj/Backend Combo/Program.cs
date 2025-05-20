// Program.cs

using EquiHubBackend.Services;
using EquityManagement.Models;
using EquityManagement.Services;
 
var builder = WebApplication.CreateBuilder(args);
 
// Add services to the container

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
 
// Register services

builder.Services.AddScoped<IDataService, DataService>();
builder.Services.AddScoped<IFinnhubService, FinnhubService>();
builder.Services.AddScoped<IExternalApiService, FinhubService>();
builder.Services.AddScoped<IEsopService, EsopService>();
builder.Services.AddScoped<IRsuService, RsuService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddHttpClient<FinhubService>();
builder.Services.AddScoped<IVestingServices, VestingService>();
builder.Services.Configure<FinhubSettings>(builder.Configuration.GetSection("FinhubSettings"));


builder.Services.AddHttpClient();
 
// Configure CORS

builder.Services.AddCors(options =>

{

    options.AddPolicy("AllowAngularApp", policy =>

    {

        policy.WithOrigins("http://localhost:4200") // Default Angular dev server port

              .AllowAnyMethod()

              .AllowAnyHeader();

    });

});
 
var app = builder.Build();
 
// Ensure data directory exists

var dataDirectory = Path.Combine(app.Environment.ContentRootPath, "Data");

if (!Directory.Exists(dataDirectory))

{

    Directory.CreateDirectory(dataDirectory);

}
 
// Write db.json if it doesn't exist

var dbFilePath = Path.Combine(dataDirectory, "db.json");

if (!File.Exists(dbFilePath))

{

    // This is the JSON data you provided

    var jsonData = @"[

    {

        ""emp_id"": ""67890"",

        ""name"": ""Jane Smith"",

        ""email"": ""janesmith@example.com"",

        ""pwd"": ""securepass123"",

        ""taxes"": {

            ""federal_tax_rate"": 18,

            ""state_tax_rate"": 6,

            ""local_tax_rate"": 3

        },

        ""awards"": [

            {

                ""type"": ""rsu"",

                ""symbols"": [

                    {

                        ""symbol"": ""SCHW"",

                        ""award_price"": 80.19,

                        ""granted"": 75,

                        ""grant_date"": ""2023-03-15""

                    }

                ]

            },

            {

                ""type"": ""esop"",

                ""symbols"": [

                    {

                        ""symbol"": ""SCHW"",

                        ""award_price"": 80.19,

                        ""discounted_price"": 20,

                        ""granted"": 50,

                        ""grant_date"": ""2023-02-20"",

                        ""exercisable"": 20

                    }

                ]

            }

        ]

    },

    {

        ""emp_id"": ""11223"",

        ""name"": ""Alex Johnson"",

        ""email"": ""alexjohnson@example.com"",

        ""pwd"": ""mypassword321"",

        ""taxes"": {

            ""federal_tax_rate"": 22,

            ""state_tax_rate"": 4,

            ""local_tax_rate"": 1

        },

        ""awards"": [

            {

                ""type"": ""rsu"",

                ""symbols"": [

                    {

                        ""symbol"": ""SCHW"",

                        ""award_price"": 80.19,

                        ""granted"": 40,

                        ""grant_date"": ""2023-08-01""

                    }

                ]

            },

            {

                ""type"": ""esop"",

                ""symbols"": [

                    {

                        ""symbol"": ""SCHW"",

                        ""award_price"": 80.19,

                        ""discounted_price"": 20,

                        ""granted"": 60,

                        ""grant_date"": ""2023-11-05"",

                        ""exercisable"": 15

                    }

                ]

            }

        ]

    }

]";

    File.WriteAllText(dbFilePath, jsonData);

}
 
// Configure the HTTP request pipeline

if (app.Environment.IsDevelopment())

{

    app.UseSwagger();

    app.UseSwaggerUI();

}
 
app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();
 
app.Run();
 