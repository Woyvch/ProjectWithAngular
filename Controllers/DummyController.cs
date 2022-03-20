using Microsoft.AspNetCore.Mvc;

namespace ProjectWithAngular.Controllers
{
    [ApiController]
    [Route("api/testdatabase")]
    public class DummyController : ControllerBase
    {
        [HttpGet]
        public IActionResult TestDatabase()
        {
            return Ok();
        }
    }
}
