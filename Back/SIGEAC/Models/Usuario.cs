using System.ComponentModel.DataAnnotations;
using SIGEAC.Models;


namespace SIGEAC.Models
{
    public class Usuario
    {
        [Key]
        public int ID_Usuario { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Nombre { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Apellido { get; set; }

        [Required]
        [MaxLength(20)]
        public required string DNI { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public required string Email { get; set; }

        [Required]
        public required string Contrasena { get; set; }

        [Required]
        public Rol_Usuario_ Rol { get; set; }  // Admin, RRHH, Empleado
    }

}
