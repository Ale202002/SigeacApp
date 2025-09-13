using Microsoft.AspNetCore.Mvc;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PuestosController : ControllerBase
    {
        private readonly IPuestoService _puestoService;

        public PuestosController(IPuestoService puestoService)
        {
            _puestoService = puestoService;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> Crear([FromBody] PuestoCreate request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var nuevoPuesto = new Puesto
            {
                Ubicacion = request.Ubicacion,
                Estado = request.Estado,
                UsuarioID = request.UsuarioID
            };

            var creado = await _puestoService.CrearPuesto(nuevoPuesto);

            return Ok(new
            {
                mensaje = "Puesto creado exitosamente",
                puesto = creado
            });
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> Editar(int id, [FromBody] PuestoUpdate request)
        {
            var actualizado = await _puestoService.EditarPuesto(id, new Puesto
            {
                Ubicacion = request.Ubicacion,
                Estado = request.Estado,
                UsuarioID = request.UsuarioID
            });

            if (actualizado == null)
                return NotFound("Puesto no encontrado.");

            return Ok(new
            {
                mensaje = "Puesto editado correctamente",
                puesto = actualizado
            });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var puestos = await _puestoService.ListarPuestos();
            return Ok(puestos);
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var eliminado = await _puestoService.EliminarPuesto(id);
            if (!eliminado)
                return NotFound("Puesto no encontrado.");

            return Ok(new { mensaje = "Puesto eliminado con éxito" });
        }
    }
}
