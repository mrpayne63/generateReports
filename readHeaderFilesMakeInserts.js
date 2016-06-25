var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'nodeuser',
    password : 'Cheese2000',
    database : 'HCRIS'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

var dir = 'headers/inserts'; 
var  files = fs.readdirSync(dir);
//console.log(files);
var cells = [];
  files.forEach(function(file) {
	  var thisFile = file;
		  
		  if(file.lastIndexOf("_")){
			  thisFile = file.substring(file.lastIndexOf("_")+1,file.length);
		  }
		  if(thisFile.lastIndexOf(".")){
			  thisFile = thisFile.substring(0,thisFile.lastIndexOf("."));
		  }
	  var fileContents = fs.readFileSync(dir + '/' + file);
		//console.log(fileContents.toString());
      var lines = fileContents.toString().split('\n');
      //console.log('******************');
      //console.log(lines.length );
      //console.log(lines );
      //console.log('******************');
      
      
      for (var i = 0; i < lines.length; i++) {
    	  cells.push(lines[i].toString().split(','));
      }
      
      //console.log(cells);
      var previousLine = null;
      var thisLine = 0;
      for (var i = 0; i < cells.length; i++) {
    	  

    	  if(cells[i][0]){
    		  thisLine = parseInt(cells[i][0]+"00", 10);
    		  
    	  }
    	  else{
    		  thisLine++;
    	  }
    	  //console.log(thisLine);
    	  
          for (var j = 1; j < cells[i].length; j++) {
          	
        	  if (cells[i][j].trim().length>0) {
          		var myLine = '';
          		if(i < 10){
          			myLine = "0" + thisLine.toString();
          		}else 
          			{
          			myLine = thisLine.toString();
          			}
          		
          		var myColumn = j-1 + "00";            		
          		while(myLine.length < 5){
          			myLine = "0" + myLine;
          		}
          		while(myColumn.length < 5){
          			myColumn = "0" + myColumn;
          		}
          		var myvalue = cells[i][j].trim() + '[line' + myLine +']col'+ myColumn;
          		myvalue = cells[i][j].trim().replace("'","\'");
					var sqlInsert = "INSERT INTO `HCRIS`.`STRONG_HEADERS2_2013` "
							+ "(`rpt_rec_num`,`wksht_cd`,`line_num`,`clmn_num`,`item`) "
							+ "VALUES(553807,'"
							+ thisFile + "','" + myLine + "','" + myColumn + "','"
							+ myvalue + "');"

					//data2[i][j] = cells[i][j];
					//console.log(sqlInsert);
					connection.query(sqlInsert,function(err, rows) {
						//console.log(rows);
						if(err){
							console.log(err);
						}
					});
				}
          }
         // console.log('\n');
      }
	  
	  
     

  });
  
  
  