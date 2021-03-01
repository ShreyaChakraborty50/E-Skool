using System.Collections.Generic;
using ESkool.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ESkool.Services
{
    public class LoginService
    {
        private readonly IMongoCollection<LoginUsers> _loginUsers;

        public LoginService(ILoginUsersDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _loginUsers = database.GetCollection<LoginUsers>(settings.LoginUsersCollectionName);
        }
        
        public LoginUsers Get(string email) =>
            _loginUsers.Find<LoginUsers>(user => user.Email == email).FirstOrDefault();

        public LoginUsers Create(LoginUsers loginUsers)
        {
            _loginUsers.InsertOne(loginUsers);
            return loginUsers;
        }

        public LoginUsers VerifyPassword(LoginUsers loginUsers) =>
            _loginUsers.Find<LoginUsers>(x =>
                x.AccountType == loginUsers.AccountType && x.Email == loginUsers.Email && x.Password == loginUsers.Password).FirstOrDefault();

        public void Update(string email, LoginUsers loginUsers) =>
            _loginUsers.ReplaceOne(user => user.Email == email, loginUsers);


    }
}