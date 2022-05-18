export interface IDetailTextField {
  defaultValue: string;
  label: string;
  state: string;
  slice: (payload: string) => { payload: string; type: string };
}

export interface IDetailTextArea {
  defaultValue: string;
  label: string;
  state: string;
  slice: (payload: string) => { payload: string; type: string };
}
