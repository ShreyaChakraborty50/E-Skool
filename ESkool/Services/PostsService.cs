using System.Collections.Generic;
using ESkool.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ESkool.Services
{
    public class PostsService
    {
        private readonly IMongoCollection<Posts> _posts;

        public PostsService(IPostsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _posts = database.GetCollection<Posts>(settings.PostsCollectionName);
        }

        public List<Posts> Get(string classCode) =>
            _posts.Find<Posts>(c => c.ClassId == classCode).ToList();
        
        public Posts Create(Posts posts)
        {
            _posts.InsertOne(posts);
            return posts;
        }
    }
}