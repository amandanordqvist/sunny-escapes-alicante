import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import Landing from "@/pages/Landing";
import PropertyDetails from "@/pages/PropertyDetails";
import AddProperty from "@/pages/AddProperty";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/properties/new" element={<AddProperty />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;