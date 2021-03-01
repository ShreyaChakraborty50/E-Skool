namespace ESkool.Models
{
    public class PostsDatabaseSettings : IPostsDatabaseSettings
    {
        public string PostsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IPostsDatabaseSettings
    {
        string PostsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}