import { Slide } from "./slide";

export const SlidesList = ({ slideNumber }: { slideNumber: number }) => (
    <div
        className="detail-page__reviews-slider-slides"
        style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
        <Slide />
    </div>
)