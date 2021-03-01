using System.Collections.Generic;
using ESkool.Models;
using ESkool.Services;
using Microsoft.AspNetCore.Mvc;

namespace ESkool.Controllers
{
    public class PostsController : Controller
    {
        private readonly PostsService _postsService;
        
        public PostsController(PostsService postsService)
        {
            _postsService = postsService;
        }

        [HttpPost]
        [Consumes("application/json")]
        public ActionResult<Posts> Create([FromBody] Posts posts)
        {
            _postsService.Create(posts);
            return posts;
        }

        [HttpGet]
        public List<Posts> Get(string classCode) =>
            _postsService.Get(classCode);

    }
}