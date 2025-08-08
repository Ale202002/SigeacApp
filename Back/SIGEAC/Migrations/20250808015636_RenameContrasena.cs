using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class RenameContrasena : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contraseña",
                table: "Usuarios",
                newName: "Contrasena");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Contrasena",
                table: "Usuarios",
                newName: "Contraseña");
        }
    }
}
