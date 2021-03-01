namespace ESkool.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string LoginUsersCollectionName { get; set; }
        public string RegisteredUsersCollectionName { get; set; }
        public string ClassesCollectionName { get; set; }
        public string PostsCollectionName { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        string LoginUsersCollectionName { get; set; }
        string RegisteredUsersCollectionName { get; set; }
        string ClassesCollectionName { get; set; }
        string PostsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}