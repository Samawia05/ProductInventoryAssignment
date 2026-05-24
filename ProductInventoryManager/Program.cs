using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// 1. Configure MongoDB Database Connection Settings
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    return new MongoClient("mongodb://localhost:27017");
});

builder.Services.AddScoped(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase("InventoryDB"); 
});

// 2. Add CORS Policy Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. Add controllers service layer
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

// Turn on the CORS policy
app.UseCors("AllowFrontend");

app.UseAuthorization();

// Map API endpoint routes automatically
app.MapControllers();

app.Run();