export type InputType = {
  id: number;
  start: string;
  duration: number;
}[];

export type OutputType = {
  id: number;
  start: number;
  end: number;
  xOrigin: number;
  yOrigin: number;
  width: number;
  height: number;
}[];
