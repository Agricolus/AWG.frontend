declare namespace dto {
  interface Paginated<T> {
    totalCount: number;
    skip: number;
    take: number;
    items: T[];
  }
}