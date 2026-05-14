/**
 * Pet (dogs & cats) quiz page.
 */

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import TitleSetter from "@onzag/itemize/client/components/util/TitleSetter";
import I18nRead, { useI18nRead } from "@onzag/itemize/client/components/localization/I18nRead";

import scDetect from "sc-detect";
import type { IWatchdogAnalysis } from "sc-detect/types/watchdog";
import { useUserDataRetriever } from "@onzag/itemize/client/components/user/UserDataRetriever";

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

interface IFactorInfo {
  labelKey: string;
  descKey: string;
  innocentKey: string;
  reliability: "high" | "medium" | "low";
}

const FACTOR_INFO: Record<keyof IWatchdogAnalysis["raw"], IFactorInfo> = {
  COPY_RELATES_TO_PASTE: {
    labelKey: "analysis_factor_copy_paste_label",
    descKey: "analysis_factor_copy_paste_desc",
    innocentKey: "analysis_factor_copy_paste_innocent",
    reliability: "high",
  },
  CONTENT_CONTAINS_AI_SIGNATURES: {
    labelKey: "analysis_factor_ai_label",
    descKey: "analysis_factor_ai_desc",
    innocentKey: "analysis_factor_ai_innocent",
    reliability: "low",
  },
  UNMODIFIED_PASTES: {
    labelKey: "analysis_factor_unmodified_label",
    descKey: "analysis_factor_unmodified_desc",
    innocentKey: "analysis_factor_unmodified_innocent",
    reliability: "low",
  },
  KEEPS_SWITCHING_TABS_AND_COPY_PASTING: {
    labelKey: "analysis_factor_tabs_label",
    descKey: "analysis_factor_tabs_desc",
    innocentKey: "analysis_factor_tabs_innocent",
    reliability: "medium",
  },
};

const SIMILARITY_BANDS: Array<{ max: number; labelKey: string; hintKey: string; color: "success" | "warning" | "error" }> = [
  { max: 0.34, labelKey: "analysis_band_low", hintKey: "analysis_band_low_hint", color: "success" },
  { max: 0.67, labelKey: "analysis_band_mid", hintKey: "analysis_band_mid_hint", color: "warning" },
  { max: 1.01, labelKey: "analysis_band_high", hintKey: "analysis_band_high_hint", color: "error" },
];

function similarityBand(value: number) {
  return SIMILARITY_BANDS.find((b) => value < b.max) || SIMILARITY_BANDS[SIMILARITY_BANDS.length - 1];
}

function confidenceColor(value: number): "success" | "warning" | "error" {
  return similarityBand(value).color;
}

const RELIABILITY_META: Record<IFactorInfo["reliability"], { labelKey: string; color: "default" | "warning" | "info" }> = {
  high: { labelKey: "analysis_reliability_high", color: "info" },
  medium: { labelKey: "analysis_reliability_medium", color: "default" },
  low: { labelKey: "analysis_reliability_low", color: "warning" },
};

interface IAnalysisDisplayProps {
  analysis: IWatchdogAnalysis | null;
}

