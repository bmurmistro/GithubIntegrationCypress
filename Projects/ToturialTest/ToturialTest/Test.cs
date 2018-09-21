using System;
using System.Drawing;
using Applitools.Selenium;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace ToturialTest
{
    public class Test
    {

            public static void Main(string[] args)
            {
                // Open a Chrome browser.
                var driver = new ChromeDriver();

                // Initialize the eyes SDK and set your private API key.
                var eyes = new Eyes();
                eyes.ApiKey = "ioRRQOF5YBYU6NIwbe3tuDFCX8H109mmenarZo8arSlbA110";

                try
                {
                    // Start the test and set the browser's viewport size to 800x600.
                    eyes.Open(driver, "Hello World!", "My first Selenium C# test!", new Size(800, 600));

                    // Navigate the browser to the "hello world!" web-site.
                    driver.Url = "https://applitools.com/helloworld";

                    // Visual checkpoint #1.
                    eyes.CheckWindow("Hello!");

                    // Click the "Click me!" button.
                    driver.FindElement(By.TagName("button")).Click();

                    // Visual checkpoint #2.
                    eyes.CheckWindow("Click!");

                    // End the test.
                    eyes.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
                finally
                {
                    // Close the browser.
                    driver.Quit();

                    // If the test was aborted before eyes.Close was called, ends the test as aborted.
                    eyes.AbortIfNotClosed();
                }

        }
    }
}
