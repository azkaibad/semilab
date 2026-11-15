"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function Quiz({
  slug,
  questions,
}: {
  slug: string;
  questions: QuizQuestion[];
}) {
  const [picked, setPicked] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const complete = useProgress((state) => state.complete);

  const correct = picked.filter((p, i) => p === questions[i].answer).length;
  const answered = picked.filter((p) => p !== null).length;
  const allCorrect = correct === questions.length;

  useEffect(() => {
    if (allCorrect) complete(slug);
  }, [allCorrect, complete, slug]);

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const choice = picked[qi];
        const isRight = choice === q.answer;
        return (
          <fieldset
            key={qi}
            className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
          >
            <legend className="float-left mb-3 w-full font-medium">
              <span className="mr-2 text-muted">{qi + 1}.</span>
              {q.question}
            </legend>
            <div className="clear-both grid gap-2">
              {q.options.map((option, oi) => {
                const selected = choice === oi;
                const tone = !selected
                  ? "border-line hover:border-accent"
                  : isRight
                    ? "border-ok bg-ok-soft"
                    : "border-bad bg-bad-soft";
                return (
                  <label
                    key={oi}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${tone}`}
                  >
                    <input
                      type="radio"
                      name={`${slug}-${qi}`}
                      className="size-4 accent-[var(--accent)]"
                      checked={selected}
                      onChange={() =>
                        setPicked((prev) =>
                          prev.map((p, i) => (i === qi ? oi : p)),
                        )
                      }
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
            <div aria-live="polite" className="mt-3 text-sm">
              {choice !== null &&
                (isRight ? (
                  <p>
                    <strong className="text-ok">Benar.</strong> {q.explanation}
                  </p>
                ) : (
                  <p>
                    <strong className="text-bad">Belum tepat.</strong> Coba
                    pilihan lain.
                  </p>
                ))}
            </div>
          </fieldset>
        );
      })}

      <p
        aria-live="polite"
        className={`rounded-xl px-4 py-3 text-sm font-medium ${
          allCorrect ? "bg-ok-soft text-ink" : "bg-surface text-muted"
        }`}
      >
        {allCorrect
          ? "Semua jawaban benar. Bab ini ditandai selesai."
          : `${correct} dari ${questions.length} benar${
              answered < questions.length ? ", masih ada soal yang belum dijawab" : ""
            }. Jawab semua dengan benar untuk menyelesaikan bab.`}
      </p>
    </div>
  );
}
