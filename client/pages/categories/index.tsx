import { BottomBar } from "@/components/BottomBar/BottomBar";
import { HeaderSection } from "@/components/HeaderSection/HeaderSection";
import { categories } from "@/constants/categories";

import styles from "./page.module.css";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <>
      <div className={styles.container}>
        <HeaderSection heading={"Катэгорыі"} />
        <div className={styles.buttons}>
          {categories.map(({ name }) => (
            <Link href={`/category/${name}`} key={name} className={styles.btn}>
              {name}
            </Link>
          ))}
        </div>
      </div>
      <BottomBar />
    </>
  );
}
