using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SIGEAC.Enums;

namespace SIGEAC.Models
{
    public class Periferico
    {
        [Key]
        public int ID_Periferico { get; set; } // Se genera automáticamente como clave primaria

        [Required]
        public TipoPeriferico Tipo { get; set; } // Solo los valores definidos arriba

        [Required]
        public string Nombre { get; set; } // Nombre asignado al periférico

        [Required]
        public EstadoPeriferico Estado { get; set; } // Activo o Inactivo

        // Relación con Equipo (opcional al momento de crear el periférico)
        public int? EquipoID { get; set; } // Puede ser null hasta que se asigne

        public Equipo? Equipo { get; set; } // Propiedad de navegación
    }
}
