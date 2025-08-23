using Microsoft.EntityFrameworkCore;
using SIGEAC.Models;

namespace SIGEAC.Data
{
    public class SigeacDbContext : DbContext
    {
        public SigeacDbContext(DbContextOptions<SigeacDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        //public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Equipo> Equipos { get; set; }
        public DbSet<Puesto> Puestos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Usuario
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(u => u.Rol)
                      .HasConversion<string>();
                // Guarda el enum (Rol_Usuario_) como string en la base de datos
            });

            // Empleado
            

            // Equipo
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

            // 🔹 Usuarios iniciales (Admin y RRHH)
            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    ID_Usuario = 1,
                    Nombre = "Admin",
                    Apellido = "Principal",
                    DNI = "00000001",
                    Email = "admin@sigeac.com",
                    Contrasena = "Admin123", // ⚠️ en producción debería ir hasheada
                    Rol = Rol_Usuario_.Administrador
                },
                new Usuario
                {
                    ID_Usuario = 2,
                    Nombre = "RRHH",
                    Apellido = "Principal",
                    DNI = "00000002",
                    Email = "rrhh@sigeac.com",
                    Contrasena = "RRHH123", // ⚠️ igual, hasheado en sistemas reales
                    Rol = Rol_Usuario_.RRHH
                }
            );
        }
    }
}
