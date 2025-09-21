import { FeedbackResponse } from './types';

/**
 * Safely parses JSON response from OpenAI, handling markdown formatting
 */
export function parseFeedbackResponse(responseText: string): FeedbackResponse {
  try {
    let cleanResponse = responseText.trim();

    // Remove markdown code blocks if present
    if (cleanResponse.includes('```json')) {
      const jsonStart = cleanResponse.indexOf('```json') + 7;
      const jsonEnd = cleanResponse.indexOf('```', jsonStart);
      cleanResponse = cleanResponse.substring(jsonStart, jsonEnd).trim();
    } else if (cleanResponse.includes('```')) {
      const jsonStart = cleanResponse.indexOf('```') + 3;
      const jsonEnd = cleanResponse.indexOf('```', jsonStart);
      cleanResponse = cleanResponse.substring(jsonStart, jsonEnd).trim();
    }

    // Extract JSON object from response
    const jsonStart = cleanResponse.indexOf('{');
    const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
    }

    return JSON.parse(cleanResponse);
  } catch (parseError) {
    console.error('JSON parsing failed:', parseError);
    throw new Error('Failed to parse AI response');
  }
}

/**
 * Normalizes numeric fields to ensure they're valid integers within bounds
 */
export function normalizeNumericFields(feedback: FeedbackResponse): FeedbackResponse {
  const toInt = (n: any) => Number.isFinite(+n) ? Math.round(+n) : 0;
  
  return {
    ...feedback,
    quality: Math.min(100, Math.max(0, toInt(feedback.quality))),
    relevance: Math.min(100, Math.max(0, toInt(feedback.relevance))),
    addressed: Boolean(feedback.addressed),
  };
}
