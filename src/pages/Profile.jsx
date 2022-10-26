import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UseUser from "../components/hooks/useUser";
import Layout from "../components/Layout/Layout";
import List from "../components/profile/List";
import UserInfo from "../components/profile/UserInfo";
import { readUserAnswers } from "../redux/modules/answers";
import { readProfileUser } from "../redux/modules/loginUser";
import { readUserQuestions } from "../redux/modules/questions";
import AnswerSvg from "../styles/svg/AnswerSvg";
import QuestionSvg from "../styles/svg/QuestionSvg";

function Profile() {
  const [isAnswer, setIsAnswer] = useState(false);
  const { id } = useParams();
  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);
  const { profile } = useSelector((state) => state.users);
  // 현재 로그인한 유저 정보 가져오기
  const user = UseUser();
  const dispatch = useDispatch();

  const toggleAnswer = () => {
    setIsAnswer((prev) => !prev);
  };

  useEffect(() => {
    dispatch(readUserQuestions(+id));
    dispatch(readUserAnswers(+id));
  }, [dispatch, id, isAnswer]);

  useEffect(() => {
    dispatch(readProfileUser(+id));
  }, [dispatch, id]);

  // return (
  //   <Layout>
  //     <ProfileContainer as="main">
  //       <UserInfo
  //         questionsLen={questions.length}
  //         profile={profile}
  //         answersLen={answers.length}
  //         user={user}
  //       />
  //       <DataContainer>
  //         <Buttons>
  //           <Button onClick={toggleAnswer} isAnswer={isAnswer}>
  //             <QuestionSvg />
  //             <span>질문글</span>
  //           </Button>
  //           <Button onClick={toggleAnswer} isAnswer={!isAnswer}>
  //             <AnswerSvg />
  //             <span>답변글</span>
  //           </Button>
  //         </Buttons>
  //         <List isAnswer={isAnswer} data={!isAnswer ? questions : answers} />
  //       </DataContainer>
  //     </ProfileContainer>
  //   </Layout>
  // );
}
export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5vh;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Buttons = styled.div`
  width: 14rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  justify-items: center;
  margin-top: -1px;
`;
const Button = styled.button`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  z-index: 2;
  border-top: ${(props) =>
    props.isAnswer ? "none" : "1.5px solid rgba(0,0,0,0.6)"};
  span {
    color: ${(props) => (props.isAnswer ? "rgba(0, 0, 0, 0.4)" : "inherit")};
    font-weight: 600;
  }
  svg {
    width: 0.8rem;
    color: ${(props) => (props.isAnswer ? "rgba(0, 0, 0, 0.4)" : "inherit")};
    margin-right: 0.3rem;
  }

  &:nth-child(2) {
    svg {
      width: 0.7rem;
      color: ${(props) => (props.isAnswer ? "rgba(0, 0, 0, 0.4)" : "inherit")};
    }
  }
`;
