using Microsoft.EntityFrameworkCore;
using SIGEAC.Models;

namespace SIGEAC.Data
{
    public class SigeacDbContext : DbContext
    {
        public SigeacDbContext(DbContextOptions<SigeacDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Equipo> Equipos { get; set; }
        public DbSet<Puesto> Puestos { get; set; }



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

            modelBuilder.Entity<Empleado>()
                .HasIndex(e => e.UsuarioId)
                .IsUnique();

            modelBuilder.Entity<Equipo>()
                .HasIndex(e => e.IdentificadorActivo)
                .IsUnique();

            modelBuilder.Entity<Equipo>()
                .HasIndex(e => e.EmpleadoAsignadoID)
                .IsUnique(); // un empleado solo puede tener un equipo asignado

            modelBuilder.Entity<Equipo>()
                .HasMany(e => e.UsuariosAutorizados)
                .WithMany();

            modelBuilder.Entity<Equipo>()
                .HasOne(e => e.Puesto)
                .WithOne(p => p.Equipo)
                .HasForeignKey<Equipo>(e => e.PuestoID)
                .IsRequired();

            modelBuilder.Entity<Equipo>()
                .HasOne(e => e.EmpleadoAsignado)
                .WithOne()
                .HasForeignKey<Equipo>(e => e.EmpleadoAsignadoID)
                .OnDelete(DeleteBehavior.Restrict);

        }

    }

}
