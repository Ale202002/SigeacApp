using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SIGEAC.Models
{
    public enum NivelCriticidad { Alta, Media, Baja }
    public enum PropiedadAccesorio { Compania, Empleado, No }

    public class Equipo
    {
        [Key]
        public int ID_Equipo { get; set; }

        [Required]
        public string IdentificadorActivo { get; set; } = string.Empty;

        // Relación obligatoria con Puesto
        [Required]
        public int PuestoID { get; set; }
        public Puesto Puesto { get; set; } = null!;

        [Required]
        public bool DisponibilidadFisica { get; set; } // true = disponible, false = ocupado

        [Required]
        public string Area { get; set; } = string.Empty;

        // Relación con Empleado Asignado (uno a uno)
        [Required]
        public int EmpleadoAsignadoID { get; set; }
        public Empleado EmpleadoAsignado { get; set; } = null!;

        [Required]
        public string IP { get; set; } = string.Empty;

        [Required]
        public string NumeroSerie { get; set; } = string.Empty;

        [Required]
        public string MAC { get; set; } = string.Empty;

        [Required]
        public string Tipo { get; set; } = string.Empty;

        [Required]
        public bool PropiedadActivo { get; set; } // true = compañía, false = empleado

        [Required]
        public string SistemaOperativo { get; set; } = string.Empty;

        [Required]
        public string VersionSO { get; set; } = string.Empty;

        [Required]
        public bool Soporte { get; set; } // true = sí, false = no

        [Required]
        public NivelCriticidad Confidencialidad { get; set; }

        [Required]
        public NivelCriticidad Disponibilidad { get; set; }

        [Required]
        public NivelCriticidad Integridad { get; set; }

        [Required]
        public NivelCriticidad Criticidad { get; set; }

        [Required]
        public DateTime FechaClasificacion { get; set; }

        [Required]
        public bool VPNLabs { get; set; }

        [Required]
        public bool EscritorioRemoto { get; set; }

        [Required]
        public PropiedadAccesorio Monitor { get; set; }

        [Required]
        public PropiedadAccesorio Teclado { get; set; }

        [Required]
        public PropiedadAccesorio Mouse { get; set; }

        [Required]
        public PropiedadAccesorio Auriculares { get; set; }

        [Required]
        public string Procesador { get; set; } = string.Empty;

        [Required]
        public string Disco { get; set; } = string.Empty;

        [Required]
        public string RAM { get; set; } = string.Empty;

        [Required]
        public bool Cifrado { get; set; }

        [Required]
        public bool Antivirus { get; set; }

        public string? Adicionales { get; set; }

        // Relación con Usuarios Autorizados (muchos a muchos)
        public List<Empleado> UsuariosAutorizados { get; set; } = new List<Empleado>();
    }
}
