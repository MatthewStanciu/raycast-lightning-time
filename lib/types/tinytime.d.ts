declare module "tinytime" {
  interface TinyTime {
    render: (date: Date) => string;
  }

  interface TinyTimeOptions {
    padHours?: boolean;
    padDays?: boolean;
    padMonth?: boolean;
  }

  const tinytime: (template: string, options: TinyTimeOptions) => TinyTime;

  export default tinytime;
}
