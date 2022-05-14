import React, { useEffect, useState, useCallback } from "react";

import { Statistic, Card, Row, Col } from "antd";
import styled from "@emotion/styled";
import color from "../../common/color";
import { getAnalytics } from "../../services/userServices";

const Container = styled.div`
  background-color: ${color.background};
  width: 100%;
  padding: 0 20px;
`;
const Heading = styled.h1`
  text-align: left;
`;
const Charts = () => {
  const [state, setState] = useState({
    issueCount: 0,
    jobCount: 0,
    revenue: 0,
    userCount: 0
  });
  const getAnalyticsData = useCallback(
    async () => {
        const res = await getAnalytics();
        if (res && !res.error && !res.errors) {
          setState(state => ({
            ...state,
            ...res
          }))
        }
    }, [setState]
  );

  useEffect(() => {
      getAnalyticsData();
  }, [getAnalyticsData])

  return (
    <>
      <Container>
        <Heading> Metrics</Heading>
        <Row gutter={16} style={{
          marginBottom: 16
        }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Jobs (last 30 days)"
                value={state.jobCount || 0}
                valueStyle={{ color: "#3f8600" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            {" "}
            <Card>
              <Statistic
                title="Revenue (last 30 days)"
                value={state.revenue || 0}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                // prefix={<ArrowDownOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="New Customers (last 30 days)"
                value={state.userCount || 0}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            {" "}
            <Card>
              <Statistic
                title="New Issues (last 30 days)"
                value={state.issueCount || 0}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                // prefix={<ArrowDownOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Charts;
