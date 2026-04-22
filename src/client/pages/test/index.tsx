/**
 * Pet (dogs & cats) quiz page.
 */

import React, { useMemo, useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import I18nRead, { useI18nRead } from "@onzag/itemize/client/components/localization/I18nRead";

interface IQuestion {
  number: number;
  multiline?: boolean;
}

const QUESTIONS: IQuestion[] = [
  { number: 1, multiline: false },
  { number: 2, multiline: false },
  { number: 3, multiline: true },
  { number: 4, multiline: true },
  { number: 5, multiline: true },
  { number: 6, multiline: false },
  { number: 7, multiline: true },
  { number: 8, multiline: true },
  { number: 9, multiline: true },
  { number: 10, multiline: true },
  { number: 11, multiline: true },
  { number: 12, multiline: true },
];
const MESSAGE_POOL_SIZE = 4;

interface IVerdict {
  correct: boolean;
  messageIndex: number;
}

function evaluateAnswer(_questionNumber: number, _answer: string): IVerdict {
  const correct = Math.random() < 0.5;
  const messageIndex = Math.floor(Math.random() * MESSAGE_POOL_SIZE) + 1;
  return { correct, messageIndex };
}

interface IAnswerState {
  value: string;
  verdict: IVerdict | null;
}

interface IQuestionCardProps {
  question: IQuestion;
  state: IAnswerState | undefined;
  onChange: (number: number, value: string) => void;
  onSubmit: (number: number) => void;
}

function QuestionCard(props: IQuestionCardProps) {
  const { question, state, onChange, onSubmit } = props;
  const submitted = !!(state && state.verdict);
  const verdict = state ? state.verdict : null;
  const value = state ? state.value : "";

  const fieldColor: "success" | "error" | "primary" = submitted
    ? verdict!.correct
      ? "success"
      : "error"
    : "primary";

  const placeholder = useI18nRead({ i18nId: "quiz_answer_placeholder" }) as string;
  const verdictMessageKey = submitted
    ? (verdict!.correct ? "quiz_correct_msg_" : "quiz_incorrect_msg_") + verdict!.messageIndex
    : null;

  return (
    <Paper elevation={2} sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" gutterBottom>
        {question.number}.{" "}
        <I18nRead i18nId={"quiz_q_" + question.number} capitalize={true} />
      </Typography>

      <TextField
        fullWidth
        multiline={!!question.multiline}
        minRows={question.multiline ? 3 : 1}
        value={value}
        onChange={(e) => onChange(question.number, e.target.value)}
        placeholder={placeholder}
        color={fieldColor}
        focused={submitted ? true : undefined}
        InputProps={{
          readOnly: submitted,
          sx: {
            backgroundColor: (theme) => {
              if (!submitted) return theme.palette.background.paper;
              return verdict!.correct
                ? theme.palette.success.light + "33"
                : theme.palette.error.light + "33";
            },
          },
        }}
        sx={{ mt: 1 }}
      />

      {submitted ? (
        <Box sx={{ mt: 1.5 }}>
          <Divider sx={{ mb: 1.5 }} />
          <Typography
            variant="subtitle2"
            color={verdict!.correct ? "success.main" : "error.main"}
          >
            <I18nRead
              i18nId={verdict!.correct ? "quiz_correct_label" : "quiz_incorrect_label"}
              capitalize={true}
            />
          </Typography>
          <Typography variant="body2">
            <I18nRead i18nId={verdictMessageKey!} capitalize={true} />
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 1.5, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => onSubmit(question.number)}
            disabled={!value.trim()}
          >
            <I18nRead i18nId="quiz_submit" capitalize={true} />
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default function TestQuiz() {
  const [answers, setAnswers] = useState<Record<number, IAnswerState>>({});

  const handleChange = useCallback((number: number, value: string) => {
    setAnswers((prev) => {
      const existing = prev[number];
      // do not allow modification once submitted
      if (existing && existing.verdict) {
        return prev;
      }
      return { ...prev, [number]: { value, verdict: null } };
    });
  }, []);

  const handleSubmit = useCallback((number: number) => {
    setAnswers((prev) => {
      const existing = prev[number] || { value: "", verdict: null };
      if (existing.verdict) {
        return prev;
      }
      const verdict = evaluateAnswer(number, existing.value);
      return { ...prev, [number]: { ...existing, verdict } };
    });
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({});
  }, []);

  const title = useI18nRead({ i18nId: "quiz_title", capitalize: true }) as string;

  // questions list is stable; memoize to avoid recreating elements
  const questionCards = useMemo(
    () =>
      QUESTIONS.map((q) => (
        <QuestionCard
          key={q.number}
          question={q}
          state={answers[q.number]}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )),
    [answers, handleChange, handleSubmit],
  );

  return (
    <>
      <TitleSetter>{title}</TitleSetter>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <I18nRead i18nId="quiz_title" capitalize={true} />
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <I18nRead i18nId="quiz_intro" capitalize={true} />
        </Typography>

        <Stack spacing={3} sx={{ mt: 3 }}>
          {questionCards}
        </Stack>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleReset}>
            <I18nRead i18nId="quiz_reset" capitalize={true} />
          </Button>
        </Box>
      </Container>
    </>
  );
}
