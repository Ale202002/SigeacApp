namespace SIGEAC.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;
    using System.IO;

    namespace SIGEAC.Data
    {
        public class SigeacDbContextFactory : IDesignTimeDbContextFactory<SigeacDbContext>
        {
            public SigeacDbContext CreateDbContext(string[] args)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var optionsBuilder = new DbContextOptionsBuilder<SigeacDbContext>();
                optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));

                return new SigeacDbContext(optionsBuilder.Options);
            }
        }
    }

}
