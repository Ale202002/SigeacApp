using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.Models;
using System.Threading.Tasks;

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

