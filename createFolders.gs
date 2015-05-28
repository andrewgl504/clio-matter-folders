function createMatterFolders(matterFolder, practiceArea) {
  
  /*CONFIGURATION
  You'll need to set these two variables to your exact preferences
  The subFolders variable will determine which folders are created. Change the name and number of folders to customize to your own needs 
  At this time, this script does not support sub-sub folders.
  */
  var subFolders = ["1 Pleadings", "2 Correspondence", "3 Documents", "4 Word Processing", "5 Depositions", "6 Legal Research", "7 Attorney Notes", "8 Trial Docs", "9 Billing"];
  //Set the folderID of the "Clio" Folder
  var folderId = '0BzSW3TaMzBlLbExaaERmVVNoNWs'; //This is the LIVE clio foler
  
  /*END OF CONFIGURATION
  DO NOT MODIFY ANYTHING BELOW THIS LINE*/

  //DocsList.createFolder('Folder1').createFolder('Subfolder1').createFile('File1', 'Empty');
  var start = new Date().getTime(); 
  
  //var folderId = '0BzSW3TaMzBlLOFF0cFJ2ZmJZTmc'; //This is the testing folder
  
  //Set folder as object
  var folder = DriveApp.getFolderById(folderId);
  
  var clientFolders = folder.getFolders();
 
  //Loop through the folders at the client folder level
  while (clientFolders.hasNext()) {
    var clientFolder = clientFolders.next();
    //Logger.log(clientFolder.getName()); 
    
    //Use an if statement here with getDateCreated() and getLastUpdated() to determine whether it's been updated 
    //Problem is that these are generally not the same, so I'm not sure we can use these do much of anything.
    //Logger.log("Date Created: "+clientFolder.getDateCreated());
    //Logger.log("Date Last Updated: "+clientFolder.getLastUpdated());
    
    var clientFolderId = clientFolder.getId();
    //Logger.log(clientFolderId);
    
    //Now go one down into that folder
    var matterFolders = clientFolder.getFolders();
    //Logger.log(matterFolders);
    
    //Now loop through those folders at the client level
    while (matterFolders.hasNext()) {
      var matterFolder = matterFolders.next();
      //Logger.log(matterFolder.getName());
      
      //Now let's actually create the subFolders
      var subFoldersLength = subFolders.length;
      
      /*var existingSubs = matterFolder.getFolders();
      
      while (existingSubs.hasNext()) {
        var subFolder = matterFolder
      }*/ //We're not going to do this loop becuase it won't work if there's nothing to loop
    
      
      //Now actually create the folders
      //We're actually going to go thorugh and see if the folder exists. If not, create it.
      //To save time, we're only going to create the folder structure in completely empty folders
      var subFolder = matterFolder.getFolders();
      if (subFolder.hasNext() === false ) {
        //Then create the folders
        for (var i = 0; i < subFoldersLength; i++) {
          Logger.log("Create Folder "+subFolders[i]+" in the Matter folder "+matterFolder.getName());
          var sub = matterFolder.createFolder(subFolders[i]);   
        }
       } else {
         Logger.log("Folder "+matterFolder.getName()+" already has children, so move on here");
       }       

    }

  }
  var end = new Date().getTime();
  var time = end - start;
  Logger.log("Execution time: " + time);
}
