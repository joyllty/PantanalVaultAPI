using Microsoft.EntityFrameworkCore;
using PantanalVaultAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pantanal.db"));

var app = builder.Build();

// GET

// POST
app.MapPost("/albuns", async (Album album, AppDbContext db) =>
{
    db.Albuns.Add(album);
    await db.SaveChangesAsync();
    return Results.Created($"/albuns/{album.Id}", album);
});

// PUT

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




app.Run();