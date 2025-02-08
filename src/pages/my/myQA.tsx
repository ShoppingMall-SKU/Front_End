import React from "react";
import ClientSidebar from "../../components/clientSidebar";

const MyQA = () => {
    return(
        <div style={{display: 'flex'}}>
            <ClientSidebar/>     
            <div style={{marginLeft: '20px', padding: '10px'}} >
                <h1>문의사항</h1>
                <p>문의사항 list</p>
            </div>
        </div>
    );
};

export default MyQA;