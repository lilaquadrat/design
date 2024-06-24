export default interface SelectOption {
    value: (number|string);
    text: string;
    description: string;
    selected?: boolean;
    disabled?: boolean;
  }
