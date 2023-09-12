function ImportarCSV() {
  // Especifica el término de búsqueda para encontrar el correo electrónico deseado en Gmail.
  var searchQuery = 'subject:"xxxxxxxxx"';
  var threads = GmailApp.search(searchQuery, 0, 1);
  
  // Verifica si se encontraron hilos de correo electrónico que coincidan con la búsqueda.
  if (threads.length > 0) {
    var messages = threads[0].getMessages();
    var attachments = messages[0].getAttachments();
    
    // Verifica si el correo electrónico contiene archivos adjuntos.
    if (attachments.length > 0) {
      var attachment = attachments[0];
      var attachmentName = attachment.getName();
      
      // Verifica si el archivo adjunto es un archivo CSV.
      if (attachmentName.substring(attachmentName.length - 4) === ".csv") {
        // Especifica la ID de la hoja de cálculo de Google Sheets y el nombre de la pestaña.
        var spreadsheetId = "xxxxxxxxx";
        var sheetName = "xxxxxxxxx";
        
        // Abre la hoja de cálculo y obtiene la pestaña especificada.
        var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
        
        // Convierte los datos CSV en una matriz y omite las primeras 22 filas (si es necesario).
        var csvData = Utilities.parseCsv(attachment.getDataAsString(), ",");
        csvData.splice(0, 22);
        
        // Escribe los datos en la hoja de cálculo, comenzando en la celda B2.
        sheet.getRange(2, 2, csvData.length, csvData[0].length).setValues(csvData);
      }
    }
  }
}
