using SIGEAC.Enums;
using SIGEAC.Models;
using System.ComponentModel.DataAnnotations;

namespace SIGEAC.DTOs
{
    public class PerifericoCreate
    {
        [Required]
        public string Nombre { get; set; }

        [Required]
        public TipoPeriferico Tipo { get; set; }

        [Required]
        public EstadoPeriferico Estado { get; set; }
    }
}
