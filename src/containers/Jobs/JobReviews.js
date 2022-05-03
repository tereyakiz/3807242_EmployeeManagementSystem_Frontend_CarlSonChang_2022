import React, { useContext, useEffect, useState, useCallback } from "react";

import {
    Row,
    Col,
    Input,
    Drawer,
    Form,
    Rate,
    Button,
    Typography,
    Comment,
  } from "antd";
  const { Text, Title } = Typography;
  import { getCustomerReviewsByJobId, addCustomerReview } from "../../services/customerReviewServices";
import { AppContext } from "../../store/AppState";

function Review({ review }) {
    return <Comment
    author={
        <Row gutter={16} >
            <Col style={{
                paddingTop: 2
            }}>
                <h3>{review.createdByName}</h3>
            </Col>
            <Col>
                <Rate allowHalf value={review.ratingCount} disabled />
            </Col>
        </Row>
    }
    content={
        <p>{review.ratingText}</p>
    }
/>
}

export default function JobReviews ({ visible, record, handleClose }) {
    const [reviews, setReviews] = useState([]);
    const [errors, setErrors] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const { users, userInfo } = useContext(AppContext);

    const title = record?.jobTitle || '';
    const getReviews = useCallback(
        () => {
            getCustomerReviewsByJobId(record?.jobId)
            .then(res => {
                if (res?.reviews) {
                    const nameMap = res.reviews.reduce((map, user) => {
                        map[user.createdBy] = 'Customer';
                        return map;
                    }, {})
                    users.forEach(user => {
                        if (nameMap[user.accountUserId]) {
                            nameMap[user.accountUserId] = (user.firstname || '') + " " + (user.lastname || '')
                        }
                    });
                    const reviews = res.reviews.map(review => ({
                        ...review,
                        createdByName: nameMap[review.createdBy]
                    }));
                    setReviews(reviews);
                }
            });
        }, [record?.jobId, users]
    );

    const onSubmit = async () => {
        const errors = [];
        if (!rating) {
            errors.push('Please provide rating');
        }
        if (!review) {
            errors.push('Please provide review comments');
        }
        setErrors(errors)
        if (errors.length) {
            return;
        }
        try {
            const req = {
                ratingText: review,
                ratingCount: rating
            }
            const res = await addCustomerReview(req, record?.jobId);
            if (res?.errors) {
                setErrors([...Object.values(res?.errors)]);
            } else if (res?.error) {
                setErrors([res?.error]);
            } else {
                const addedReview = {...res};
                setRating(0);
                setReview('');
                addedReview.createdByName = 'Customer';
                if (userInfo?.user) {
                    addedReview.createdByName = (userInfo?.user.firstname || '') + " " + (userInfo?.user.lastname || '')
                }
                setReviews([addedReview, ...reviews])
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getReviews();
    }, [getReviews])

    return (
            <Drawer
                destroyOnClose
                title={`Job Reviews - ${title}`}
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
                                name="review"
                                label="Review"
                            >
                            <Input.TextArea
                                name="review"
                                placeholder="Enter Review"
                                value={review}
                                rows="4"
                                onChange={(e) => {
                                    setReview(e.target.value);
                                }}
                            />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col style={{
                            paddingTop: 6
                        }}>
                            <label>Rating:</label>
                        </Col>
                        <Col span={6}>
                            <Rate allowHalf value={rating} onChange={setRating} />
                        </Col>
                        <Col style={{
                            marginLeft: 'auto'
                        }}>
                            <Button type="primary" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Col>
                    {
                        (errors.length > 0) && <Col span={24}>
                            {errors?.map((err, index) => (
                                <div key={index} style={{ width: "100%" }}>
                                    <Text type="danger">{err}</Text>
                                </div>
                            ))}
                        </Col>
                    }
                    </Row>
                </Form>
                <br />
                <Title level={2}>Reviews:</Title>
                {
                    reviews.map(review => {
                        return <Review key={review.reviewId} review={review} />
                    })
                }
              </Drawer>
    );
}