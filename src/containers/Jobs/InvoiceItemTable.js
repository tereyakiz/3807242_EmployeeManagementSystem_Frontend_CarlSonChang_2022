import styled from '@emotion/styled';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button,  } from 'antd';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import InvoiceItemTable from './InvoiceItemTable';


import {
    addJobInvoiceItem,
	deleteJobInvoiceItem,
	getJobInvoiceItems,
    updateJobInvoiceItem
} from '../../services/jobInvoiceServices';
import { AppContext } from '../../store/AppState';

const addRow = {
    invoiceItemCost: '',
    invoiceItemDescription: '',
    key: 'add-row',
    isAddRow: true
}
const StyledTable = styled(Table)`
	& .editable-row .ant-form-item-explain {
		position: absolute;
		top: 100%;
		font-size: 12px;
	}
`;

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber controls={false} type='number' /> : <Input autoFocus/>;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: 'Can not be empty!',
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const EditableTable = ({ jobId }) => {
	const [form] = Form.useForm();
	const [invoiceItems, setInvoiceItems] = useState([{
        invoiceItemCost: 300,
        invoiceItemDescription: 'asdad',
        key: 'unique'
    }]);
	const [totalCost, setTotalCost] = useState(0);
	const [editingKey, setEditingKey] = useState('');

	const getInvoiceItems = useCallback(() => {
		getJobInvoiceItems(jobId).then((res) => {
			if (res?.invoiceItems) {
				let totalCost = 0;
				const invoiceItems = [];
				res.invoiceItems.forEach((invoiceItem) => {
					invoiceItems.push({
						...invoiceItem,
                        key: invoiceItem.invoiceItemId
					});
					totalCost += Number(invoiceItem.invoiceItemCost);
				});
				setInvoiceItems(invoiceItems);
				setTotalCost(totalCost);
			}
		});
	}, [jobId]);

    useEffect(() => {
        getInvoiceItems();
    }, [getInvoiceItems]);

    useEffect(() => {
        if (editingKey == '') {
            setInvoiceItems((invoiceItems) => {
                if (invoiceItems[invoiceItems.length - 1]?.key === 'add-row') {
                    invoiceItems.pop();
                    invoiceItems = [...invoiceItems];
                }
                return invoiceItems
            });
        }
    }, [editingKey])

	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({
			...record,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

    const updateItem = async (updatedRecord) => {
        const req = {
            invoiceItemCost: updatedRecord.invoiceItemCost,
            invoiceItemDescription: updatedRecord.invoiceItemDescription
        }
        const res = await updateJobInvoiceItem(req, jobId, updatedRecord.invoiceItemId);
        if (!res.error && !res.errors) {
            return res;
        }
    }

    const addItem = async ({invoiceItemCost, invoiceItemDescription}) => {
        const req = {
            invoiceItemCost,
            invoiceItemDescription
        }
        const res = await addJobInvoiceItem(req, jobId);
        if (!res.error && !res.errors) {
            return res;
        }
    }

    const deleteItem = async (record) => {
        const req = {
            invoiceItemCost: record.invoiceItemCost,
            invoiceItemDescription: record.invoiceItemDescription
        }
        let res = null
        try {
            res = await deleteJobInvoiceItem(req, jobId, record.invoiceItemId);
        } catch (err) {
            console.log(err);
        }
        if (res.status == 200 && !res.error && !res.errors) {
            const index = invoiceItems.findIndex((item) => record.key === item.key);
            const newTotal = totalCost - Number(invoiceItems[index].invoiceItemCost);
            const newData = [...invoiceItems];
            newData.splice(index, 1);
            setInvoiceItems(newData);
            setTotalCost(newTotal);
        }
    }

    const handleAdd = () => {
        if (invoiceItems[invoiceItems.length - 1]?.key !== 'add-row') {
            setInvoiceItems([...invoiceItems, {...addRow}])
        }
        setEditingKey('add-row');
    }

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const index = invoiceItems.findIndex((item) => key === item.key);
			if (key === 'add-row') {
				const res = await addItem(row);
                if (res) {
                    const newData = [...invoiceItems];
                    const newTotal = totalCost + Number(res.invoiceItemCost);
                    newData.pop();
                    newData.push({...res, key: res.invoiceItemId})
                    setInvoiceItems(newData);
                    setTotalCost(newTotal);
                }
			} else if (index >= -1) {
                const item = {...invoiceItems[index], ...row};
                const updatedItem = await updateItem(item)
                if (updatedItem) {
                    const newTotal = totalCost - Number(invoiceItems[index].invoiceItemCost) + Number(updatedItem.invoiceItemCost);
                    const newData = [...invoiceItems];
                    newData.splice(index, 1, { ...updatedItem });
                    setInvoiceItems(newData);
                    setTotalCost(newTotal);
                }
			}
            setEditingKey('');
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Invoice Item Description',
			dataIndex: 'invoiceItemDescription',
			width: '50%',
			editable: true,
		},
		{
			title: 'Invoice Item Cost',
			dataIndex: 'invoiceItemCost',
			editable: true,
		},
		{
			title: 'Action',
			dataIndex: 'Action',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</Typography.Link>
                        <a onClick={cancel}>Cancel</a>
					</span>
				) : (
					<>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                            style={{
                                marginRight: 8
                            }}
                        >
                            Edit
                        </Typography.Link>
                        <Popconfirm title='Sure to delete?' onConfirm={() => deleteItem(record)}>
                            <Typography.Link
                                disabled={editingKey !== ''}
                            >
                                <Typography.Text type='danger'>Delete</Typography.Text>
                            </Typography.Link>
                        </Popconfirm>
                    </>
				);
			},
		},
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'invoiceItemCost' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	return (
		<Form form={form} component={false}>
			<StyledTable
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={invoiceItems}
				columns={mergedColumns}
                footer={() => {
                    return <div style={{
                        display: 'flex',
                        padding: 0,
                        margin: 0,
                        justifyContent: 'space-between'
                    }}>
                        <Typography.Title level={5}>Total: {+totalCost.toFixed(2)}</Typography.Title>
                        <Button type="primary" onClick={handleAdd} disabled={!!editingKey}>
                            Add Row
                        </Button>
                    </div>
                }}
				rowClassName='editable-row'
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
};

export default EditableTable;
