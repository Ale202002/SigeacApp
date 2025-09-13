using Microsoft.AspNetCore.Mvc;
using SIGEAC.DTOs;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComponenteController : ControllerBase
    {
        private readonly IComponenteService _componenteService;

        public ComponenteController(IComponenteService componenteService)
        {
            _componenteService = componenteService;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearComponente([FromBody] ComponenteCreate request)
        {
            var componente = await _componenteService.CrearComponente(request);

            return Ok(new
            {
                mensaje = "Componente creado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> EditarComponente(int id, [FromBody] ComponenteUpdate request)
        {
            var componente = await _componenteService.EditarComponente(id, request);
            if (componente == null) return NotFound($"Componente con ID {id} no encontrado");

            return Ok(new
            {
                mensaje = "Componente actualizado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> ListarComponentes()
        {
            var componentes = await _componenteService.ListarComponentes();
            return Ok(componentes);
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarComponente(int id)
        {
            var componente = await _componenteService.EliminarComponente(id);
            if (componente == null) return NotFound($"Componente con ID {id} no encontrado");

            return Ok(new
            {
                mensaje = "Componente eliminado con éxito",
                componente = new
                {
                    componente.ID_Componente,
                    componente.Nombre,
                    componente.Tipo,
                    componente.Estado
                }
            });
        }
    }
}
