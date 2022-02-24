using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookends.Migrations
{
    public partial class BookshelvesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Author_Books_BookId",
                table: "Author");

            migrationBuilder.DropForeignKey(
                name: "FK_Category_Books_BookId",
                table: "Category");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Books",
                table: "Books");

            migrationBuilder.RenameTable(
                name: "Books",
                newName: "Book");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Book",
                table: "Book",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Bookshelves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookshelves", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookshelfItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookshelfId = table.Column<int>(type: "int", nullable: false),
                    BookId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookshelfItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookshelfItem_Bookshelves_BookshelfId",
                        column: x => x.BookshelfId,
                        principalTable: "Bookshelves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookshelfItem_BookshelfId",
                table: "BookshelfItem",
                column: "BookshelfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Author_Book_BookId",
                table: "Author",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Book_BookId",
                table: "Category",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Author_Book_BookId",
                table: "Author");

            migrationBuilder.DropForeignKey(
                name: "FK_Category_Book_BookId",
                table: "Category");

            migrationBuilder.DropTable(
                name: "BookshelfItem");

            migrationBuilder.DropTable(
                name: "Bookshelves");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Book",
                table: "Book");

            migrationBuilder.RenameTable(
                name: "Book",
                newName: "Books");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Books",
                table: "Books",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Author_Books_BookId",
                table: "Author",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Books_BookId",
                table: "Category",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id");
        }
    }
}
