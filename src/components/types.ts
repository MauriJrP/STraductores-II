export interface IColumn {
  id: string;
  label: string;
  minWidth: number;
  align?: "right" | "inherit" | "left" | "center" | "justify" | undefined
}

export interface IFormData {
  input: string;
  output: string;
}