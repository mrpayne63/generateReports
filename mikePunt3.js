var fs = require('fs');
var mysql = require('mysql');

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

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

var connection2 = mysql.createConnection({
    host : 'localhost',
    user : 'nodeuser',
    password : 'Cheese2000',
    database : 'HCRIS'
});

connection2.connect(function(err) {
    if (!err) {
        console.log("Database2 is connected ... nn");
    } else {
        console.log("Error2 connecting database ... nn");
    }
});


var prod = true;
var baseDir = 'debug/';
var sql = "select RPT_REC_NUM,WKSHT_CD from HCRIS.STRONG_DATA_2013 group by RPT_REC_NUM,WKSHT_CD order by RPT_REC_NUM,WKSHT_CD";
var spacerArray = new Array();
spacerArray[0] = '';
spacerArray[1] = '';

var tmpSheetLetter = 'FIRST';

if(prod) {
	baseDir = 'reports/';
}

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

connection.query(sql,function(err, rows) {
	 var tmpHospID = rows[0].RPT_REC_NUM;
     var tmpReportID = rows[0].WKSHT_CD;
     var tmpSheetLetter = 'FIRST';
     var sheetArray = new Array();
     var sheetArrayPROD = new Array();
     var reportArray2 = new Array();
     var thisReportHeared = new Array();
     var thisReportHearedCSV = '';
     var tmpLine0 = new Array();
     
	for (i = 0; i < rows.length; i++) {

        tmpLine0[0] = rows[i].WKSHT_CD + ' Report';
        sql2 = "select RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from HCRIS.STRONG_DATA_2013 where RPT_REC_NUM like '"
                + rows[i].RPT_REC_NUM
                + "' and WKSHT_CD like '"
                + rows[i].WKSHT_CD
                //+ "' union select RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM,item myvalue from HCRIS.STRONG_HEADERS_2013 where RPT_REC_NUM like '"
                //+ rows[i].RPT_REC_NUM
                //+ "' and WKSHT_CD like '"
                //+ rows[i].WKSHT_CD
                
                + "' order by RPT_REC_NUM,WKSHT_CD,LINE_NUM,CLMN_NUM";
       // console.log(sql2);
        connection2.query(sql2,    function(err, rows2) {


            mydir = baseDir + rows2[0].RPT_REC_NUM;

            if (!fs.existsSync(mydir)) {
                fs.mkdirSync(mydir);
            }


            var myfile2 = mydir
                    + '/' + tmpReportID
                    + '.csv';

            var tmpLineNUM = '';
            var tmpColumnNUM = '';
            var newFile = true;
            var tmpArray2 = new Array();
           
            var tmpLine = '';
            var lineCount = 1;

            for (i = 0; i < rows2.length; i++) {

                var thisHospID = rows2[i].RPT_REC_NUM;
                var thisReportID = rows2[i].WKSHT_CD;
                var thisLineNUM = rows2[i].LINE_NUM;
                var thisColumnNUM = rows2[i].CLMN_NUM;
                var thisSheetLetter = rows2[i].WKSHT_CD.substring(0,1);


                switch (rows2[i].WKSHT_CD.substring(0,4))
                {
                   case "A000":
                      thisReportHearedCSV = 'headers/templates/A000Header.csv';
                      fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "A600":
                       thisReportHearedCSV = 'headers/templates/A600Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "A700":
                       thisReportHearedCSV = 'headers/templates/A700Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "A800":
                       thisReportHearedCSV = 'headers/templates/A800Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "A810":
                       thisReportHearedCSV = 'headers/templates/A810Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "A820":
                       thisReportHearedCSV = 'headers/templates/A820Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "B000":
						thisReportHearedCSV = 'headers/templates/'+rows2[i].WKSHT_CD+ '.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                   case "B100":
						thisReportHearedCSV = 'headers/templates/B100Header.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                   case "C000":
                	    thisReportHearedCSV = 'headers/templates/'+rows2[i].WKSHT_CD+ '.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                  case "C100":
						thisReportHearedCSV = 'headers/templates/C100Header.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                  case "D000":
                      thisReportHearedCSV = 'headers/templates/D000Header.csv';
                      fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "D100":
                       thisReportHearedCSV = 'headers/templates/D100Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "D300":
                       thisReportHearedCSV = 'headers/templates/D300Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "D400":
                       thisReportHearedCSV = 'headers/templates/D400Header.csv';
                       fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+'.csv', fs.readFileSync(thisReportHearedCSV));
                       break;
                   case "S000":
						thisReportHearedCSV = 'headers/templates/'+rows2[i].WKSHT_CD+ '.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                  case "S100":
						thisReportHearedCSV = 'headers/templates/S100Header.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                  case "S200":
						thisReportHearedCSV = 'headers/templates/'+rows2[i].WKSHT_CD+ '.csv';
						fs.writeFileSync('headers/'+rows2[i].WKSHT_CD+ '.csv', fs.readFileSync(thisReportHearedCSV));
						break;
                   default:
                       thisReportHearedCSV = 'NoHeader.csv';
                       //console.log(' **************** NO HEADER for Report '+ rows2[i].WKSHT_CD +'******************');

                }
                
                
                if(tmpSheetLetter != thisSheetLetter){
                     sheetArray = new Array();
                    tmpSheetLetter = thisSheetLetter;
                }
                if (tmpHospID != thisHospID) {
                    tmpHospID = thisHospID;
                    newFile = true;
                }
                if (tmpReportID != thisReportID) {

                	tmpReportID = thisReportID;
                    newFile = true;
                }
                if (newFile) {

                    myfile2 = mydir
                            + '/'
                            + rows2[i].WKSHT_CD
                            + '.csv';
                    newFile = false;
                }

                if (tmpLineNUM != thisLineNUM) {
                    if (tmpLineNUM) {
                        tmpArray2[0] = 'Line(' + tmpLineNUM +')';
                        reportArray2[lineCount++] = tmpArray2;
                        tmpArray = new Array();
                        tmpArray2 = new Array();

                    }
                    tmpLineNUM = thisLineNUM;

                }

                tmpColumnNUM = parseInt(thisColumnNUM) / 100;
                tmpLine0[tmpColumnNUM + 1] = rows2[i].WKSHT_CD + '[' +thisColumnNUM + ']';
                if (prod){
                	tmpLine0[tmpColumnNUM + 1] = '______________';
                }

                var someText = rows2[i].myvalue;
                someText = someText.replace(
                        /(\r\n|\n|\r)/gm, "");
                tmpArray2[tmpColumnNUM + 1] = someText;

            }  // end row2 for loop
            tmpLine0[0] =  'Report (' + thisReportID + ')';
            var data2 ;
            //data2[0] = '';


            if(thisReportHearedCSV)
            {
                var cells = [];
                var fileContents = fs.readFileSync(thisReportHearedCSV);
                var lines = fileContents.toString().split('\n');
                //console.log('******************');
                //console.log(lines.length );
                //console.log(lines );
                //console.log('******************');
                var getLines = lines.length -1;
                for (var i = 0; i < getLines; i++) {
                    cells.push(lines[i].toString().split(','));
                }

                //data2 = createArray(lines.length,people[0].length);
                for (var i = 0; i < cells.length; i++) {

                    for (var j = 1; j < cells[i].length; j++) {
                        //data2[i][j] = cells[i][j];
                        //console.log(cells[i][j]);
                    }
                   // console.log('\n');
                }
                //console.log('\n');
                //console.log(cells);
                //console.log('___________________________');
                //console.log('\n');
                data2 = cells;
            }


            reportArray2[0] = tmpLine0;
            if(data2){
                data2 = data2.concat(reportArray2);
                reportArray2 = data2;
            }

            
            if (!prod) {
				var mycsv = reportArray2.map(function(d) {
					return JSON.stringify(d);
				}).join('\n').replace(/(^\[)|(\]$)/mg, '').replace(/null/mg,
						' ');
				fs.writeFile(myfile2, mycsv, function(err) {
					if (err)
						throw err;
					console.log(myfile2 + ' saved');
				});
			}
			sheetArray = sheetArray.concat(reportArray2);
            sheetArray = sheetArray.concat(spacerArray);


            reportArray2 = new Array();
            tmpLine0 = new Array();
            
            // write sheet report
            if (!prod) {
            tmpFile2 = mydir + '/Sheet_' + tmpSheetLetter + '.csv';

           
            
            sheetArrayPROD = createArray(sheetArray.length, 20);

                for (var s = 0; s < sheetArray.length; s++) {
                    //console.log(sheetArray[s].length);
                    for (var t = 1; t < sheetArray[s].length; t++) {
                    	sheetArrayPROD[s][t - 1] = sheetArray[s][t];
                    }

                }
        
            
				var csv4 = sheetArray.map(function(d) {
					return JSON.stringify(d);
				}).join('\n').replace(/(^\[)|(\]$)/mg, '').replace(/null/mg,
						' ');
				fs.writeFile(tmpFile2, csv4, function(err) {
					if (err)
						throw err;
					console.log(tmpFile2 + ' saved');
				});
			}
			var tmpFile3 = mydir + '/PRODSheet_' + tmpSheetLetter + '.csv';

            var csv5 = sheetArrayPROD.map(function(d) {
                return JSON.stringify(d);
            }).join('\n').replace(/(^\[)|(\]$)/mg, '')
            .replace(/null/mg, ' ');

            //console.log(csv3);

            fs.writeFile(tmpFile3, csv5, function(err) {
                if (err)
                    throw err;
                console.log(tmpFile3 + ' saved');
            });
            
            
            

            
        }); // end connection2 callback

    } // end top for loop
	

}); // end connection callback
