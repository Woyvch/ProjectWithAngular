using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectWithAngular.Migrations
{
    public partial class InsertedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "50552127-994f-4fd7-8b8e-f136b4829aa7", "d661b980-2e39-4bcc-872c-9c263aaf45da", "Visitor", "VISITOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "57ad0383-44b1-48a8-a0a4-7fda0d8b1cdd", "80049674-9732-4ac8-a848-b3f9c07f229a", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50552127-994f-4fd7-8b8e-f136b4829aa7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57ad0383-44b1-48a8-a0a4-7fda0d8b1cdd");
        }
    }
}
