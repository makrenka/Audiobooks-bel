import React from "react";
import { Link } from "react-router-dom";
import "./section-home.css";

export const SectionHome = ({
  name,
  content,
  url,
}: {
  name: string;
  content: React.ReactNode;
  url: string;
}) => (
  <section className="section-home">
    <div className="container">
      <div className="section-home__wrapper">
        <div className="section-home__heading-string">
          <h2 className="section-home__heading-string-heading">{name}</h2>
          <Link to={"/" + url} className="section-home__heading-string-link">
            Глядзець больш
          </Link>
        </div>
        {content}
      </div>
    </div>
  </section>
);
