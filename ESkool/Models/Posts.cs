using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESkool.Models
{
    public class Posts
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ClassId { get; set; }
        public string author { get; set; }
        public string authorEmail { get; set; }
    }
}