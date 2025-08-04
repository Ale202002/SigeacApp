using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class CrearPuesto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Puestos",
                columns: table => new
                {
                    ID_Puesto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpleadoID = table.Column<int>(type: "int", nullable: true),
                    EquipoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Puestos", x => x.ID_Puesto);
                    table.ForeignKey(
                        name: "FK_Puestos_Empleados_EmpleadoID",
                        column: x => x.EmpleadoID,
                        principalTable: "Empleados",
                        principalColumn: "ID_Empleado");
                    table.ForeignKey(
                        name: "FK_Puestos_Equipos_EquipoID",
                        column: x => x.EquipoID,
                        principalTable: "Equipos",
                        principalColumn: "ID_Equipo");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Puestos_EmpleadoID",
                table: "Puestos",
                column: "EmpleadoID");

            migrationBuilder.CreateIndex(
                name: "IX_Puestos_EquipoID",
                table: "Puestos",
                column: "EquipoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Puestos");
        }
    }
}
