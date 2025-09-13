using Microsoft.EntityFrameworkCore;
using SIGEAC.Data;
using SIGEAC.DTOs;
using SIGEAC.Enums;
using SIGEAC.Models;
using SIGEAC.Services.Interfaces;

namespace SIGEAC.Services.Implementations
{
    public class UsuarioService : IUsuarioService
    {
        private readonly SigeacDbContext _context;

        public UsuarioService(SigeacDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> CrearUsuario(UsuarioCreate request)
        {
            var usuario = new Usuario
            {
                Nombre = request.Nombre,
                Apellido = request.Apellido,
                DNI = request.DNI,
                Email = request.Email,
                Rol = Rol_Usuario_.Empleado,
                Contrasena = "Temporal123"
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<IEnumerable<Usuario>> ListarUsuarios()
        {
            return await _context.Usuarios
                .Where(u => u.Rol == Rol_Usuario_.Empleado)
                .ToListAsync();
        }

        public async Task<Usuario?> ActualizarUsuario(int id, UsuarioUpdate request)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            usuario.Nombre = request.Nombre;
            usuario.Apellido = request.Apellido;
            usuario.DNI = request.DNI;
            usuario.Email = request.Email;
            usuario.Contrasena = request.Contrasena;

            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return null;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> Login(UsuarioLogin request)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Contrasena == request.Contrasena);
        }
    }
}

