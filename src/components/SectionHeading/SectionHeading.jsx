import './SectionHeading.scss';

export default function SectionHeading({ eyebrow, title, description, align = 'left', action }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="section-heading__text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="display-lg section-heading__title">{title}</h2>
        {description && <p className="section-heading__description">{description}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  );
}