function AnalysisDisplay({ analysis }: IAnalysisDisplayProps) {
  const scoreTooltip = useI18nRead({ i18nId: "analysis_score_tooltip" }) as string;
  const scoreAria = useI18nRead({ i18nId: "analysis_score_aria" }) as string;

  if (!analysis) {
    return (
      <Typography variant="body2" color="text.secondary">
        <I18nRead i18nId="analysis_no_data" capitalize={true} />
      </Typography>
    );
  }

  const similarityPct = Math.round(analysis.confidence * 100);
  const band = similarityBand(analysis.confidence);

  return (
    <Box>
      <Alert
        severity="info"
        icon={<InfoOutlinedIcon fontSize="inherit" />}
        sx={{ mb: 2 }}
      >
        <AlertTitle sx={{ mb: 0.5 }}>
          <I18nRead i18nId="analysis_alert_title" capitalize={true} />
        </AlertTitle>
        <Typography variant="body2" component="div">
          <I18nRead i18nId="analysis_alert_body" capitalize={true} html={true} htmlWrappingTag="span" />
        </Typography>
      </Alert>

      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 0.5 }}>
        <Typography variant="subtitle2">
          <I18nRead i18nId="analysis_score_label" capitalize={true} />
        </Typography>
        <I18nRead i18nId={band.labelKey} capitalize={true}>
          {(bandLabel) => (
            <Chip
              size="small"
              label={<>{bandLabel} · {similarityPct}%</>}
              color={band.color}
              variant="filled"
            />
          )}
        </I18nRead>
        <Tooltip title={scoreTooltip} arrow>
          <IconButton size="small" sx={{ p: 0.25 }} aria-label={scoreAria}>
            <HelpOutlineIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      <LinearProgress
        variant="determinate"
        value={similarityPct}
        color={band.color}
        sx={{ height: 8, borderRadius: 1, mb: 0.75 }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
        <I18nRead i18nId={band.hintKey} capitalize={true} />
      </Typography>

      <Accordion disableGutters elevation={0} sx={{ border: (t) => `1px solid ${t.palette.divider}`, "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">
            <I18nRead i18nId="analysis_breakdown_summary" capitalize={true} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
            <I18nRead i18nId="analysis_breakdown_intro" capitalize={true} />
          </Typography>
          <Stack spacing={1.5} divider={<Divider flexItem />}>
            {(Object.keys(FACTOR_INFO) as Array<keyof IWatchdogAnalysis["raw"]>).map((key) => {
              const info = FACTOR_INFO[key];
              const raw = analysis.raw[key];
              const weighted = analysis.weighted[key];
              const rawPct = Math.round(raw * 100);
              const reliability = RELIABILITY_META[info.reliability];
              return (
                <Box key={key}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        <I18nRead i18nId={info.labelKey} capitalize={true} />
                      </Typography>
                      <I18nRead i18nId={reliability.labelKey} capitalize={true}>
                        {(relLabel) => (
                          <Chip
                            size="small"
                            variant="outlined"
                            color={reliability.color === "default" ? undefined : reliability.color}
                            label={relLabel}
                            sx={{ height: 18, "& .MuiChip-label": { px: 0.75, fontSize: "0.65rem" } }}
                          />
                        )}
                      </I18nRead>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      <I18nRead
                        i18nId="analysis_factor_weighted"
                        args={[rawPct, weighted.toFixed(2)]}
                      />
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={rawPct}
                    color={confidenceColor(raw)}
                    sx={{ height: 4, borderRadius: 1, mt: 0.5, mb: 0.75 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                    <I18nRead i18nId={info.descKey} capitalize={true} />
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontStyle: "italic", mt: 0.25 }}>
                    <I18nRead i18nId="analysis_innocent_cause_label" capitalize={true} />{" "}
                    <I18nRead i18nId={info.innocentKey} />
                  </Typography>
                </Box>
              );
            })}
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }} component="div">
            <I18nRead i18nId="analysis_breakdown_footer" capitalize={true} html={true} htmlWrappingTag="span" />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

interface IQuestionCardProps {
  question: IQuestion;
  state: IAnswerState | undefined;
  onChange: (number: number, value: string) => void;
  onSubmit: (number: number) => void;
  scReady: boolean;
}

function QuestionCard(props: IQuestionCardProps) {
  const { question, state, onChange, onSubmit, scReady } = props;
  const submitted = !!(state && state.verdict);
  const verdict = state ? state.verdict : null;
  const value = state ? state.value : "";

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);
  const [analysis, setAnalysis] = useState<IWatchdogAnalysis | null>(null);

  useEffect(() => {
    if (!scReady || !inputRef.current) return;
    const handle = scDetect.query(inputRef.current);
    const listener = (a: IWatchdogAnalysis) => {
      setTimeout(() => {
        // delay due to react buggy state updates
        setAnalysis(handle.getLastAnalysis());
      }, 100);
    };
    handle.addEventListenerOnNewScoreCalculated(listener);
    handle.initialize().then(() => {
      setAnalysis(handle.getLastAnalysis());
    });
    return () => {
      handle.removeEventListenerOnNewScoreCalculated(listener);
      handle.destroy();
    };
  }, [scReady]);

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
        inputRef={inputRef}
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
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            <I18nRead i18nId={verdictMessageKey!} capitalize={true} />
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            <I18nRead i18nId="analysis_section_title" capitalize={true} />
          </Typography>
          <AnalysisDisplay analysis={analysis} />
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

let isSCInitialized = false;

export default function TestQuiz() {
  const [answers, setAnswers] = useState<Record<number, IAnswerState>>({});

  const userData = useUserDataRetriever();
  const [scReady, setScReady] = useState<boolean>(isSCInitialized);

  // Initialize SC Detect once we know the user id
  useEffect(() => {
    if (!isSCInitialized && userData.id) {
      scDetect.initialize(userData.id.toString(), {
        weights: {
          reasons: {
            KEEPS_SWITCHING_TABS_AND_COPY_PASTING: 0.5,
            COPY_RELATES_TO_PASTE: 0.55,
            CONTENT_CONTAINS_AI_SIGNATURES: 0.1,
            UNMODIFIED_PASTES: 0.05,
          },
          min_copy_event_time_weight: 0.5,
          min_tab_event_time_weight: 0.5,
        },
        paste_size_threshold: 30,
        copy_size_threshold: 30,
        settings: {
          relevant_copy_event_minutes: 5,
          relevant_tab_in_out_event_minutes: 5,
        }
      });
      isSCInitialized = true;
      setScReady(true);
    }
  }, [userData.id]);

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
          scReady={scReady}
        />
      )),
    [answers, handleChange, handleSubmit, scReady],
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
