using Microsoft.EntityFrameworkCore;
using PantanalVaultAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pantanal.db"));

var app = builder.Build();

app.Run();

