import { FileManagerComponent } from '@syncfusion/ej2-react-filemanager';
import React from 'react';

function FileManagerTool() {
    let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (
        <div className="control-section">
            <FileManagerComponent id="file" ajaxSettings={{
                url: hostUrl + "api/FileManager/FileOperations"
            }}/>
        </div>
    );
}

export default FileManagerTool;
