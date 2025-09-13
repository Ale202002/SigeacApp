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

        // Crear Equipo
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

            return Ok(new
            {
                mensaje = "Equipo creado exitosamente",
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo,
                    equipo.Area,
                    equipo.IP,
                    equipo.NumeroSerie,
                    equipo.MAC,
                    equipo.SistemaOperativo,
                    equipo.VersionSO
                }
            });
        }

        // Editar Equipo
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

            return Ok(new
            {
                mensaje = "Equipo editado correctamente",
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo,
                    equipo.Area,
                    equipo.IP,
                    equipo.NumeroSerie,
                    equipo.MAC,
                    equipo.SistemaOperativo,
                    equipo.VersionSO
                }
            });
        }


        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var equipos = await _context.Equipos
                .Include(e => e.Puesto)
                .Include(e => e.EmpleadoAsignado)
                .Include(e => e.UsuariosAutorizados)
                .Include(e => e.Componentes)
                .Include(e => e.Perifericos)
                .ToListAsync();

            return Ok(equipos);
        }


        // Eliminar Equipo
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);
            if (equipo == null)
                return NotFound("Equipo no encontrado.");

            _context.Equipos.Remove(equipo);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Equipo eliminado con éxito",
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo,
                    equipo.Area,
                    equipo.IP,
                    equipo.NumeroSerie,
                    equipo.MAC,
                    equipo.SistemaOperativo,
                    equipo.VersionSO
                }
            });
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

            return Ok(new
            {
                mensaje = $"Componente asignado correctamente",
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo,
                    equipo.Area,
                    equipo.IP
                },
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
        }

        // Desasignar Componente de un Equipo
        [HttpPost("desasignar-componente")]
        public async Task<IActionResult> DesasignarComponente(int equipoId, int componenteId)
        {
            var equipo = await _context.Equipos
                .Include(e => e.Componentes)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);

            if (equipo == null)
                return NotFound($"Equipo {equipoId} no encontrado.");

            var componente = equipo.Componentes.FirstOrDefault(c => c.ID_Componente == componenteId);
            if (componente == null)
                return NotFound($"El componente {componenteId} no está asignado a este equipo.");

            // Quitar asignación
            componente.EquipoID = null;
            equipo.Componentes.Remove(componente);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Componente desasignado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                },
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo
                }
            });
        }


        // Asignar Periférico a un Equipo
        [HttpPost("asignar-periferico")]
        public async Task<IActionResult> AsignarPeriferico(int equipoId, int perifericoId)
        {
            var equipo = await _context.Equipos
                .Include(e => e.Perifericos)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);

            if (equipo == null)
                return NotFound($"Equipo {equipoId} no encontrado.");

            var periferico = await _context.Perifericos.FindAsync(perifericoId);
            if (periferico == null)
                return NotFound($"Periférico {perifericoId} no encontrado.");

            if (periferico.EquipoID != null)
                return BadRequest("Este periférico ya está asignado a otro equipo.");

            // Asignar
            periferico.EquipoID = equipoId;
            equipo.Perifericos.Add(periferico);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Periférico asignado correctamente",
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo,
                    equipo.Area,
                    equipo.IP
                },
                periferico = new
                {
                    periferico.ID_Periferico,
                    periferico.Nombre,
                    periferico.Tipo,
                    periferico.Estado
                }
            });
        }

        // Desasignar Periférico de un Equipo
        [HttpPost("desasignar-periferico")]
        public async Task<IActionResult> DesasignarPeriferico(int equipoId, int perifericoId)
        {
            var equipo = await _context.Equipos
                .Include(e => e.Perifericos)
                .FirstOrDefaultAsync(e => e.ID_Equipo == equipoId);

            if (equipo == null)
                return NotFound($"Equipo {equipoId} no encontrado.");

            var periferico = equipo.Perifericos.FirstOrDefault(p => p.ID_Periferico == perifericoId);
            if (periferico == null)
                return NotFound($"El periférico {perifericoId} no está asignado a este equipo.");

            // Quitar asignación
            periferico.EquipoID = null;
            equipo.Perifericos.Remove(periferico);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Periférico desasignado con éxito",
                periferico = new
                {
                    periferico.ID_Periferico,
                    periferico.Nombre,
                    periferico.Tipo,
                    periferico.Estado
                },
                equipo = new
                {
                    equipo.ID_Equipo,
                    equipo.IdentificadorActivo
                }
            });
        }


    }
}