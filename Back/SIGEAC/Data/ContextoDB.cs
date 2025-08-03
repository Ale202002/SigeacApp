using Microsoft.EntityFrameworkCore;
using SIGEAC.Models;

namespace SIGEAC.Data
{
    public class SigeacDbContext : DbContext
    {
        public SigeacDbContext(DbContextOptions<SigeacDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Empleado> Empleados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(u => u.Rol)
                .HasConversion<string>();
                //Guarda a enum (Rol-Usuario) como string(Administrador, RRHH y User) en la base de datos 
            });

        }

    }

}
