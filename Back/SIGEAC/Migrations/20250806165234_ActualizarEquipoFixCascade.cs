using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SIGEAC.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarEquipoFixCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Puestos_Equipos_EquipoID",
                table: "Puestos");

            migrationBuilder.DropIndex(
                name: "IX_Puestos_EquipoID",
                table: "Puestos");

            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Equipos",
                newName: "VersionSO");

            migrationBuilder.RenameColumn(
                name: "Estado",
                table: "Equipos",
                newName: "SistemaOperativo");

            migrationBuilder.AddColumn<string>(
                name: "Adicionales",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Antivirus",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Auriculares",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Cifrado",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Confidencialidad",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Criticidad",
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
                name: "Disponibilidad",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "DisponibilidadFisica",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "EmpleadoAsignadoID",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "EscritorioRemoto",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaClasificacion",
                table: "Equipos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "IP",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IdentificadorActivo",
                table: "Equipos",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Integridad",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MAC",
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
                name: "NumeroSerie",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Procesador",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "PropiedadActivo",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PuestoID",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RAM",
                table: "Equipos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Soporte",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Teclado",
                table: "Equipos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "VPNLabs",
                table: "Equipos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "EmpleadoEquipo",
                columns: table => new
                {
                    EquipoID_Equipo = table.Column<int>(type: "int", nullable: false),
                    UsuariosAutorizadosID_Empleado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpleadoEquipo", x => new { x.EquipoID_Equipo, x.UsuariosAutorizadosID_Empleado });
                    table.ForeignKey(
                        name: "FK_EmpleadoEquipo_Empleados_UsuariosAutorizadosID_Empleado",
                        column: x => x.UsuariosAutorizadosID_Empleado,
                        principalTable: "Empleados",
                        principalColumn: "ID_Empleado",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmpleadoEquipo_Equipos_EquipoID_Equipo",
                        column: x => x.EquipoID_Equipo,
                        principalTable: "Equipos",
                        principalColumn: "ID_Equipo",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_EmpleadoEquipo_UsuariosAutorizadosID_Empleado",
                table: "EmpleadoEquipo",
                column: "UsuariosAutorizadosID_Empleado");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipos_Empleados_EmpleadoAsignadoID",
                table: "Equipos",
                column: "EmpleadoAsignadoID",
                principalTable: "Empleados",
                principalColumn: "ID_Empleado",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipos_Puestos_PuestoID",
                table: "Equipos",
                column: "PuestoID",
                principalTable: "Puestos",
                principalColumn: "ID_Puesto",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipos_Empleados_EmpleadoAsignadoID",
                table: "Equipos");

            migrationBuilder.DropForeignKey(
                name: "FK_Equipos_Puestos_PuestoID",
                table: "Equipos");

            migrationBuilder.DropTable(
                name: "EmpleadoEquipo");

            migrationBuilder.DropIndex(
                name: "IX_Equipos_EmpleadoAsignadoID",
                table: "Equipos");

            migrationBuilder.DropIndex(
                name: "IX_Equipos_IdentificadorActivo",
                table: "Equipos");

            migrationBuilder.DropIndex(
                name: "IX_Equipos_PuestoID",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Adicionales",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Antivirus",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Area",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Auriculares",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Cifrado",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Confidencialidad",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Criticidad",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Disco",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Disponibilidad",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "DisponibilidadFisica",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "EmpleadoAsignadoID",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "EscritorioRemoto",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "FechaClasificacion",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "IP",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "IdentificadorActivo",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Integridad",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "MAC",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Monitor",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Mouse",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "NumeroSerie",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Procesador",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "PropiedadActivo",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "PuestoID",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "RAM",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Soporte",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "Teclado",
                table: "Equipos");

            migrationBuilder.DropColumn(
                name: "VPNLabs",
                table: "Equipos");

            migrationBuilder.RenameColumn(
                name: "VersionSO",
                table: "Equipos",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "SistemaOperativo",
                table: "Equipos",
                newName: "Estado");

            migrationBuilder.CreateIndex(
                name: "IX_Puestos_EquipoID",
                table: "Puestos",
                column: "EquipoID");

            migrationBuilder.AddForeignKey(
                name: "FK_Puestos_Equipos_EquipoID",
                table: "Puestos",
                column: "EquipoID",
                principalTable: "Equipos",
                principalColumn: "ID_Equipo");
        }
    }
}
