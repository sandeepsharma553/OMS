using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OMS.Server.Migrations
{
    /// <inheritdoc />
    public partial class OMS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Login",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoginID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpID = table.Column<int>(type: "int", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Login", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "Login",
                columns: new[] { "ID", "CreatedBy", "CreatedDate", "EmpID", "LoginID", "Password", "RoleID", "Status", "UpdatedBy", "UpdatedDate" },
                values: new object[] { 1, 1, new DateTime(2024, 7, 4, 16, 41, 38, 50, DateTimeKind.Local).AddTicks(695), 0, "Admin", "12345", 1, 1, null, new DateTime(2024, 7, 4, 16, 41, 38, 50, DateTimeKind.Local).AddTicks(682) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Login");
        }
    }
}
