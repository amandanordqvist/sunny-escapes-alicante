import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import PropertyDetails from "@/pages/PropertyDetails";
import AddProperty from "@/pages/AddProperty";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/properties/new" element={<AddProperty />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;