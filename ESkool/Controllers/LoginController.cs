using System.Collections.Generic;
using ESkool.Models;
using ESkool.Services;
using Microsoft.AspNetCore.Mvc;

namespace ESkool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;

        public LoginController(LoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        [Consumes("application/json")]
        public ActionResult<LoginUsers> Create([FromBody] LoginUsers loginUsers)
        {
            _loginService.Create(loginUsers);
            return loginUsers;
        }
        [HttpPost("auth")]
        [Consumes("application/json")]
        public ActionResult<LoginUsers> VerifyPassword([FromBody] LoginUsers loginUsers)
        {
            var user = _loginService.Get(loginUsers.Email);
            if (user == null)
            {
                return BadRequest(new {email = "Email is not registered!"});
            }

            var isPasswordVerified = _loginService.VerifyPassword(loginUsers);
            if (isPasswordVerified == null)
            {
                return BadRequest(new {email = "Password doesn't match"});
            }

            return Ok();
        }

        [HttpGet("{email}")]
        public LoginUsers Get(string email)
        {
            var user = _loginService.Get(email);
            return user;
        }
        [HttpPut("{email}")]
        public IActionResult Update(string email, [FromBody] LoginUsers loginUsers)
        {
            _loginService.Update(email, loginUsers);
            return Ok();
        }
        
    }
    
}