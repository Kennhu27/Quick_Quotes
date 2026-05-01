// client/src/lib/quoteService.ts
import { api } from '$lib/api';

export interface QuoteData {
  feet_width: number;
  feet_length: number;
  sqr_feet: number;
  demolition: boolean;
  grout: boolean;
  pickup: boolean;
  thin_set: boolean;
}

export interface QuoteResponse {
  quoteId: string;
  feet_width: number;
  feet_length: number;
  sqr_feet: number;
  demolition: boolean;
  grout: boolean;
  pickup: boolean;
  thin_set: boolean;
  quote_total: number;
}

export async function createQuote(quoteData: Partial<QuoteData>): Promise<QuoteResponse> {
  console.log('Creating quote with data:', quoteData);
  
  try {
    const response = await api.post<QuoteResponse>('/quotes', quoteData);
    console.log('API response:', response);
    
    if (!response.ok) {
      console.error('API error details:', response);
      throw new Error(`Failed to create quote: ${response.status} ${JSON.stringify(response.data)}`);
    }
    return response.data;
  } catch (error) {
    console.error('Create quote error:', error);
    throw error;
  }
}

export async function updateDemolition(quoteId: string, demolition: boolean): Promise<QuoteResponse> {
  const response = await api.patch<QuoteResponse>(`/quotes/${quoteId}/demolition`, { demolition });
  if (!response.ok) {
    throw new Error('Failed to update demolition');
  }
  return response.data;
}

export async function updateGrout(quoteId: string, grout: boolean): Promise<QuoteResponse> {
  const response = await api.patch<QuoteResponse>(`/quotes/${quoteId}/grout`, { grout });
  if (!response.ok) {
    throw new Error('Failed to update grout');
  }
  return response.data;
}

export async function updatePickup(quoteId: string, pickup: boolean): Promise<QuoteResponse> {
  const response = await api.patch<QuoteResponse>(`/quotes/${quoteId}/pickup`, { pickup });
  if (!response.ok) {
    throw new Error('Failed to update pickup');
  }
  return response.data;
}

export async function updateThinSet(quoteId: string, thin_set: boolean): Promise<QuoteResponse> {
  const response = await api.patch<QuoteResponse>(`/quotes/${quoteId}/thinset`, { thin_set });
  if (!response.ok) {
    throw new Error('Failed to update thin set');
  }
  return response.data;
}

export async function calculateQuoteTotal(quoteId: string, quoteData: QuoteData): Promise<QuoteResponse> {
  const response = await api.post<QuoteResponse>(`/quotes/${quoteId}/calculate`, quoteData);
  if (!response.ok) {
    throw new Error('Failed to calculate quote total');
  }
  return response.data;
}
