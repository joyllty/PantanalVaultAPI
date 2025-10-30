using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PantanalVaultAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Albuns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Artistas = table.Column<string>(type: "TEXT", nullable: true),
                    Generos = table.Column<string>(type: "TEXT", nullable: true),
                    Colaboradores = table.Column<string>(type: "TEXT", nullable: true),
                    DataLancamento = table.Column<string>(type: "TEXT", nullable: true),
                    NumeroFaixas = table.Column<int>(type: "INTEGER", nullable: false),
                    Duracao = table.Column<string>(type: "TEXT", nullable: true),
                    Gravadora = table.Column<string>(type: "TEXT", nullable: true),
                    Formato = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albuns", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Albuns");
        }
    }
}
