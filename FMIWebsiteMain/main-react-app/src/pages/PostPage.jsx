import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb, Typography, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

export const PostPage = (props) => {
  const [errorMessage, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState();

  const loadError = (mes) => message.error(mes);
  const postId = props.match.params.post_id;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItem(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
          loadError(error.toString());
        }
      );
  }, [postId]);

  if (errorMessage) {
    return (
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link path="/">Главная</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link path="/">Новости</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title>Новости</Typography.Title>
      </Content>
    );
  } else {
    return (
      <Content style={{ padding: "0 50px" }}>
        {item && (
          <>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Главная</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/">Новости</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Пост от {item.id}</Breadcrumb.Item>
            </Breadcrumb>
            <Typography.Title>{item.title}</Typography.Title>
          </>
        )}
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
        ) : item ? (
          <Typography.Paragraph>{item.body}</Typography.Paragraph>
        ) : (
          "nothing to display"
        )}
      </Content>
    );
  }
};
