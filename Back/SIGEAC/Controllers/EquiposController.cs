using Microsoft.AspNetCore.Mvc;
using SIGEAC.DTOs;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquiposController : ControllerBase
    {
        private readonly IEquipoService _equipoService;

        public EquiposController(IEquipoService equipoService)
        {
            _equipoService = equipoService;
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
                Adicionales = request.Adicionales
            };

            var creado = await _equipoService.CrearEquipo(equipo, request.UsuariosAutorizadosIDs);

            return Ok(new { mensaje = "Equipo creado exitosamente", equipo = creado });
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] EquipoUpdate request)
        {
            var actualizado = await _equipoService.EditarEquipo(id, new Equipo
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
                Adicionales = request.Adicionales
            }, request.UsuariosAutorizadosIDs);

            if (actualizado == null)
                return NotFound($"Equipo con ID {id} no encontrado");

            return Ok(new { mensaje = "Equipo editado correctamente", equipo = actualizado });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var equipos = await _equipoService.ListarEquipos();
            return Ok(equipos);
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var eliminado = await _equipoService.EliminarEquipo(id);
            if (!eliminado)
                return NotFound("Equipo no encontrado");

            return Ok(new { mensaje = "Equipo eliminado con éxito" });
        }

        [HttpPost("asignar-componente")]
        public async Task<IActionResult> AsignarComponente(int equipoId, int componenteId)
        {
            var (equipo, componente, error) = await _equipoService.AsignarComponente(equipoId, componenteId);
            if (error != null) return BadRequest(error);
            return Ok(new { mensaje = "Componente asignado correctamente", equipo, componente });
        }

        [HttpPost("desasignar-componente")]
        public async Task<IActionResult> DesasignarComponente(int equipoId, int componenteId)
        {
            var (equipo, componente, error) = await _equipoService.DesasignarComponente(equipoId, componenteId);
            if (error != null) return BadRequest(error);
            return Ok(new { mensaje = "Componente desasignado con éxito", equipo, componente });
        }

        [HttpPost("asignar-periferico")]
        public async Task<IActionResult> AsignarPeriferico(int equipoId, int perifericoId)
        {
            var (equipo, periferico, error) = await _equipoService.AsignarPeriferico(equipoId, perifericoId);
            if (error != null) return BadRequest(error);
            return Ok(new { mensaje = "Periférico asignado correctamente", equipo, periferico });
        }

        [HttpPost("desasignar-periferico")]
        public async Task<IActionResult> DesasignarPeriferico(int equipoId, int perifericoId)
        {
            var (equipo, periferico, error) = await _equipoService.DesasignarPeriferico(equipoId, perifericoId);
            if (error != null) return BadRequest(error);
            return Ok(new { mensaje = "Periférico desasignado con éxito", equipo, periferico });
        }
    }
}
