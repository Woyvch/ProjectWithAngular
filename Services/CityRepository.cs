using ProjectWithAngular.Data;
using ProjectWithAngular.Models;

namespace ProjectWithAngular.Services
{
    public class CityRepository : ICityRepository
    {
        // Fields
        private readonly CityContext _cityContext;

        // Constructor
        public CityRepository(CityContext cityContext)
        {
            _cityContext = cityContext ?? throw new ArgumentNullException(nameof(cityContext));
        }

        // Methods
        public IEnumerable<City> GetCities()
        {
            return _cityContext.Cities.OrderBy(c => c.Id).ToList();
        }

        public City GetCity(int cityId)
        {
            return _cityContext.Cities.Where(c => c.Id == cityId)
                .FirstOrDefault();
        }

        public bool CityExists(int cityId)
        {
            return _cityContext.Cities.Any(c => c.Id == cityId);
        }

        public void  UpdateCity(City city)
        {
            _cityContext.Cities.Update(city);
        }

        public void AddCity(City city)
        {
            _cityContext.Cities.Add(city);
        }

        public void DeleteCity(City city)
        {
            _cityContext.Remove(city);
        }

        // Persist the changes on the database
        public bool Save()
        {
            // Returns true if one or more entities have been saved
            return (_cityContext.SaveChanges() >= 0);
        }
    }
}
