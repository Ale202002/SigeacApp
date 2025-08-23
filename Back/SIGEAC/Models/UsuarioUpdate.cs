namespace SIGEAC.Models
{
    public class UsuarioUpdate
    {
        public int ID_Usuario { get; set; }
        public required string Nombre { get; set; }
        public required string Apellido { get; set; }
        public required string DNI { get; set; }
        public required string Email { get; set; }
        public required string Contrasena { get; set; }
    }

}

