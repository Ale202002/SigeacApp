using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquiposController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public EquiposController(SigeacDbContext context)
        {
            _context = context;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> Crear([FromBody] EquipoCreate request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var equipo = new Equipo
            {
                IdentificadorActivo = request.IdentificadorActivo,
                PuestoID = request.PuestoID,
                DisponibilidadFisica = request.DisponibilidadFisica,
                Area = request.Area,
                EmpleadoAsignadoID = request.EmpleadoAsignadoID,
                IP = request.IP,
                NumeroSerie = request.NumeroSerie,
                MAC = request.MAC,
                Tipo = request.Tipo,
                PropiedadActivo = request.PropiedadActivo,
                SistemaOperativo = request.SistemaOperativo,
                VersionSO = request.VersionSO,
                Soporte = request.Soporte,
                Confidencialidad = request.Confidencialidad,
                Disponibilidad = request.Disponibilidad,
                Integridad = request.Integridad,
                Criticidad = request.Criticidad,
                FechaClasificacion = request.FechaClasificacion,
                VPNLabs = request.VPNLabs,
                EscritorioRemoto = request.EscritorioRemoto,
                Cifrado = request.Cifrado,
                ContrasenaCifrado = request.ContrasenaCifrado,
                Antivirus = request.Antivirus,
                Adicionales = request.Adicionales,
                UsuariosAutorizados = request.UsuariosAutorizadosIDs != null
                    ? await _context.Usuarios.Where(u => request.UsuariosAutorizadosIDs.Contains(u.ID_Usuario)).ToListAsync()
                    : new List<Usuario>()
            };

            _context.Equipos.Add(equipo);
            await _context.SaveChangesAsync();

            return Ok("Equipo creado exitosamente.");
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] EquipoUpdate request)
        {
            if (id != request.ID_Equipo)
                return BadRequest("El ID del equipo no coincide.");

            var equipo = await _context.Equipos
                .Include(e => e.UsuariosAutorizados)
                .FirstOrDefaultAsync(e => e.ID_Equipo == id);

            if (equipo == null)
                return NotFound("Equipo no encontrado.");

            equipo.IdentificadorActivo = request.IdentificadorActivo;
            equipo.PuestoID = request.PuestoID;
            equipo.DisponibilidadFisica = request.DisponibilidadFisica;
            equipo.Area = request.Area;
            equipo.EmpleadoAsignadoID = request.EmpleadoAsignadoID;
            equipo.IP = request.IP;
            equipo.NumeroSerie = request.NumeroSerie;
            equipo.MAC = request.MAC;
            equipo.Tipo = request.Tipo;
            equipo.PropiedadActivo = request.PropiedadActivo;
            equipo.SistemaOperativo = request.SistemaOperativo;
            equipo.VersionSO = request.VersionSO;
            equipo.Soporte = request.Soporte;
            equipo.Confidencialidad = request.Confidencialidad;
            equipo.Disponibilidad = request.Disponibilidad;
            equipo.Integridad = request.Integridad;
            equipo.Criticidad = request.Criticidad;
            equipo.FechaClasificacion = request.FechaClasificacion;
            equipo.VPNLabs = request.VPNLabs;
            equipo.EscritorioRemoto = request.EscritorioRemoto;
            equipo.Cifrado = request.Cifrado;
            equipo.ContrasenaCifrado = request.ContrasenaCifrado;
            equipo.Antivirus = request.Antivirus;
            equipo.Adicionales = request.Adicionales;

            if (request.UsuariosAutorizadosIDs != null)
            {
                equipo.UsuariosAutorizados = await _context.Usuarios
                    .Where(u => request.UsuariosAutorizadosIDs.Contains(u.ID_Usuario))
                    .ToListAsync();
            }

            await _context.SaveChangesAsync();
            return Ok("Equipo editado correctamente.");
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var equipos = await _context.Equipos
                .Include(e => e.Puesto)
                .Include(e => e.EmpleadoAsignado)
                .Include(e => e.UsuariosAutorizados)
                .Include(e => e.Componentes)
                .ToListAsync();

            return Ok(equipos);
        }

      
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);
            if (equipo == null)
                return NotFound("Equipo no encontrado.");

            _context.Equipos.Remove(equipo);
            await _context.SaveChangesAsync();

            return Ok("Equipo eliminado correctamente.");
        }

        [HttpPost("asignar-componente")]
        public async Task<IActionResult> AsignarComponente(int equipoId, int componenteId)
        {
            var equipo = await _context.Equipos
                .Include(e => e.Componentes)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);

            if (equipo == null)
                return NotFound($"Equipo {equipoId} no encontrado.");

            var componente = await _context.Componentes.FindAsync(componenteId);
            if (componente == null)
                return NotFound($"Componente {componenteId} no encontrado.");

            if (componente.EquipoID != null)
                return BadRequest("Este componente ya está asignado a otro equipo.");

            // Asignar
            componente.EquipoID = equipoId;
            equipo.Componentes.Add(componente);

            await _context.SaveChangesAsync();

            return Ok($"Componente {componente.Nombre} asignado al equipo {equipo.IdentificadorActivo}");
        }

    }
}