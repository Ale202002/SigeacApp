using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class CrearTablasComponentesPerifericosEquipos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Componentes_Equipos_EquipoID",
                table: "Componentes");

            migrationBuilder.CreateTable(
                name: "Perifericos",
                columns: table => new
                {
                    ID_Periferico = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EquipoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perifericos", x => x.ID_Periferico);
                    table.ForeignKey(
                        name: "FK_Perifericos_Equipos_EquipoID",
                        column: x => x.EquipoID,
                        principalTable: "Equipos",
                        principalColumn: "ID_Equipo",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Perifericos_EquipoID",
                table: "Perifericos",
                column: "EquipoID");

            migrationBuilder.AddForeignKey(
                name: "FK_Componentes_Equipos_EquipoID",
                table: "Componentes",
                column: "EquipoID",
                principalTable: "Equipos",
                principalColumn: "ID_Equipo",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Componentes_Equipos_EquipoID",
                table: "Componentes");

            migrationBuilder.DropTable(
                name: "Perifericos");

            migrationBuilder.AddForeignKey(
                name: "FK_Componentes_Equipos_EquipoID",
                table: "Componentes",
                column: "EquipoID",
                principalTable: "Equipos",
                principalColumn: "ID_Equipo");
        }
    }
}
