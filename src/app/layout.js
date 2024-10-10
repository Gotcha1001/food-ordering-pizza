import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { AppProvider } from "../components/AppContext";
import { Toaster } from "react-hot-toast";

import CurrentYear from "../components/CurrentYear";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata = {
  title: "Pizza App",
  description: "Online Food Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Add your favicon */}
        <link rel="icon" href="/MetaPizza.jpg" />
      </head>
      <body className={roboto.className}>
        <main className=" mx-auto p-4">
          <AppProvider>
            <Toaster
              position="top-right" // Set the toast position to top-right
              toastOptions={{
                className: "", // Add custom class if needed
                duration: 4000, // Duration in milliseconds
                style: {
                  background: "#9B59B6", // Dark background
                  color: "#fff", // White text
                  fontSize: "16px", // Text size
                  padding: "16px", // Padding for the toast
                  borderRadius: "8px", // Rounded corners
                },
                success: {
                  style: {
                    background: "#4caf50", // Green background for success
                  },
                },
                error: {
                  style: {
                    background: "#f44336", // Red background for errors
                  },
                },
              }}
            />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; <CurrentYear /> CodeNow101. All rights reserved.
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
