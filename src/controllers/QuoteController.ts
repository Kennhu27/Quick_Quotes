import { Request, Response } from 'express';
import {
  CreateQuoteSchema,
  UpdateFeet_widthSchema,
  UpdateFeet_lengthSchema,
  UpdateSqr_feetSchema,
  UpdateDemolitionSchema,
  UpdateGroutSchema,
  UpdatePickupSchema,
  UpdateThinSetSchema,
  CalculateQuoteTotalSchema,
} from '../validators/quotes.js';
import {
  updatedemolition,
  updategrout,
  updatepickup,
  updatethin_set,
  updatefeet_width,
  updatefeet_length,
  updatesqr_feet,
  getquote_total,
} from '../models/QuoteModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { Quote } from '../entities/Quote.js';
import { AppDataSource } from '../dataSource.js';

const quoteRepository = AppDataSource.getRepository(Quote);

function getQuoteId(req: Request): string {
  const { quoteId } = req.params;
  return Array.isArray(quoteId) ? quoteId[0] : quoteId;
}

async function createQuote(req: Request, res: Response): Promise<void> {
  const result = CreateQuoteSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { feet_width, feet_length, sqr_feet, demolition, grout, pickup, thin_set } = result.data;

  try {
    const newQuote = new Quote();
    newQuote.feet_width = feet_width;
    newQuote.feet_length = feet_length;
    newQuote.sqr_feet = sqr_feet;
    newQuote.demolition = demolition;
    newQuote.grout = grout;
    newQuote.pickup = pickup;
    newQuote.thin_set = thin_set;
    newQuote.quote_total = 0;

    const savedQuote = await quoteRepository.save(newQuote);
    res.status(201).json(savedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteFeet_width(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateFeet_widthSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { feet_width } = result.data;

  try {
    const updatedQuote = await updatefeet_width(quoteId, feet_width);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteFeet_length(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateFeet_lengthSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { feet_length } = result.data;

  try {
    const updatedQuote = await updatefeet_length(quoteId, feet_length);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteSqr_feet(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateSqr_feetSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { sqr_feet } = result.data;

  try {
    const updatedQuote = await updatesqr_feet(quoteId, sqr_feet);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteDemolition(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateDemolitionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { demolition } = result.data;

  try {
    const updatedQuote = await updatedemolition(quoteId, demolition);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteGrout(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateGroutSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { grout } = result.data;

  try {
    const updatedQuote = await updategrout(quoteId, grout);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuotePickup(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdatePickupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { pickup } = result.data;

  try {
    const updatedQuote = await updatepickup(quoteId, pickup);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateQuoteThinSet(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = UpdateThinSetSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { thin_set } = result.data;

  try {
    const updatedQuote = await updatethin_set(quoteId, thin_set);
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function submitAndCalculateQuote(req: Request, res: Response): Promise<void> {
  const quoteId = getQuoteId(req);
  const result = CalculateQuoteTotalSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }
  const { feet_width, feet_length, sqr_feet, demolition, grout, pickup, thin_set } = result.data;

  try {
    const updatedQuote = await getquote_total(
      quoteId,
      feet_length,
      feet_width,
      sqr_feet,
      demolition,
      grout,
      pickup,
      thin_set,
    );
    if (!updatedQuote) {
      res.status(404).json({ error: 'Quote not found' });
      return;
    }
    res.status(200).json(updatedQuote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export {
  createQuote,
  updateQuoteFeet_width,
  updateQuoteFeet_length,
  updateQuoteSqr_feet,
  updateQuoteDemolition,
  updateQuoteGrout,
  updateQuotePickup,
  updateQuoteThinSet,
  submitAndCalculateQuote,
};
