import React, { useContext, useEffect, useState, useCallback } from "react";
import InvoiceItemTable from './InvoiceItemTable';

import { Drawer } from "antd";
import { addJobInvoiceItem, deleteJobInvoiceItem, getJobInvoiceItems } from "../../services/jobInvoiceServices";
import { AppContext } from "../../store/AppState";

export default function JobInvoice ({ visible, record, handleClose }) {
    const title = record?.jobTitle || '';
    console.log(record, record?.jobId);

    return (
            <Drawer
                destroyOnClose
                title={`Invoice - ${title}`}
                width={720}
                onClose={() => handleClose()}
                visible={visible}
                bodyStyle={{ padding: 0 }}
              >
                <InvoiceItemTable jobId={record.jobId}/>
              </Drawer>
    );
}