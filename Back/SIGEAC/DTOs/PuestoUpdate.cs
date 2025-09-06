using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class PuestoUpdate
    {
        [Required]
        public required string Ubicacion { get; set; }

        [Required]
        public required string Estado { get; set; }

        public int? UsuarioID { get; set; }

    }
}

