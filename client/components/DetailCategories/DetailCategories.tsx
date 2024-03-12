import styles from "./DetailCategories.module.css";

export const DetailCategories = ({
  categories,
}: {
  categories: {
    id: string;
    name: string;
  }[];
}) => (
  <div className={styles.categories}>
    {categories?.map(({ id, name }) => (
      <div className={styles.category} key={id}>
        {name}
      </div>
    ))}
  </div>
);
