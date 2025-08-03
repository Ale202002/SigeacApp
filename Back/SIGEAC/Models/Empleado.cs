using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SIGEAC.Models
{
    public class Empleado
    {
        [Key]
        public int ID_Empleado { get; set; }

        [Required]
        public string NombreCompleto { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        public string CorreoElectronico { get; set; }

        // Relación con Usuario
        [Required]
        public int UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }
    }
}
