using System.Collections.Generic;
using ESkool.Models;
using ESkool.Services;
using Microsoft.AspNetCore.Mvc;

namespace ESkool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly RegisterService _registerService;

        public RegisterController(RegisterService registerService)
        {
            _registerService = registerService;
        }

        [HttpGet]
        public ActionResult<List<RegisteredUsers>> Get() =>
            _registerService.Get();

        [HttpGet("{email}")]
        public string GetName(string email)
        {
            string name = _registerService.GetName(email);
            return name;
        }
        
        
        [HttpPost]
        [Consumes("application/json")]
        public ActionResult<RegisteredUsers> Create([FromBody] RegisteredUsers registeredUsers)
        {
            var user = _registerService.Get(registeredUsers.Email);
            if (user != null) return BadRequest(new {email = "Email is already registered"});
            _registerService.Create(registeredUsers);
            return registeredUsers;
        }
        
        
    }
}