using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using OMS.Server.Model;

namespace OMS.Server.Configuration
{
    public class LoginConfiguration : IEntityTypeConfiguration<Login>
    {
        public void Configure(EntityTypeBuilder<Login> builder)
        {
            builder.ToTable("Login");
            builder.HasData
            (
                new Login
                {
                    ID = 1,
                    LoginID = "Admin",
                    Password = "12345",
                    EmpID = 0,
                    RoleID = 1,
                    Status = 1,
                    CreatedBy = 1,
                    CreatedDate = DateTime.Now
                }
            );
        }
    }
}
