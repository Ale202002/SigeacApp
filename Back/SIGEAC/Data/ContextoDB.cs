using Microsoft.EntityFrameworkCore;
using SIGEAC.Enums;
using SIGEAC.Models;

namespace SIGEAC.Data
{
    public class SigeacDbContext : DbContext
    {
        public SigeacDbContext(DbContextOptions<SigeacDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Equipo> Equipos { get; set; }
        public DbSet<Puesto> Puestos { get; set; }
        public DbSet<Componente> Componentes { get; set; }
        public DbSet<Periferico> Perifericos { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Usuario
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(u => u.Rol)
                      .HasConversion<string>(); // enum Rol_Usuario_ como string
            });

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

            modelBuilder.Entity<Equipo>(entity =>
            {
                entity.Property(e => e.SistemaOperativo).HasConversion<string>();
                entity.Property(e => e.Confidencialidad).HasConversion<string>();
                entity.Property(e => e.Disponibilidad).HasConversion<string>();
                entity.Property(e => e.Integridad).HasConversion<string>();
                entity.Property(e => e.Criticidad).HasConversion<string>();
            });

            // Puesto
            modelBuilder.Entity<Puesto>()
                .HasOne(p => p.Equipo)
                .WithOne(e => e.Puesto)
                .HasForeignKey<Equipo>(e => e.PuestoID);

            // 🔹 Componente
            modelBuilder.Entity<Componente>(entity =>
            {
                entity.Property(c => c.Tipo).HasConversion<string>();   // enum TipoComponente como string
                entity.Property(c => c.Estado).HasConversion<string>(); // enum EstadoComponente como string
            });

            // 🔹 Periférico
            modelBuilder.Entity<Periferico>(entity =>
            {
                entity.Property(p => p.Tipo).HasConversion<string>();   // enum TipoPeriferico como string
                entity.Property(p => p.Estado).HasConversion<string>(); // enum EstadoPeriferico como string
            });

            // Usuarios iniciales (Admin y RRHH)
            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    ID_Usuario = 1,
                    Nombre = "Admin",
                    Apellido = "Principal",
                    DNI = "00000001",
                    Email = "admin@sigeac.com",
                    Contrasena = "Admin123", // en producción debería ir hasheada
                    Rol = Rol_Usuario_.Administrador
                },
                new Usuario
                {
                    ID_Usuario = 2,
                    Nombre = "RRHH",
                    Apellido = "Principal",
                    DNI = "00000002",
                    Email = "rrhh@sigeac.com",
                    Contrasena = "RRHH123", // igual, hasheado en sistemas reales
                    Rol = Rol_Usuario_.RRHH
                }
            );

            // Relación Equipo - Componente (1 a muchos)
            modelBuilder.Entity<Equipo>()
                .HasMany(e => e.Componentes)
                .WithOne(c => c.Equipo)
                .HasForeignKey(c => c.EquipoID)
                .OnDelete(DeleteBehavior.SetNull);

            // Relación Equipo - Periférico (1 a muchos)
            modelBuilder.Entity<Equipo>()
                .HasMany(e => e.Perifericos)
                .WithOne(p => p.Equipo)
                .HasForeignKey(p => p.EquipoID)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}

