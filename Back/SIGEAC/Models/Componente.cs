using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SIGEAC.Enums;

namespace SIGEAC.Models
{
    public class Componente
    {
        [Key]
        public int ID_Componente { get; set; } // Se genera automaticamente como clave primaria

        [Required]
        public TipoComponente Tipo { get; set; } // Solo los valores definidos arriba

        [Required]
        public string Nombre { get; set; } // Nombre asignado al componente

        [Required]
        public EstadoComponente Estado { get; set; } // Activo o Inactivo

        // Relacion con Equipo (opcional al momento de crear el Componente)
        public int? EquipoID { get; set; } // Puede ser null hasta que se asigne

        public Equipo? Equipo { get; set; } // Propiedad de navegacion
    }
}
