using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class PuestoUpdate
    {
        [Required]
        public int ID_Puesto { get; set; }

        [Required]
        public required string Ubicacion { get; set; }

        [Required]
        public required string Estado { get; set; }

        public int? UsuarioID { get; set; }

        public int? EquipoID { get; set; }
    }
}

