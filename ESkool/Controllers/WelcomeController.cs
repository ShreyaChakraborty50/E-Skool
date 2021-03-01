using Microsoft.AspNetCore.Mvc;

namespace ESkool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Welcome : ControllerBase
    {
        public string Get()
        {
            return "This is a simple ASP.NET CORE WEB API";
        }
    }
}