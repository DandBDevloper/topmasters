'use client';

import { useState, useId } from 'react';
import styles from './Faq.module.scss';

/**
 * A single, self-contained accordion item. It manages its own open/closed state.
 */
function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div className={styles.faqItem}>
      <h3>
        <button
          className={styles.faqQuestion}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
        >
          <span className={styles.questionText}>{question}</span>
          <span className={styles.faqIcon} aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${id}`}
        role="region"
        className={styles.faqAnswerContainer}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div className={styles.faqAnswer}>
            <div
              className={styles.faqAnswerContent}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
        </div>
      </div>
    </div>
  );
}

/**
 * The main FAQ component that renders a list of accordion items.
 */
export default function Faq({ faqs }) {
  // console.log(faqs);
  return (
    <div className={styles.faqContainer}>
      {faqs.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}