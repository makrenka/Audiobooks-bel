export type Section = {
  _id: string;
  name: string;
};

export type SectionsState = {
  sectionsList: {
    isLoading: boolean;
    isSuccess: boolean;
    error: null | any;
    data: Section[] | null;
  };
};
