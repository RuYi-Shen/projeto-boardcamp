import Joi from "joi";

export const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().integer().positive().required(),
  categoryId: Joi.number().required(),
  pricePerDay: Joi.number().positive().required(),
});
