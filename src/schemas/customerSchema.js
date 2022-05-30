import Joi from "joi";

const birthdayRegex = "/^\d{4}(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$";

export const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
  cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
  birthday: Joi.string().pattern(/([0-9]{4})(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/).required(),
});
