using ProjectWithAngular.Models;

namespace ProjectWithAngular.Services
{
    public interface ICityRepository
    {
        IEnumerable<City> GetCities();
        City GetCity(int cityId);
        bool CityExists(int cityId);
        void UpdateCity(City city);
        void AddCity(City city);
        void DeleteCity(City city);
        bool Save();
    }
}
