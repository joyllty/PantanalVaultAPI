using Microsoft.EntityFrameworkCore;
using PantanalVaultAPI;

var builder = WebApplication.CreateBuilder(args);

// ADICIONAR POLÍTICA DE CORS
//builder.Services.AddCors(options =>
//{
  //  options.AddDefaultPolicy(policy =>
//    {
        //policy.AllowAnyOrigin()
      //  .AllowAnyHeader()
    //    .AllowAnyMethod();
  //  });
//});

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pantanal.db"));

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

// ADICIONAR USO DO CORS

// GET all
app.MapGet("/albuns", async (AppDbContext db) =>
{
    return await db.Albuns.ToListAsync();
});

// GET ID
app.MapGet("/albuns/{id}", async (int id, AppDbContext db) =>
{
    var album = await db.Albuns.FindAsync(id);  
    return album is not null ? Results.Ok(album) : Results.NotFound("Álbum não encontrado!");
});

// POST
app.MapPost("/albuns", async (Album album, AppDbContext db) =>
{
    db.Albuns.Add(album);
    await db.SaveChangesAsync();
    return Results.Created($"/albuns/{album.Id}", album);
});

// PUT
app.MapPut("/albuns/{id}", async (int id, Album albumAtualizado, AppDbContext db) =>
{
    var album = await db.Albuns.FindAsync(id);
    if (album is null) return Results.NotFound("Álbum não encontrado!");

    album.Nome = albumAtualizado.Nome;
    album.Artistas = albumAtualizado.Artistas;
    album.Generos = albumAtualizado.Generos;
    if (albumAtualizado.Colaboradores is not null) album.Colaboradores = albumAtualizado.Colaboradores;
    album.DataLancamento = albumAtualizado.DataLancamento;
    album.NumeroFaixas = albumAtualizado.NumeroFaixas;
    album.Duracao = albumAtualizado.Duracao;
    album.Gravadora = albumAtualizado.Gravadora;
    album.Formato = albumAtualizado.Formato;

    await db.SaveChangesAsync();
    return Results.Ok(album);
});

// PATCH
app.MapPatch("/albuns/{id}", async (int id, Album albumAlteracoes, AppDbContext db) =>
{
    var album = await db.Albuns.FindAsync(id);
    if (album is null)
    {
        return Results.NotFound();
    }

    if (albumAlteracoes.Nome is not null) album.Nome = albumAlteracoes.Nome;
    if (albumAlteracoes.Artistas is not null) album.Artistas = albumAlteracoes.Artistas;
    if (albumAlteracoes.Generos is not null) album.Generos = albumAlteracoes.Generos;
    if (albumAlteracoes.Colaboradores is not null) album.Colaboradores = albumAlteracoes.Colaboradores;
    if (albumAlteracoes.DataLancamento is not null) album.DataLancamento = albumAlteracoes.DataLancamento;
    if (albumAlteracoes.NumeroFaixas != 0) album.NumeroFaixas = albumAlteracoes.NumeroFaixas;
    if (albumAlteracoes.Duracao is not null) album.Duracao = albumAlteracoes.Duracao;
    if (albumAlteracoes.Gravadora is not null) album.Gravadora = albumAlteracoes.Gravadora;
    if (albumAlteracoes.Formato is not null) album.Formato = albumAlteracoes.Formato;

    await db.SaveChangesAsync();
    return Results.Ok(album);
});


// DELETE
app.MapDelete("/albuns/{id}", async (int id, AppDbContext db) =>
{
    var album = await db.Albuns.FindAsync(id);
    if (album is null) return Results.NotFound("Álbum não encontrado!");

    db.Albuns.Remove(album);
    await db.SaveChangesAsync();
    return Results.NoContent();
});



app.Run();