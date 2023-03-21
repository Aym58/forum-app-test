export enum SortValues {
  NAME = 'name',
  EMAIL = 'email',
  DATE = 'createdAt',
}

export enum OrderValues {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortValuesType = `${SortValues}`;

export type OrderValuesType = `${OrderValues}`;
