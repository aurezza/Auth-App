import React from 'react';
import ReactFileReader from 'react-file-reader';
import CsvParse from '@vtex/react-csv-parse';
import ReactTable from 'react-table';
import axios from 'axios';
import XLSX from 'xlsx';

// using native js for parsing https://mounirmesselmeni.github.io/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/
// react-table accessing sortedData https://github.com/react-tools/react-table/wiki/FAQ#how-do-i-get-at-the-internal-data-so-i-can-do-things-like-exporting-to-a-file

class CsvUploader extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataToCsv: null
        };

        this.handleFiles = this.handleFiles.bind(this);
        this.displayData = this.displayData.bind(this);
        this.processData = this.processData.bind(this);
        this.exportTable = this.exportTable.bind(this);
        
    }

    // read uploaded file(csv)
    handleFiles(e, prevData, callback) {
        let test = prevData;
        var reader = new FileReader();
        reader.onload = function(e) {
            // return result to handler
            let readData = reader.result;
            // process read data
            callback(readData);
        }
        console.log('this is the file: ', e[0]);
        reader.readAsText(e[0]);
    }

    // display data and pass to controller
    displayData(csvData) {
        let processedData = this.processData(csvData);
        this.setState({
            data: processedData
        });
        const _csrf = document.querySelector('[name=csrf_token]').content;
        const config = {
            headers: {
                'X-XSRF-TOKEN': _csrf
            }
        };
        console.log('going to axios...');

        // assign the passed value as object/array
        axios.post('/csv', {fileData: processedData}, config).then((res) => {
            console.log('res: ', res);
        })
        .catch(error => {
            console.log(error.res);
        });
    }

    processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var processedData = [];
        for (var i=0; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(';');
            var newObj = {};
            for (var j=0; j < data.length; j++) {
                var newArray = data[j].split(','); 
                for (var k=0; k < 1; k++) {
                    var obj = {
                        'id': newArray[0],
                        'first_name': newArray[1],
                        'last_name': newArray[2],
                        'email': newArray[3],
                        'gender': newArray[4],
                        'test': newArray[5]
                    };
                    newObj = Object.assign({}, obj);
                }
            }
            processedData.push(newObj);
        } 

        console.log('processedData ', processedData);
        processedData.shift(); // removed first row from uploaded csv(headers)
        return processedData;
    }

    exportTable(e) {
        e.preventDefault();
        // TODO: options for filtering data
        let dataToBeExported = this.reactTable.getResolvedState().sortedData;
        console.log('get')
        console.log('exporting table......', dataToBeExported);
        console.log('getResolvedData: ', this.reactTable.getResolvedState());

        var worksheet = XLSX.utils.json_to_sheet(dataToBeExported);
        var new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "TestTable");
        XLSX.writeFile(new_workbook, "sample-export.xlsx");
    }

    render(){
        const columns = [{
            Header: 'ID',
            accessor: 'id' 
          }, {
            Header: 'First Name',
            accessor: 'first_name'
          }, {
            Header: 'Last Name',
            accessor: 'last_name'
          },{
            Header: 'Email',
            accessor: 'email'
          },{
            Header: 'Genderr',
            accessor: 'gender'
          },{
            Header: 'Test',
            accessor: 'test',
            show: false
          }];
          
        return(
            <div className="csv-uploader" >
                <ReactFileReader handleFiles={(e) => this.handleFiles(e, this.state.data, this.displayData)} fileTypes={'.csv'}>
                    <button className="btn">Upload CSV</button>
                </ReactFileReader>
                Your uploaded CSV data: <br/>
                <ul className="display-csv">
                        {this.state.data.map((item) => {
                                return (
                                    <li key={item.id}>{item.first_name},
                                    {item.last_name},
                                    {item.email},
                                    {item.gender}
                                    </li>
                                )
                        })}
                </ul>

                <ReactTable 
                    data={this.state.data} 
                    columns={columns} 
                    ref={(r)=>this.reactTable=r}
                    defaultPageSize={5}
                    minRows={5}
                />
                
                
                <button onClick={this.exportTable}>Export Table</button>
                <br/>
            </div>
        )
    }
}

export default CsvUploader;