import { Card, Col, Row, Select, Typography, Avatar } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://i0.wp.com/blog.okcoin.com/wp-content/uploads/2020/01/Crypto-News-Roundup-Medium.jpg?w=1600&ssl=1";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  console.log(cryptoNews);
  if (!cryptoNews?.value) return "Loading... ";
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <>
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select A Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurrency" />
                {data?.data?.coins?.map((coin) => (
                  <Option value={coin.name}>{coin.name}</Option>
                ))}
                Cryptocurrency
              </Select>
            </Col>
          </>
        )}
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title level={4} className="news-title">
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="crypto-news-img"
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider0?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}{" "}
                    </Text>
                  </div>
                  <Text>
                    {" "}
                    {moment(news.datePublished).startOf("ss").fromNow()}{" "}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
