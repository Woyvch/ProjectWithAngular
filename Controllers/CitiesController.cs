#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectWithAngular.Data;
using ProjectWithAngular.Models;
using ProjectWithAngular.Services;

namespace ProjectWithAngular.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // protect the CitiesController from unauthorized access
    public class CitiesController : ControllerBase
    {
        //private readonly CityContext _context;
        private readonly ICityRepository _cityRepository;

        public CitiesController(ICityRepository cityRepository)
        {
            //_context = context ?? throw new ArgumentNullException(nameof(context));
            _cityRepository = cityRepository ?? throw new ArgumentNullException(nameof(cityRepository));
        }

        [HttpGet("Privacy")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Privacy()
        {
            // return all the claims to the client application in a key-value format
            var claims = User.Claims
                .Select(c => new { c.Type, c.Value })
                .ToList();
            return Ok(claims);
        }

        // GET: api/Cities
        [HttpGet]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<City>>> GetCity()
        {
            //return await _context.Cities.ToListAsync();
            var cityEntities = _cityRepository.GetCities();
            return Ok(cityEntities);
        }

        // GET: api/Cities/1
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            //var city = await _context.Cities.FindAsync(id);
            var cityEntity = _cityRepository.GetCity(id);

            if (cityEntity == null)
            {
                return NotFound();
            }

            return Ok(cityEntity);
        }

        // PUT: api/Cities/1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCity(int id, [FromBody] City city)
        {
            if (!_cityRepository.CityExists(id))
            {
                return NotFound();
            }

            var cityEntity = _cityRepository.GetCity(id);
            cityEntity.Name = city.Name;
            cityEntity.Description = city.Description;
            //_context.Entry(city).State = EntityState.Modified;
            _cityRepository.UpdateCity(cityEntity);

            try
            {
                //await _context.SaveChangesAsync();
                _cityRepository.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Cities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<City>> PostCity([FromBody] City city)
        {
            //_context.Cities.Add(city);
            _cityRepository.AddCity(city);
            //await _context.SaveChangesAsync();
            _cityRepository.Save();

            return CreatedAtAction("GetCity", new { id = city.Id }, city);
        }

        // DELETE: api/Cities/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            //var city = await _context.Cities.FindAsync(id);
            var cityEntity = _cityRepository.GetCity(id);
            if (cityEntity == null)
            {
                return NotFound();
            }
            //_context.Cities.Remove(city);
            _cityRepository.DeleteCity(cityEntity);
            //await _context.SaveChangesAsync();
            _cityRepository.Save();

            return NoContent();
        }
    }
}
