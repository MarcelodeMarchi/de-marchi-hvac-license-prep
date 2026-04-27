import { questions } from "./questionsData";

const isBusinessFinance = (question) => {
  const category = (question?.category || "").toLowerCase();
  return category.includes("business") || category.includes("finance");
};

export const hvacClassABQuestions = questions.filter(
  (question) => !isBusinessFinance(question)
);
