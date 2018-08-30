import React from 'react';
import ReactTable from 'react-table';
import XLSX from 'xlsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUploads } from '../home/homeActions';
import axios from 'axios';

class LoginComponent extends React.Component {
    constructor() {
        super();
        
        this.state = {
            data: []
        }

        this.exportTable = this.exportTable.bind(this);
    }

    componentDidMount() {
        // get url param; in this case, the id number
        var decodedUrl = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '/' ) + 1 ) );
        var param = decodedUrl.lastIndexOf('/');
        var paramId = decodedUrl.substring(param + 1);

        // get api data
        axios.get('/api/test/'+ paramId).then((res) => {
            console.log('res: ', res);
            this.props.getUploads(res.data)
            console.log('did mount props: ', this.props.file);
            this.setState({
                data: this.props.file
            });
        })
        .catch(error => {
            console.log(error.res);
        });
    }

    exportTable(e) {
        e.preventDefault();
        // TODO: options for filtering data
        let dataToBeExported = this.reactTable.getResolvedState().sortedData;
        console.log('exporting table......', dataToBeExported);
        console.log('getResolvedData: ', this.reactTable.getResolvedState());

        var worksheet = XLSX.utils.json_to_sheet(dataToBeExported);
        var new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "TestTable");
        XLSX.writeFile(new_workbook, "export.xlsx");
    }


    render() {
    
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
            Header: 'Gender',
            accessor: 'gender'
        }];

        console.log('render this.props.file', this.props.file);
        const isNotEmpty = this.state.data.length > 0;
        const exportTable = 
            <div className="export-table">
                <ReactTable 
                    data={this.state.data} 
                    columns={columns} 
                    ref={(r)=>this.reactTable=r}
                    defaultPageSize={5}
                    minRows={5}/> 
                <button onClick={this.exportTable}>Export Table</button>
            </div>;
        return (
            <div className="login-container">
                {isNotEmpty ? exportTable : 'No data...'}
            <br/>
                
            </div>
        ) 
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators ({
        getUploads: getUploads
    }, dispatch);
}

function mapStateToProps(state) {
    return({
        file: state.home.files
    });
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginComponent);