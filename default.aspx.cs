using System;
using System.Data.SqlClient;

namespace WebApplication
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Connection string
            string connectionString = "Data Source=records;Initial Catalog=records;User ID=records;Password=records;";

            // SQL query
            string query = "SELECT * FROM Customers";

            // Create connection and command objects
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                try
                {
                    // Open connection
                    connection.Open();

                    // Execute query and read data
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // Access data using reader
                            string customerName = reader["CustomerName"].ToString();
                            // ... process data
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Handle exception
                    ltOutput.Text = "An error occurred: " + ex.Message;
                }
            }
        }
    }
}