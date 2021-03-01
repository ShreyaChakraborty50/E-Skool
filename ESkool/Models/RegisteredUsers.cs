using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESkool.Models
{
    public class RegisteredUsers
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string AccountType { get; set; }
        public string Name { get; set; }
        [BsonRequired]
        public string Email { get; set; }
        public string Institution { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Token { get; set; }
    }
}