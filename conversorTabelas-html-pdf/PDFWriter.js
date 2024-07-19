import pdf from "html-pdf";

class PDFWriter {
  static WritePDF(filename, html) {
    return new Promise((resolve, reject) => {
      pdf.create(html).toFile(filename, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'PDF generated successfully', filename });
        }
      });
    })
  }

}

export default PDFWriter