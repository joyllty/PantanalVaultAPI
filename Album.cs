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
        public string? Artistas { get; set; }
        public string? Generos { get; set; }
        public string? Colaboradores { get; set; }
        public string? DataLancamento { get; set; }
        public int NumeroFaixas { get; set; }
        public string? Duracao { get; set; }
        public string? Gravadora { get; set; }
        public string? Formato { get; set; }
    }
}

