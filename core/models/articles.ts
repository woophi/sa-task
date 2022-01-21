export interface ArticleItem {
  id: string;
  title: string;
  comments: number;
  author: {
    last_name: string;
    first_name: string;
  };
  preview: string;
  /**
   * format: 04.01.2022 08:54:43
   */
  created_at: string;
}

export interface Pagination {
  current: number;
  total: number;
  rows: number;
}
