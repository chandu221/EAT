import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCMbILKF14wIP3BLaj4Ck9CYrAF9SRbyVg';

@Injectable({
  providedIn: 'root',
})
export class EsopAdvisorService {
  private genAI = new GoogleGenerativeAI(API_KEY);
  private model: any;

  constructor() {
    this.initModel();
  }

  private async initModel() {
    try {
      this.model = await this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      console.log('AI Model Initialized:', this.model);
    } catch (error) {
      console.error('Error initializing AI model:', error);
      throw new Error('Failed to initialize AI model');
    }
  }

  private buildPrompt(esopData: any): string {
    if (!esopData || !esopData.stockSymbol || !esopData.currentStockPrice || !esopData.discountedPrice) {
      throw new Error('Incomplete ESOP data received');
    }

    return `
      You are an AI-powered ESOP financial advisor. A user has provided the following ESOP stock ownership data:

      - Stock Symbol: ${esopData.stockSymbol}
      - Current Stock Price: ₹${esopData.currentStockPrice}
      - Discounted Exercise Price: ₹${esopData.discountedPrice}
      - Exercised Stocks: ${esopData.exercisedStocks}
      - Remaining Stocks to Exercise: ${esopData.remainingStocksToExercise}
      - Unvested Stocks: ${esopData.remainingUnvestedStocks}
      - Next Vesting Date: ${esopData.nextVestingDate}
      - Time to Full Vesting: ${esopData.timeToFullVesting}
      - Total Stocks Granted: ${esopData.totalStocksGranted}
      - Total Vested Stocks: ${esopData.totalVestedStocks}
      - Federal Tax Rate: ${esopData.taxRates?.federal_tax_rate}%
      - State Tax Rate: ${esopData.taxRates?.state_tax_rate}%
      - Local Tax Rate: ${esopData.taxRates?.local_tax_rate}%

      Provide a detailed **financial strategy**, including:
      - Optimal exercise timing based on market performance.
      - Tax implications and how to minimize tax burden.
      - Potential profit estimation from selling ESOP stocks.
      - Diversification strategies for reducing investment risk.

      Keep your response **short, clear, and without markdown formatting**.
    `;
  }

  async getEsopAdvice(esopData: any): Promise<string> {
    try {
      if (!this.model) await this.initModel();
  
      const prompt = this.buildPrompt(esopData);
      const result = await this.model.generateContent(prompt);
  
      console.log('Raw API Response:', result); // Log the entire response
  
      if (!result || !result.candidates?.length) {
        throw new Error('No response received from Gemini API');
      }
  
      return result.candidates[0]?.content?.parts[0]?.text || 'No response available';
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to fetch ESOP strategy insights');
    }
  
  }
}