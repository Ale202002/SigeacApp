using SIGEAC.Models;
using SIGEAC.DTOs;
using SIGEAC.Services.Implementations;

namespace SIGEAC.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario?> CrearUsuario(UsuarioCreate request);
        Task<IEnumerable<Usuario>> ListarUsuarios();
        Task<Usuario?> ActualizarUsuario(int id, UsuarioUpdate request);
        Task<Usuario?> EliminarUsuario(int id);
        Task<Usuario?> Login(UsuarioLogin request);
    }
}
