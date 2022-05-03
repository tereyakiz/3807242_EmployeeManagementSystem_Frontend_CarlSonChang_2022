import React, { useContext, useEffect, useState, useCallback } from "react";

import {
    Row,
    Col,
    Input,
    Drawer,
    Form,
    Comment,
    Button,
    Typography,
  } from "antd";
  const { Text, Title } = Typography;
  import { getCustomerCommentsByJobId, addCustomerComment } from "../../services/customerCommentServices";
import { AppContext } from "../../store/AppState";

export default function JobComments ({ visible, record, handleClose }) {
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const title = record?.jobTitle || '';
    const { users, userInfo } = useContext(AppContext);

    const getComments = useCallback(
        () => {
            getCustomerCommentsByJobId(record?.jobId)
            .then(res => {
                if (res?.comments) {
                    const nameMap = res.comments.reduce((map, user) => {
                        map[user.createdBy] = 'Customer';
                        return map;
                    }, {})
                    users.forEach(user => {
                        if (nameMap[user.accountUserId]) {
                            nameMap[user.accountUserId] = (user.firstname || '') + " " + (user.lastname || '')
                        }
                    });
                    const comments = res.comments.map(comment => ({
                        ...comment,
                        createdByName: nameMap[comment.createdBy]
                    }));
                    setComments(comments);
                }
            });
        }, [record?.jobId, users]
    );

    const onSubmit = async () => {
        const errors = [];
        if (!comment) {
            errors.push('Please enter comment');
        }
        setErrors(errors)
        if (errors.length) {
            return;
        }
        try {
            const req = {
                commentText: comment
            }
            const res = await addCustomerComment(req, record?.jobId);
            if (res?.errors) {
                setErrors([...Object.values(res?.errors)]);
            } else if (res?.error) {
                setErrors([res?.error]);
            } else {
                const addedComment = {...res};
                setComment('');
                addedComment.createdByName = 'Unknown';
                if (userInfo?.user) {
                    addedComment.createdByName = (userInfo?.user.firstname || '') + " " + (userInfo?.user.lastname || '')
                }
                setComments([addedComment, ...comments])
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getComments();
    }, [getComments])

    return (
            <Drawer
                destroyOnClose
                title={`Job Comments - ${title}`}
                width={720}
                onClose={() => handleClose()}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
              >
                <Form
                  layout="vertical"
                  hideRequiredMark
                  initialValues={{ remember: true }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                            name="comment"
                            label="Comment"
                            initialValue={comment}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter comment",
                                },
                            ]}
                            >
                            <Input.TextArea
                                placeholder="Enter Comment"
                                value={comment}
                                rows="4"
                                onChange={(e) => {
                                setComment(e.target.value);
                                }}
                            />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        {
                            (errors.length > 0) && <Col>
                                {errors?.map((err, index) => (
                                    <div key={index} style={{ width: "100%" }}>
                                        <Text type="danger">{err}</Text>
                                    </div>
                                ))}
                            </Col>
                        }
                        <Col style={{
                            marginLeft: 'auto'
                        }}>
                            <Button type="primary" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <br />
                <Title level={2}>Comments:</Title>
                {
                    comments.map(comment => {
                        return <Comment
                                key={comment.commentId}
                                author={<span>{comment.createdByName}</span>}
                                content={
                                    <p>{comment.commentText}</p>
                                }
                            />
                    })
                }
              </Drawer>
    );
}