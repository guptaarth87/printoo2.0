import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const addPage = async (file, userData) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Load the uploaded PDF
    const fileArrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileArrayBuffer);

    // Embed a font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Create a new blank page at the beginning
    const newPage = pdfDoc.insertPage(0, [600, 400]);

    // Add user details to the new front page
    newPage.drawText(`Name: ${userData.uname}`, {
      x: 50,
      y: 350,
      size: 14,
      font: font,
      color: rgb(0, 0, 0),
    });
    newPage.drawText(`Email: ${userData.email}`, {
      x: 50,
      y: 330,
      size: 14,
      font: font,
      color: rgb(0, 0, 0),
    });
    newPage.drawText(`Phone: ${userData.phoneno}`, {
      x: 50,
      y: 310,
      size: 14,
      font: font,
      color: rgb(0, 0, 0),
    });
    newPage.drawText(`Address: ${userData.address}`, {
      x: 50,
      y: 290,
      size: 14,
      font: font,
      color: rgb(0, 0, 0),
    });

    // Save the updated PDF
    const updatedPdfBytes = await pdfDoc.save();
    const modifiedBlob = new Blob([updatedPdfBytes], { type: 'application/pdf' });

    return modifiedBlob;
  } catch (error) {
    console.error('Error modifying PDF:', error);
    throw error;
  }
};
