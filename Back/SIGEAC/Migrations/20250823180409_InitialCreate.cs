using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    ID_Usuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Apellido = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DNI = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Contrasena = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rol = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.ID_Usuario);
                });

            migrationBuilder.CreateTable(
                name: "Puestos",
                columns: table => new
                {
                    ID_Puesto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ubicacion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsuarioID = table.Column<int>(type: "int", nullable: true),
                    EquipoID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Puestos", x => x.ID_Puesto);
                    table.ForeignKey(
                        name: "FK_Puestos_Usuarios_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "Usuarios",
                        principalColumn: "ID_Usuario");
                });

            migrationBuilder.CreateTable(
                name: "Equipos",
                columns: table => new
                {
                    ID_Equipo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdentificadorActivo = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PuestoID = table.Column<int>(type: "int", nullable: false),
                    DisponibilidadFisica = table.Column<bool>(type: "bit", nullable: false),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpleadoAsignadoID = table.Column<int>(type: "int", nullable: false),
                    IP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumeroSerie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MAC = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PropiedadActivo = table.Column<bool>(type: "bit", nullable: false),
                    SistemaOperativo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VersionSO = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Soporte = table.Column<bool>(type: "bit", nullable: false),
                    Confidencialidad = table.Column<int>(type: "int", nullable: false),
                    Disponibilidad = table.Column<int>(type: "int", nullable: false),
                    Integridad = table.Column<int>(type: "int", nullable: false),
                    Criticidad = table.Column<int>(type: "int", nullable: false),
                    FechaClasificacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VPNLabs = table.Column<bool>(type: "bit", nullable: false),
                    EscritorioRemoto = table.Column<bool>(type: "bit", nullable: false),
                    Monitor = table.Column<int>(type: "int", nullable: false),
                    Teclado = table.Column<int>(type: "int", nullable: false),
                    Mouse = table.Column<int>(type: "int", nullable: false),
                    Auriculares = table.Column<int>(type: "int", nullable: false),
                    Procesador = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Disco = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RAM = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cifrado = table.Column<bool>(type: "bit", nullable: false),
                    Antivirus = table.Column<bool>(type: "bit", nullable: false),
                    Adicionales = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipos", x => x.ID_Equipo);
                    table.ForeignKey(
                        name: "FK_Equipos_Puestos_PuestoID",
                        column: x => x.PuestoID,
                        principalTable: "Puestos",
                        principalColumn: "ID_Puesto",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipos_Usuarios_EmpleadoAsignadoID",
                        column: x => x.EmpleadoAsignadoID,
                        principalTable: "Usuarios",
                        principalColumn: "ID_Usuario",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EquipoUsuario",
                columns: table => new
                {
                    EquipoID_Equipo = table.Column<int>(type: "int", nullable: false),
                    UsuariosAutorizadosID_Usuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipoUsuario", x => new { x.EquipoID_Equipo, x.UsuariosAutorizadosID_Usuario });
                    table.ForeignKey(
                        name: "FK_EquipoUsuario_Equipos_EquipoID_Equipo",
                        column: x => x.EquipoID_Equipo,
                        principalTable: "Equipos",
                        principalColumn: "ID_Equipo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EquipoUsuario_Usuarios_UsuariosAutorizadosID_Usuario",
                        column: x => x.UsuariosAutorizadosID_Usuario,
                        principalTable: "Usuarios",
                        principalColumn: "ID_Usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "ID_Usuario", "Apellido", "Contrasena", "DNI", "Email", "Nombre", "Rol" },
                values: new object[,]
                {
                    { 1, "Principal", "Admin123", "00000001", "admin@sigeac.com", "Admin", "Administrador" },
                    { 2, "Principal", "RRHH123", "00000002", "rrhh@sigeac.com", "RRHH", "RRHH" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Equipos_EmpleadoAsignadoID",
                table: "Equipos",
                column: "EmpleadoAsignadoID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Equipos_IdentificadorActivo",
                table: "Equipos",
                column: "IdentificadorActivo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Equipos_PuestoID",
                table: "Equipos",
                column: "PuestoID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EquipoUsuario_UsuariosAutorizadosID_Usuario",
                table: "EquipoUsuario",
                column: "UsuariosAutorizadosID_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Puestos_UsuarioID",
                table: "Puestos",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EquipoUsuario");

            migrationBuilder.DropTable(
                name: "Equipos");

            migrationBuilder.DropTable(
                name: "Puestos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
