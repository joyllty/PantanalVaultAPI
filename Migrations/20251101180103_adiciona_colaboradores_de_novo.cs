using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PantanalVaultAPI.Migrations
{
    /// <inheritdoc />
    public partial class adicionacolaboradoresdenovo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Colaboradores",
                table: "Albuns",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colaboradores",
                table: "Albuns");
        }
    }
}
