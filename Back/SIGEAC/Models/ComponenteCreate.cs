using System.ComponentModel.DataAnnotations;

namespace SIGEAC.Models
{
    public class ComponenteCreate
    {
        [Required]
        public string Nombre { get; set; }

        [Required]
        public TipoComponente Tipo { get; set; }

        [Required]
        public EstadoComponente Estado { get; set; }

        // Si queremos poner con que equipo esta asignado tenemos que poner:
        // public int? EquipoID { get; set; }
    }
}

