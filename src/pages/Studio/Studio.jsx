import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import StatCounter from '../../components/StatCounter/StatCounter.jsx';
import TeamCard from '../../components/TeamCard/TeamCard.jsx';
import useScrollReveal from '../../hooks/useScrollReveal.js';
import {
  studioStats,
  philosophyPillars,
  developmentApproach,
  timeline,
  teamMembers,
  currentProjects,
} from '../../data/studio.js';
import { getGameById } from '../../data/games.js';
import './Studio.scss';

export default function Studio() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef, '.gsap-reveal', []);

  return (
    <div className="page studio" ref={pageRef}>
      <section className="studio-hero">
        <div className="container studio-hero__inner">
          <span className="eyebrow">Nexora Games</span>
          <h1 className="display-xl studio-hero__statement">
            We Build Worlds,
            <br />
            Not Just Games.
          </h1>
          <p className="studio-hero__lede">
            Founded in 2017 by six developers who believed a game should be judged the way you&rsquo;d judge a
            place &mdash; by whether you want to go back. Today we&rsquo;re eighty-six people across five
            internal teams, and that standard hasn&rsquo;t moved.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="studio-stats gsap-reveal">
          {studioStats.map((stat) => (
            <StatCounter key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </section>

      <section className="section section--tight container studio-story">
        <div className="studio-story__text gsap-reveal">
          <span className="eyebrow">Our Story</span>
          <h2 className="display-lg">Started With a Question, Not a Business Plan</h2>
          <p>
            Nexora began in a shared apartment in Lisbon with no publisher and no roadmap &mdash; just a
            conviction that most games were solving the wrong problem. We weren&rsquo;t short on mechanics.
            We were short on places worth spending time in.
          </p>
          <p>
            Nine years later, that conviction is still the only rule that hasn&rsquo;t changed. Every world we
            ship, from the drowned megastructures of Echoes of Aether to the fractured kingdom of Emberfall
            Chronicles, starts the same way: with a place, not a pitch.
          </p>
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="Creative Philosophy" title="What We Refuse to Compromise On" align="left" />
        <div className="studio-pillars gsap-reveal">
          {philosophyPillars.map((p, i) => (
            <div className="studio-pillar" key={p.id}>
              <span className="studio-pillar__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--tight studio-approach">
        <div className="container">
          <SectionHeading eyebrow="How We Work" title="Our Development Approach" align="left" />
          <ol className="studio-approach__list gsap-reveal">
            {developmentApproach.map((step, i) => (
              <li key={step.id} className="studio-approach__item">
                <span className="studio-approach__number">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{step.stage}</h4>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section container">
        <SectionHeading eyebrow="Since 2017" title="Studio Timeline" align="left" />
        <div className="studio-timeline gsap-reveal">
          {timeline.map((item) => (
            <div className="studio-timeline__item" key={item.id}>
              <span className="studio-timeline__year">{item.year}</span>
              <div className="studio-timeline__content">
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--tight container">
        <SectionHeading
          eyebrow="The People"
          title="Meet Part of the Team"
          description="Eighty-six developers across five internal teams. Here are a few of the people shaping our current worlds."
        />
        <div className="studio-team gsap-reveal">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section className="section container studio-projects">
        <SectionHeading eyebrow="Right Now" title="Current &amp; Upcoming Projects" align="left" />
        <div className="studio-projects__list gsap-reveal">
          {currentProjects.map((project) => {
            const linkedGame = getGameById(project.id);
            const Wrapper = linkedGame ? Link : 'div';
            const wrapperProps = linkedGame ? { to: `/game/${project.id}` } : {};
            return (
              <Wrapper key={project.id} {...wrapperProps} className="studio-project">
                <span className="tag tag--accent">{project.status}</span>
                <h4>{project.title}</h4>
                <p>{project.detail}</p>
                {linkedGame && <span className="studio-project__link">View Game Page &rarr;</span>}
              </Wrapper>
            );
          })}
        </div>
      </section>
    </div>
  );
}
