using SIGEAC.Models;

namespace SIGEAC.Services.Interfaces
{
    public interface IEquipoService
    {
        Task<Equipo> CrearEquipo(Equipo equipo, List<int>? usuariosAutorizadosIds);
        Task<Equipo?> EditarEquipo(int id, Equipo equipo, List<int>? usuariosAutorizadosIds);
        Task<IEnumerable<Equipo>> ListarEquipos();
        Task<bool> EliminarEquipo(int id);

        // Relación con Componentes
        Task<(Equipo? equipo, Componente? componente, string? error)> AsignarComponente(int equipoId, int componenteId);
        Task<(Equipo? equipo, Componente? componente, string? error)> DesasignarComponente(int equipoId, int componenteId);

        // Relación con Periféricos
        Task<(Equipo? equipo, Periferico? periferico, string? error)> AsignarPeriferico(int equipoId, int perifericoId);
        Task<(Equipo? equipo, Periferico? periferico, string? error)> DesasignarPeriferico(int equipoId, int perifericoId);
    }
}
