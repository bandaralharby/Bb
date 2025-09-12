document.getElementById('reportForm').addEventListener('submit', async function(e){
    e.preventDefault();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const reportName = document.getElementById('reportName').value;
    const reportDate = document.getElementById('reportDate').value;
    const reportPlace = document.getElementById('reportPlace').value;
    const teacherName = document.getElementById('teacherName').value;
    const directorName = document.getElementById('directorName').value;

    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];

    doc.setFontSize(16);
    doc.text(`اسم التقرير: ${reportName}`, 20, 30);
    doc.text(`تاريخ التقرير: ${reportDate}`, 20, 40);
    doc.text(`مكان التنفيذ: ${reportPlace}`, 20, 50);
    doc.text(`اسم المعلم: ${teacherName}`, 20, 60);
    doc.text(`اسم المدير: ${directorName}`, 20, 70);

    const addImage = (file, yPos) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            doc.addImage(imgData, 'JPEG', 20, yPos, 160, 90);
            resolve();
        };
        reader.readAsDataURL(file);
    });

    await addImage(image1, 80);
    await addImage(image2, 180);

    doc.setFontSize(12);
    doc.text("برمجة الأستاذ / بندر العلوي", 105, 290, { align: "center" });

    doc.save(`${reportName}.pdf`);
});