import React, { useEffect, useState } from "react";
import { AxiosGet } from "../api";
import { useMediaQuery } from "react-responsive";
import {
  Carousel,
  Space,
  Card,
  Button,
  Typography,
  Row,
  Col,
  Progress,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Questions(props) {
  const { theme, setPage } = props;
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // 각 질문의 선택된 답변을 추적
  const [totalAnswers, setTotalAnswers] = useState([]);
  const [resetAnswer, setResetAnswer] = useState(false); // 답변 초기화 상태
  const carouselRef = React.useRef(null);

  // Media queries
  const isSmallScreen = useMediaQuery({ maxWidth: 769 });
  const isMediumScreen = useMediaQuery({ minWidth: 769, maxWidth: 1200 });

  const questionsPerPage = 5;

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const res = await AxiosGet("/bdsm/list-all-questions");
        setQuestions(res.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    getAllQuestions();
  }, []);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const handleSlideChange = (current) => {
    setCurrentSlide(current);
  };

  const handleAnswerSelection = (questionIndex, result) => {
    if (!selectedAnswers[questionIndex]) {
      // 답변이 아직 선택되지 않은 경우에만 진행도 증가
      setAnsweredCount((prevCount) => prevCount + 1);
    }

    // 해당 질문의 답변을 업데이트
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = result;

    console.log(updatedAnswers);
    setSelectedAnswers(updatedAnswers);

    setResetAnswer(false);
  };

  const handleNextQuestion = () => {
    setCurrentPage(currentPage + 1);
    setResetAnswer(true); // 답변 초기화 상태 설정
  };

  const handlePrevQuestion = () => {
    setCurrentPage(currentPage - 1);
    setResetAnswer(true); // 답변 초기화 상태 설정
  };

  const handleFinish = () => {
    alert("모든 질문에 답변을 완료했습니다!");
    console.log(totalAnswers);
  };

  return (
    <div
      className="center"
      style={{ minHeight: "100vh", width: "100%", maxWidth: "1024px" }}
    >
      <div
        style={{
          position: "sticky",
          left: "0",
          top: "0",
          zIndex: 1,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          padding: "20px",
        }}
      >
        <h1>🔥 BDSM 테스트 🔥</h1>
        <Progress
          percent={(answeredCount / questions.length) * 100}
          status="active"
          showInfo={false}
          style={{ marginBottom: "20px" }}
        />
      </div>

      <div style={{ padding: "20px" }}>
        {isSmallScreen ? (
          <div>
            <Carousel
              dots={false}
              ref={carouselRef}
              afterChange={handleSlideChange}
            >
              {questions.map((value, index) => (
                <div key={index}>
                  <Card style={{ display: "flex", flexDirection: "column" }}>
                    <Row gutter={[16, 16]} style={{ width: "100%", flex: 1 }}>
                      <Col span={24}>
                        <Typography.Text
                          className="text-medium"
                          style={{ whiteSpace: "pre-line", fontWeight: "bold" }}
                        >
                          {value.question}
                        </Typography.Text>
                      </Col>
                      <Col span={24} style={{ flexGrow: 1 }}>
                        <Answer
                          questionIndex={index}
                          question_pk={value.index}
                          onSelect={(idx, result) => {
                            console.log(idx, result);
                            handleAnswerSelection(idx, result);
                            if (answeredCount === questions.length - 1) {
                              handleFinish();
                              return;
                            }

                            carouselRef.current.next();
                          }}
                          reset={resetAnswer} // 초기화 상태 전달
                        />
                      </Col>
                    </Row>
                  </Card>
                </div>
              ))}
            </Carousel>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                type="link"
                icon={<LeftOutlined />}
                onClick={() => carouselRef.current.prev()}
                disabled={currentSlide === 0}
              >
                이전
              </Button>
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={() => carouselRef.current.next()}
                disabled={currentSlide === questions.length - 1}
              >
                다음
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Space direction="vertical" style={{ width: "100%" }}>
              {currentQuestions.map((value, index) => (
                <Card
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // padding: "10px",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Typography.Text
                        className="text-medium"
                        style={{ whiteSpace: "pre-line", fontWeight: "bold" }}
                      >
                        {value.question}
                      </Typography.Text>
                    </Col>
                    <Col
                      span={24}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Answer
                        questionIndex={startIndex + index}
                        question_pk={value.index}
                        onSelect={(idx, result) => {
                          console.log(idx, result);
                          handleAnswerSelection(idx, result);
                          if (answeredCount === questions.length - 1) {
                            handleFinish();
                            return;
                          }
                        }}
                        reset={resetAnswer} // 초기화 상태 전달
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                type="link"
                icon={<LeftOutlined />}
                onClick={handlePrevQuestion}
                disabled={currentPage === 1}
              >
                이전
              </Button>
              <Button
                type="link"
                icon={<RightOutlined />}
                onClick={handleNextQuestion}
                disabled={
                  currentPage === Math.ceil(questions.length / questionsPerPage)
                }
              >
                다음
              </Button>
            </div>
          </div>
        )}

        {answeredCount === questions.length && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button size="large" type="primary">
              🎉 BDSM 테스트 결과 보러가기 🎉
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const strList = [
  "동의",
  "대체적으로 동의",
  "약간 동의",
  "모르겠음",
  "약간 비동의",
  "대체적으로 비동의",
  "비동의",
];

const Answer = (props) => {
  const { question_pk, onSelect, reset, selectedAnswer } = props;
  const [localSelectedAnswer, setLocalSelectedAnswer] =
    useState(selectedAnswer);

  // currentSlide가 변경되면 selectedAnswer를 초기화
  useEffect(() => {
    if (reset) {
      setLocalSelectedAnswer(null); // reset이 true일 때만 초기화
    } else {
      setLocalSelectedAnswer(selectedAnswer);
    }
  }, [reset]); // reset이 변경될 때마다 호출

  const onAnswer = async (index) => {
    setLocalSelectedAnswer(index); // 선택된 답변 저장
    await AxiosGet(`/bdsm/get-answers/${question_pk}`)
      .then((res) => {
        onSelect(res.data[index].index, res.data[index]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <div>{strList[0]}</div>
        <div>{strList[3]}</div>
        <div>{strList[6]}</div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        {strList.map((answer, index) => (
          <div
            key={index}
            onClick={() => onAnswer(index)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:
                index === 0 || index === 6
                  ? "50px"
                  : index === 1 || index === 5
                  ? "45px"
                  : index === 2 || index === 4
                  ? "40px"
                  : "35px",
              aspectRatio: "1 / 1",
              borderRadius: "100px",
              border: "2px solid",
              backgroundColor:
                localSelectedAnswer === index ? "#8c8c8c" : "transparent", // 선택된 답변 강조
              borderColor:
                index === 6
                  ? "#f5222d"
                  : index === 5
                  ? "#fa541c"
                  : index === 4
                  ? "#fa8c16"
                  : index === 3
                  ? "#faad14"
                  : index === 2
                  ? "#fadb14"
                  : index === 1
                  ? "#52c41a"
                  : "#13c2c2",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Questions;
