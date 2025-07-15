export interface Country {
  idd: {
    root: string;
    suffixes: string[];
  };
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}

export interface FormattedCountry {
  name: string;
  code: string;
  flag: string;
}
