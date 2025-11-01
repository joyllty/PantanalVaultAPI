using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PantanalVaultAPI.Migrations
{
    /// <inheritdoc />
    public partial class removepropriedadecolaboradores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colaboradores",
                table: "Albuns");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Colaboradores",
                table: "Albuns",
                type: "TEXT",
                nullable: true);
        }
    }
}
