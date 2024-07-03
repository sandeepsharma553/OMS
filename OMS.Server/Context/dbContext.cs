using Microsoft.EntityFrameworkCore;
using OMS.Server.Model;

namespace OMS.Server.Context
{
    public class dbContext: DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        public DbSet<Login> Login { get; set; }
    }
}
