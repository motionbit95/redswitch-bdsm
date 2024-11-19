import React, { useEffect, useState } from "react";
import { ConfigProvider, Button, FloatButton } from "antd";
import { SunOutlined as Sun, MoonOutlined as Moon } from "@ant-design/icons";
import Home from "./page/home";
import Questions from "./page/questions";
import View from "./page/view";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("/");

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryColor: "white",
            colorPrimary: "#1890ff",
            colorBgContainer: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
          },
          Typography: {
            colorTextHeading: theme === "dark" ? "#fff" : "#000",
            colorText: theme === "dark" ? "#ddd" : "#555", // 기본 텍스트 색상
          },
          Form: {
            labelColor: theme === "dark" ? "#fff" : "#000",
          },
          Input: {
            colorBgContainer: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
            colorBorder: theme === "dark" ? "#8c8c8c" : "#c8c8c8",
          },
          Select: {
            colorBgContainer: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
            colorBorder: theme === "dark" ? "#8c8c8c" : "#c8c8c8",
            colorBgElevated: theme === "dark" ? "#222" : "#fff",
            colorBgContainer: theme === "dark" ? "#222" : "#fff",
            optionSelectedColor: theme === "dark" ? "#fff" : "#000",
            optionSelectedBg: theme === "dark" ? "#222" : "#ddd",
          },
          Checkbox: {
            colorBgContainer: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
            colorBorder: theme === "dark" ? "#8c8c8c" : "#c8c8c8",
          },
          Radio: {
            colorBgContainer: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
            colorBorder: theme === "dark" ? "#8c8c8c" : "#c8c8c8",
          },
          Modal: {
            contentBg: theme === "dark" ? "#141414" : "#fff",
            headerBg: theme === "dark" ? "#141414" : "#fff",
            footerBg: theme === "dark" ? "#141414" : "#fff",
            colorText: theme === "dark" ? "#fff" : "#000", // 기본 텍스트 색상
            colorBorder: theme === "dark" ? "#8c8c8c" : "#c8c8c8",
            titleColor: theme === "dark" ? "#fff" : "#000",
          },
        },
      }}
    >
      <div
        style={{
          background: theme === "dark" ? "#000" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} setPage={setPage} />}
            />
            <Route
              path="/questions"
              element={<Questions theme={theme} setPage={setPage} />}
            />
            <Route
              path="/view"
              element={<View theme={theme} setPage={setPage} />}
            />
          </Routes>
        </BrowserRouter>
        {/* <FloatButton
          type={theme === "dark" ? "primary" : "default"}
          icon={theme === "dark" ? <Sun /> : <Moon />}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        /> */}
      </div>
    </ConfigProvider>
  );
};

export default App;
