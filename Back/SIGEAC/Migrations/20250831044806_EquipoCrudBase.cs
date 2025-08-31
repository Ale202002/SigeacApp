using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class EquipoCrudBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Auriculares",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Disco",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Monitor",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Mouse",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Procesador",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "RAM",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Teclado",
                table: "Equipos");

            migrationBuilder.AlterColumn<bool>(
                name: "Tipo",
                table: "Equipos",
                type: "bit",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Integridad",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Disponibilidad",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Criticidad",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Confidencialidad",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "ContrasenaCifrado",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContrasenaCifrado",
                table: "Equipos");

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<int>(
                name: "Integridad",
                table: "Equipos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Disponibilidad",
                table: "Equipos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Criticidad",
                table: "Equipos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Confidencialidad",
                table: "Equipos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Auriculares",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Disco",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Monitor",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Mouse",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Procesador",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RAM",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Teclado",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
