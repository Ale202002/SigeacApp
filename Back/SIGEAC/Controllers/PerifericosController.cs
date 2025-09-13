using Microsoft.AspNetCore.Mvc;
using SIGEAC.DTOs;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerifericoController : ControllerBase
    {
        private readonly IPerifericoService _perifericoService;

        public PerifericoController(IPerifericoService perifericoService)
        {
            _perifericoService = perifericoService;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearPeriferico([FromBody] PerifericoCreate request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var periferico = new Periferico
            {
                Nombre = request.Nombre,
                Tipo = request.Tipo,
                Estado = request.Estado
            };

            var creado = await _perifericoService.CrearPeriferico(periferico);

            return Ok(new
            {
                mensaje = "Periférico creado con éxito",
                periferico = creado
            });
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> EditarPeriferico(int id, [FromBody] PerifericoUpdate request)
        {
            var actualizado = await _perifericoService.EditarPeriferico(id, new Periferico
            {
                Nombre = request.Nombre,
                Tipo = request.Tipo,
                Estado = request.Estado
            });

            if (actualizado == null)
                return NotFound($"Periférico con ID {id} no encontrado");

            return Ok(new
            {
                mensaje = "Periférico actualizado con éxito",
                periferico = actualizado
            });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> ListarPerifericos()
        {
            var perifericos = await _perifericoService.ListarPerifericos();
            return Ok(perifericos);
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarPeriferico(int id)
        {
            var eliminado = await _perifericoService.EliminarPeriferico(id);
            if (!eliminado)
                return NotFound($"Periférico con ID {id} no encontrado");

            return Ok(new { mensaje = "Periférico eliminado con éxito" });
        }
    }
}
