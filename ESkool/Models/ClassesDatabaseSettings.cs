namespace ESkool.Models
{
    public class ClassesDatabaseSettings : IClassesDatabaseSettings
    {
        public string ClassesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IClassesDatabaseSettings
    {
        string ClassesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}