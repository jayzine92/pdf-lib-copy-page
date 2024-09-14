const express = require('express');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs/promises')

const app = express();
app.get('/merge', async (req, res) => {
    try {
        const pdfDoc = await PDFDocument.create()
        const pdfData1 = await fs.readFile('../PDF1.pdf');
        const pdfData2 = await fs.readFile('../PDF1.pdf');
        const loadPDF1 = await PDFDocument.load(pdfData1)
        const loadPDF2 = await PDFDocument.load(pdfData2)

        const [readPDF1] = await pdfDoc.copyPages(loadPDF1, [0]);
        const [readPDF2] = await pdfDoc.copyPages(loadPDF2, [0])
        pdfDoc.addPage(readPDF1);
        pdfDoc.addPage(readPDF2);

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        const dir = path.resolve('../', 'pdfs'); // Change 'pdfs' to your desired directory
        const filePath = path.join(dir, 'example.pdf');

        // Ensure the directory exists
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, pdfBytes);

        // Trigger the browser to download the PDF document
        res.send("pdf downloaded")
    } catch (error) {
        res.status(500).send(error);
        throw error;
    }
})
app.listen(3005, () => { console.log(12121)})