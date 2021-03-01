using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ESkool.Models
{
    public class Classes
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ClassId { get; set; }
        public string ClassName { get; set; }
        public string ClassDescription { get; set; }
        public string TeacherEmail { get; set; }
        public string[] Students { get; set; }
    }
}