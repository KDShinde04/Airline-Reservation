using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AirReservationV1.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketDetails",
                table: "TicketDetails");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfPassangers",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DetailsId",
                table: "TicketDetails",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketDetails",
                table: "TicketDetails",
                column: "DetailsId");

            migrationBuilder.UpdateData(
                table: "Flights",
                keyColumn: "FlightId",
                keyValue: 1,
                columns: new[] { "LandingTime", "TakeOffTime" },
                values: new object[] { new DateTime(2022, 11, 7, 13, 20, 22, 896, DateTimeKind.Local).AddTicks(278), new DateTime(2022, 11, 7, 11, 20, 22, 896, DateTimeKind.Local).AddTicks(268) });

            migrationBuilder.CreateIndex(
                name: "IX_TicketDetails_TicketId",
                table: "TicketDetails",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketDetails",
                table: "TicketDetails");

            migrationBuilder.DropIndex(
                name: "IX_TicketDetails_TicketId",
                table: "TicketDetails");

            migrationBuilder.DropColumn(
                name: "NumberOfPassangers",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DetailsId",
                table: "TicketDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketDetails",
                table: "TicketDetails",
                column: "TicketId");

            migrationBuilder.UpdateData(
                table: "Flights",
                keyColumn: "FlightId",
                keyValue: 1,
                columns: new[] { "LandingTime", "TakeOffTime" },
                values: new object[] { new DateTime(2022, 10, 19, 19, 31, 4, 112, DateTimeKind.Local).AddTicks(4106), new DateTime(2022, 10, 19, 17, 31, 4, 112, DateTimeKind.Local).AddTicks(4097) });
        }
    }
}
