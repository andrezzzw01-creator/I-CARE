import { GoogleGenAI } from "@google/genai";
import type { HealthData, DailyHealthData, Goal, UserProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getAIMetricInsight(metricName: string, value: number | string, unit: string): Promise<string> {
    const prompt = `Based on this single health metric: ${metricName} is ${value} ${unit}, provide a very short, one-sentence actionable insight or encouragement. Keep it under 15 words. Example: For "Heart Rate is 68 bpm", respond "A calm heart rate. Great job prioritizing rest!"`;
    try {
        // FIX: The 'contents' field for text-only prompts can be a simple string.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error(`Error fetching AI insight for ${metricName}:`, error);
        return `Keep up the good work with your ${metricName}.`;
    }
}


export async function getAIHealthTip(data: HealthData): Promise<string> {
  const prompt = `Based on this health data (Heart Rate: ${data.heartRate}bpm, Sleep: ${data.sleepHours}h, Steps: ${data.steps}), provide a single, short, actionable health tip. Be encouraging. For example: 'Your heart rate seems a bit high. A 10-minute walk could help calm it down!'`;
  
  try {
    // FIX: The 'contents' field for text-only prompts can be a simple string.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI health tip:", error);
    return "Remember to stay hydrated and listen to your body today!";
  }
}

export async function getAIInsightsSummary(history: DailyHealthData[]): Promise<string> {
  const prompt = `Here is the user's health data for the last 7 days: ${JSON.stringify(history)}. Write a brief, encouraging overall summary of their health trends this week. Highlight one positive trend and one area for improvement. Address the user directly as 'you'.`;

  try {
    // FIX: The 'contents' field for text-only prompts can be a simple string.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI insights summary:", error);
    return "Keep up the great work! Consistency is key to achieving your health goals.";
  }
}

async function getMetricTrendInsight(metricName: string, unit: string, data: {date: string, value: number}[]): Promise<string> {
  const prompt = `Analyze this 7-day trend for ${metricName} (in ${unit}): ${JSON.stringify(data)}. Provide a very short, one-sentence insight. Be encouraging. For example: 'Your ${metricName} shows a great upward trend!' or 'You've been consistent with your ${metricName} this week.'`;
  try {
    // FIX: The 'contents' field for text-only prompts can be a simple string.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error(`Error fetching AI insight for ${metricName}:`, error);
    return `Keep monitoring your ${metricName}.`;
  }
}

export const getAIStepsInsight = (history: DailyHealthData[]) => getMetricTrendInsight('Steps', 'steps', history.map(d => ({ date: d.date, value: d.steps })));
export const getAICaloriesInsight = (history: DailyHealthData[]) => getMetricTrendInsight('Calories Burned', 'kcal', history.map(d => ({ date: d.date, value: d.calories })));
export const getAIHeartRateInsight = (history: DailyHealthData[]) => getMetricTrendInsight('Resting Heart Rate', 'bpm', history.map(d => ({ date: d.date, value: d.heartRate })));
export const getAISleepInsight = (history: DailyHealthData[]) => getMetricTrendInsight('Sleep Duration', 'hours', history.map(d => ({ date: d.date, value: d.sleepHours })));


export async function getAIGoalFeedback(goals: Goal[], data: HealthData): Promise<string> {
  const prompt = `A user has these goals: ${JSON.stringify(goals)}. Their current health data is: ${JSON.stringify(data)}. 
  1. Write a short, motivating comment on their overall progress. 
  2. Provide a simple, actionable "Guide to Achieve Your Goal" with 2-3 bullet points on how they can better achieve their goals. Format the guide with markdown asterisks for bullet points.`;

  try {
    // FIX: The 'contents' field for text-only prompts can be a simple string.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI goal feedback:", error);
    return "Every step you take brings you closer to your goals. Keep pushing forward!";
  }
}

export async function getAIBMIAdvice(bmi: number, profile: UserProfile): Promise<string> {
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Healthy Weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    const prompt = `A user who is ${profile.gender}, born on ${profile.dob}, has a calculated BMI of ${bmi.toFixed(1)}, which is in the '${category}' category. Provide 2-3 encouraging, actionable bullet points as a "Health Guide" to help them maintain or improve their health based on their BMI. Use markdown for bullet points.`;
    
    try {
        // FIX: The 'contents' field for text-only prompts can be a simple string.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI BMI advice:", error);
        return "Focus on balanced nutrition and regular physical activity for overall well-being.";
    }
}