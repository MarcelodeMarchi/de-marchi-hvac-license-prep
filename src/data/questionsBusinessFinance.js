import { questions } from "./questionsData";

const isBusinessFinance = (question) => {
  const category = (question?.category || "").toLowerCase();
  return category.includes("business") || category.includes("finance");
};

export const businessFinanceQuestions = questions.filter(isBusinessFinance);
