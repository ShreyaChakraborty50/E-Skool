using System.Collections.Generic;
using ESkool.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ESkool.Services
{
    public class ClassesService
    {
        private readonly IMongoCollection<Classes> _classes;

        public ClassesService(IClassesDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _classes = database.GetCollection<Classes>(settings.ClassesCollectionName);
        }

        public List<Classes> Get(string email) =>
            _classes.Find<Classes>(c => c.TeacherEmail == email).ToList();

        public Classes GetClass(string classCode) =>
            _classes.Find<Classes>(c => c.ClassId == classCode).FirstOrDefault();
        public Classes Create(Classes classes)
        {
            _classes.InsertOne(classes);
            return classes;
        }
    }
}