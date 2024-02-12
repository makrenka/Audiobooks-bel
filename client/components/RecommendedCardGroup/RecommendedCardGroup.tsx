import { audiobooks } from "@/constants/audiobooks";
import Link from "next/link";

export const RecommendedCardGroup = () => (
  <div className="recommended-home__images">
    {audiobooks.map(({ coverBigSize, id }) => (
      <Link href={`detail/${id}`} key={id}>
        {/* <img
            src={coverBigSize.url ? coverBigSize.url : noImage}
            alt="Cover of the book"
            className="recommended-home__img"
          /> */}
      </Link>
    ))}
  </div>
);
