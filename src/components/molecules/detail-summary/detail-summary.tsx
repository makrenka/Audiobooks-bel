import './detail-summary.css';

export const DetailSummary = ({ summary }: { summary: string | undefined }) => (
    <div className="detail-page__detail-summary">
        <h3 className="detail-page__detail-summary-heading">
            Summary
        </h3>
        <p className="detail-page__detail-summary-text">
            {summary}
        </p>
    </div>
)