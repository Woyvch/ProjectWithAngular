using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectWithAngular.JwtFeatures;
using ProjectWithAngular.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace ProjectWithAngular.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // Fields
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;

        // Constructor
        public AccountController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        // Methods
        [HttpPost("registration")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            // map our DTO object to the User object 
            var user = _mapper.Map<User>(userForRegistration);
            //  call the CreateAsync method to create a new user in our database
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            //  If unsuccessful, we extract errors and return them inside the RegistrationResponseDto object
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }
            // Add a default role to a new user
            await _userManager.AddToRoleAsync(user, "Visitor");

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            //fetch the user by calling the FindByNameAsync method
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
            // If the user doesn’t exist, we return an unauthorized response
            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            // use the JwtHandler class to get all the information we require
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            // modify the call to the GetClaims method because it is now an async one
            var claims = await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            // create a token
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            // return the token as a part of our response
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }
    }
}
