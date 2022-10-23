import { useForm } from "react-hook-form";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import TextInput from "../elem/TextInput";
import Button from "../elem/Button";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async (inputs) => {
    const info = {
      email: inputs.email,
      password: inputs.password,
    };
    // BaseUrl 추가
    const response = await axios.post("/api/login", info).then((res) => {
      //console.log(res)
      //setAccessToken(res.headers.authorization);
      //setRefreshToken(res.headers['refresh-token'])
    });
    if (response.data.ok) {
      window.location.href = "/";
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <Layout>
      <LoginContainer as="main">
        <Form onSubmit={handleSubmit(onValid)}>
          <h1>로그인</h1>
          <TextInput
            register={{
              ...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일을 확인해주세요.",
                },
              }),
            }}
            type={"email"}
            label={"Email"}
          />
          <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
          <TextInput
            register={{
              ...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4자 이상입니다.",
                },
              }),
            }}
            label="password"
            type="password"
          />
          <ErrorMessage>
            {errors.password && errors.password.message}
          </ErrorMessage>

          <Button {...btnStyle}>로그인</Button>
        </Form>
      </LoginContainer>
    </Layout>
  );
}

export default Login;

const btnStyle = {
  _width: "100%",
  _fontSize: "0.9rem",
  _padding: "0.8rem",
  _bgColor: "rgba(0,0,0,0.75)",
  _hoverBgColor: "rgba(0,0,0,0.9)",
};

const LoginContainer = styled.div`
  padding: 15vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 3rem 3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
const ErrorMessage = styled.span`
  padding-top: 0.2rem;
  height: 1.6rem;
  color: red;
  font-size: 0.75rem;
`;
