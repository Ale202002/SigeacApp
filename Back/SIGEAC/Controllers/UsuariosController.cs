using Microsoft.AspNetCore.Mvc;
using SIGEAC.DTOs;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioCreate request)
        {
            var usuario = await _usuarioService.CrearUsuario(request);
            if (usuario == null) return BadRequest("Error al crear el usuario");

            return Ok(new
            {
                mensaje = "Usuario creado con éxito",
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre,
                    usuario.Apellido,
                    usuario.DNI,
                    usuario.Email
                }
            });
        }

        [HttpGet("listar")]
        public async Task<IActionResult> GetEmpleados()
        {
            var empleados = await _usuarioService.ListarUsuarios();
            return Ok(empleados.Select(u => new
            {
                u.ID_Usuario,
                u.Nombre,
                u.Apellido,
                u.DNI,
                u.Email,
                u.Rol
            }));
        }

        [HttpPut("editar/{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, [FromBody] UsuarioUpdate request)
        {
            var usuario = await _usuarioService.ActualizarUsuario(id, request);
            if (usuario == null) return NotFound($"Usuario {id} no encontrado");

            return Ok(new
            {
                mensaje = "Usuario actualizado con éxito",
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre,
                    usuario.Apellido,
                    usuario.DNI,
                    usuario.Email
                }
            });
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var usuario = await _usuarioService.EliminarUsuario(id);
            if (usuario == null) return NotFound($"Usuario {id} no encontrado");

            return Ok(new
            {
                mensaje = "Usuario eliminado con éxito",
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre,
                    usuario.Apellido,
                    usuario.DNI,
                    usuario.Email
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLogin loginRequest)
        {
            var usuario = await _usuarioService.Login(loginRequest);
            if (usuario == null)
                return Unauthorized("Credenciales incorrectas. Verifique su email y contraseña.");

            return Ok(new
            {
                mensaje = "Inicio de sesión exitoso",
                usuario = new
                {
                    usuario.ID_Usuario,
                    usuario.Nombre,
                    usuario.Email,
                    usuario.Rol
                }
            });
        }
    }
}
