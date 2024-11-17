import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PDFDocument, rgb } from 'pdf-lib';
import mammoth from 'mammoth';
import { jsPDF } from "jspdf";
// import html2pdf from "html2pdf.js";

const DocumentTools = () => {
  const [selectedMergeFiles, setSelectedMergeFiles] = useState([]);
  const [selectedDocFile, setSelectedDocFile] = useState(null);
  const [isMerging, setIsMerging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Necessary for showing the alert
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleMergeFilesChange = (e) => {
    setSelectedMergeFiles(Array.from(e.target.files));
  };

  const handleDocFileChange = (e) => {
    setSelectedDocFile(e.target.files[0]);
  };

  const handleMergeSubmit = async () => {
    if (selectedMergeFiles.length < 2) {
      toast.error("Please select at least two PDF files to merge.");
      return;
    }
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of selectedMergeFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      downloadPDF(mergedPdfBytes, 'merged_document.pdf');
      toast.success("PDFs merged and downloaded successfully!");
    } catch (error) {
      toast.error("Failed to merge PDFs.");
      console.error("Merge Error:", error);
    } finally {
      setIsMerging(false);
    }
  };

 

  async function convertDocxToPdf(docxFile) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const { value: htmlContent } = await mammoth.convertToHtml({ arrayBuffer });
  
          // You can modify the HTML content here before passing to jsPDF
          let modifiedHtmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
              ${htmlContent}
            </div>
          `;
  
          // Use jsPDF to convert HTML to PDF
          const pdf = new jsPDF();
          pdf.html(modifiedHtmlContent, {
            callback: function (pdf) {
              pdf.save("converted-document.pdf");
              resolve(); // Resolve promise after PDF is saved
            },
            x: 10,
            y: 10,
            width: 180, // You can adjust this based on your document content
          });
        } catch (error) {
          reject(error); // Reject the promise in case of any error
        }
      };
      reader.readAsArrayBuffer(docxFile);
    });
  }
  
  const handleConvertSubmit = async () => {
    if (!selectedDocFile) {
      toast.error("Please select a DOC file to convert.");
      return;
    }
  
    setIsConverting(true);
  
    try {
      // Call the convertDocxToPdf function
      await convertDocxToPdf(selectedDocFile);
      toast.success("Document converted to PDF successfully!");
    } catch (error) {
      toast.error("Failed to convert DOC to PDF.");
      console.error("Convert Error:", error);
    } finally {
      setIsConverting(false);
    }
  };


  const downloadPDF = (pdfBytes, fileName) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container containerx mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4" style={{ color: '#5A7D9F' }}>Document Tools</h3>
      
      {/* Merge PDFs Section */}
      <div className="tool-section">
        <h5 className="tool-title">Merge PDFs</h5>
        <div className="file-upload">
          <label className="inputlabeltext">Select PDF Files to Merge</label>
          <input
            type="file"
            multiple
            accept=".pdf"
            className="file-input"
            onChange={handleMergeFilesChange}
          />
        </div>
        <button 
          className="btn btn-primary w-100 mt-3" 
          onClick={handleMergeSubmit} 
          disabled={isMerging}
        >
          {isMerging ? "Merging..." : "Merge PDFs"}
        </button>
      </div>

      {/* Convert DOC to PDF Section */}
      {/* <div className="tool-section">
        <h5 className="tool-title">Convert DOC to PDF</h5>
        <div className="file-upload">
          <label className="inputlabeltext">Select a DOC File</label>
          <input
            type="file"
            accept=".doc, .docx"
            className="file-input"
            onChange={handleDocFileChange}
          />
        </div>
        <button
          className="btn btn-secondary w-100 mt-3"
          onClick={handleConvertSubmit}
          disabled={isConverting}
        >
          {isConverting ? "Converting..." : "Convert to PDF"}
        </button>
      </div> */}
      <ToastContainer />
    </div>
  );
};

export default DocumentTools;
