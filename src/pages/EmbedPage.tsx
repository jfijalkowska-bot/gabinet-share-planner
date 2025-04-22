
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import EmbedInstructions from "@/components/embed/EmbedInstructions";

const EmbedPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Udostępnianie" 
          description="Umieść swój kalendarz i wizytówkę na własnej stronie internetowej"
        />
        <EmbedInstructions />
      </main>
      <Footer />
    </div>
  );
};

export default EmbedPage;
