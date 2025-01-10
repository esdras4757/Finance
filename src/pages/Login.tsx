/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Flex, message, Spin } from "antd";
import { FontColorsOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, progress } from "motion/react";
import { useAuth } from "../components/AuthProvider";
import { useUser } from '../providers/UserProvider';

const Login = () => {
  const [error, setError] = useState("");
  const [isRegisterMode, setisRegisterMode] = useState(false);
  const { loginFn } = useAuth();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const {updateUser} = useUser();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  console.log(import.meta.env.VITE_URL_BASE);
  // sessionStorage.removeItem("token");

  const loginFetch = async (values: any) => {
    console.log("Received values of form: ", values);

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BASE}/api/auth`,
        values
      );
      const { data } = response;
      sessionStorage.setItem("token", JSON.stringify(data.user));
      if (response) {
        loginFn();
        navigate("/dashboard");
        updateUser(data.user);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      }
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const registerFetch = async(values: any) => {
    console.log("Received values of form: ", values);
    
    try {
      const response = await axios.post("http://192.168.1.90:5001/api/users", values);
      const { data } = response;
      sessionStorage.setItem("token", JSON.stringify(data.user));
      if (response) {
        loginFn();
        navigate("/dashboard");
      }
    } catch (error:any) {
      if (error.response.status === 401) {
        setError("El correo ya a sido registrado");
      }
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("token");
  }, []);

  const section1 = (
    <Form
      className="login-form"
      name="login"
      initialValues={{ remember: true }}
      style={{ width: "100%", color: "#eeeeee0" }}
      onFinish={(e) => {
        loginFetch(e);
      }}
      onChange={() => setError("")}
    >
      <div
            className="font-bold mb-5 financeLogoMobile"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#e0ba0f",
              textAlign: "right",
              fontSize: "40px",
              overflow: "hidden",
            }}
          >
            <img
              className="mb-2"
              width={40}
              src={"images/icon-02.svg"}
              alt="aaaaaaaaa"
            />{" "}
            <div className="">Finance</div>
          </div>
      <h1 className="text-2xl text-center text-white py-4">Inicia sesión</h1>
      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="email"
        rules={[
          {
            required: true,
            message: "Ingresa un correo electronico valido",
            validator(rule, value, callback) {
              const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
              if (!value.match(emailRegex)) {
                return Promise.reject("Ingresa un correo valido");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="password"
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              if (!value || value === "") {
                return Promise.reject("Ingresa una contraseña valida");
              }
              if (value.length < 8) {
                return Promise.reject(
                  "La contraseña debe tener al menos 8 caracteres"
                );
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>

      {/* <p
              className="mb-5"
              style={{
                color: "#cccccc",
                textAlign: "right",
                marginTop: "-15px",
                fontSize: "14px",
              }}
            >
              ¿Olvidaste la contraseña?
            </p> */}

      {error && (
        <p
          className="mb-2 text-base"
          style={{ color: "red", textAlign: "center" }}
        >
          {error}
        </p>
      )}

      <Form.Item
        className="mb-8"
        style={{ color: "#eee", textAlign: "center" }}
      >
        <Button disabled={isLoadingLogin} block type="primary" htmlType="submit" size="large">
        {isLoadingLogin? <Spin></Spin> :'Iniciar sesión'}
        </Button>
        <div className="my-2">ó</div>
        <a
          style={{ color: "#77b7ff" }}
          className="text-base"
          onClick={(e) => {
            e.preventDefault();
            console.log("click");
            setCurrentSection(1);
            setError("");
          }}
        >
          Registrate ahora
        </a>
      </Form.Item>
    </Form>
  );

  const section2 = (
    <Form
      className="register-form"
      name="login"
      initialValues={{ remember: true }}
      style={{ width: "100%", color: "#eeeeee0", marginTop: "-70px" }}
      onFinish={(e) => {
        registerFetch(e);
      }}
      onChange={() => setError("")}
    >
      <div
            className="font-bold mb-5 financeLogoMobile"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#e0ba0f",
              textAlign: "right",
              fontSize: "40px",
              overflow: "hidden",
            }}
          >
            <img
              className="mb-2"
              width={40}
              src={"images/icon-02.svg"}
              alt="aaaaaaaaa"
            />{" "}
            <div className="">Finance</div>
          </div>
      <h1 className="text-2xl text-center text-white py-4"> Registrate </h1>

      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="name"
        rules={[
          {
            required: true,
            message: "Ingresa tu nombre",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Nombre" />
      </Form.Item>
      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="lastName"
        rules={[
          {
            required: true,
            message: "Ingresa tu apellido",
          },
        ]}
      >
        <Input prefix={<FontColorsOutlined />} placeholder="Apellido" />
      </Form.Item>
      
      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="email"
        rules={[
          {
            required: true,
            message: "Ingresa un correo electronico valido",
            validator(rule, value, callback) {
              const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
              if (!value.match(emailRegex)) {
                return Promise.reject("Ingresa un correo valido");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        className="mb-8"
        style={{ color: "#eee" }}
        name="password"
        rules={[
          {
            required: true,
            validator(rule, value, callback) {
              if (!value || value === "") {
                return Promise.reject("Ingresa una contraseña valida");
              }
              if (value.length < 8) {
                return Promise.reject(
                  "La contraseña debe tener al menos 8 caracteres"
                );
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>

    

      {error && (
        <p
          className="mb-2 text-base"
          style={{ color: "red", textAlign: "center" }}
        >
          {error}
        </p>
      )}

      <Form.Item
        className="mb-8"
        style={{ color: "#eee", textAlign: "center" }}
      >
        <Button block type="primary" htmlType="submit" size="large">
          Registrarse
        </Button>
        <div className="my-2">ó</div>
        <a
          style={{ color: "#77b7ff" }}
          className="text-base"
          onClick={(e) => {
            e.preventDefault();
            console.log("click");
            setCurrentSection(0);
            setError("");
          }}
        >
          Iniciar sesión
        </a>
      </Form.Item>
    </Form>
  );

  const sections = [section1, section2];

  return (
    <StyledLogin
      style={{ maxHeight: "100dvh", display: "flex", overflow: "hidden" }}
    >
      <img
        id="financeLoginImage"
        alt="financeLogin"
        src="images/financeLogin.jpg"
        style={{
          position: "relative",
          textAlign: "center",
          height: "100vh",
          width: "75%",
          objectFit: "cover",
          overflow: "hidden",
          background: "black",
          opacity: 0.6,
          filter: "brightness(0.4)",
        }}
      />
      <div
        className="font-bold financeLoginText"
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          right: "20%",
          transform: "translate(-50%, -50%)",
          color: "#e0ba0f",
          textAlign: "right",
          fontSize: "4rem",
          overflow: "hidden",
        }}
      >
        <img
          className="mr-5 financeLoginText"
          width={50}
          src={"images/icon-02.svg"}
          alt="aaaaaaaaa"
        />{" "}
        <span className="financeLoginText">Finance</span>
      </div>

      <div className="loginContainer">
        <div
          style={{
            position: "sticky",
            top: "50%",
            color: "#eee",
          }}
        >
          

          <div>
            <AnimatePresence>
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{ position: "absolute", width: "100%", top: "-140px" }}
              >
                {sections[currentSection]}
              </motion.div>
            </AnimatePresence>
            {/* <button onClick={handleSwitch}>Cambiar Sección</button> */}
          </div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  #financeLoginImage {
    z-index: -1;
  }

  .loginContainer {
    width: 20%;
    position: relative;
    margin: auto;
  }

  @media (max-width: 768px) {
    #financeLoginImage {
      width: 100% !important;
      filter: blur(2px);
    }
    .financeLoginText {
      display: none;
    }
    .loginContainer {
      width: 80% !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .financeLogoMobile {
      display: flex !important;
      margin-top: -120px;
    }
    .register-form{
      margin-top: -180px !important;
    }
  }
`;
