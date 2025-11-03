using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PantanalVaultAPI.Migrations
{
    /// <inheritdoc />
    public partial class adicionapropriedadefaixas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Faixas",
                table: "Albuns",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Faixas",
                table: "Albuns");
        }
    }
}
