using System;
using System.Windows.Forms;

namespace HTMLViewer
{
    public class Program
    {
        [STAThread]
        public static void Main()
        {
            // Create a new instance of the WebBrowser control
            WebBrowser webBrowser = new WebBrowser();
            // Set the HTML content
            string htmlContent = "<html><body><h1>Hello, HTML!</h1></body></html>";
            webBrowser.DocumentText = htmlContent;

            // Wait for the document to finish loading
            webBrowser.DocumentCompleted += (sender, e) =>
            {
                // Display the form once the document has loaded
                MessageBox.Show("HTML content loaded!");

                // Optionally, you can access and modify elements within the HTML document
                var h1Element = webBrowser.Document.GetElementsByTagName("h1")[0];
                h1Element.InnerText = "Modified HTML";

                // Print the modified HTML
                Console.WriteLine(webBrowser.DocumentText);
            };

            // Run the application
            Application.Run();
        }
    }
}