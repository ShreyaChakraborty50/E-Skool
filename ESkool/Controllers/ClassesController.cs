using System.Collections.Generic;
using ESkool.Models;
using ESkool.Services;
using Microsoft.AspNetCore.Mvc;

namespace ESkool.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassesController : Controller
    {
        private readonly ClassesService _classesService;
        
        public ClassesController(ClassesService classesService)
        {
            _classesService = classesService;
        }

        [HttpPost]
        [Consumes("application/json")]
        public ActionResult<Classes> Create([FromBody] Classes classes)
        {
            _classesService.Create(classes);
            return classes;
        }
        [HttpGet("{classcode}")]
        public Classes GetClass(string classcode) =>
            _classesService.GetClass(classcode);
        
    }
}