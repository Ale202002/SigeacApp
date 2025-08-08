using System.ComponentModel.DataAnnotations;
using SIGEAC.Models;


namespace SIGEAC.Models
{
    public class Usuario
    {
        [Key]
        public int ID_Usuario { get; set; }
        public string? Nombre { get; set; }
        public Rol_Usuario_ Rol { get; set; } //usamos rol_usuario para verif que el rol sea uno de lo permitidos
        public string? Email { get; set; }
        public string? Contrasena { get; set; }
    }

}
