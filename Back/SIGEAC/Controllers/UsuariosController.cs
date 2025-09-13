using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace SIGEAC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly SigeacDbContext _context;

        public UsuariosController(SigeacDbContext context)
        {
            _context = context;
        }

        // Crear Usuario (solo Admin / RRHH crean empleados)
        [HttpPost("crear")]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioCreate request)
        {
            var usuario = new Usuario
            {
                Nombre = request.Nombre,
                Apellido = request.Apellido,
                DNI = request.DNI,
                Email = request.Email,
                Rol = Rol_Usuario_.Empleado,        // fijo para empleados
                Contrasena = "Temporal123"          // contraseña automática (placeholder)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

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
        public async Task<ActionResult<IEnumerable<object>>> GetEmpleados()
        {
            var empleados = await _context.Usuarios
                .Where(u => u.Rol == Rol_Usuario_.Empleado)
                .Select(u => new
                {
                    u.ID_Usuario,
                    u.Nombre,
                    u.Apellido,
                    u.DNI,
                    u.Email,
                    u.Rol
                })
                .ToListAsync();

            return Ok(empleados);
        }

        // Editar Usuario
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> ActualizarUsuario(int id, [FromBody] UsuarioUpdate request)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound($"Usuario {id} no encontrado");

            usuario.Nombre = request.Nombre;
            usuario.Apellido = request.Apellido;
            usuario.DNI = request.DNI;
            usuario.Email = request.Email;
            usuario.Contrasena = request.Contrasena;

            await _context.SaveChangesAsync();

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

        // Eliminar Usuario
        [HttpDelete("eliminar/{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound($"Usuario {id} no encontrado");

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

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
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Contrasena == loginRequest.Contrasena);

            if (usuario == null)
            {
                return Unauthorized("Credenciales incorrectas. Verifique su email y contraseña.");
            }

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

