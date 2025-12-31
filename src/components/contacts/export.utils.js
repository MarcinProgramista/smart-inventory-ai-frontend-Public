import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatPhone } from "./contact.utils";

export function exportContactsToCSV(contacts) {
  if (!contacts || contacts.length === 0) return;

  const headers = ["First name", "Last name", "Email", "Phone", "Role"];

  const rows = contacts.map((c) => [
    c.first_name || "",
    c.last_name || "",
    c.email || "",
    formatPhone(c.mobile_phone),
    c.role || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export function exportContactsToPDF(contacts) {
  if (!contacts || contacts.length === 0) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Contacts", 14, 15);

  const tableColumn = ["First name", "Last name", "Email", "Phone", "Role"];

  const tableRows = contacts.map((c) => [
    c.first_name || "",
    c.last_name || "",
    c.email || "",
    formatPhone(c.mobile_phone),
    c.role || "",
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 25,
    styles: {
      fontSize: 9,
    },
    headStyles: {
      fillColor: [30, 144, 255], // delikatny niebieski
    },
  });

  doc.save("contacts.pdf");
}
