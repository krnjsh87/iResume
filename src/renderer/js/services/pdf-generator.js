// PDF Generator Service
// Uses jsPDF and html2canvas to generate PDF from preview

const PDFGenerator = {
    async generatePDF(previewElement, filename = 'resume.pdf') {
        try {
            // Show loading state
            console.log('Generating PDF...');

            // Use html2canvas to capture the preview as an image
            const canvas = await html2canvas(previewElement, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Get image data
            const imgData = canvas.toDataURL('image/png');

            // Calculate PDF dimensions (A4 size with margins)
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const margin = 20; // 20mm margins on all sides
            const contentWidth = pageWidth - (2 * margin);
            const contentHeight = pageHeight - (2 * margin);

            // Calculate scaled image dimensions
            const imgWidth = contentWidth;
            const imgHeight = (canvas.height * contentWidth) / canvas.width;

            // Create PDF using jsPDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            let heightLeft = imgHeight;
            let position = 0;

            // Add first page with margins
            pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight);
            heightLeft -= contentHeight;

            // Add additional pages if content exceeds one page
            while (heightLeft > 0) {
                position = -(contentHeight - (heightLeft - imgHeight));
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, margin + position, imgWidth, imgHeight);
                heightLeft -= contentHeight;
            }

            // Add metadata
            pdf.setProperties({
                title: filename.replace('.pdf', ''),
                author: 'iResume - Quan Aun',
                subject: 'Professional Resume',
                creator: 'iResume Desktop Application'
            });

            // Save PDF
            pdf.save(filename);

            console.log('PDF generated successfully');
            return { success: true };

        } catch (error) {
            console.error('Error generating PDF:', error);
            return { success: false, error: error.message };
        }
    },

    async generatePDFBlob(previewElement) {
        try {
            const canvas = await html2canvas(previewElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.setProperties({
                title: 'Professional Resume',
                author: 'iResume - Quan Aun',
                subject: 'Professional Resume',
                creator: 'iResume Desktop Application'
            });

            // Return as data URL for Electron save dialog
            return pdf.output('dataurlstring');

        } catch (error) {
            console.error('Error generating PDF blob:', error);
            return null;
        }
    }
};
