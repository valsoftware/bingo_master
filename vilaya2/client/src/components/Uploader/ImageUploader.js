import * as React from 'react';
import { Upload } from '@progress/kendo-react-upload';
import '@progress/kendo-theme-material/dist/all.css';

export default class App extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             url:this.props.api,
             restrictFiles:this.props.restrictFiles,
             multipleFiles:this.props.multipleFiles
        }
    }
    
    render() {
        return (
            <div style={{maxWidth: '500px', margin: "20px auto"}}>
            
            <Upload
                autoUpload={false}
                batch={false}
                multiple= {this.state.multipleFiles}
                defaultFiles={[]}
                restrictions={{
                    allowedExtensions:  this.state.restrictFiles 
                }}
                withCredentials={false}
                saveUrl={this.props.api}
                removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
            />
            </div>
        );
    }
}