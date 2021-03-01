namespace ESkool.Models
{
    public class LoginUsersDatabaseSettings : ILoginUsersDatabaseSettings
    {
        public string LoginUsersCollectionName { get; set; }
        public string RegisteredUsersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ILoginUsersDatabaseSettings
    {
        string LoginUsersCollectionName { get; set; }
        string RegisteredUsersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}