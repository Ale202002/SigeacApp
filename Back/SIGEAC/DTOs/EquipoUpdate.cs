using System.ComponentModel.DataAnnotations;
using SIGEAC.Enums;
using SIGEAC.Models;

public class EquipoUpdate
{
    [Required]
    public int ID_Equipo { get; set; }

    [Required]
    public required string IdentificadorActivo { get; set; }

    [Required]
    public int PuestoID { get; set; }

    [Required]
    public bool DisponibilidadFisica { get; set; }

    [Required]
    public required string Area { get; set; }

    [Required]
    public int EmpleadoAsignadoID { get; set; }

    [Required]
    public required string IP { get; set; }

    [Required]
    public required string NumeroSerie { get; set; }

    [Required]
    public required string MAC { get; set; }

    [Required]
    public bool Tipo { get; set; }

    [Required]
    public bool PropiedadActivo { get; set; }

    [Required]
    public SistemaOperativo SistemaOperativo { get; set; }

    [Required]
    public required string VersionSO { get; set; }

    [Required]
    public bool Soporte { get; set; }

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
    public bool Cifrado { get; set; }

    public string? ContrasenaCifrado { get; set; }

    [Required]
    public bool Antivirus { get; set; }

    public string? Adicionales { get; set; }

    public List<int>? UsuariosAutorizadosIDs { get; set; }
}