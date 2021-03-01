namespace ESkool.Models
{
    public class RegisteredUsersDatabaseSettings : IRegisteredUsersDatabaseSettings
    {
        public string RegisteredUsersCollectionName { get; set; }
        public string LoginUsersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IRegisteredUsersDatabaseSettings
    {
        string RegisteredUsersCollectionName { get; set; }
        string LoginUsersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}