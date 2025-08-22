namespace SIGEAC.Models
{
    public class EmpleadoCreate
    {
        public string NombreCompleto { get; set; }
        public string DNI { get; set; }
        public string CorreoElectronico { get; set; }

        // Datos de Usuario
        public string Contrasena { get; set; }
        public Rol_Usuario_ Rol { get; set; }
    }
}
