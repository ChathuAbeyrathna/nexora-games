import './TeamCard.scss';

export default function TeamCard({ member }) {
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <article className="team-card">
      <div className="team-card__avatar" aria-hidden="true">
        {initials}
      </div>
      <h3 className="team-card__name">{member.name}</h3>
      <p className="team-card__role">{member.role}</p>
      <p className="team-card__bio">{member.bio}</p>
    </article>
  );
}
