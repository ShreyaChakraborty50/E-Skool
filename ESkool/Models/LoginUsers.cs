using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESkool.Models
{
    public class LoginUsers
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string AccountType { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string[] Classes { get; set; }
    }
}