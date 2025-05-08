using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using JwtAuthApi.Services;

var builder = WebApplication.CreateBuilder(args);

var jwtKey = "ThisIsASuperSecureKey123456789!";

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Allow requests from Angular app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// Configure Authorization
builder.Services.AddAuthorization();

// Register Services
builder.Services.AddSingleton<AuthService>();
builder.Services.AddControllers();

var app = builder.Build();

// Middleware Pipeline
app.UseCors("AllowAngularApp"); // Apply the CORS policy
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();