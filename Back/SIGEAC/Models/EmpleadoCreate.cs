namespace SIGEAC.Models
{
    public class EmpleadoCreate
    {
        public string NombreCompleto { get; set; }
        public string DNI { get; set; }
        public string CorreoElectronico { get; set; }
        public int UsuarioId { get; set; } // ID del usuario asociado
    }
}
