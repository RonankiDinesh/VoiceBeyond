// lib/api.ts
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // FastAPI backend URL
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

// Type for backend response
interface CaptionResponse {
  youtube_link: string;
  language: string;
  transcription: string;
  raw_transcription: string;
  simplified_text: string;
}

/**
 * Sends YouTube URL + language to backend
 * Returns the backend response directly
 */
export const startCaptioning = async (
  youtubeUrl: string,
  language: string
): Promise<CaptionResponse> => {
  try {
    const response = await api.post<CaptionResponse>("/captions", {
      youtube_link: youtubeUrl, // Must match backend field
      language: language,
    });

    return response.data; // return raw JSON from backend
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.detail || // FastAPI errors are usually in "detail"
        err.message ||
        "Unknown server error";
      throw new Error(message);
    } else if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
