import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import {
    Row,
    Col,
    Rate,
    Typography,
    Comment,
  } from "antd";
  const { Title } = Typography;
import { getAccountCustomerReviews } from "../../services/customerReviewServices";
import { AppContext } from "../../store/AppState";

const Container = styled.div`
  width: 100%;
  padding: 16px;
`;

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

export default function JobReviews () {
    const [reviews, setReviews] = useState([]);
    const { users, userInfo } = useContext(AppContext);

    const getReviews = useCallback(
        () => {
            getAccountCustomerReviews()
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
        }, [users]
    );

    useEffect(() => {
        getReviews();
    }, [getReviews])

    return (
        <Container>
            <Title level={2}>Reviews</Title>
            {
                reviews.map(review => {
                    return <Review key={review.reviewId} review={review} />
                })
            }
        </Container>
    );
}