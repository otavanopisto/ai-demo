import React, { useCallback, useMemo, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Avatar,
    Chip,
    CircularProgress,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import I18nRead from "@onzag/itemize/client/components/localization/I18nRead";
import { useResourceLoader } from "@onzag/itemize/client/components/resources/ResourceLoader";

interface IModelStats {
    model: string;
    inputTokens: number;
    outputTokens: number;
}

type SortKey = "model" | "inputTokens" | "outputTokens" | "totalTokens";
type SortDirection = "asc" | "desc";

function formatNumber(n: number): string {
    return n.toLocaleString();
}

export default function Statistics() {
    const { value, loading, failed } = useResourceLoader({
        type: "json",
        path: "/api/",
        src: "statistics",
    });

    const data: IModelStats[] = value || [];

    const [sortKey, setSortKey] = useState<SortKey>("totalTokens");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("desc");
        }
    };

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            let aVal: string | number;
            let bVal: string | number;

            if (sortKey === "totalTokens") {
                aVal = a.inputTokens + a.outputTokens;
                bVal = b.inputTokens + b.outputTokens;
            } else if (sortKey === "model") {
                aVal = a.model.toLowerCase();
                bVal = b.model.toLowerCase();
            } else {
                aVal = a[sortKey];
                bVal = b[sortKey];
            }

            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [sortKey, sortDirection, data]);

    const totals = useMemo(() => {
        return data.reduce(
            (acc, row) => ({
                inputTokens: acc.inputTokens + row.inputTokens,
                outputTokens: acc.outputTokens + row.outputTokens,
            }),
            { inputTokens: 0, outputTokens: 0 },
        );
    }, [data]);

    if (loading) {
        return (
            <Box sx={{ maxWidth: 960, mx: "auto", py: 4, px: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (failed) {
        return (
            <Box sx={{ maxWidth: 960, mx: "auto", py: 4, px: 2 }}>
                <Typography color="error">Failed to load statistics.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 960, mx: "auto", py: 4, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                        <BarChartIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            <I18nRead i18nId="statistics_title" context="ai/agent" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            <I18nRead i18nId="statistics_description" context="ai/agent" />
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
                <Box sx={{ display: "flex", gap: 2, px: 3, py: 2, bgcolor: "grey.50", borderBottom: "1px solid", borderColor: "divider", flexWrap: "wrap" }}>
                    <Chip
                        label={<><I18nRead i18nId="stats_total_input" context="ai/agent" />: {formatNumber(totals.inputTokens)}</>}
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        label={<><I18nRead i18nId="stats_total_output" context="ai/agent" />: {formatNumber(totals.outputTokens)}</>}
                        color="secondary"
                        variant="outlined"
                    />
                    <Chip
                        label={<><I18nRead i18nId="stats_total" context="ai/agent" />: {formatNumber(totals.inputTokens + totals.outputTokens)}</>}
                        color="success"
                        variant="outlined"
                    />
                </Box>
            </Paper>

            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "grey.50" }}>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    <TableSortLabel
                                        active={sortKey === "model"}
                                        direction={sortKey === "model" ? sortDirection : "asc"}
                                        onClick={() => handleSort("model")}
                                    >
                                        <I18nRead i18nId="stats_model" context="ai/agent" />
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    <TableSortLabel
                                        active={sortKey === "inputTokens"}
                                        direction={sortKey === "inputTokens" ? sortDirection : "asc"}
                                        onClick={() => handleSort("inputTokens")}
                                    >
                                        <I18nRead i18nId="stats_input_tokens" context="ai/agent" />
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    <TableSortLabel
                                        active={sortKey === "outputTokens"}
                                        direction={sortKey === "outputTokens" ? sortDirection : "asc"}
                                        onClick={() => handleSort("outputTokens")}
                                    >
                                        <I18nRead i18nId="stats_output_tokens" context="ai/agent" />
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    <TableSortLabel
                                        active={sortKey === "totalTokens"}
                                        direction={sortKey === "totalTokens" ? sortDirection : "asc"}
                                        onClick={() => handleSort("totalTokens")}
                                    >
                                        <I18nRead i18nId="stats_total_tokens" context="ai/agent" />
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row) => (
                                <TableRow
                                    key={row.model}
                                    sx={{
                                        transition: "background-color 0.15s",
                                        "&:hover": { bgcolor: "action.hover" },
                                    }}
                                >
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={600}>
                                            {row.model}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">{formatNumber(row.inputTokens)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">{formatNumber(row.outputTokens)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight={600}>
                                            {formatNumber(row.inputTokens + row.outputTokens)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}