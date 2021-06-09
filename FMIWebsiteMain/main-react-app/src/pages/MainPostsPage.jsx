import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Typography, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Posts } from "../components/Posts";

const { Content } = Layout;

export const MainPostsPage = () => {
  const [errorMessage, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const loadError = (mes) => message.error(mes);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
          loadError(error.toString());
        }
      );
  }, []);

  if (errorMessage) {
    return (
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title>Новости</Typography.Title>
      </Content>
    );
  } else {
    return (
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title>Новости...</Typography.Title>
        {!isLoaded ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingOutlined style={{ fontSize: "40px", color: "purple" }} />
          </div>
        ) : (
          <Posts posts={items} />
        )}
      </Content>
    );
  }
};
