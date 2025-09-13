using SIGEAC.Models;

namespace SIGEAC.Services.Interfaces
{
    public interface IPerifericoService
    {
        Task<Periferico> CrearPeriferico(Periferico periferico);
        Task<Periferico?> EditarPeriferico(int id, Periferico periferico);
        Task<IEnumerable<Periferico>> ListarPerifericos();
        Task<bool> EliminarPeriferico(int id);
    }
}
