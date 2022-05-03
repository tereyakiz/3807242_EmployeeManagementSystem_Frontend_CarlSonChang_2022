import React from "react";

import { Statistic, Card, Row, Col } from "antd";
import Text from "antd/lib/typography/Text";
import styled from "@emotion/styled";
import color from "../../common/color";

const Container = styled.div`
  background-color: ${color.background};
  width: 100%;
  padding: 0 20px;
`;
const Heading = styled.h1`
  text-align: left;
`;

const Charts = () => {
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
                value={20}
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
                value={12001.03}
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
                value={15}
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
                value={30}
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
