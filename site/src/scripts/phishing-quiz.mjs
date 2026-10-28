export function initializeQuiz(root) {
  const interactive = root.querySelector("[data-interactive]");
  const fallback = root.querySelector("[data-static]");
  const questionList = root.querySelector("[data-questions]");
  const questions = [...root.querySelectorAll("[data-question]")];
  const completion = root.querySelector("[data-completion]");
  const previous = root.querySelector("[data-previous]");
  const next = root.querySelector("[data-next]");
  const progress = root.querySelector("progress");
  const reviewed = root.querySelector("[data-reviewed]");
  const announcement = root.querySelector("[data-announcement]");
  const answers = Array(questions.length).fill(null);
  let current = 0;

  function showQuestion(index, focus = true) {
    current = index;
    questionList.hidden = false;
    completion.hidden = true;
    questions.forEach((question, position) => { question.hidden = position !== current; });
    previous.disabled = current === 0;
    next.disabled = answers[current] === null;
    announcement.textContent = "";
    if (focus) questions[current].querySelector("[data-question-heading]").focus();
  }

  function reset(focus = true) {
    answers.fill(null);
    questions.forEach((question) => {
      question.querySelector("form").reset();
      question.querySelector("fieldset").disabled = false;
      // Explicit clearing also overrides browser-restored form values on reload.
      question.querySelectorAll("input").forEach((input) => { input.checked = false; });
      const check = question.querySelector("[data-check]");
      check.disabled = true;
      check.removeAttribute("aria-disabled");
      const feedback = question.querySelector("[data-feedback]");
      feedback.hidden = true;
      delete feedback.dataset.correct;
      question.querySelector("[data-result]").textContent = "";
    });
    progress.value = 0;
    reviewed.textContent = "0";
    showQuestion(0, focus);
  }

  questions.forEach((question, index) => {
    const form = question.querySelector("[data-question-form]");
    const check = question.querySelector("[data-check]");
    form.addEventListener("change", () => {
      if (answers[index] !== null) return;
      check.disabled = !form.querySelector("input:checked");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (index !== current || answers[index] !== null) return;
      const selected = form.querySelector("input:checked");
      if (!selected) return;
      answers[index] = Number(selected.value);
      const correct = answers[index] === Number(question.dataset.answer);
      const result = correct ? root.dataset.correct : root.dataset.incorrect;
      question.querySelector("fieldset").disabled = true;
      // Keep the focused submit button in the tab order; the handler enforces locking.
      check.setAttribute("aria-disabled", "true");
      const feedback = question.querySelector("[data-feedback]");
      feedback.hidden = false;
      feedback.dataset.correct = String(correct);
      question.querySelector("[data-result]").textContent = result;
      const count = answers.filter((answer) => answer !== null).length;
      progress.value = count;
      reviewed.textContent = String(count);
      next.disabled = false;
      announcement.textContent = [
        result,
        question.querySelector("[data-answer-text]").textContent.trim(),
        question.querySelector("[data-explanation]").textContent.trim()
      ].join(". ");
    });
  });

  previous.addEventListener("click", () => {
    if (current > 0) showQuestion(current - 1);
  });
  next.addEventListener("click", () => {
    if (answers[current] === null) return;
    if (current < questions.length - 1) {
      showQuestion(current + 1);
    } else if (answers.every((answer) => answer !== null)) {
      questionList.hidden = true;
      completion.hidden = false;
      announcement.textContent = "";
      completion.querySelector("h2").focus();
    }
  });
  root.querySelectorAll("[data-restart]").forEach((button) => {
    button.addEventListener("click", () => reset());
  });
  root.querySelector("[data-review]").addEventListener("click", () => showQuestion(0));
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) reset(false);
  });

  reset(false);
  interactive.hidden = false;
  fallback.hidden = true;
}
