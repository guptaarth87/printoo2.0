import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PDFUploader = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!uploadedFile) {
      alert('Please upload a PDF file');
      return;
    }
  
    try {
      // Load the uploaded PDF
      const fileArrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);
  
      // Embed a font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
      // Create a new blank page
      const newPage = pdfDoc.insertPage(0, [600, 400]);
  
      // Add user details to the new front page
      newPage.drawText(`Name: ${userName}`, {
        x: 50,
        y: 350,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
      });
      newPage.drawText(`Email: ${email}`, {
        x: 50,
        y: 330,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
      });
      newPage.drawText(`Phone: ${phone}`, {
        x: 50,
        y: 310,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
      });
  
      // Save the updated PDF
      const updatedPdfBytes = await pdfDoc.save();
      const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
  
      // Set the preview link
      setPreviewLink(downloadUrl);
  
      // Trigger file download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'ModifiedPDF.pdf';
      link.click();
    } catch (error) {
      console.error('Error modifying PDF:', error);
      alert('An error occurred while processing the PDF.');
    }
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>Upload PDF and Add Front Page</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setUploadedFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Front Page and Download
        </button>
      </form>
      {previewLink && (
        <div style={{ marginTop: '20px' }}>
          <h3>Preview</h3>
          <a href={previewLink} target="_blank" rel="noopener noreferrer">
            Click here to preview the modified PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
