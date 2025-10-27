using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;

namespace PantanalVaultAPI
{
    public class Album
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public List<string>? Artistas { get; set; }
        public List<string>? Generos { get; set; }
        public List<string>? Colaboradores { get; set; }
        public DateOnly DataLancamento { get; set; }
        public int NumeroFaixas { get; set; }
        public TimeSpan Duracao { get; set; }
        public string? Gravadora { get; set; }
        public string? Formato { get; set; }
        
        // Construtor para inicializar as listas (boa prática)
        public Album()
        {
            Artistas = new List<string>();
            Generos = new List<string>();
            Colaboradores = new List<string>();
        }
    }
}
