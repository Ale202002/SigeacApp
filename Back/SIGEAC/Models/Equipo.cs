using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class Equipo
    {
        [Key]
        public int ID_Equipo { get; set; }
        public required string Nombre { get; set; }
        public required string Tipo { get; set; }
        public required string Estado { get; set; }
    }
}
