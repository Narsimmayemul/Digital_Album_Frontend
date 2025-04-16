export const getDriveImages=()=>{

    // https://drive.google.com/drive/folders/1s75fNEAGJsW03QEWrX_6UsqMSCh7e_es?usp=sharing
    var folderId = "1s75fNEAGJsW03QEWrX_6UsqMSCh7e_es"; 
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.clear(); 
    sheet.appendRow(["File Name", "Image URL"]); 
  
    while (files.hasNext()) {
      var file = files.next();
      var fileId = file.getId();
      var fileName = file.getName();
      var imageUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
      
      sheet.appendRow([fileName, imageUrl]);
    }
    
    SpreadsheetApp.getUi().alert("Image URLs Generated Successfully!");
    console.log(sheet)
  }
  
