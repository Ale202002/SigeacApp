using SIGEAC.Models;

namespace SIGEAC.Services.Interfaces
{
    public interface IPuestoService
    {
        Task<Puesto> CrearPuesto(Puesto puesto);
        Task<Puesto?> EditarPuesto(int id, Puesto puesto);
        Task<IEnumerable<Puesto>> ListarPuestos();
        Task<bool> EliminarPuesto(int id);
    }
}
