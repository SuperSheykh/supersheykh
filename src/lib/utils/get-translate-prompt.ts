import { z } from "zod";

export const getPrompt = (data: z.infer<typeof z.any>, formType: string) => {
  return `
    Given the following data in either french or english language, please translate it to the other language 
     and enhance it if possible. 
    The data is for a ${formType}.
    Data: ${JSON.stringify(data, null, 2)}

    Please return a JSON object that conforms to the provided schema.
    - If a field is not translatable (like a link or an id), keep it as is.
    - For fields that are already present in the data, use them for the source language.
    - For the other language, generate the equivalent and make it make sense. Not just a literal translation.
    Example: if lang is 'en' and you have a 'title' field, 
    the output should have 'title' (original value) and 'title_fr' (translated value).
  `;
};
