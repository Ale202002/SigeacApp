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

        // Crear Usuario (Admin / RRHH crean Empleado)
        [HttpPost("crear")]
        public async Task<IActionResult> CrearUsuario([FromBody] UsuarioCreate request)
        {
            var usuario = new Usuario
            {
                Nombre = request.Nombre,
                Apellido = request.Apellido,
                DNI = request.DNI,
                Email = request.Email,
                Rol = Rol_Usuario_.Empleado,   // fijo para empleados creados desde RRHH/Admin
                Contrasena = "Temporal123"     // contraseña automática (placeholder)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok($"Usuario {usuario.Nombre} {usuario.Apellido} creado con éxito");
        }

        // Listar solo Empleados (excluye Admin y RRHH)
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

            return Ok($"Usuario {usuario.Nombre} {usuario.Apellido} actualizado con éxito");
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

            return Ok($"Usuario {usuario.Nombre} {usuario.Apellido} eliminado con éxito");
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLogin request)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Contrasena == request.Contrasena);

            if (usuario == null)
                return Unauthorized("Credenciales inválidas");

            return Ok("Inicio de sesión exitoso");
        }
    }
}
