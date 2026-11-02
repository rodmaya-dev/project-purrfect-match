import { AUTHOR_LINKS, AUTHOR_NAME } from '../../config/author';
import '../Button/Button.css';
import './About.css';

function About() {
  return (
    <main className="page about">
      <h1 className="about__title">About the author</h1>

      <section className="about__section" aria-labelledby="author-title">
        <h2 id="author-title" className="about__subtitle">
          Hi, I'm {AUTHOR_NAME}
        </h2>
        <p className="about__text">
          I’m an engineer with more than ten years of professional experience
          working with databases in enterprise environments. My core expertise
          is procedural SQL: Oracle PL/SQL and SQL Server T-SQL, including
          stored procedures, packages, and complex queries, with a focus on
          data modeling, data loading, and system integration. For global
          clients, I have supported production systems around the clock, from
          L2 incident analysis and root-cause investigation to SAP–Oracle
          integrations. I have worked remotely with distributed teams since
          2019. I am now moving into full-stack web development with
          TypeScript, React, Node.js, and Express, building projects with
          MongoDB and deploying them on Vercel. I bring the same discipline
          from production support to the code I write: attention to data
          integrity, clear structure, and a focus on reliability.
        </p>
      </section>

      <section className="about__section" aria-labelledby="project-title">
        <h2 id="project-title" className="about__subtitle">
          About the project
        </h2>
        <p className="about__text">
          PurrfectMatch helps you choose a cat breed with a short quiz and a
          breed explorer powered by The Cat API. It is my final project at
          TripleTen, built with React, TypeScript and Vite.
        </p>
        <p className="about__text">
          The quiz is only a guide. The API doesn't cover health, allergies or
          how a cat gets along with children or other pets, so talk to a vet or
          a breeder before you decide.
        </p>
      </section>

      <section aria-labelledby="links-title">
        <h2 id="links-title" className="about__subtitle">
          Find me online
        </h2>
        <ul className="about__links">
          {AUTHOR_LINKS.map((link) => (
            <li key={link.url}>
              <a
                className="button button_secondary"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default About;