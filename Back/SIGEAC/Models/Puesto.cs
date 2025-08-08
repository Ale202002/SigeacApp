using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class Puesto
    {
        [Key]
        public int ID_Puesto { get; set; }

        [Required]
        public required string Ubicacion { get; set; }  //El puesto ej: SS-F1-01

        [Required]
        public required string Estado { get; set; }

        // Relación con Empleado
        public int? EmpleadoID { get; set; }
        public Empleado? Empleado { get; set; }

        // Relación con Equipo
        public int? EquipoID { get; set; }
        public Equipo? Equipo { get; set; }
    }
}
