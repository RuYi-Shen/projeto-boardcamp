import Joi from "joi";

const birthdayRegex = "/^\d{4}(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$";

export const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  cpf: Joi.string().min(10).max(11).number().required(),
  birthday: Joi.string().pattern(birthdayRegex).required(),
});
