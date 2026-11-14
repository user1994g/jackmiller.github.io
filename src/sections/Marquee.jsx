import React from 'react';

const lines = ['Short films.', 'Photographs.', 'Work in progress.'];

const Marquee = () => {
  const items = [...lines, ...lines];
  return (
    <section className="cut-marquee" aria-label="Studio notes">
      <div className="cut-marquee__track">
        {items.map((line, index) => <p className="cut-marquee__item" key={`${line}-${index}`}>{line}</p>)}
      </div>
    </section>
  );
};

export default Marquee;
