using SIGEAC.DTOs;
using SIGEAC.Models;

namespace SIGEAC.Services.Interfaces
{
    public interface IComponenteService
    {
        Task<Componente> CrearComponente(ComponenteCreate request);
        Task<Componente?> EditarComponente(int id, ComponenteUpdate request);
        Task<IEnumerable<Componente>> ListarComponentes();
        Task<Componente?> EliminarComponente(int id);
    }
}
