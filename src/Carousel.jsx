import { useState, useEffectS } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
            }}
            key={id}
          >
            <figure>
              <img src={image} alt={name} className="person-img" />
            </figure>
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <blockquote className="text">{quote}</blockquote>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button className="prev" type="button" onClick={() => prevSlide()}>
        <FiChevronLeft />
      </button>
      <button className="next" type="button" onClick={() => nextSlide()}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
