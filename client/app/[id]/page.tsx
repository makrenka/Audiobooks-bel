import { HeaderDetail } from "@/components/HeaderDetail/HeaderDetail";
import { audiobooks } from "@/constants/audiobooks";

type Props = {
  params: {
    id: string;
  };
};

export default function DetailPage({ params: { id } }: Props) {
  const book = audiobooks.filter((item) => item.id === id)[0];

  return (
    <>
      <HeaderDetail title={book.id} />
    </>
  );
}
