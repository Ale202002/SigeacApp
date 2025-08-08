using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class UsuarioCreate
    {
        public required string Nombre { get; set; }
        public required string Email { get; set; }
        public required string Contrasena { get; set; }
        public Rol_Usuario_ Rol { get; set; }
    }
}
