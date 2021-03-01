using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ESkool.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ESkool.Services
{
    public class RegisterService
    {
        
        private readonly IMongoCollection<RegisteredUsers> _registeredUsers;
        
        public RegisterService(IRegisteredUsersDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _registeredUsers = database.GetCollection<RegisteredUsers>(settings.RegisteredUsersCollectionName);
        }
        
        public List<RegisteredUsers> Get() =>
            _registeredUsers.Find(registerUser => true).ToList();

        public RegisteredUsers Get(string email) =>
            _registeredUsers.Find<RegisteredUsers>(user => user.Email == email).FirstOrDefault();

        
        public string GetName(string email) =>
            _registeredUsers.Find<RegisteredUsers>(user => user.Email == email).FirstOrDefault().Name;
        
        public ActionResult<RegisteredUsers> Create(RegisteredUsers registeredUsers)
        {
            _registeredUsers.InsertOne(registeredUsers);
            return registeredUsers;
        }
        
        
    }
}